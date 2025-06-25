# 🎨 Design System Generator

**🇺🇸 English** | [🇹🇷 Türkçe](#turkish)

A powerful Figma plugin that automatically generates comprehensive design systems with color palettes and typography styles in just a few steps.

## ✨ Features

- 🎨 **Smart Color Palette Generation**: Create 11-shade palettes (5 dark + original + 5 light) for each color
- 📝 **Typography System**: Generate H1-H6 headings and paragraph styles with customizable font weights
- 🌍 **Multi-language Support**: Available in English and Turkish
- 🎯 **Font Style Customization**: Choose specific font weights for different text categories
- 🚀 **Automatic Style Creation**: All colors and typography automatically added to Figma styles
- 💾 **Color Naming**: Custom color names with organized style structure
- 🔧 **Easy Setup**: Intuitive step-by-step interface

## 🛠️ Installation

1. **Download the Plugin**

   ```bash
   git clone https://github.com/yourusername/figma-design-system-generator.git
   cd figma-design-system-generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Plugin** (if using TypeScript)

   ```bash
   npm run build
   ```

4. **Load in Figma**
   - Open Figma
   - Go to `Plugins` → `Development` → `Import plugin from manifest...`
   - Select the `manifest.json` file from this project

## 🚀 Usage

### Step 1: Language Selection

- Choose your preferred language (English or Turkish)
- The entire interface will adapt to your selection

### Step 2: Color Palette

- Add your brand colors using the color picker or hex codes
- Name each color (e.g., "Primary", "Secondary", "Accent")
- Add multiple colors as needed

### Step 3: Font Selection

- Browse and search through available Figma fonts
- Select your desired font family

### Step 4: Font Styles

- Choose font weights for three categories:
  - **Headings (H1-H6)**: Select weights for heading styles
  - **Paragraph Regular**: Choose weights for body text
  - **Paragraph Small**: Pick weights for smaller text

### Step 5: Review & Generate

- Review your selections
- Click "Create Design System" to generate everything automatically

## 📋 What Gets Created

### Color Styles

- **11 shades per color**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Organized naming**: `Primary/primary-500`, `Secondary/secondary-300`, etc.
- **Smart text colors**: Automatic black/white text overlay based on background brightness

### Typography Styles

- **H1-H6 heading styles** with selected font weights
- **Paragraph Regular** styles with chosen weights
- **Paragraph Small** styles with selected weights
- **Organized naming**: `FontFamily/H1 Bold`, `FontFamily/P Regular Medium`, etc.

## 🔧 Technical Details

### File Structure

```
figma-design-system-generator/
├── manifest.json          # Figma plugin manifest
├── code.ts               # Plugin logic (TypeScript)
├── code.js               # Compiled JavaScript
├── ui.html               # Plugin interface
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md             # Documentation
```

### Key Features Implementation

- **Robust Font Loading**: Fallback system for unavailable fonts
- **Dynamic Color Generation**: Mathematical shade calculation
- **Multi-language System**: Complete translation infrastructure
- **Error Handling**: Comprehensive validation and user feedback

## Screenshots
![Color Palette](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss1.png)
![Font Selection](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss2.png)
![Font Styles](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss3.png)
![Summary](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss4.png)
![Result](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss5.png)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/yourusername/figma-design-system-generator/issues) to report bugs or request features.

---

<a name="turkish"></a>

# 🎨 Design System Generator

**[🇺🇸 English](#english)** | 🇹🇷 **Türkçe**

Birkaç adımda kapsamlı design sistemleri, renk paletleri ve tipografi stilleri otomatik olarak oluşturan güçlü bir Figma eklentisi.

## ✨ Özellikler

- 🎨 **Akıllı Renk Paleti Oluşturma**: Her renk için 11'li palet (5 koyu + orijinal + 5 açık ton)
- 📝 **Tipografi Sistemi**: Özelleştirilebilir font ağırlıklarıyla H1-H6 başlıkları ve paragraf stilleri
- 🌍 **Çok Dil Desteği**: İngilizce ve Türkçe dillerinde kullanılabilir
- 🎯 **Font Stili Özelleştirmesi**: Farklı metin kategorileri için özel font ağırlıkları seçimi
- 🚀 **Otomatik Stil Oluşturma**: Tüm renkler ve tipografi otomatik olarak Figma stillerine eklenir
- 💾 **Renk İsimlendirmesi**: Özel renk isimleri ile organize stil yapısı
- 🔧 **Kolay Kurulum**: Sezgisel adım adım arayüz

## 🛠️ Kurulum

1. **Eklentiyi İndirin**

   ```bash
   git clone https://github.com/kullaniciadi/figma-design-system-generator.git
   cd figma-design-system-generator
   ```

2. **Bağımlılıkları Yükleyin**

   ```bash
   npm install
   ```

3. **Eklentiyi Derleyin** (TypeScript kullanıyorsanız)

   ```bash
   npm run build
   ```

4. **Figma'ya Yükleyin**
   - Figma'yı açın
   - `Plugins` → `Development` → `Import plugin from manifest...` yolunu izleyin
   - Bu projeden `manifest.json` dosyasını seçin

## 🚀 Kullanım

### Adım 1: Dil Seçimi

- Tercih ettiğiniz dili seçin (İngilizce veya Türkçe)
- Tüm arayüz seçiminize göre uyarlanacak

### Adım 2: Renk Paleti

- Renk seçici veya hex kodları kullanarak marka renklerinizi ekleyin
- Her rengi isimlendirin (örn: "Primary", "Secondary", "Accent")
- İhtiyaç kadar renk ekleyin

### Adım 3: Font Seçimi

- Mevcut Figma fontları arasında gezinin ve arama yapın
- İstediğiniz font ailesini seçin

### Adım 4: Font Stilleri

- Üç kategori için font ağırlıklarını seçin:
  - **Başlıklar (H1-H6)**: Başlık stilleri için ağırlıklar seçin
  - **Paragraph Regular**: Gövde metni için ağırlıklar seçin
  - **Paragraph Small**: Küçük metin için ağırlıklar seçin

### Adım 5: İnceleme ve Oluşturma

- Seçimlerinizi gözden geçirin
- Her şeyi otomatik olarak oluşturmak için "Design System Oluştur"a tıklayın

## 📋 Neler Oluşturulur

### Renk Stilleri

- **Renk başına 11 ton**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Organize isimlendirme**: `Primary/primary-500`, `Secondary/secondary-300`, vb.
- **Akıllı metin renkleri**: Arka plan parlaklığına göre otomatik siyah/beyaz metin

### Tipografi Stilleri

- Seçilen font ağırlıklarıyla **H1-H6 başlık stilleri**
- Seçilen ağırlıklarla **Paragraph Regular** stilleri
- Seçilen ağırlıklarla **Paragraph Small** stilleri
- **Organize isimlendirme**: `FontFamily/H1 Bold`, `FontFamily/P Regular Medium`, vb.

## 🔧 Teknik Detaylar

### Dosya Yapısı

```
figma-design-system-generator/
├── manifest.json          # Figma eklenti manifestosu
├── code.ts               # Eklenti mantığı (TypeScript)
├── code.js               # Derlenmiş JavaScript
├── ui.html               # Eklenti arayüzü
├── package.json          # Bağımlılıklar
├── tsconfig.json         # TypeScript yapılandırması
└── README.md             # Dokümantasyon
```

### Önemli Özellik Uygulamaları

- **Güçlü Font Yükleme**: Mevcut olmayan fontlar için yedek sistem
- **Dinamik Renk Oluşturma**: Matematiksel ton hesaplaması
- **Çok Dil Sistemi**: Komple çeviri altyapısı
- **Hata Yönetimi**: Kapsamlı doğrulama ve kullanıcı geri bildirimi

## Ekran Görüntüleri
![Color Palette](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss1.png)
![Font Selection](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss2.png)
![Font Styles](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss3.png)
![Summary](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss4.png)
![Result](https://raw.githubusercontent.com/enesmuzaffer22/Figma-Desing-System-Generator-Plugin/refs/heads/main/ss5.png)

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik ekle'`)
4. Branch'e push edin (`git push origin feature/harika-ozellik`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🐛 Hata Raporları ve Özellik İstekleri

Hata bildirmek veya özellik istemek için [GitHub Issues](https://github.com/kullaniciadi/figma-design-system-generator/issues) kullanın.

---

## 👨‍💻 Geliştirici

Bu eklenti, modern design sistemleri oluşturma ihtiyacını karşılamak için geliştirilmiştir. Figma'nın güçlü API'sini kullanarak manuel iş yükünü azaltır ve tutarlı design sistemleri oluşturur.

**Keyifli tasarımlar! 🎨**
