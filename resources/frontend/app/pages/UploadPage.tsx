import { useState, useRef, useCallback, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, Tag, Send, Calculator, Plus, X, Image, Film, Code, Minus, Quote, Bold, Italic, Underline, Strikethrough, Highlighter, Link as LinkIcon, Heading1, Heading2 } from 'lucide-react';
import { mataPelajaran } from '../data/mockData';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import axios from 'axios';

// Make katex available globally for Quill's formula module
if (typeof window !== 'undefined') {
  (window as any).katex = katex;
}

// Highlight colors available
const HIGHLIGHT_COLORS = [
  { id: 'yellow', color: '#fef08a', label: 'Kuning' },
  { id: 'green', color: '#bbf7d0', label: 'Hijau' },
  { id: 'blue', color: '#bfdbfe', label: 'Biru' },
  { id: 'pink', color: '#fbcfe8', label: 'Merah Muda' },
  { id: 'orange', color: '#fed7aa', label: 'Oranye' },
  { id: 'purple', color: '#e9d5ff', label: 'Ungu' },
];

// Register custom Divider Blot (BlockEmbed)
const BlockEmbed = Quill.import('blots/block/embed') as any;
class DividerBlot extends BlockEmbed {
  static blotName = 'divider';
  static tagName = 'hr';
  static create() {
    const node = super.create();
    node.setAttribute('contenteditable', 'false');
    return node;
  }
}
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';
Quill.register(DividerBlot);

const jenjangOptions = [
  { id: 'SD', label: 'SD', kelas: ['1', '2', '3', '4', '5', '6'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'SMP', label: 'SMP', kelas: ['7', '8', '9'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'SMA', label: 'SMA/SMK', kelas: ['10', '11', '12'], kelasLabel: 'Kelas', maxSemester: 2 },
  { id: 'Kuliah', label: 'Kuliah', kelas: ['D3', 'S1/D4', 'S2', 'S3'], kelasLabel: 'Strata', maxSemester: 8 }
];

const formulaPresets: Record<string, { label: string; latex: string }[]> = {
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

// ========== FLOATING TOOLBAR COMPONENT ==========
function FloatingToolbar({ quillRef }: { quillRef: React.RefObject<ReactQuill | null> }) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [formats, setFormats] = useState<Record<string, any>>({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleSelectionChange = (range: any) => {
      if (range && range.length > 0) {
        const quillBounds = quill.getBounds(range.index, range.length);
        const editorRect = (quill.root.parentElement as HTMLElement).getBoundingClientRect();
        const toolbarWidth = 380;
        let left = editorRect.left + quillBounds.left + (quillBounds.width / 2) - (toolbarWidth / 2);
        // Keep within viewport bounds
        left = Math.max(8, Math.min(left, window.innerWidth - toolbarWidth - 8));
        setPosition({
          top: editorRect.top + quillBounds.top - 52 + window.scrollY,
          left,
        });
        setFormats(quill.getFormat(range.index, range.length));
      } else {
        setPosition(null);
        setShowColorPicker(false);
      }
    };

    quill.on('selection-change', handleSelectionChange);
    return () => {
      quill.off('selection-change', handleSelectionChange);
    };
  }, [quillRef]);

  if (!position) return null;

  const quill = quillRef.current?.getEditor();
  if (!quill) return null;

  const toggle = (format: string, value?: any) => {
    const range = quill.getSelection();
    if (!range) return;
    const current = quill.getFormat(range.index, range.length);
    if (format === 'header') {
      quill.format('header', current.header === value ? false : value);
    } else if (format === 'link') {
      if (current.link) {
        quill.format('link', false);
      } else {
        const url = prompt('Masukkan URL:');
        if (url) quill.format('link', url);
      }
    } else {
      quill.format(format, !current[format]);
    }
    // Refresh formats
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

  const applyHighlight = (color: string) => {
    const range = quill.getSelection();
    if (!range) return;
    const current = quill.getFormat(range.index, range.length);
    // Toggle off if same color
    quill.format('background', current.background === color ? false : color);
    setShowColorPicker(false);
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

  const removeHighlight = () => {
    const range = quill.getSelection();
    if (!range) return;
    quill.format('background', false);
    setShowColorPicker(false);
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

  const btnClass = (active: boolean) =>
    `w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${active ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/10'}`;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-150"
      style={{ top: position.top, left: position.left }}
      onMouseDown={(e) => e.preventDefault()} // Prevent losing selection
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] px-2 py-2 flex items-center gap-1 border border-white/10">
        <button className={btnClass(!!formats.bold)} onClick={() => toggle('bold')} title="Bold">
          <Bold className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
        <button className={btnClass(!!formats.italic)} onClick={() => toggle('italic')} title="Italic">
          <Italic className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
        <button className={btnClass(!!formats.underline)} onClick={() => toggle('underline')} title="Underline">
          <Underline className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
        <button className={btnClass(!!formats.strike)} onClick={() => toggle('strike')} title="Strikethrough">
          <Strikethrough className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
        <div className="relative">
          <button className={btnClass(!!formats.background)} onClick={() => setShowColorPicker(!showColorPicker)} title="Highlight">
            <Highlighter className="w-[18px] h-[18px]" strokeWidth={2.5} />
            {formats.background && <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: formats.background }}></div>}
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-2.5 flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95 duration-200" onMouseDown={(e) => e.preventDefault()}>
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => applyHighlight(c.color)}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-125 ${formats.background === c.color ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-transparent'}`}
                  style={{ background: c.color }}
                  title={c.label}
                />
              ))}
              <div className="w-px h-6 bg-white/10 mx-0.5" />
              <button
                onClick={removeHighlight}
                className="w-7 h-7 rounded-full border border-white/10 hover:border-red-500/50 bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all hover:scale-110"
                title="Hapus warna"
              >
                <X className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-white/10 mx-1.5"></div>

        <button className={btnClass(formats.header === 1)} onClick={() => toggle('header', 1)} title="Heading 1">
          <Heading1 className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
        <button className={btnClass(formats.header === 2)} onClick={() => toggle('header', 2)} title="Heading 2">
          <Heading2 className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1.5"></div>

        <button className={btnClass(!!formats.link)} onClick={() => toggle('link')} title="Link">
          <LinkIcon className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

// ========== PLUS BUTTON (BLOCK INSERTER) ==========
function PlusButton({ quillRef, onFormulaClick }: { quillRef: React.RefObject<ReactQuill | null>; onFormulaClick: () => void }) {
  const [position, setPosition] = useState<{ top: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleSelectionChange = (range: any) => {
      setExpanded(false);
      if (range && range.length === 0) {
        // Cursor is at a position, check if line is empty
        const [line] = quill.getLine(range.index);
        if (line && line.length() <= 1) {
          const bounds = quill.getBounds(range.index);
          const editorRect = (quill.root.parentElement as HTMLElement).getBoundingClientRect();
          setPosition({
            top: editorRect.top + bounds.top + window.scrollY,
          });
        } else {
          setPosition(null);
        }
      } else {
        setPosition(null);
      }
    };

    const handleTextChange = () => {
      const range = quill.getSelection();
      if (range) handleSelectionChange(range);
    };

    quill.on('selection-change', handleSelectionChange);
    quill.on('text-change', handleTextChange);
    return () => {
      quill.off('selection-change', handleSelectionChange);
      quill.off('text-change', handleTextChange);
    };
  }, [quillRef]);

  // Close on click outside
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (!position) return null;

  const quill = quillRef.current?.getEditor();
  if (!quill) return null;

  const insertBlock = (type: string) => {
    const range = quill.getSelection(true);
    switch (type) {
      case 'image': {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              quill.insertEmbed(range.index, 'image', reader.result, 'user');
              quill.setSelection(range.index + 1, 0);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        break;
      }
      case 'video': {
        const url = prompt('Masukkan URL video (YouTube/Vimeo):');
        if (url) {
          quill.insertEmbed(range.index, 'video', url, 'user');
          quill.setSelection(range.index + 1, 0);
        }
        break;
      }
      case 'code': {
        quill.insertText(range.index, '\n', 'user');
        quill.formatLine(range.index, 1, 'code-block', true);
        quill.setSelection(range.index, 0);
        break;
      }
      case 'divider': {
        quill.insertEmbed(range.index, 'divider', true, 'user');
        quill.insertText(range.index + 1, '\n', 'user');
        quill.setSelection(range.index + 2, 0);
        break;
      }
      case 'quote': {
        quill.formatLine(range.index, 1, 'blockquote', true);
        break;
      }
      case 'formula': {
        onFormulaClick();
        break;
      }
    }
    setExpanded(false);
  };

  const editorEl = quill.root.parentElement as HTMLElement;
  const editorRect = editorEl.getBoundingClientRect();

  const actions = [
    { id: 'image', icon: Image, label: 'Gambar', color: 'text-emerald-500' },
    { id: 'video', icon: Film, label: 'Video', color: 'text-blue-500' },
    { id: 'code', icon: Code, label: 'Kode', color: 'text-orange-500' },
    { id: 'formula', icon: Calculator, label: 'Rumus', color: 'text-purple-500' },
    { id: 'divider', icon: Minus, label: 'Pemisah', color: 'text-gray-400' },
    { id: 'quote', icon: Quote, label: 'Kutipan', color: 'text-amber-500' },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed z-40"
      style={{ top: position.top, left: editorRect.left - 48 }}
    >
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] group"
          title="Sisipkan blok"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
        </button>
      ) : (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
          <button
            onClick={() => setExpanded(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-white transition-all duration-300 rotate-45 shadow-lg shadow-gray-900/20"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] px-2 py-2 ml-1">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => insertBlock(action.id)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 active:scale-95 transition-all group ${action.color}`}
                title={action.label}
              >
                <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== MAIN UPLOAD PAGE ==========
export default function UploadPage() {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showMeta, setShowMeta] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [formulaInput, setFormulaInput] = useState('');
  const [formulaTab, setFormulaTab] = useState('Umum');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [meta, setMeta] = useState({
    mataPelajaran: '',
    jenjang: 'SMA',
    kelas: '10' as string | number,
    semester: 1,
    tags: [] as string[],
    ajukanPakar: false,
  });
  const [tagInput, setTagInput] = useState('');

  const modules = {
    toolbar: false as const,
    formula: true,
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'background',
    'list', 'bullet', 'link', 'image', 'video', 'formula',
    'blockquote', 'code-block', 'divider',
  ];

  const currentJenjang = jenjangOptions.find(j => j.id === meta.jenjang);
  const kelasOptions = currentJenjang?.kelas || [];
  const maxSemester = currentJenjang?.maxSemester || 2;
  const kelasLabel = currentJenjang?.kelasLabel || 'Kelas';

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !meta.tags.includes(tag)) {
      setMeta({ ...meta, tags: [...meta.tags, tag] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setMeta({ ...meta, tags: meta.tags.filter(t => t !== tag) });
  };

  const insertFormula = useCallback((latex: string) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'formula', latex, 'user');
      quill.setSelection(range.index + 1, 0);
    }
    setShowFormulaModal(false);
    setFormulaInput('');
  }, []);

  const hasContent = content.replace(/<[^>]*>/g, '').trim().length > 0;
  const canPublish = title.trim() && hasContent && meta.mataPelajaran;

  const handleSubmit = async () => {
    if (!canPublish) {
      if (!meta.mataPelajaran) setShowMeta(true);
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.post('/api/v1/posts', {
        title: title.trim(),
        content: content,
        mapel: meta.mataPelajaran,
        jenjang: meta.jenjang,
        kelas: meta.kelas.toString(),
        semester: meta.semester.toString(),
        tags: meta.tags,
        visibility: 'public'
      });
      alert('Catatan berhasil dipublikasikan!');
      navigate('/home');
    } catch (error) {
      console.error('Gagal mempublikasikan catatan:', error);
      alert('Terjadi kesalahan saat menyimpan catatan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen bg-white">

        {/* Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100/60 z-30 transition-all duration-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all duration-200 text-gray-500 hover:text-gray-900 shrink-0"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <div className="hidden sm:flex items-center gap-2.5 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse"></div>
                <span className="text-[14px] font-['Lexend_Deca'] font-extrabold text-gray-900 truncate max-w-[200px]">
                  {title.trim() ? title : 'Draf Baru'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowMeta(!showMeta)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-['Lexend_Deca'] font-bold transition-all duration-200 border ${
                  showMeta 
                    ? 'bg-gray-100 text-gray-900 border-gray-200' 
                    : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700 hover:border-gray-200'
                } ${!meta.mataPelajaran ? 'ring-2 ring-orange-200/60 text-orange-600 border-orange-200' : ''}`}
              >
                <Tag className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span className="hidden sm:inline">{meta.mataPelajaran || 'Kategori'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showMeta ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={handleSubmit}
                disabled={!canPublish || isSubmitting}
                className="flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-full text-[13px] font-['Lexend_Deca'] font-extrabold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-[0_4px_12px_rgb(93,92,230,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
                {isSubmitting ? 'Mengirim...' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Metadata Panel — premium redesign */}
          {showMeta && (
            <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/90 to-white animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-5">
                
                {/* Mapel Chips */}
                <div className="mb-6">
                  <p className="text-[10px] font-['Lexend_Deca'] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-3">Mata Pelajaran <span className="text-red-400 font-bold">*</span></p>
                  <div className="flex flex-wrap gap-2.5">
                    {mataPelajaran.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMeta({ ...meta, mataPelajaran: m.name })}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-['Manrope'] font-semibold border transition-all duration-200 ${
                          meta.mataPelajaran === m.name
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/25 scale-[1.02]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <span className="text-base">{m.icon}</span>
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail Row */}
                <div className="flex flex-wrap items-end gap-3 mb-5">
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-[10px] font-['Lexend_Deca'] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-2">Jenjang Pendidikan</p>
                    <div className="flex gap-2">
                      {jenjangOptions.map((j) => (
                        <button
                          key={j.id}
                          onClick={() => setMeta({ ...meta, jenjang: j.id, kelas: j.kelas[0], semester: 1 })}
                          className={`px-4 py-2 rounded-xl text-[11px] font-['Lexend_Deca'] font-bold border transition-all duration-300 ${
                            meta.jenjang === j.id
                              ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10'
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                          }`}
                        >
                          {j.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-[110px]">
                    <p className="text-[10px] font-['Lexend_Deca'] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-2">{kelasLabel}</p>
                    <select
                      value={meta.kelas}
                      onChange={(e) => setMeta({ ...meta, kelas: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-['Manrope'] font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      {kelasOptions.map((k) => (
                        <option key={k} value={k}>{meta.jenjang === 'Kuliah' ? k : `Kelas ${k}`}</option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-[140px]">
                    <p className="text-[10px] font-['Lexend_Deca'] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-2">Pilih Semester</p>
                    <select
                      value={meta.semester}
                      onChange={(e) => setMeta({ ...meta, semester: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-['Lexend_Deca'] font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                    >
                      {Array.from({ length: maxSemester }, (_, i) => i + 1).map((s) => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[10px] font-['Lexend_Deca'] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-2">Tag & Keyword</p>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
                      placeholder="Contoh: Logaritma, Kalkulus..."
                      className="flex-1 min-w-[180px] px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-['Manrope'] font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all"
                    />
                    {meta.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary/5 text-primary rounded-xl text-[11px] font-['Lexend_Deca'] font-extrabold shrink-0 border border-primary/10 animate-in fade-in zoom-in-90 duration-300">
                        #{tag}
                        <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                          <X className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Writing Area — centered and padded for plus button */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 sm:pl-16 relative">

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Catatan..."
            className="w-full text-[40px] md:text-[48px] font-['Lexend_Deca'] font-extrabold text-gray-900 placeholder:text-gray-100 focus:outline-none mt-12 mb-2 leading-[1.1] tracking-[-0.03em] transition-all"
            maxLength={200}
          />
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-primary/20 rounded-full overflow-hidden">
               <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(title.length / 200) * 100}%` }}></div>
            </div>
            <p className="text-[11px] font-['Lexend_Deca'] font-bold text-gray-300 uppercase tracking-widest">{title.length}/200 Karakter</p>
          </div>

          {/* Editor */}
          <div className="notion-editor pb-32">
            <style dangerouslySetInnerHTML={{ __html: `
              .notion-editor .ql-container.ql-snow { border: none !important; font-family: 'Manrope', sans-serif; font-size: 17px; }
              .notion-editor .ql-editor { padding: 0 !important; min-height: 500px; line-height: 1.9; color: #1f2937; }
              .notion-editor .ql-editor.ql-blank::before { color: #d1d5db; font-style: normal; font-family: 'Manrope', sans-serif; left: 0 !important; right: 0 !important; }
              .notion-editor .ql-editor h1 { font-family: 'Lexend Deca', sans-serif; font-size: 1.75em; font-weight: 700; margin: 1em 0 0.4em; color: #111827; }
              .notion-editor .ql-editor h2 { font-family: 'Lexend Deca', sans-serif; font-size: 1.35em; font-weight: 700; margin: 0.8em 0 0.3em; color: #1f2937; }
              .notion-editor .ql-editor h3 { font-family: 'Lexend Deca', sans-serif; font-size: 1.15em; font-weight: 600; margin: 0.6em 0 0.3em; color: #374151; }
              .notion-editor .ql-editor p { margin-bottom: 0.5em; }
              .notion-editor .ql-editor img { border-radius: 12px; margin: 1.5em 0; max-width: 100%; }
              .notion-editor .ql-editor ul, .notion-editor .ql-editor ol { padding-left: 1.5em; }
              .notion-editor .ql-editor li { margin-bottom: 0.3em; }
              .notion-editor .ql-editor .ql-formula { padding: 3px 8px; background: #faf5ff; border-radius: 6px; border: 1px solid #e9d5ff; color: #7c3aed; }
              .notion-editor .ql-editor hr { border: none; border-top: 2px solid #e5e7eb; margin: 2em 0; }
              .notion-editor .ql-editor blockquote { border-left: 4px solid #4f46e5; margin: 1.2em 0; padding: 0.8em 1.2em; color: #4b5563; background: #f8fafc; border-radius: 0 12px 12px 0; font-style: italic; font-size: 1.05em; }
              .notion-editor .ql-editor pre.ql-syntax { background: #1e1e2e !important; color: #cdd6f4 !important; border-radius: 12px; padding: 20px 24px; margin: 1.2em 0; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 14px; line-height: 1.7; overflow-x: auto; border: 1px solid #313244; }
              .notion-editor .ql-editor .ql-video { border-radius: 12px; margin: 1.5em 0; width: 100%; aspect-ratio: 16/9; }
              .notion-editor .ql-snow .ql-tooltip { border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 8px 24px rgba(0,0,0,0.08); padding: 8px 14px; z-index: 100; }
              .notion-editor .ql-snow .ql-tooltip input[type=text] { border-radius: 8px; border: 1px solid #d1d5db; padding: 6px 10px; font-family: 'Manrope', sans-serif; font-size: 13px; }
            `}} />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Mulai menulis ceritamu di sini..."
            />
          </div>

          {/* Floating Toolbar (appears on text selection) */}
          <FloatingToolbar quillRef={quillRef} />

          {/* Plus Button (appears on empty lines) */}
          <PlusButton quillRef={quillRef} onFormulaClick={() => setShowFormulaModal(true)} />
        </div>

        {/* Formula Modal */}
        {showFormulaModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowFormulaModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900">Sisipkan Rumus</h3>
                <p className="text-sm font-['Manrope'] text-gray-400 mt-1">Pilih rumus cepat atau tulis sendiri pakai LaTeX</p>
              </div>

              {/* Preset Tabs */}
              <div className="px-5 pt-3">
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
                  {Object.keys(formulaPresets).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormulaTab(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-['Manrope'] font-semibold whitespace-nowrap transition-colors ${
                        formulaTab === cat ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Preset Grid */}
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                  {formulaPresets[formulaTab]?.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => insertFormula(preset.latex)}
                      className="text-left p-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group overflow-hidden"
                    >
                      <p className="text-xs font-['Manrope'] font-semibold text-gray-500 mb-1.5">{preset.label}</p>
                      <div className="text-sm overflow-x-auto overflow-y-hidden" dangerouslySetInnerHTML={{ __html: katex.renderToString(preset.latex, { throwOnError: false }) }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="p-5 border-t border-gray-100 mt-3">
                <label className="block text-xs font-['Manrope'] font-semibold text-gray-500 mb-2">Atau tulis LaTeX sendiri</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    placeholder="Contoh: x^2 + y^2 = z^2"
                    className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-primary"
                    onKeyDown={(e) => { if (e.key === 'Enter' && formulaInput.trim()) { e.preventDefault(); insertFormula(formulaInput.trim()); }}}
                  />
                  <button
                    onClick={() => { if (formulaInput.trim()) insertFormula(formulaInput.trim()); }}
                    disabled={!formulaInput.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-['Manrope'] font-semibold disabled:opacity-40 hover:bg-indigo-700 transition-colors"
                  >
                    Sisipkan
                  </button>
                </div>
                {formulaInput.trim() && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[10px] font-['Manrope'] text-gray-400 mb-1.5 uppercase tracking-wide">Preview</p>
                    <div dangerouslySetInnerHTML={{ __html: katex.renderToString(formulaInput, { throwOnError: false }) }} />
                  </div>
                )}
              </div>

              {/* Close */}
              <div className="p-4 border-t border-gray-100 flex justify-end">
                <button onClick={() => setShowFormulaModal(false)} className="px-4 py-2 text-sm font-['Manrope'] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom hint — sticky so it respects sidebar layout */}
        {!canPublish && (
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 py-3 z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-['Manrope'] text-gray-400 text-center px-4">
              {!title.trim() ? '✏️  Mulai dengan menulis judul' : !hasContent ? '📝  Tulis isi catatan' : !meta.mataPelajaran ? '🏷️  Pilih kategori mapel dulu sebelum publish' : ''}
            </p>
          </div>
        )}

      </div>
    </MobileLayout>
  );
}