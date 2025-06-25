// Ana plugin kodu
figma.showUI(__html__, { width: 450, height: 700 });

// Renk tonları oluşturmak için yardımcı fonksiyon
function generateColorShades(hexColor: string): string[] {
  // Hex'i RGB'ye çevir
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const shades: string[] = [];

  // 5 koyu ton (orijinal rengi karanlıklaştır)
  for (let i = 5; i >= 1; i--) {
    const factor = i * 0.15; // %15'lik artışlarla karanlıklaştır
    const newR = Math.round(r * (1 - factor));
    const newG = Math.round(g * (1 - factor));
    const newB = Math.round(b * (1 - factor));
    shades.push(
      `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
    );
  }

  // Orijinal renk
  shades.push(hexColor);

  // 5 açık ton (orijinal rengi aydınlatır)
  for (let i = 1; i <= 5; i++) {
    const factor = i * 0.15; // %15'lik artışlarla aydınlatır
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    shades.push(
      `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
    );
  }

  return shades;
}

// Renk paletini oluşturan fonksiyon
async function createColorPalette(
  colors: { color: string; name: string }[]
): Promise<SceneNode[]> {
  const paletteNodes: SceneNode[] = [];

  for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
    const colorData = colors[colorIndex];
    const shades = generateColorShades(colorData.color);
    const colorName = colorData.name.replace(/\s+/g, "").toLowerCase(); // Boşlukları kaldır ve küçük harfe çevir

    for (let shadeIndex = 0; shadeIndex < shades.length; shadeIndex++) {
      const shade = shades[shadeIndex];
      // Frame oluştur (dikdörtgen için)
      const frame = figma.createFrame();
      frame.resize(120, 60); // Dikdörtgen boyutu
      frame.cornerRadius = 12;

      // Hex'i RGB'ye çevir
      const r = parseInt(shade.slice(1, 3), 16) / 255;
      const g = parseInt(shade.slice(3, 5), 16) / 255;
      const b = parseInt(shade.slice(5, 7), 16) / 255;

      frame.fills = [
        {
          type: "SOLID",
          color: { r, g, b },
        },
      ];

      // Konumlandır
      frame.x = shadeIndex * 130; // 130px aralıklarla yan yana
      frame.y = colorIndex * 80; // 80px aralıklarla alt alta

      // Text ekle (renk adı) - async olarak
      try {
        await figma.loadFontAsync({ family: "Inter", style: "Medium" });

        const textNode = figma.createText();

        // Yeni renk numaralandırma sistemi: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
        const shadeNumbers = [
          50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
        ];
        const shadeNumber = shadeNumbers[shadeIndex];

        textNode.characters = `${colorName}-${shadeNumber}`;
        textNode.fontSize = 12;
        textNode.fontName = { family: "Inter", style: "Medium" };

        // Text rengini belirle (koyu renklerde beyaz, açık renklerde siyah)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        textNode.fills = [
          {
            type: "SOLID",
            color:
              brightness > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 },
          },
        ];

        frame.appendChild(textNode);

        // Text'i frame'in ortasına yerleştir (appendChild'dan sonra)
        textNode.x = (frame.width - textNode.width) / 2;
        textNode.y = (frame.height - textNode.height) / 2;
      } catch (error) {
        // Fallback - font yüklenemezse sadece renk kodu
        console.log("Font loading failed, using fallback:", error);
        try {
          await figma.loadFontAsync({ family: "Inter", style: "Regular" });
          const textNode = figma.createText();
          const shadeNumbers = [
            50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
          ];
          const shadeNumber = shadeNumbers[shadeIndex];
          textNode.characters = `${colorName}-${shadeNumber}`;
          textNode.fontSize = 10;
          textNode.fontName = { family: "Inter", style: "Regular" };
          textNode.fills = [
            {
              type: "SOLID",
              color: { r: 1, g: 1, b: 1 },
            },
          ];
          frame.appendChild(textNode);
          textNode.x = (frame.width - textNode.width) / 2;
          textNode.y = (frame.height - textNode.height) / 2;
        } catch (fallbackError) {
          console.log("All font loading failed:", fallbackError);
        }
      }

      // Color style oluştur ve ekle
      const colorStyle = figma.createPaintStyle();
      const shadeNumbers = [
        50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
      ];
      const shadeNumber = shadeNumbers[shadeIndex];
      colorStyle.name = `${colorData.name}/${colorName}-${shadeNumber}`;
      colorStyle.paints = frame.fills;

      paletteNodes.push(frame);
    }
  }

  return paletteNodes;
}

// Güvenli font yükleme fonksiyonu
async function loadFontSafely(
  fontFamily: string,
  style: string
): Promise<FontName | null> {
  // Önce mevcut fontları kontrol et
  const availableFonts = await figma.listAvailableFontsAsync();
  const matchingFont = availableFonts.find(
    (f) => f.fontName.family === fontFamily && f.fontName.style === style
  );

  if (!matchingFont) {
    console.log(`Font not available: ${fontFamily} ${style}`);
    // Aynı aileden farklı stiller kontrol et
    const familyFonts = availableFonts.filter(
      (f) => f.fontName.family === fontFamily
    );
    console.log(
      `Available styles for ${fontFamily}:`,
      familyFonts.map((f) => f.fontName.style)
    );
  }

  try {
    await figma.loadFontAsync({ family: fontFamily, style: style });
    console.log(`Successfully loaded ${fontFamily} ${style}`);
    return { family: fontFamily, style: style };
  } catch (error) {
    console.log(`Failed to load ${fontFamily} ${style}:`, error);

    // Fallback stilleri dene
    const fallbackStyles = ["Regular", "Normal", "Book", "Roman", "Medium"];
    for (const fallbackStyle of fallbackStyles) {
      if (fallbackStyle !== style) {
        const fallbackFont = availableFonts.find(
          (f) =>
            f.fontName.family === fontFamily &&
            f.fontName.style === fallbackStyle
        );

        if (fallbackFont) {
          try {
            await figma.loadFontAsync({
              family: fontFamily,
              style: fallbackStyle,
            });
            console.log(
              `Loaded ${fontFamily} ${fallbackStyle} as fallback for ${style}`
            );
            return { family: fontFamily, style: fallbackStyle };
          } catch (e) {
            console.log(
              `Failed to load fallback ${fontFamily} ${fallbackStyle}`
            );
          }
        }
      }
    }

    // Son çare olarak Inter Regular dene (Figma'nın default fontu)
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      console.log(`Using Inter Regular as final fallback`);
      return { family: "Inter", style: "Regular" };
    } catch (e) {
      console.log(`Even Inter failed`);
      return null;
    }
  }
}

// Typography sistemi oluşturan fonksiyon
async function createTypographySystem(
  fontFamily: string,
  selectedStyles: { headings: string[]; paragraph: string[]; small: string[] }
): Promise<SceneNode[]> {
  const typographyNodes: SceneNode[] = [];
  let yPosition = 0;

  console.log(
    `Creating typography system for ${fontFamily} with selected styles:`,
    selectedStyles
  );

  // H1-H6 başlıkları (seçilen heading stillerini kullan)
  const headingSizes = [48, 36, 28, 24, 20, 16];
  for (let i = 0; i < 6; i++) {
    // Her başlık için seçilen heading stillerini kullan
    for (const style of selectedStyles.headings) {
      const loadedFont = await loadFontSafely(fontFamily, style);

      if (loadedFont) {
        try {
          // Önce Inter ile text node oluştur
          await figma.loadFontAsync({ family: "Inter", style: "Regular" });
          const textNode = figma.createText();

          // Varsayılan text ekle
          textNode.characters = `H${i + 1} ${style}`;
          textNode.fontSize = headingSizes[i];
          textNode.y = yPosition;
          yPosition += headingSizes[i] + 10;

          console.log(`Creating H${i + 1} with style ${style}`);

          // Şimdi istenen fontu ata
          try {
            textNode.fontName = loadedFont;
            console.log(`Font changed successfully for H${i + 1} ${style}`);
          } catch (fontError) {
            console.log(
              `Failed to change font for H${i + 1} ${style}:`,
              fontError
            );
          }

          // Text style oluştur ve ata
          try {
            const textStyle = figma.createTextStyle();
            textStyle.name = `${fontFamily}/H${i + 1} ${style}`;
            textStyle.fontSize = headingSizes[i];
            textStyle.fontName = loadedFont;
            textNode.textStyleId = textStyle.id;
            console.log(`Created text style: ${textStyle.name}`);
          } catch (styleError) {
            console.log(
              `Failed to create text style for H${i + 1} ${style}:`,
              styleError
            );
          }

          typographyNodes.push(textNode);

          // Font atama kontrolü
          const appliedFont = textNode.fontName as FontName;
          console.log(
            `H${i + 1} ${style} final font: ${appliedFont.family} ${
              appliedFont.style
            }`
          );
        } catch (error) {
          console.log(`Error creating H${i + 1} ${style}:`, error);
        }
      } else {
        console.log(`No font loaded for H${i + 1} ${style}`);
      }
    }
  }

  // P Regular (seçilen paragraph stillerini kullan)
  for (const style of selectedStyles.paragraph) {
    const loadedFont = await loadFontSafely(fontFamily, style);

    if (loadedFont) {
      try {
        // Önce Inter ile text node oluştur
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        const textNode = figma.createText();

        console.log(`Creating Paragraph with ${style}`);

        // Varsayılan text ekle
        textNode.characters = `Paragraph ${style}`;
        textNode.fontSize = 16;
        textNode.y = yPosition;
        yPosition += 26;

        // Şimdi istenen fontu ata
        try {
          textNode.fontName = loadedFont;
          console.log(`Font changed successfully for Paragraph ${style}`);
        } catch (fontError) {
          console.log(
            `Failed to change font for Paragraph ${style}:`,
            fontError
          );
        }

        // Text style oluştur
        try {
          const textStyle = figma.createTextStyle();
          textStyle.name = `${fontFamily}/P Regular ${style}`;
          textStyle.fontSize = 16;
          textStyle.fontName = loadedFont;
          textNode.textStyleId = textStyle.id;
          console.log(`Created text style: ${textStyle.name}`);
        } catch (styleError) {
          console.log(
            `Failed to create text style for P Regular ${style}:`,
            styleError
          );
        }

        typographyNodes.push(textNode);

        // Font atama kontrolü
        const appliedFont = textNode.fontName as FontName;
        console.log(
          `Paragraph ${style} final font: ${appliedFont.family} ${appliedFont.style}`
        );
      } catch (error) {
        console.log(`Error creating Paragraph ${style}:`, error);
      }
    } else {
      console.log(`No font loaded for Paragraph ${style}`);
    }
  }

  // P Small (seçilen small stillerini kullan)
  for (const style of selectedStyles.small) {
    const loadedFont = await loadFontSafely(fontFamily, style);

    if (loadedFont) {
      try {
        // Önce Inter ile text node oluştur
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        const textNode = figma.createText();

        console.log(`Creating Small text with ${style}`);

        // Varsayılan text ekle
        textNode.characters = `Small text ${style}`;
        textNode.fontSize = 14;
        textNode.y = yPosition;
        yPosition += 24;

        // Şimdi istenen fontu ata
        try {
          textNode.fontName = loadedFont;
          console.log(`Font changed successfully for Small text ${style}`);
        } catch (fontError) {
          console.log(
            `Failed to change font for Small text ${style}:`,
            fontError
          );
        }

        // Text style oluştur
        try {
          const textStyle = figma.createTextStyle();
          textStyle.name = `${fontFamily}/P Small ${style}`;
          textStyle.fontSize = 14;
          textStyle.fontName = loadedFont;
          textNode.textStyleId = textStyle.id;
          console.log(`Created text style: ${textStyle.name}`);
        } catch (styleError) {
          console.log(
            `Failed to create text style for P Small ${style}:`,
            styleError
          );
        }

        typographyNodes.push(textNode);

        // Font atama kontrolü
        const appliedFont = textNode.fontName as FontName;
        console.log(
          `Small text ${style} final font: ${appliedFont.family} ${appliedFont.style}`
        );
      } catch (error) {
        console.log(`Error creating Small text ${style}:`, error);
      }
    } else {
      console.log(`No font loaded for Small text ${style}`);
    }
  }

  console.log(`Total typography nodes created: ${typographyNodes.length}`);
  return typographyNodes;
}

// UI'den gelen mesajları dinle
figma.ui.onmessage = async (msg) => {
  if (msg.type === "get-fonts") {
    // Figma'daki mevcut fontları al
    const fonts = await figma.listAvailableFontsAsync();
    const fontFamilies = [
      ...new Set(fonts.map((font) => font.fontName.family)),
    ];
    figma.ui.postMessage({ type: "fonts-list", fonts: fontFamilies });
  }

  if (msg.type === "get-font-styles") {
    const { fontFamily } = msg;
    // Figma'daki mevcut fontları al
    const fonts = await figma.listAvailableFontsAsync();
    const fontStyles = fonts
      .filter((font) => font.fontName.family === fontFamily)
      .map((font) => font.fontName.style);

    figma.ui.postMessage({ type: "font-styles-list", styles: fontStyles });
  }

  if (msg.type === "create-design-system") {
    const { colors, fontFamily, fontStyles } = msg.data;

    try {
      // Font ailesi kontrol et
      const availableFonts = await figma.listAvailableFontsAsync();

      // Seçilen font ailesinin tüm stillerini bul
      const fontVariants = availableFonts.filter(
        (font) => font.fontName.family === fontFamily
      );

      if (fontVariants.length === 0) {
        throw new Error(`Font family "${fontFamily}" not found`);
      }

      console.log(`Found ${fontVariants.length} variants for ${fontFamily}`);

      // Mevcut stilleri listele
      const availableStyles = fontVariants.map((v) => v.fontName.style);
      console.log(`Available styles for ${fontFamily}:`, availableStyles);

      // Renk paletini oluştur
      const colorNodes = await createColorPalette(colors);

      // Typography sistemini oluştur
      const typographyNodes = await createTypographySystem(
        fontFamily,
        fontStyles
      );

      // Sayfaya ekle
      const currentPage = figma.currentPage;
      colorNodes.forEach((node) => currentPage.appendChild(node));

      // Typography'yi renk paletinin altına yerleştir
      const colorPaletteHeight = colors.length * 80; // Her renk 80px yükseklik
      const margin = 50; // Aralarında boşluk

      typographyNodes.forEach((node) => {
        node.x = 0; // Sol tarafa hizala
        node.y = node.y + colorPaletteHeight + margin; // Renk paletinin altına
        currentPage.appendChild(node);
      });

      // Oluşturulan elementleri seç
      figma.currentPage.selection = [...colorNodes, ...typographyNodes];
      figma.viewport.scrollAndZoomIntoView([...colorNodes, ...typographyNodes]);

      figma.ui.postMessage({
        type: "design-system-created",
        message: `Design system created with ${fontFamily}`,
      });
    } catch (error) {
      console.error("Error creating design system:", error);
      figma.ui.postMessage({
        type: "error",
        message: `Error: ${String(error)}`,
      });
    }
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }
};
