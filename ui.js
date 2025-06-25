// Global değişkenler
let currentStep = 1;
let selectedFont = "";
let availableFonts = [];

// Adım geçişleri
function nextStep() {
  if (currentStep === 2 && !validateColors()) {
    alert("En az bir renk eklemelisiniz!");
    return;
  }

  if (currentStep === 3 && !selectedFont) {
    alert("Lütfen bir font seçin!");
    return;
  }

  if (currentStep < 4) {
    currentStep++;
    updateStep();

    if (currentStep === 3) {
      loadFonts();
    } else if (currentStep === 4) {
      updateSummary();
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStep();
  }
}

function updateStep() {
  // Tüm adımları gizle
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  // Aktif adımı göster
  document.getElementById(`step${currentStep}`).classList.add("active");

  // Progress bar güncelle
  const progress = (currentStep / 4) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

// Renk yönetimi
function addColor() {
  const colorInputs = document.getElementById("colorInputs");
  const newColorGroup = document.createElement("div");
  newColorGroup.className = "color-input-group";

  newColorGroup.innerHTML = `
        <input type="color" class="color-input" value="#${Math.floor(
          Math.random() * 16777215
        ).toString(16)}" onchange="updateColorHex(this)">
        <input type="text" class="color-hex" value="#${Math.floor(
          Math.random() * 16777215
        ).toString(16)}" onchange="updateColorInput(this)">
        <button class="remove-color" onclick="removeColor(this)">×</button>
    `;

  colorInputs.appendChild(newColorGroup);
  updateRemoveButtons();
}

function removeColor(button) {
  button.parentElement.remove();
  updateRemoveButtons();
}

function updateRemoveButtons() {
  const colorGroups = document.querySelectorAll(".color-input-group");
  colorGroups.forEach((group, index) => {
    const removeBtn = group.querySelector(".remove-color");
    if (colorGroups.length === 1) {
      removeBtn.style.display = "none";
    } else {
      removeBtn.style.display = "flex";
    }
  });
}

function updateColorHex(colorInput) {
  const hexInput = colorInput.nextElementSibling;
  hexInput.value = colorInput.value;
}

function updateColorInput(hexInput) {
  const colorInput = hexInput.previousElementSibling;
  if (/^#[0-9A-F]{6}$/i.test(hexInput.value)) {
    colorInput.value = hexInput.value;
  }
}

function validateColors() {
  const colorInputs = document.querySelectorAll(".color-input");
  return colorInputs.length > 0;
}

function getSelectedColors() {
  const colorInputs = document.querySelectorAll(".color-input");
  return Array.from(colorInputs).map((input) => input.value);
}

// Font yönetimi
function loadFonts() {
  document.getElementById("fontsLoading").style.display = "block";
  document.getElementById("fontGrid").style.display = "none";

  // Figma'dan fontları iste
  parent.postMessage({ pluginMessage: { type: "get-fonts" } }, "*");
}

function displayFonts(fonts) {
  availableFonts = fonts;
  const fontGrid = document.getElementById("fontGrid");
  const fontsLoading = document.getElementById("fontsLoading");

  fontGrid.innerHTML = "";

  fonts.forEach((font) => {
    const fontOption = document.createElement("div");
    fontOption.className = "font-option";
    fontOption.textContent = font;
    fontOption.style.fontFamily = font;
    fontOption.onclick = () => selectFont(fontOption, font);
    fontGrid.appendChild(fontOption);
  });

  fontsLoading.style.display = "none";
  fontGrid.style.display = "grid";
}

function selectFont(element, fontName) {
  // Önceki seçimi temizle
  document.querySelectorAll(".font-option").forEach((option) => {
    option.classList.remove("selected");
  });

  // Yeni seçimi işaretle
  element.classList.add("selected");
  selectedFont = fontName;

  // Devam et butonunu aktifleştir
  document.getElementById("fontNextBtn").disabled = false;
}

// Özet güncelleme
function updateSummary() {
  const colors = getSelectedColors();
  const summaryColors = document.getElementById("summaryColors");
  const summaryFont = document.getElementById("summaryFont");

  // Renkleri göster
  summaryColors.innerHTML = "";
  colors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.className = "summary-color";
    colorDiv.style.backgroundColor = color;
    colorDiv.title = color;
    summaryColors.appendChild(colorDiv);
  });

  // Font'u göster
  summaryFont.textContent = selectedFont;
  summaryFont.style.fontFamily = selectedFont;
}

// Design system oluşturma
function createDesignSystem() {
  const colors = getSelectedColors();

  if (colors.length === 0 || !selectedFont) {
    alert("Lütfen tüm alanları doldurun!");
    return;
  }

  // Figma'ya design system oluşturma mesajı gönder
  parent.postMessage(
    {
      pluginMessage: {
        type: "create-design-system",
        data: {
          colors: colors,
          fontFamily: selectedFont,
        },
      },
    },
    "*"
  );
}

// Figma'dan gelen mesajları dinle
window.onmessage = (event) => {
  const msg = event.data.pluginMessage;

  if (msg.type === "fonts-list") {
    displayFonts(msg.fonts);
  }

  if (msg.type === "design-system-created") {
    alert("Design system başarıyla oluşturuldu! 🎉");
    parent.postMessage({ pluginMessage: { type: "close" } }, "*");
  }

  if (msg.type === "error") {
    alert("Hata: " + msg.message);
  }
};

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", function () {
  updateRemoveButtons();
});
