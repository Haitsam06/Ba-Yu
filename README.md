<p align="center">
  <img src="./public/logo.svg" width="180" alt="Ba-Yu Logo">
</p>

<h1 align="center">Ba-Yu (Belajar Yuk) - Web & Mobile Platform</h1>

<p align="center">
  <strong>Platform Berbagi Catatan dan Ilmu Pengetahuan</strong><br>
  Proyek pembelajaran kolaboratif (PJBL) yang dibangun dengan arsitektur modern SPA, backend yang solid, dan aplikasi mobile native.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

---

## 🌟 Tentang Proyek

**Ba-Yu** adalah platform lintas perangkat (Web dan Android) untuk berbagi catatan pelajaran, berdiskusi, dan membagikan ilmu pengetahuan. Platform ini mempertemukan siswa reguler dengan para pakar tersertifikasi dalam sebuah komunitas yang suportif. 

Berawal dari prototipe web sederhana, kini Ba-Yu telah berkembang menjadi aplikasi skala produksi dengan arsitektur modern, didukung dengan i18n (lebih dari 40 bahasa), sistem verifikasi pengguna yang aman, dan dibungkus menjadi aplikasi Android (*Native Mobile App*).

## 🚀 Fitur Utama

- **SPA & Mobile Architecture**: Navigasi ultra-cepat menggunakan React Router yang diintegrasikan langsung di dalam Laravel lewat Vite, dan dibungkus menjadi APK Android menggunakan **Capacitor JS**.
- **Sistem Autentikasi & Otorisasi**: Login aman menggunakan Laravel Sanctum.
- **Native & Web OAuth (Google)**: Memudahkan pengguna masuk dan mendaftar dengan cepat hanya dengan satu klik menggunakan akun Google. Terintegrasi mulus menggunakan **Firebase Authentication** untuk pop-up *native* di Android, dan Socialite untuk versi Web.
- **Push Notifications (FCM)**: Dukungan notifikasi *real-time* dan *background* menggunakan **Firebase Cloud Messaging** untuk aplikasi Android.
- **Akses Media & Kamera Native**: Pengalaman unggah gambar yang terintegrasi dengan galeri dan kamera bawaan Android melalui *Permissions* WebView.
- **Cloudinary Integration**: Penyimpanan dan pengoptimalan *file* media gambar secara *cloud*.
- **Multibahasa (i18n)**: Dukungan terjemahan antarmuka ke lebih dari 40 bahasa.
- **Sertifikasi Pakar & Manajemen Catatan**: Sistem interaksi *social learning* komprehensif (like, bookmark, komentar).
- **Admin Dashboard**: Panel kontrol terpusat untuk memantau catatan, pengguna, laporan moderasi, hingga ekspor data komprehensif.
- **Manajemen Catatan**: Fitur untuk membuat, membaca, menyukai (like), menyimpan (bookmark), dan memberikan ulasan pada catatan pengguna lain.
- **Dark/Light Mode**: Dukungan antarmuka gelap dan terang secara *native*

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel v12.55.1 plugin v2.1.0
- **Database**: MongoDB & Cloudinary
- **API Security**: Laravel Sanctum

### Frontend
- **Library Utama**: React 19 + React Router v7
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Build Tool**: Vite

### Mobile (Android)
- **Framework**: Capacitor JS
- **BaaS**: Firebase (Auth & FCM)
- **Permissions**: `CAMERA`, `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`

## 💻 Instalasi Lokal

Jika Anda ingin mengembangkan atau menjalankan aplikasi ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat
- PHP 8.3 atau lebih baru
- Composer
- Node.js (LTS version)
- MongoDB Database (Local atau Atlas)
- Android Studio (opsional, untuk *build* APK)

### Langkah Instalasi
1. **Clone repository ini**
   ```bash
   git clone https://github.com/Haitsam06/Ba-Yu.git
   cd Ba-Yu
   ```
2. **Install dependensi Backend (PHP)**
   ```bash
   composer install
   ```
3. **Install dependensi Frontend (NPM)**
   ```bash
   npm install
   ```
4. **Konfigurasi Environment**
   Salin file env dan atur koneksi MongoDB serta URL Ngrok/Hosting.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. **Jalankan Aplikasi Web**
   Buka 2 terminal terpisah:
   ```bash
   php artisan serve
   npm run dev
   ```

## 📱 Build Aplikasi Android (Capacitor)

Proyek ini telah dikonfigurasi menggunakan Capacitor untuk *build* ke Android.
Pastikan *project* berada dalam *folder* terpisah atau menggunakan konfigurasi *capacitor.config.json* yang merujuk ke URL server yang aktif (misal via `ngrok`).

```bash
# Sinkronisasi web assets ke Android
npx cap sync android

# Menjalankan aplikasi langsung ke device yang terhubung
npx cap run android
```

## 🐳 Deployment (Production)

Proyek ini sudah dilengkapi dengan `Dockerfile` tingkat *production* berbasis Apache. Untuk mem-*build* dan menjalankannya:

```bash
docker build -t bayu-web .
docker run -p 8000:8000 bayu-web
```

## 📝 Lisensi

Hak cipta dilindungi. Proyek ini dibangun sebagai tugas PJBL dan hak miliknya berada pada kontributor utama repositori ini.
