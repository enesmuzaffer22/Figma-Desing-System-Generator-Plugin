# Design System Generator - Figma Plugin

Bu Figma plugin'i sayesinde birkaç adımda profesyonel design sistemi oluşturabilirsiniz.

## 🎨 Özellikler

- **Kolay Kullanım**: Sihirbaz tarzı kullanıcı arayüzü
- **Renk Paleti**: Her renk için otomatik 11'li palet (5 koyu + orijinal + 5 açık ton)
- **Tipografi Sistemi**: H1-H6 başlıkları ve paragraph stilleri
- **Otomatik Stil Ekleme**: Oluşturulan renkler ve fontlar otomatik olarak Figma stillerinize eklenir
- **Önizleme**: Oluşturulan tasarım sisteminin canlı önizlemesi

## 🚀 Kurulum

1. Bu klasörü Figma Desktop uygulamasında plugin olarak yükleyin
2. Plugins > Development > Import plugin from manifest seçin
3. `manifest.json` dosyasını seçin

## 📋 Geliştirme

### Gereksinimler

- Node.js
- TypeScript

### Kurulum

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch Mode (Geliştirme)

```bash
npm run watch
```

## 🎯 Kullanım

1. **Karşılama**: Plugin'i açın ve başlayın
2. **Renkler**: En az 1 renk ekleyin (istediğiniz kadar)
3. **Font Seçimi**: Figma'daki mevcut fontlardan birini seçin
4. **Özet**: Seçimlerinizi kontrol edin
5. **Oluştur**: Design sistemi otomatik olarak oluşturulur

## 📁 Dosya Yapısı

```
├── manifest.json      # Plugin konfigürasyonu
├── code.ts           # Ana plugin mantığı
├── ui.html          # Kullanıcı arayüzü
├── ui.js            # UI JavaScript kodu
├── package.json     # Proje bağımlılıkları
├── tsconfig.json    # TypeScript konfigürasyonu
└── README.md        # Bu dosya
```

## 🔧 Teknik Detaylar

### Renk Paleti Algoritması

- Her renk için HSL değerleri hesaplanır
- 5 koyu ton: Parlaklık %15'lik artışlarla azaltılır
- 5 açık ton: Parlaklık %15'lik artışlarla artırılır
- Sonuç: 11 tonlu renk paleti

### Typography Sistemi

- **H1-H6**: 48px'den 16px'e doğru azalan boyutlar
- **P Regular**: 16px, tüm font ağırlıkları
- **P Small**: 14px, tüm font ağırlıkları

### Otomatik Stil Ekleme

- Renk stilleri: "Color X - Shade Y" formatında
- Text stilleri: "H1", "H2", "P Regular Bold" formatında

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
