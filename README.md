<p align="center">
  <img src="./public/logo.svg" width="180" alt="Ba-Yu Logo">
</p>

<h1 align="center">Ba-Yu (Belajar Yuk) - Web Platform</h1>

<p align="center">
  <strong>Platform Berbagi Catatan dan Ilmu Pengetahuan</strong><br>
  Proyek pembelajaran kolaboratif (PJBL) yang dibangun dengan arsitektur modern SPA dan backend yang solid.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

---

## 🌟 Tentang Proyek

**Ba-Yu** adalah platform berbasis web untuk berbagi catatan pelajaran, berdiskusi, dan membagikan ilmu pengetahuan. Platform ini mempertemukan siswa reguler dengan para pakar tersertifikasi dalam sebuah komunitas yang suportif. 

Berawal dari prototipe sederhana, kini Ba-Yu telah berkembang menjadi aplikasi skala produksi dengan arsitektur modern, didukung dengan i18n (lebih dari 40 bahasa) dan sistem verifikasi pengguna yang aman.

## 🚀 Fitur Utama

- **SPA Architecture**: Navigasi ultra-cepat menggunakan React Router yang diintegrasikan langsung di dalam Laravel lewat Vite.
- **Sistem Autentikasi & Otorisasi**: Login aman menggunakan Laravel Sanctum.
- **Login OAuth (Google)**: Memudahkan pengguna masuk dan mendaftar dengan cepat hanya dengan satu klik menggunakan akun Google.
- **Cloudinary Integration**: Penyimpanan dan pengoptimalan *file* media gambar (seperti avatar dan *cover* catatan) secara *cloud* menggunakan Cloudinary.
- **Multibahasa (i18n)**: Dukungan terjemahan antarmuka dan notifikasi email ke lebih dari 40 bahasa.
- **Sertifikasi Pakar**: Pengguna dapat mengunggah dokumen kredensial untuk di-*review* oleh Admin dan mendapatkan lencana *Pakar*.
- **Admin Dashboard**: Panel kontrol terpusat untuk memantau catatan, pengguna, laporan moderasi, hingga ekspor data komprehensif.
- **Manajemen Catatan**: Fitur untuk membuat, membaca, menyukai (like), menyimpan (bookmark), dan memberikan ulasan pada catatan pengguna lain.
- **Dark/Light Mode**: Dukungan antarmuka gelap dan terang secara *native*.

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **Database**: MongoDB (via `mongodb/laravel-mongodb`)
- **API Security**: Laravel Sanctum

### Frontend
- **Library Utama**: React 19 + React Router v7
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Build Tool**: Vite

### Infrastruktur
- **Containerization**: Docker (Apache + PHP 8.3)
- **Deployment Ready**: Siap ditarik ke layanan seperti Render, Railway, dsb.

## 💻 Instalasi Lokal

Jika Anda ingin mengembangkan atau menjalankan aplikasi ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat
- PHP 8.3 atau lebih baru
- Composer
- Node.js (LTS version)
- MongoDB Database (Local atau Atlas)

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
   Salin file env dan atur koneksi MongoDB Anda.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. **Jalankan Aplikasi**
   Buka 2 terminal terpisah. Terminal pertama untuk backend, terminal kedua untuk frontend (Vite).
   ```bash
   # Terminal 1
   php artisan serve
   
   # Terminal 2
   npm run dev
   ```

## 🐳 Deployment (Production)

Proyek ini sudah dilengkapi dengan `Dockerfile` tingkat *production* berbasis Apache. Untuk mem-*build* dan menjalankannya:

```bash
docker build -t bayu-web .
docker run -p 8000:8000 bayu-web
```
*Catatan: Port akan secara otomatis menyesuaikan nilai variabel environment `$PORT` pada layanan hosting.*

## 📝 Lisensi

Hak cipta dilindungi. Proyek ini dibangun sebagai tugas PJBL dan hak miliknya berada pada kontributor utama repositori ini.
