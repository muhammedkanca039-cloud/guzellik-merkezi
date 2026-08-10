# ✨ Lumière Beauty & Spa | Güzellik Merkezi Full-Stack Web Uygulaması

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Modern, şık, duyarlı (responsive) ve tam donanımlı Güzellik & Estetik Salonu web uygulaması. Cilt bakımı, buz lazer epilasyon, kalıcı makyaj ve selülit terapileri için online randevu alma, hizmet kataloğu filtreleme ve yönetim paneli sunar.

> 🔗 **Canlı Demo / Live Site**: [https://guzellik-merkezi-one.vercel.app](https://guzellik-merkezi-one.vercel.app)

---

## 📸 Ekran Görüntüleri ve Önizleme

- **Anasayfa**: Lüks hero alanı, öne çıkan bakımlar, danışan yorumları, hijyen standartları ve çalışma saatleri.
- **Hizmetler**: Kategorize edilmiş hizmetler, canlı arama ve fiyat listesi.
- **Online Randevu**: Hizmet seçimi, tarih/saat belirleme ve iletişim bilgileri içeren 3 adımlı sihirbaz.
- **Yönetim Paneli (/admin)**: Randevu durum kontrolü (`Onaylandı`, `Beklemede`, `İptal`), hizmet ekleme/düzenleme ve ciro istatistikleri.

---

## 🛠️ Teknolojiler ve Mimari

| Kategori | Teknoloji / Kütüphane |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router, Server Actions & API Routes) |
| **Dil** | TypeScript |
| **Stil & Tasarım** | Tailwind CSS + Custom Soft Luxury Animations & Glassmorphism |
| **Veritabanı & ORM** | SQLite + Prisma ORM |
| **İkonlar** | Lucide React Icons |
| **Tasarım Konsepti** | Rose-Gold & Warm Amber Lüks Estetik Tema |

---

## 🚀 Öne Çıkan Özellikler

### 📱 1. Kullanıcı Arayüzü (Müşteri Modülü)
- **Anasayfa (`/`)**: Işıltılı hero alanı, istatistik sayacı, öne çıkan hizmet kartları ve müşteri geri bildirimleri.
- **Hizmet Kataloğu (`/hizmetler`)**:
  - Kategorilere göre filtreleme (*Cilt Bakımı, Lazer Epilasyon, Kalıcı Makyaj, Protez Tırnak, Bölgesel İncelme, Masaj & Spa*).
  - Canlı arama ve süre/fiyat detayları.
- **Online Randevu Sistemi (`/randevu`)**:
  - Hizmet seçimi → Tarih & Saat Dilimi seçimi → İletişim Bilgileri.
  - Randevu oluşturulduğunda anında görsel makbuz/onay ekranı.

### 🛡️ 2. Admin Yönetim Paneli (`/admin`)
- **İstatistik Metrikleri**: Toplam randevu, bekleyen, onaylanan, iptal edilen ve onaylanan toplam ciro hesabı.
- **Randevu Yönetimi**:
  - Randevuları duruma ve müşteri adına göre arama/filtreleme.
  - Tek tıkla durum değiştirme (*Beklemede ➔ Onaylandı / İptal*) veya silme.
- **Hizmet Yönetimi**:
  - Modal ile yeni hizmet ve fiyat tanımlama.
  - Hizmeti pasife/aktife alma ve silme.

---

## 🔌 API Rotaları

```text
GET    /api/services          # Aktif veya tüm hizmetleri getirir
POST   /api/services          # Yeni hizmet oluşturur
PUT    /api/services/[id]     # Hizmet detayını/durumunu günceller
DELETE /api/services/[id]     # Hizmeti siler

GET    /api/appointments      # Tüm randevuları hizmet detaylarıyla getirir
POST   /api/appointments      # Yeni randevu oluşturur
PATCH  /api/appointments/[id] # Randevu durumunu (Onaylandı/İptal/Beklemede) günceller
DELETE /api/appointments/[id] # Randevuyu siler
```

---

## ⚙️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18+)
- npm veya yarn

### Adım 1: Depoyu Klonlayın
```bash
git clone https://github.com/muhammedkanca039-cloud/guzellik-merkezi.git
cd guzellik-merkezi
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Veritabanını Hazırlayın ve Örnek Verileri Yükleyin
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Adım 4: Geliştirici Sunucusunu Başlatın
```bash
npm run dev
```

Uygulamanız **`http://localhost:3000`** adresinde çalışmaya başlayacaktır!

---

## 📂 Proje Dizin Yapısı

```text
guzellik-merkezi/
├── prisma/
│   ├── schema.prisma       # SQLite & Prisma modelleri (Service, Appointment)
│   └── seed.ts             # Örnek hizmet ve randevu yükleme betiği
├── src/
│   ├── app/
│   │   ├── admin/          # Admin paneli (Randevu & Hizmet yönetimi)
│   │   ├── hizmetler/      # Hizmet kataloğu & arama
│   │   ├── randevu/        # 3 adımlı online randevu sihirbazı
│   │   ├── api/            # App Router REST API rotaları
│   │   ├── globals.css     # Cam efekti (glassmorphism) ve renk teması
│   │   └── page.tsx        # Anasayfa
│   ├── components/         # Navbar, Footer, ServiceCard vb.
│   └── lib/
│       └── prisma.ts       # Singleton PrismaClient
├── package.json
└── tailwind.config.ts
```

---

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
