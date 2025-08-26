# Yapar Bilişim - Component Yapısı

Bu proje, modern web geliştirme prensiplerine uygun olarak component tabanlı bir yapıya dönüştürülmüştür.

## 📁 Proje Yapısı

```
lab/ekollog/
├── components/                 # Component dosyaları
│   ├── header.html           # Header component'ı
│   ├── main-content.html     # Ana içerik component'ı
│   └── footer.html           # Footer component'ı
├── assets/                    # Statik dosyalar
│   ├── css/                  # CSS dosyaları
│   ├── js/                   # JavaScript dosyaları
│   │   └── component-loader.js # Component yükleyici
│   └── images/               # Görseller
├── index.html                 # Ana HTML dosyası
└── README.md                  # Bu dosya
```

## 🧩 Component'lar

### 1. Header Component (`components/header.html`)
- Navigasyon menüsü
- Logo animasyonu
- Teklif talep formu
- Mobil header
- Dark/light mode toggle
- Scroll to top butonu

### 2. Main Content Component (`components/main-content.html`)
- Ana slider
- Kurumsal bilgiler
- Hizmet kartları
- Parallax efektleri
- Video slider
- İkiye bölünmüş görsel bölümü

### 3. Footer Component (`components/footer.html`)
- Kariyer fırsatları
- Footer menüleri
- Newsletter kayıt formu
- Sosyal medya linkleri
- Webchat widget'ı

## 🚀 Component Loader

`assets/js/component-loader.js` dosyası component'ları dinamik olarak yükler ve gerekli JavaScript fonksiyonlarını başlatır.

### Özellikler:
- Asenkron component yükleme
- Event listener'ları otomatik başlatma
- Swiper slider'ları otomatik initialize etme
- Parallax efektlerini yönetme
- Hata yönetimi ve fallback mesajları

## 🔧 Kullanım

### Yeni Component Ekleme:
1. `components/` klasörüne yeni HTML dosyası ekleyin
2. `component-loader.js` dosyasında `loadAllComponents()` metoduna ekleyin
3. Gerekli script'leri `initializeComponent()` metodunda tanımlayın

### Component Güncelleme:
- Component dosyasını düzenleyin
- Sayfa yenilendiğinde otomatik olarak güncellenecektir

## 📱 Responsive Tasarım

Tüm component'lar Tailwind CSS kullanılarak responsive olarak tasarlanmıştır:
- Mobil öncelikli tasarım
- Tablet ve desktop için optimize edilmiş
- Touch-friendly etkileşimler

## 🎨 CSS Framework

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Proje özel stilleri
- **Responsive CSS**: Mobil uyumlu tasarım

## 📜 JavaScript Kütüphaneleri

- **Swiper.js**: Slider ve carousel
- **GSAP**: Animasyonlar
- **Lenis**: Smooth scrolling
- **Tabler Icons**: İkon seti

## 🚀 Geliştirme

### Yerel Geliştirme:
1. Projeyi bir web sunucusunda çalıştırın (CORS hatalarını önlemek için)
2. Component'ları düzenleyin
3. Tarayıcıda test edin

### Component Test Etme:
- Her component'ı ayrı ayrı test edin
- Responsive tasarımı kontrol edin
- JavaScript fonksiyonlarını doğrulayın

## 🔍 Hata Ayıklama

Component yüklenirken hata oluşursa:
1. Tarayıcı konsolunu kontrol edin
2. Network sekmesinde component dosyalarının yüklenip yüklenmediğini kontrol edin
3. Component dosya yollarının doğru olduğundan emin olun

## 📝 Notlar

- Component'lar HTML5 standartlarına uygun olarak yazılmıştır
- SEO dostu semantic HTML kullanılmıştır
- Accessibility (erişilebilirlik) standartları gözetilmiştir
- Performance optimizasyonu için lazy loading kullanılmıştır

## 🤝 Katkıda Bulunma

1. Component'ları düzenlerken mevcut yapıyı koruyun
2. CSS class'larını tutarlı tutun
3. JavaScript fonksiyonlarını component loader'a ekleyin
4. Responsive tasarımı test edin

## 📞 İletişim

Yapar Bilişim - IT Proje ve Danışmanlık Hizmetleri
- Website: [yaparbilisim.com](https://www.yaparbilisim.com)
- Email: info@yaparbilisim.com 