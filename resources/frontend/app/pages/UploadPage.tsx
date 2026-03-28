import { useState, useRef, useCallback } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Tag, Send, Calculator } from 'lucide-react';
import { mataPelajaran } from '../data/mockData';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Make katex available globally for Quill's formula module
if (typeof window !== 'undefined') {
  (window as any).katex = katex;
}

const jenjangOptions = [
  { id: 'SD', label: 'SD', kelas: [1, 2, 3, 4, 5, 6] },
  { id: 'SMP', label: 'SMP', kelas: [7, 8, 9] },
  { id: 'SMA', label: 'SMA/SMK', kelas: [10, 11, 12] },
  { id: 'Kuliah', label: 'Kuliah', kelas: [1, 2, 3, 4, 5, 6, 7, 8] }
];

// Common formula presets per category
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
    kelas: 10,
    semester: 1,
    tags: [] as string[],
    ajukanPakar: false,
  });
  const [tagInput, setTagInput] = useState('');

  const modules = {
    toolbar: {
      container: '#notion-toolbar',
    },
    formula: true,
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image', 'formula',
    'blockquote', 'code-block',
  ];

  const kelasOptions = jenjangOptions.find(j => j.id === meta.jenjang)?.kelas || [];

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

  const handleSubmit = () => {
    if (!canPublish) {
      if (!meta.mataPelajaran) setShowMeta(true);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Catatan berhasil dipublikasikan!');
      navigate('/home');
    }, 800);
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen bg-white">

        {/* Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-20">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-['Manrope'] text-gray-400 hidden sm:block">
                {title.trim() ? title : 'Catatan baru'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMeta(!showMeta)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-['Manrope'] font-medium transition-colors ${
                  showMeta ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-50'
                } ${!meta.mataPelajaran ? 'ring-1 ring-orange-200 text-orange-600' : ''}`}
              >
                <Tag className="w-3.5 h-3.5" />
                {meta.mataPelajaran || 'Kategori'}
                {showMeta ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                onClick={handleSubmit}
                disabled={!canPublish || isSubmitting}
                className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-['Manrope'] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Mengirim...' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Metadata Panel */}
          {showMeta && (
            <div className="border-t border-gray-100 bg-gray-50/80">
              <div className="max-w-4xl mx-auto px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[11px] font-['Manrope'] font-bold text-gray-400 uppercase tracking-wide mb-1">Mapel *</label>
                    <select
                      value={meta.mataPelajaran}
                      onChange={(e) => setMeta({ ...meta, mataPelajaran: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-['Manrope'] focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value="">Pilih...</option>
                      {mataPelajaran.map((m) => (
                        <option key={m.id} value={m.name}>{m.icon} {m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-['Manrope'] font-bold text-gray-400 uppercase tracking-wide mb-1">Jenjang</label>
                    <select
                      value={meta.jenjang}
                      onChange={(e) => setMeta({ ...meta, jenjang: e.target.value, kelas: jenjangOptions.find(j => j.id === e.target.value)?.kelas[0] || 1 })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-['Manrope'] focus:outline-none focus:border-primary appearance-none"
                    >
                      {jenjangOptions.map((j) => (
                        <option key={j.id} value={j.id}>{j.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-['Manrope'] font-bold text-gray-400 uppercase tracking-wide mb-1">Kelas</label>
                    <select
                      value={meta.kelas}
                      onChange={(e) => setMeta({ ...meta, kelas: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-['Manrope'] focus:outline-none focus:border-primary appearance-none"
                    >
                      {kelasOptions.map((k) => (
                        <option key={k} value={k}>Kelas {k}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-['Manrope'] font-bold text-gray-400 uppercase tracking-wide mb-1">Semester</label>
                    <select
                      value={meta.semester}
                      onChange={(e) => setMeta({ ...meta, semester: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-['Manrope'] focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value={1}>Semester 1</option>
                      <option value={2}>Semester 2</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
                    placeholder="Tambah tag, tekan Enter..."
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-['Manrope'] focus:outline-none focus:border-primary"
                  />
                  {meta.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-['Manrope'] font-medium shrink-0">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 ml-0.5">&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul"
            className="w-full text-[2.5rem] font-['Lexend_Deca'] font-bold text-gray-900 placeholder:text-gray-200 focus:outline-none mt-10 mb-2 leading-tight tracking-tight"
            maxLength={100}
          />
          <p className="text-xs font-['Manrope'] text-gray-300 mb-6">{title.length}/100</p>

          {/* Single unified toolbar */}
          <div id="notion-toolbar" className="editor-toolbar">
            <span className="ql-formats">
              <select className="ql-header">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="">Normal</option>
              </select>
            </span>
            <span className="ql-formats">
              <button className="ql-bold" title="Bold"></button>
              <button className="ql-italic" title="Italic"></button>
              <button className="ql-underline" title="Underline"></button>
              <button className="ql-strike" title="Strikethrough"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-list" value="ordered" title="Numbered List"></button>
              <button className="ql-list" value="bullet" title="Bullet List"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-link" title="Link"></button>
              <button className="ql-image" title="Upload Gambar"></button>
            </span>
            <span className="ql-formats">
              <button className="ql-formula" title="Sisipkan Rumus"></button>
              <button className="ql-custom-formula" title="Template Rumus" onClick={() => setShowFormulaModal(true)}>
                <Calculator className="w-4 h-4" />
              </button>
            </span>
            <span className="ql-formats">
              <button className="ql-clean" title="Hapus Format"></button>
            </span>
          </div>

          {/* Editor */}
          <div className="notion-editor pb-32">
            <style dangerouslySetInnerHTML={{ __html: `
              .editor-toolbar.ql-toolbar.ql-snow {
                border: none !important;
                border-bottom: 1px solid #e5e7eb !important;
                padding: 10px 0 !important;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 2px;
                position: sticky;
                top: 0;
                background: white;
                z-index: 10;
              }
              .editor-toolbar .ql-formats { display: flex !important; align-items: center; gap: 2px; margin-right: 8px !important; padding-right: 10px; border-right: 1px solid #e5e7eb; }
              .editor-toolbar .ql-formats:last-child { border-right: none; margin-right: 0 !important; padding-right: 0; }
              .editor-toolbar button { width: 34px !important; height: 34px !important; border-radius: 8px !important; padding: 6px !important; display: flex !important; align-items: center; justify-content: center; color: #6b7280 !important; }
              .editor-toolbar button .ql-stroke { stroke: #6b7280 !important; }
              .editor-toolbar button .ql-fill { fill: #6b7280 !important; }
              .editor-toolbar button:hover { background: #e5e7eb !important; color: #111827 !important; }
              .editor-toolbar button:hover .ql-stroke { stroke: #111827 !important; }
              .editor-toolbar button:hover .ql-fill { fill: #111827 !important; }
              .editor-toolbar button.ql-active { background: #eef2ff !important; color: #4f46e5 !important; }
              .editor-toolbar button.ql-active .ql-stroke { stroke: #4f46e5 !important; }
              .editor-toolbar button.ql-active .ql-fill { fill: #4f46e5 !important; }
              .editor-toolbar .ql-picker { height: 34px !important; }
              .editor-toolbar .ql-picker-label { border-radius: 8px !important; padding: 4px 10px !important; border: 1px solid #d1d5db !important; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 600; color: #374151; background: #f9fafb; }
              .editor-toolbar .ql-picker-label:hover { background: #e5e7eb !important; color: #111827; }
              .editor-toolbar .ql-picker-options { border-radius: 12px !important; border: 1px solid #d1d5db !important; box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; padding: 6px !important; margin-top: 4px !important; background: white; }
              .editor-toolbar .ql-picker-item { border-radius: 6px !important; padding: 6px 10px !important; font-family: 'Manrope', sans-serif; }
              .editor-toolbar .ql-picker-item:hover { background: #eef2ff !important; color: #4f46e5 !important; }
              .notion-editor .ql-container.ql-snow { border: none !important; font-family: 'Manrope', sans-serif; font-size: 16px; }
              .notion-editor .ql-editor { padding: 24px 0 !important; min-height: 500px; line-height: 1.9; color: #1f2937; }
              .notion-editor .ql-editor.ql-blank::before { color: #d1d5db; font-style: normal; font-family: 'Manrope', sans-serif; left: 0 !important; }
              .notion-editor .ql-editor h1 { font-family: 'Lexend Deca', sans-serif; font-size: 1.75em; font-weight: 700; margin: 1em 0 0.4em; color: #111827; }
              .notion-editor .ql-editor h2 { font-family: 'Lexend Deca', sans-serif; font-size: 1.35em; font-weight: 700; margin: 0.8em 0 0.3em; color: #1f2937; }
              .notion-editor .ql-editor h3 { font-family: 'Lexend Deca', sans-serif; font-size: 1.15em; font-weight: 600; margin: 0.6em 0 0.3em; color: #374151; }
              .notion-editor .ql-editor p { margin-bottom: 0.5em; }
              .notion-editor .ql-editor img { border-radius: 12px; margin: 1em 0; max-width: 100%; }
              .notion-editor .ql-editor ul, .notion-editor .ql-editor ol { padding-left: 1.5em; }
              .notion-editor .ql-editor li { margin-bottom: 0.3em; }
              .notion-editor .ql-editor .ql-formula { padding: 3px 8px; background: #faf5ff; border-radius: 6px; border: 1px solid #e9d5ff; color: #7c3aed; }
              .notion-editor .ql-snow .ql-tooltip { border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 8px 24px rgba(0,0,0,0.08); padding: 8px 14px; z-index: 100; }
              .notion-editor .ql-snow .ql-tooltip input[type=text] { border-radius: 8px; border: 1px solid #d1d5db; padding: 6px 10px; font-family: 'Manrope', sans-serif; font-size: 13px; }
              .notion-editor .ql-snow .ql-tooltip a.ql-action, .notion-editor .ql-snow .ql-tooltip a.ql-remove { font-family: 'Manrope', sans-serif; font-size: 13px; }
            `}} />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Mulai menulis di sini..."
            />
          </div>
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

        {/* Bottom hint */}
        {!canPublish && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 py-3 z-10">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-sm font-['Manrope'] text-gray-400 text-center">
                {!title.trim() ? 'Mulai dengan menulis judul' : !hasContent ? 'Tulis isi catatan' : !meta.mataPelajaran ? 'Pilih kategori mapel dulu sebelum publish' : ''}
              </p>
            </div>
          </div>
        )}

      </div>
    </MobileLayout>
  );
}