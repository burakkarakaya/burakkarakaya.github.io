# Ürün Detay Sayfası – HTML Prototip

## Amaç

Bu çalışma Shopify geliştirmesi değildir.

İlk aşamada yalnızca müşteri onayına sunulacak **statik HTML + CSS + minimal JS prototip** hazırlanacaktır.

Herhangi bir backend, Shopify Liquid veya metafield yapısı kullanılmayacaktır.

Amaç:

- Yüksek kaliteli UI/UX prototip
- Satın alma odaklı ürün sayfası tasarımı
- Modern, premium e-ticaret deneyimi

---

## Referans

UX referansı:

https://www.ohmefoods.com/collections/freeze-dried-fruits/products/freeze-dried-mangoes

Bu site KOPYALANMAYACAKTIR.

Sadece:

- içerik akışı
- bölüm sıralaması
- e-ticaret UX yaklaşımı

referans alınacaktır.

---

## Mevcut UI Sistemi

Aşağıdaki sayfalar zaten tasarlanmıştır:

- Anasayfa
- Ürün Listeleme (Collection)
- Tarifler

Ürün detay sayfası:

- aynı renk paleti
- aynı tipografi
- aynı spacing sistemi
- aynı buton tasarımları
- aynı kart yapısı
- aynı border radius
- aynı görsel dili

kullanmalıdır.

Kullanıcı sayfalar arasında geçiş yaptığını hissetmemelidir.

---

## Ürün Kapsamı

İlk aşama:

- Kurutulmuş meyveler

Gelecek aşama:

- Jelibon
- Kurabiye
- Popcorn
- Granola
- Hediye kutuları
- Diğer atıştırmalıklar

Bu nedenle tasarım:

👉 ÜRÜN TİPİ BAĞIMSIZ (category-agnostic) olmalıdır

---

## Genel Tasarım Hedefi

Sayfa:

- modern
- premium
- ferah
- minimal
- güven veren
- satış odaklı

olmalıdır.

Boşluk kullanımı güçlü olmalıdır.

Görsel odaklı olmalıdır.

---

## Sayfa Yapısı

### 1. Üst Alan (Hero Section)

Sol:

- Sticky ürün görsel galerisi
- Zoom destekli görseller
- Varyanta göre görsel değişimi (simülasyon olabilir)

Sağ:

- Ürün adı
- Kısa alt başlık
- Fiyat
- Varyant seçimi (gramaj vb.)
- Adet seçimi
- Sepete ekle butonu
- Hızlı satın al butonu

---

### 2. Güven İkonları

Kart yapısı:

Örnekler:

- %100 Doğal
- Koruyucu İçermez
- İlave Şeker Yok
- Vegan
- Glutensiz

Tamamı tekrar kullanılabilir olmalıdır.

---

### 3. Kısa Açıklama

2–3 satırlık güçlü ürün özeti.

---

### 4. Ürün İçeriği

Büyük tipografi ile sade gösterim.

Örnek:

- %100 Mango

veya

- Elma
- Tarçın

veya

- Mısır
- Tuz

Boşsa gizlenmeli.

---

### 5. Neden Bu Ürün?

Feature kartları:

- Doğal içerik
- Yoğun aroma
- Sağlıklı atıştırmalık
- Pratik kullanım
- Günlük tüketime uygun

---

### 6. Nasıl Tüketilir?

Kullanım senaryoları:

- Kahvaltı
- Ara öğün
- Ofis
- Spor sonrası
- Film gecesi
- Yolculuk

---

### 7. Ürün Hikayesi

Marka hikayesini anlatan alan.

Duygusal ama abartısız olmalı.

---

### 8. Üretim Süreci

Timeline tasarımı:

Örnek:

Hasat → Yıkama → Dilimleme → Kurutma → Paketleme

Her adım görsel + başlık içerebilir.

---

### 9. Saklama Bilgisi

Accordion yapı:

- Nasıl saklanır?
- Ne kadar dayanır?
- Açıldıktan sonra kullanım

---

### 10. Kargo Bilgisi

Accordion yapı

---

### 11. SSS

Accordion

- Ürün doğal mı?
- Şeker içeriyor mu?
- Çocuklar tüketebilir mi?
- Vegan mı?

---

### 12. Tarifler (Opsiyonel)

İlgili tarif kartları.

Boşsa gizlenir.

---

### 13. Yorumlar

Gerçek kullanıcı yorumu hissi veren alan.

---

### 14. Benzer Ürünler

Grid yapı

---

## UI / UX Kuralları

- Desktop: Sticky gallery + sticky add to cart
- Mobile: Sticky bottom add to cart
- Smooth scroll animasyonları
- Hafif hover efektleri
- Görsel zoom desteği
- Lazy load görseller
- Minimal JS kullanımı
- Performans öncelikli yapı

---

## Responsive Davranış

Desktop:

- 2 kolon layout

Mobile:

- tek kolon
- stack edilmiş bölümler

---

## Tasarım Prensipleri

- Bol whitespace
- Temiz grid yapısı
- Premium e-commerce hissi
- Görsel odaklı anlatım
- Satın alma davranışını kolaylaştırma

---

## Kritik Amaç

Bu sayfa sadece ürün göstermek için değil:

👉 kullanıcıyı satın almaya yönlendirmek için tasarlanmalıdır

Bilgi + güven + iştah + sadelik dengesi kurulmalıdır.

---

## Gelecek Uyumluluk

Bu sayfa:

- Kurutulmuş meyve
- Jelibon
- Kurabiye
- Popcorn
- Granola
- Hediye kutusu

gibi tüm ürün tiplerine uyumlu olmalıdır.

Hiçbir yerde ürünün sadece “meyve” olduğu varsayılmamalıdır.

---

## Çıktı Beklentisi

Claude Code aşağıdakileri üretmelidir:

- Tek bir product-detail.html
- İlgili CSS (ayrı dosya veya embedded)
- Gerekirse minimal JS (accordion, gallery, zoom)
- Mobil + desktop responsive yapı
- Production seviyesine yakın UI prototip



# Conversion UX (Satış Artıran Ek Stratejiler)

Bu bölüm tasarımın içine entegre edilmelidir.
Amaç: Sadece ürün göstermek değil, satın alma kararını hızlandırmak.

---

## 1. Sticky Add to Cart (Desktop + Mobile)

### Desktop

Sağ panel scroll ile birlikte aşağı inerken:

- Ürün adı
- Fiyat
- Varyant
- Sepete ekle

her zaman görünür kalmalıdır.

---

### Mobile

Alt sabit bar:

- Fiyat
- “Sepete Ekle” butonu

Sayfa scroll ettikçe kaybolmaz.

👉 Bu alan en kritik conversion noktasıdır.

---

## 2. Scroll Trigger Mini CTA’lar

Sayfa aşağı indikçe küçük hatırlatmalar görünür:

Örnek:

- “%100 doğal içerik – şimdi dene”
- “Katkısız atıştırmalık seçeneklerini keşfet”
- “Stoklar sınırlı olabilir”

Bu CTA’lar agresif değil, yumuşak olmalıdır.

---

## 3. Micro-Trust Layer (Güven Katmanı)

“Sepete Ekle” butonunun hemen altında küçük satır:

Örnek:

- 🚚 Aynı gün kargo
- 🔒 Güvenli ödeme
- 🌿 %100 doğal içerik

👉 Kullanıcı “risk algısını” düşürür.

---

## 4. Bundle / Paket Mantığı (Çok Önemli)

Ürün detayında ekstra alan:

### “Daha çok al, daha çok kazan”

Kartlar:

- 1 adet
- 3’lü paket (indirimli)
- 5’li aile paketi

Eğer indirim yoksa bile:

👉 “En çok tercih edilen paket” etiketi eklenebilir.

---

## 5. “İlk 3 Saniye Etkisi” Alanı

Hero bölümünde sadece görsel değil:

- kısa güçlü mesaj
- tek cümle değer önerisi

Örnek:

“Gerçek meyveden, gerçek lezzet.”

veya

“Abur cubur değil, gerçek atıştırmalık.”

👉 Kullanıcı daha scroll etmeden ürünü anlamalı.

---

## 6. FOMO (Hafif Kullanım)

Agresif olmayan stok / talep göstergesi:

Örnek:

- “Bugün 128 kişi bu ürünü inceledi”
- “Sınırlı üretim partisi”

👉 Manipülatif değil, bilgilendirici olmalı.

---

## 7. “Before Purchase Confidence Block”

Sepete eklemeden hemen önce küçük bölüm:

Başlık:
“Bu ürünü gönül rahatlığıyla tüketebilirsin”

Altı:

- katkı maddesi yok
- rafine şeker yok
- koruyucu yok

---

## 8. Scroll Storytelling (Çok Önemli)

Sayfa sırası şu psikolojiyi takip etmeli:

1. Gör → (ürün)
2. Anla → (içerik)
3. Güven → (sertifika / süreç)
4. Hayal et → (kullanım alanları)
5. İkna ol → (yorumlar)
6. Satın al → (CTA)

👉 Sadece bilgi değil, hikaye akışı olmalı.

---

## 9. Görsel Satış Gücü

Görseller sadece ürün fotoğrafı değil:

- kullanım anı (yoğurt içinde vs.)
- close-up texture
- lifestyle sahne

👉 Her 2-3 scroll’da bir “iştah açıcı görsel” olmalı.

---

## 10. “Exit Intent” Yumuşak Hatırlatma (opsiyonel)

Kullanıcı sayfadan çıkarken:

- “Henüz karar vermedin mi?”
- “En çok tercih edilen ürünleri incele”

Ama agresif popup değil, hafif banner.

---

## 11. Karşılaştırma Bloğu (Güçlü satış aracı)

Basit tablo:

| Biz | Market Atıştırmalığı |
|----|---------------------|
| %100 doğal | katkı maddesi |
| ilave şeker yok | şeker ekli |
| koruyucu yok | koruyucu var |

---

## 12. “One Line Decision Maker”

Sayfanın bir yerinde tek cümle:

👉 “Bu ürün, sağlıklı atıştırmalık arayanlar için tasarlandı.”

Bu cümle karar sürecini hızlandırır.

---

## 13. CTA Yoğunluk Dengesi

Sayfada:

- Çok fazla buton olmayacak
- Ama doğru yerlerde tekrar edecek

Önerilen CTA noktaları:

- Hero
- Orta scroll
- Yorumlar sonrası
- Sayfa sonu

---

## 14. Nihai Amaç

Bu sayfa:

- bilgi vermek için değil
- ikna etmek için değil
- **karar vermeyi kolaylaştırmak için**

tasarlanmalıdır.

Kullanıcı düşünmemeli:

👉 “almalı mıyım?”

Bunun yerine:

👉 “hangi paketini alayım?”