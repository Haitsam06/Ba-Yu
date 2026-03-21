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
Sistem Peran (Roles)
Ada 3 role user:

Pelajar (user biasa) — bisa upload catatan, comment, bookmark, like, report, dan request validasi ke pakar. Warna badge: blue #3b82f6
Pakar Terverifikasi — bisa melakukan semua yang pelajar bisa + memvalidasi catatan orang lain, memberikan feedback & rating. Ditandai badge amber/kuning ⭐ di samping nama. Warna badge: amber #f59e0b
Admin — mengelola users, reports, dan platform. Warna badge: red #ef4444
Sistem Catatan (PENTING — Baca Detail)
Apa itu "Catatan"?
Catatan adalah materi belajar yang dibuat & dibagikan oleh pelajar. Bisa berupa teks rich-text (dengan formatting: bold, italic, heading, list, highlight, code, insert gambar inline) atau kumpulan foto halaman catatan tulisan tangan.

Struktur Data Catatan
Setiap catatan memiliki properti berikut:

Judul (max 200 karakter)
Isi/Konten — rich text HTML (max 50.000 karakter) dengan support formatting (bold, italic, underline, heading 1-3, ordered/unordered list, highlight, code block, alignment, insert gambar)
Foto — opsional, bisa upload hingga 10 foto (max 5MB per foto) untuk catatan tipe foto (misal foto tulisan tangan)
Mata Pelajaran (Category) — dipilih dari daftar: Matematika, Bahasa Indonesia, IPA, IPS, Bahasa Inggris, Fisika, Kimia, Biologi, Sejarah, Ekonomi, Seni Budaya, dll. User juga bisa membuat mata pelajaran custom sendiri (tag baru).
Jenjang Pendidikan (Education Level) — SD (Kelas 1-6), SMP (Kelas 7-9), SMA/SMK (Kelas 10-12), Kuliah (Semester 1-8). Tiap jenjang punya set kelas berbeda.
Kelas — dipilih sesuai jenjang yang dipilih (contoh: pilih SMA → muncul Kelas 10, 11, 12)
Semester — Semester 1 atau Semester 2
Visibilitas — Public (semua orang bisa lihat) atau Private (hanya pembuat yang bisa lihat). Toggle switch.
Ajukan ke Pakar — Toggle untuk submit catatan ke antrian validasi pakar. Jika aktif, catatan masuk ke "Menunggu Validasi".
Lifecycle/Alur Catatan
[User Buat Catatan] → [Isi Form: Judul + Konten + Mapel + Jenjang + Kelas + Semester]
     ↓
[Pilih Visibilitas: Public/Private]
     ↓
[Opsional: Toggle "Ajukan ke Pakar" ON]
     ↓
[Publish] → Catatan Terpublish
     ↓
[Jika diajukan ke Pakar]:
     Status = "Menunggu Validasi" (pending) — badge kuning ⏳
     ↓
     Catatan muncul di Dashboard Pakar → Antrian Validasi
     ↓
     Pakar review → bisa:
       ✅ "Validasi" → Status = "Tervalidasi" (validated) — badge hijau ✅, +100 XP untuk pelajar
       🔄 "Perlu Revisi" → Status = "Perlu Perbaikan" (needs_revision) — badge merah, + feedback
     ↓
     Feedback dari pakar ditampilkan di halaman detail catatan

[Jika TIDAK diajukan]:
     Status = "Belum Diajukan" (not_submitted) — tanpa badge validasi
Status Validasi Catatan
Belum Diajukan (not_submitted) — warna gray #6b7280, tidak ada badge
Menunggu Validasi (pending) — warna amber #f59e0b, badge kuning "Menunggu"
Tervalidasi (validated) — warna green #10b981, badge hijau "Tervalidasi ✅" — ini yang paling dipercaya
Perlu Perbaikan (needs_revision) — warna red #ef4444, badge merah + feedback dari pakar
Catatan Badge Khusus
Catatan yang dibuat oleh Pakar otomatis mendapat badge "Catatan Pakar ⭐"
Catatan yang sudah divalidasi mendapat badge "Tervalidasi ✅" — ini meningkatkan kepercayaan pembaca
Catatan trending (views tinggi) mendapat badge "🔥 Trending"
Tampilan Card Catatan (di Explore, Home, dll)
Setiap card catatan menampilkan:

Thumbnail area — gradient background dengan warna sesuai category + icon mata pelajaran overlay
Judul catatan — bold, max 2 baris (line-clamp)
Preview konten — 2 baris text preview (strip HTML tags ke plain text)
Mata Pelajaran — badge/chip dengan icon dan warna category
Jenjang + Kelas — contoh: "SMA • Kelas 11 • Semester 1"
Author info — avatar kecil + nama + badge role (jika pakar ada star badge)
Validation badge — sesuai status (Tervalidasi ✅ / Menunggu / Perlu Revisi)
Stats — icon Eye + jumlah views, icon MessageSquare + jumlah comments, icon Heart + likes
Waktu — "Hari ini", "Kemarin", "3 hari lalu", "2 minggu lalu", dll (relative time)
Form Buat Catatan (Upload)
Form single-page (bukan step/wizard) dengan section yang rapi:

Judul Catatan — text input dengan counter karakter (X / 200)
Tingkat Pendidikan — grid 2x2 cards: SD 🎒, SMP 📚, SMA/SMK 🎓, Kuliah 🏛️. Klik untuk select (ada check indicator). Setelah pilih, muncul dropdown kelas yang sesuai.
Rich Text Editor — area konten dengan toolbar formatting: Bold, Italic, Underline, Heading 1/2/3, Align Left/Center/Right, Ordered List, Unordered List, Highlight, Code, Insert Link, Insert Gambar. Di mobile, toolbar bisa horizontal scroll. Editor area minimal 200px tinggi.
Mata Pelajaran — dropdown select dari daftar + tombol "Tambah Mata Pelajaran Baru" yang expand inline input + tombol "Tambah"
Kelas — dropdown (muncul setelah pilih jenjang)
Semester — dropdown: Semester 1 / Semester 2
Visibilitas Toggle — Public/Private dengan icon Eye/EyeOff + deskripsi
Ajukan ke Pakar Toggle — dengan icon Sparkles + deskripsi "Dapatkan validasi dari pakar untuk meningkatkan kredibilitas". Background gradient kuning-ungu subtle.
Tombol: "Batal" (outline) + "Publikasikan Catatan" (gradient primary→secondary, loading state dengan spinner)
Tips Card — di bawah form, box biru dengan tips: judul jelas, struktur rapi, tambah contoh soal, ajukan ke pakar
Halaman Detail Catatan
Layout:

Header — tombol back (ArrowLeft), judul catatan
Author bar — avatar, nama, badge role, tombol ikuti
Metadata — mata pelajaran (badge chip), jenjang + kelas + semester, tanggal upload (Calendar icon)
Konten catatan — render rich text HTML (prose styling). Jika tipe foto, tampilkan gallery foto.
Validation section — box dengan status validasi + feedback pakar (jika ada). Jika validated: tampilkan nama pakar, tanggal validasi, feedback text.
Stats bar — Views, Likes, Comments, Bookmarks dengan icon
Action buttons — Like (Heart, toggle merah), Bookmark, Share, Report (Flag), menu more (MoreVertical)
Comment section:
Input field dengan tombol Send
List comments: avatar + nama + badge pakar (jika pakar) + waktu + text + tombol "Balas" + "Laporkan"
Comment dari pakar mendapat highlight background kuning/amber + badge "⭐ Pakar"
Support reply/balasan (nested, indented)
Related Notes sidebar (di mobile: section di bawah) — 3 catatan terkait (category sama) dengan thumbnail mini, judul, author, stats
Explore Page Filter
Search — search bar sticky top
Filter chips horizontal scroll:
Jenjang: SD / SMP / SMA / Kuliah
Setelah pilih jenjang, muncul chips kelas sesuai
Mata Pelajaran: grid/chips selectable
Hanya Tervalidasi: toggle chip
Sort: Terbaru / Terpopuler / Paling Banyak Dilihat / Paling Banyak Komentar
Hasil: masonry grid 2 kolom dari NoteCard
Dashboard Pakar — Validasi Catatan
Tab "Antrian" dan "Riwayat"
Antrian: list catatan pending dengan judul, author (avatar+nama), mata pelajaran badge, jenjang+kelas, tanggal submit, tombol "Review"
Review modal/screen: preview catatan lengkap, lalu:
Pilih aksi: "Validasi ✅" atau "Perlu Revisi 🔄"
Textarea feedback (wajib untuk revisi, opsional untuk validasi)
Tombol submit
Stats pakar: Total divalidasi, Feedback diberikan, Pending, Rata-rata rating, Followers
Halaman & Fitur Lainnya
1. Splash/Onboarding Screen
3 slides dengan gambar Unsplash, colorful dots, gradient blur circles
Judul: "Bagikan Catatanmu", "Belajar Dari Yang Terbaik", "Raih Achievement"
Tombol "Mulai Sekarang" gradient rounded-full
2. Login & Register
Clean form, social login (Google, Apple), tab switch Login/Register
Register: pilih role (Pelajar/Pakar), nama, email, password, jenjang pendidikan
3. Home Screen (Pelajar)
Header: avatar + "Halo, [nama]!" + notification bell
Banner card gradient: statistik (catatan dibaca, XP, streak)
"Catatan Terbaru" — horizontal scroll cards
"Mata Pelajaran Populer" — grid 2 kolom
"Top Contributors" — horizontal scroll avatars
4. Profile Screen
Cover photo + avatar + nama + role badge
Stats: Catatan | Followers | Following | XP
Achievement badges grid (unlock/locked)
Tab: Catatan Saya | Bookmarks | Activity
XP progress bar + level
5. Dashboard Admin
Overview cards: Total Users, Catatan, Reports, Pending
User Management: search + filter role + actions (ban/unban/promote)
Reports list + resolve actions
Charts (recharts): Upload per minggu, User growth
6. Notification Screen
Grouped: Hari Ini, Kemarin, Minggu Ini
Types: catatan divalidasi, comment baru, follower baru, achievement, laporan
Unread dot indicator
7. Gamifikasi
XP: upload (+50), divalidasi (+100), comment (+10), streak harian (+20)
Levels: Pemula, Pelajar Aktif, Kontributor, Master, Legend
Badges: "First Upload", "10 Catatan", "Pakar Favorit", "Streak 7 Hari"
Leaderboard: ranking, avatar, nama, XP — filter mingguan/bulanan
Navigasi (React Router)
/ — Splash/Onboarding
/login — Login/Register
/home — Home (bottom nav)
/explore — Explore (bottom nav)
/upload — Upload/Buat catatan
/note/:id — Detail catatan
/profile — Profile sendiri (bottom nav)
/profile/:id — Profile user lain
/notifications — Notifikasi (bottom nav)
/dashboard/pakar — Dashboard Pakar
/dashboard/admin — Admin Dashboard
/leaderboard — Leaderboard gamifikasi
Bottom navigation persistent di: home, explore, notifications, profile.

Mock Data
Gunakan data realistis Indonesia:

10-15 catatan dummy dengan variasi: jenjang berbeda (SD-Kuliah), mapel berbeda, status validasi berbeda, visibility berbeda
5-8 users: mix pelajar biasa + pakar + admin, nama Indonesia (contoh: Rina Sari, Budi Santoso, Dr. Ahmad Hidayat, Siti Nurhaliza, dll)
Mata pelajaran: Matematika, Bahasa Indonesia, IPA, IPS, Bahasa Inggris, Fisika, Kimia, Biologi, Sejarah, Ekonomi, Seni Budaya, PKN, Informatika
Comments dengan replies, ada yang dari pakar (highlighted)
Beberapa catatan sudah divalidasi + feedback, beberapa pending, beberapa belum diajukan
Aturan Teknis
Mobile-first, max-width 430px centered, background abu di luar
Semua gambar via Unsplash (jangan hallucinate URL)
Smooth transitions: Motion (import dari 'motion/react')
Icons: lucide-react
Charts: recharts
Responsive text, jangan terlalu kecil
HINDARI animate borderColor dari Tailwind → gunakan inline rgba atau CSS transition