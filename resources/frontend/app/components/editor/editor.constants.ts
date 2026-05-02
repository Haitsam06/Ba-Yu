export const HIGHLIGHT_COLORS = [
  { id: 'yellow', color: '#fef08a', label: 'Kuning' },
  { id: 'green', color: '#bbf7d0', label: 'Hijau' },
  { id: 'blue', color: '#bfdbfe', label: 'Biru' },
  { id: 'pink', color: '#fbcfe8', label: 'Merah Muda' },
  { id: 'orange', color: '#fed7aa', label: 'Oranye' },
  { id: 'purple', color: '#e9d5ff', label: 'Ungu' },
];

export const jenjangOptions = [
  { id: 'SD', label: 'SD', kelas: ['1', '2', '3', '4', '5', '6'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'SMP', label: 'SMP', kelas: ['7', '8', '9'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'SMA', label: 'SMA/SMK', kelas: ['10', '11', '12'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'Kuliah', label: 'Kuliah', kelas: ['D3', 'S1/D4', 'S2', 'S3'], kelasLabel: 'Strata', maxSemester: 8 }
];

export const formulaPresets: Record<string, { label: string; latex: string }[]> = {
  'Matematika': [
    { label: 'Kuadrat', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { label: 'Pythagoras', latex: 'a^2 + b^2 = c^2' },
    { label: 'Luas Lingkaran', latex: 'A = \\pi r^2' },
    { label: 'Integral', latex: '\\int_{a}^{b} f(x) \\, dx' },
    { label: 'Limit', latex: '\\lim_{x \\to \\infty} f(x)' },
    { label: 'Sigma', latex: '\\sum_{i=1}^{n} x_i' },
  ],
  'Fisika': [
    { label: 'Gaya', latex: 'F = m \\cdot a' },
    { label: 'Energi Kinetik', latex: 'E_k = \\frac{1}{2}mv^2' },
    { label: 'Hukum Gravitasi', latex: 'F = G\\frac{m_1 m_2}{r^2}' },
    { label: 'Kecepatan', latex: 'v = \\frac{\\Delta s}{\\Delta t}' },
    { label: 'Energi (Einstein)', latex: 'E = mc^2' },
  ],
  'Kimia': [
    { label: 'Mol', latex: 'n = \\frac{m}{M_r}' },
    { label: 'pH', latex: 'pH = -\\log[H^+]' },
    { label: 'Gas Ideal', latex: 'PV = nRT' },
    { label: 'Laju Reaksi', latex: 'r = k[A]^m[B]^n' },
  ],
  'Umum': [
    { label: 'Pecahan', latex: '\\frac{a}{b}' },
    { label: 'Pangkat', latex: 'x^{n}' },
    { label: 'Akar', latex: '\\sqrt{x}' },
    { label: 'Subskrip', latex: 'x_{i}' },
    { label: 'Tanda Panah', latex: 'A \\rightarrow B' },
  ],
};

export const QUILL_FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike', 'background',
  'list', 'bullet', 'link', 'image', 'video', 'formula',
  'blockquote', 'code-block', 'divider', 'layout', 'alt', 'align', 'code'
];
