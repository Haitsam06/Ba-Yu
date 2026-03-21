export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'pelajar' | 'pakar' | 'admin';
  jenjang?: string;
  bio?: string;
  totalCatatan: number;
  followers: number;
  following: number;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  content: string;
  authorId: string;
  mataPelajaran: string;
  jenjang: string;
  kelas: number;
  semester: number;
  tags: string[];
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  bookmarks: number;
  isValidated: boolean;
  validatedBy?: string;
  rating?: number;
  createdAt: string;
  isPakar?: boolean;
}

export interface Comment {
  id: string;
  noteId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'pelajar',
    jenjang: 'SMA',
    bio: 'Suka berbagi catatan matematika',
    totalCatatan: 45,
    followers: 234,
    following: 156
  },
  {
    id: '2',
    name: 'Dr. Ahmad Hidayat',
    email: 'ahmad@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'pakar',
    jenjang: 'Universitas',
    bio: 'Dosen Matematika dengan 19 tahun pengalaman mengajar',
    totalCatatan: 89,
    followers: 3245,
    following: 89
  },
  {
    id: '3',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'pelajar',
    jenjang: 'SMA',
    totalCatatan: 23,
    followers: 145,
    following: 98
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'pelajar',
    jenjang: 'SMP',
    totalCatatan: 30,
    followers: 567,
    following: 234
  },
  {
    id: '5',
    name: 'Prof. Rina Susanti',
    email: 'rina@example.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    role: 'pakar',
    jenjang: 'Universitas',
    bio: 'Pakar Fisika dan Kimia',
    totalCatatan: 156,
    followers: 5678,
    following: 234
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Peta Konsep Sistem Pencernaan Manusia',
    description: 'Rangkuman lengkap sistem pencernaan manusia dengan diagram dan penjelasan detail',
    content: 'Konten lengkap tentang sistem pencernaan...',
    authorId: '1',
    mataPelajaran: 'IPA (Sains)',
    jenjang: 'SMP',
    kelas: 8,
    semester: 1,
    tags: ['Biologi', 'Sistem Pencernaan', 'Anatomi'],
    thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=300&fit=crop',
    views: 450,
    likes: 34,
    comments: 11,
    bookmarks: 15,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-02-20',
    isPakar: false
  },
  {
    id: '2',
    title: 'Algoritma Sorting - Bubble Sort & Quick Sort',
    description: 'Penjelasan algoritma sorting dengan contoh kode dan analisis kompleksitas',
    content: 'Algoritma Sorting...',
    authorId: '2',
    mataPelajaran: 'Algoritma & Pemrograman',
    jenjang: 'SMA',
    kelas: 12,
    semester: 2,
    tags: ['Informatika', 'Algoritma', 'Programming'],
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
    views: 3245,
    likes: 234,
    comments: 48,
    bookmarks: 89,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-02-13',
    isPakar: true
  },
  {
    id: '3',
    title: 'Cara Mudah Memahami Limit Fungsi',
    description: 'Teknik cepat menyelesaikan soal limit dengan berbagai contoh',
    content: 'Limit fungsi adalah...',
    authorId: '4',
    mataPelajaran: 'Matematika',
    jenjang: 'SMA',
    kelas: 11,
    semester: 1,
    tags: ['Kalkulus', 'Limit', 'Matematika'],
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
    views: 3456,
    likes: 256,
    comments: 42,
    bookmarks: 178,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-03-01',
    isPakar: false
  },
  {
    id: '4',
    title: 'Struktur Atom dan Konfigurasi Elektron',
    description: 'Materi kimia kelas 10 tentang struktur atom lengkap dengan latihan soal',
    content: 'Struktur atom terdiri dari...',
    authorId: '3',
    mataPelajaran: 'Kimia',
    jenjang: 'SMA',
    kelas: 10,
    semester: 1,
    tags: ['Kimia', 'Atom', 'Konfigurasi Elektron'],
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    views: 2145,
    likes: 167,
    comments: 35,
    bookmarks: 98,
    isValidated: true,
    validatedBy: '5',
    rating: 5,
    createdAt: '2026-02-25',
    isPakar: false
  },
  {
    id: '5',
    title: 'Sistem Persamaan Linear Dua Variabel',
    description: 'Metode eliminasi, substitusi, dan grafik untuk menyelesaikan SPLDV',
    content: 'Sistem persamaan linear...',
    authorId: '1',
    mataPelajaran: 'Matematika',
    jenjang: 'SMP',
    kelas: 8,
    semester: 2,
    tags: ['Aljabar', 'SPLDV', 'Persamaan Linear'],
    thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop',
    views: 1890,
    likes: 142,
    comments: 28,
    bookmarks: 67,
    isValidated: true,
    validatedBy: '2',
    rating: 4,
    createdAt: '2026-02-18',
    isPakar: false
  },
  {
    id: '6',
    title: 'Tenses Bahasa Inggris - Simple Present',
    description: 'Formula dan contoh kalimat simple present tense dengan latihan',
    content: 'Simple present tense...',
    authorId: '4',
    mataPelajaran: 'Bahasa Inggris',
    jenjang: 'SMP',
    kelas: 7,
    semester: 1,
    tags: ['Grammar', 'Tenses', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    views: 892,
    likes: 67,
    comments: 19,
    bookmarks: 34,
    isValidated: true,
    validatedBy: '2',
    rating: 4,
    createdAt: '2026-02-16',
    isPakar: false
  },
  {
    id: '7',
    title: 'Sejarah Perang Dunia II',
    description: 'Kronologi lengkap PD II dari penyebab hingga dampaknya',
    content: 'Perang Dunia II dimulai...',
    authorId: '3',
    mataPelajaran: 'Sejarah',
    jenjang: 'SMA',
    kelas: 11,
    semester: 2,
    tags: ['Sejarah', 'Perang Dunia', 'Kronologi'],
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop',
    views: 678,
    likes: 45,
    comments: 14,
    bookmarks: 23,
    isValidated: false,
    createdAt: '2026-03-05',
    isPakar: false
  },
  {
    id: '8',
    title: 'Rumus Trigonometri Lengkap',
    description: 'Kumpulan rumus sin, cos, tan beserta identitas trigonometri',
    content: 'Rumus dasar trigonometri...',
    authorId: '1',
    mataPelajaran: 'Matematika',
    jenjang: 'SMA',
    kelas: 10,
    semester: 2,
    tags: ['Trigonometri', 'Rumus', 'Matematika'],
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    views: 1234,
    likes: 89,
    comments: 22,
    bookmarks: 56,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-02-22',
    isPakar: false
  },
  {
    id: '9',
    title: 'Mengenal Discussion Text - Teks Diskusi',
    description: 'Struktur dan contoh discussion text bahasa Inggris',
    content: 'Discussion text adalah...',
    authorId: '4',
    mataPelajaran: 'Bahasa Inggris',
    jenjang: 'SMA',
    kelas: 11,
    semester: 1,
    tags: ['Writing', 'Text Types', 'English'],
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    views: 567,
    likes: 38,
    comments: 12,
    bookmarks: 21,
    isValidated: false,
    createdAt: '2026-03-02',
    isPakar: false
  },
  {
    id: '10',
    title: 'Perkalian dan Pembagian untuk Kelas 4',
    description: 'Cara mudah belajar perkalian dan pembagian dengan trik cepat',
    content: 'Perkalian adalah...',
    authorId: '3',
    mataPelajaran: 'Matematika',
    jenjang: 'SD',
    kelas: 4,
    semester: 1,
    tags: ['Matematika Dasar', 'Perkalian', 'Pembagian'],
    thumbnail: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=400&h=300&fit=crop',
    views: 1567,
    likes: 123,
    comments: 31,
    bookmarks: 78,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-02-17',
    isPakar: false
  },
  {
    id: '11',
    title: 'Ringkasan Materi Redoks - Oksidasi Reduksi',
    description: 'Konsep bilangan oksidasi dan reaksi redoks lengkap',
    content: 'Reaksi redoks adalah...',
    authorId: '5',
    mataPelajaran: 'Kimia',
    jenjang: 'SMA',
    kelas: 10,
    semester: 2,
    tags: ['Kimia', 'Redoks', 'Reaksi'],
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=300&fit=crop',
    views: 2543,
    likes: 189,
    comments: 45,
    bookmarks: 112,
    isValidated: true,
    validatedBy: '5',
    rating: 5,
    createdAt: '2026-02-19',
    isPakar: true
  },
  {
    id: '12',
    title: 'Turunan dan Integral - Kalkulus Dasar',
    description: 'Konsep dasar diferensial dan integral dengan contoh soal',
    content: 'Turunan fungsi adalah...',
    authorId: '2',
    mataPelajaran: 'Matematika',
    jenjang: 'SMA',
    kelas: 12,
    semester: 1,
    tags: ['Kalkulus', 'Turunan', 'Integral'],
    thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=300&fit=crop',
    views: 1567,
    likes: 134,
    comments: 35,
    bookmarks: 89,
    isValidated: true,
    validatedBy: '2',
    rating: 5,
    createdAt: '2026-02-28',
    isPakar: true
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    noteId: '1',
    userId: '3',
    text: 'Catatannya sangat membantu! Terima kasih',
    createdAt: '2026-02-21'
  },
  {
    id: '2',
    noteId: '2',
    userId: '1',
    text: 'Quick Sort adalah salah satu algoritma sorting tercepat! Penjelasannya jelas',
    createdAt: '2026-02-14'
  },
  {
    id: '3',
    noteId: '3',
    userId: '4',
    text: 'Materinya lengkap, cocok untuk persiapan ujian',
    createdAt: '2026-03-02'
  }
];

export const mataPelajaran = [
  { id: 'matematika', name: 'Matematika', icon: '📐', color: '#FF9142' },
  { id: 'ipa', name: 'IPA (Sains)', icon: '🔬', color: '#0087FF' },
  { id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: '📚', color: '#F478B8' },
  { id: 'bahasa-inggris', name: 'Bahasa Inggris', icon: '🌍', color: '#8B5CF6' },
  { id: 'fisika', name: 'Fisika', icon: '⚛️', color: '#0087FF' },
  { id: 'kimia', name: 'Kimia', icon: '🧪', color: '#46F080' },
  { id: 'biologi', name: 'Biologi', icon: '🧬', color: '#46F080' },
  { id: 'sejarah', name: 'Sejarah', icon: '📜', color: '#FFD12E' },
  { id: 'ekonomi', name: 'Ekonomi', icon: '💰', color: '#FFD166' },
  { id: 'geografi', name: 'Geografi', icon: '🗺️', color: '#46F080' },
  { id: 'algoritma', name: 'Algoritma & Pemrograman', icon: '💻', color: '#8B5CF6' },
  { id: 'pkn', name: 'PKN', icon: '🏛️', color: '#F478B8' }
];

export const getUserById = (id: string) => mockUsers.find(u => u.id === id);
export const getNoteById = (id: string) => mockNotes.find(n => n.id === id);
export const getCommentsByNoteId = (noteId: string) => mockComments.filter(c => c.noteId === noteId);
