Buatkan aplikasi mobile-first (max-width 430px, centered) bernama Ba-Yu (BelajarYuk) — platform sharing catatan belajar antar pelajar Indonesia. Aplikasi ini harus terasa seperti native mobile app dengan smooth transitions antar halaman.

Design System
Font: Lexend Deca (headings & UI) + Manrope (body text). Import dari Google Fonts.

Warna:

Primary: #5D5CE6 (indigo-purple utama untuk buttons, active states, navbar)
Secondary: #8B5CF6 (purple lebih terang untuk gradients, badges)
Accent: #FFD166 (kuning untuk gamifikasi, stars, highlights)
Dark: #24252C (teks utama)
Muted: #6E6A7C (teks secondary)
Background: #FAFAFA dengan decorative gradient blur circles (purple, blue, yellow, green) opacity rendah di background — mirip glassmorphism subtle
Card: white dengan rounded-2xl dan shadow-sm
Category Colors: Pink #F478B8, Orange #FF9142, Blue #0087FF, Yellow #FFD12E, Green #46F080
UI Style:

Rounded corners besar (16-24px) untuk cards dan buttons
Soft shadows (shadow-[0px_4px_32px_rgba(0,0,0,0.04)])
Bottom navigation bar dengan 5 tab (Home, Explore, Upload/+, Notifikasi, Profile) — tab aktif pakai primary color dengan FAB (floating action button) untuk Upload di tengah
Status bar area di top, cards dengan padding yang lega
Animasi menggunakan Motion (bukan Framer Motion) — PENTING: jangan animate borderColor dari Tailwind classes karena menyebabkan oklab/rgba(NaN) errors. Gunakan inline rgba styles atau CSS transition via onMouseEnter/onMouseLeave sebagai gantinya.
Halaman & Fitur
1. Splash/Onboarding Screen
3 slides dengan ilustrasi (gunakan gambar dari Unsplash), colorful dots decorations, gradient blur circles di background
Judul: "Bagikan Catatanmu", "Belajar Dari Yang Terbaik", "Raih Achievement"
Tombol "Mulai Sekarang" dengan gradient primary → secondary, rounded-full, shadow glow
2. Login & Register
Clean form dengan floating labels
Social login buttons (Google, Apple)
Tab switch antara Login/Register
Register: pilih role (Pelajar/Pakar), nama, email, password, jenjang pendidikan (SD/SMP/SMA/Kuliah)
3. Home Screen (Pelajar)
Header: avatar, "Halo, [nama]!", notification bell dengan badge dot
Banner card gradient primary: statistik singkat (catatan dibaca, XP points, streak hari)
Section "Catatan Terbaru" — horizontal scroll cards dengan:
Thumbnail (gradient + category icon overlay)
Judul catatan, mata pelajaran tag, author name + avatar kecil
Badge "Tervalidasi ✓" jika sudah divalidasi pakar (hijau)
Stats: views & likes
Section "Mata Pelajaran Populer" — grid 2 kolom dengan icon + nama mapel + jumlah catatan
Section "Top Contributors" — horizontal scroll avatar circles dengan nama + XP badge
4. Explore Page
Search bar sticky di top dengan icon search
Filter chips horizontal scroll: Jenjang (SD/SMP/SMA/Kuliah), Kelas (1-12), Semester (1/2), Mata Pelajaran, Sort (Terbaru/Populer/Rating)
Masonry-style grid catatan cards (2 kolom)
Setiap card: thumbnail, judul, author, rating stars, validation badge, view count
Pull-to-refresh animation style
Empty state dengan ilustrasi jika tidak ada hasil
5. Detail Catatan
Header: tombol back, judul, share & bookmark icons
Author info bar: avatar, nama, badge role (Pelajar biasa / Pakar Terverifikasi ✓ dengan purple badge)
Metadata: mata pelajaran, jenjang, kelas, semester, tanggal upload
Preview area catatan (mock dengan gambar placeholder yang representatif)
Validation section: status (Menunggu/Divalidasi/Ditolak), feedback dari pakar jika ada
Stats bar: views, likes, comments, bookmarks
Action buttons: Like (heart), Bookmark, Share, Report
Comment section: input field, list comments dengan avatar + nama + waktu + text
Sidebar section "Catatan Terkait" — cards kecil dengan thumbnail, judul, author
6. Upload Catatan (dari FAB button)
Step form (3 steps dengan progress indicator):
Step 1: Judul, Deskripsi, pilih Mata Pelajaran (dropdown searchable)
Step 2: Jenjang, Kelas, Semester, Tags (input + chips)
Step 3: Upload file area (drag & drop style untuk mobile, accept PDF/Image), Preview
Tombol "Publish" dengan konfirmasi
7. Profile Screen
Cover photo area + avatar besar + nama + role badge
Stats row: Catatan Diupload | Followers | Following | XP Points
Achievement/Badge section: grid badges yang sudah diraih (icons + nama achievement) dengan yang belum unlock greyed out
Tab: Catatan Saya | Bookmarks | Activity
Edit Profile button
Level/XP progress bar dengan current level dan progress ke level berikutnya
8. Dashboard Pakar (jika role = Pakar Terverifikasi)
Berbeda dari home pelajar biasa
Section "Menunggu Validasi" — list catatan yang perlu direview
Setiap item: judul, author, jenjang, mapel, tanggal submit, tombol "Review"
Review screen: preview catatan, rating (1-5 stars), textarea feedback, tombol Approve/Tolak/Revisi
Stats: Total divalidasi, Rata-rata rating yang diberikan
9. Dashboard Admin
Overview cards: Total Users, Total Catatan, Total Reports, Catatan Pending
User Management list: search + filter by role, setiap item ada nama + role + status + actions (ban/unban/promote)
Laporan masuk: list reports dengan detail + action resolve
Charts/Graphs sederhana (gunakan recharts): Upload per minggu, User growth
10. Notification Screen
Grouped by tanggal (Hari Ini, Kemarin, Minggu Ini)
Types: catatan divalidasi, comment baru, follower baru, achievement unlocked, laporan diproses
Unread indicator dot
Swipe to dismiss style
11. Gamifikasi
XP diberikan untuk: upload catatan (+50 XP), catatan divalidasi (+100 XP), comment (+10 XP), streak harian (+20 XP)
Levels: Pemula, Pelajar Aktif, Kontributor, Master, Legend
Badges: "First Upload", "10 Catatan", "Pakar Favorit", "Streak 7 Hari", dll
Leaderboard: Top users per minggu/bulan dengan ranking, avatar, nama, XP
Navigasi
Gunakan React Router dengan halaman-halaman:

/ — Splash/Onboarding
/login — Login/Register
/home — Home (dengan bottom nav)
/explore — Explore
/upload — Upload catatan
/note/:id — Detail catatan
/profile — Profile sendiri
/profile/:id — Profile user lain
/notifications — Notifikasi
/dashboard/pakar — Dashboard Pakar
/dashboard/admin — Admin Dashboard
/leaderboard — Leaderboard gamifikasi
Data
Gunakan mock data yang lengkap dan realistis (nama-nama Indonesia, mata pelajaran Indonesia seperti Matematika, Bahasa Indonesia, IPA, IPS, Fisika, Kimia, Biologi, Sejarah, Ekonomi, dll). Minimal 10-15 catatan dummy, 5-8 users dummy dengan berbagai role.

Penting
Mobile-first, max-width 430px centered di layar, dengan background abu-abu di sisi luar
Semua gambar menggunakan Unsplash (jangan hallucinate URL)
Smooth page transitions dengan Motion (import dari 'motion/react')
Bottom navigation persistent di halaman utama (home, explore, notifications, profile)
Responsive text — jangan terlalu kecil di mobile
Gunakan lucide-react untuk icons