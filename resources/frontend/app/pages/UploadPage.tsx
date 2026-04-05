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
import Cropper from 'react-easy-crop';
import { useToast } from '../contexts/ToastContext';

async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err: any) => reject(err));
    if (imageSrc.startsWith('http')) {
      img.setAttribute('crossOrigin', 'anonymous');
    }
    img.src = imageSrc;
  });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return canvas.toDataURL('image/jpeg', 0.9);
}

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

const ImageFormat = Quill.import('formats/image') as any;
class CustomImage extends ImageFormat {
  static create(value: any) {
    if (typeof value === 'string') {
      return super.create(value);
    }
    const node = super.create(value.src);
    if (value.layout) node.setAttribute('data-layout', value.layout);
    if (value.alt) node.setAttribute('alt', value.alt);
    return node;
  }
  static formats(domNode: Element) {
    return {
      layout: domNode.getAttribute('data-layout') || 'inline',
      alt: domNode.getAttribute('alt') || ''
    };
  }
  format(name: string, value: any) {
    if (name === 'layout') {
      if (value) {
        this.domNode.setAttribute('data-layout', value);
      } else {
        this.domNode.removeAttribute('data-layout');
      }
    } else if (name === 'alt') {
      if (value) {
        this.domNode.setAttribute('alt', value);
      } else {
        this.domNode.removeAttribute('alt');
      }
    } else {
      super.format(name, value);
    }
  }
}
Quill.register(CustomImage, true);

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
        // Block text toolbar if an image is selected
        const [blot] = quill.getLeaf(range.index);
        if (blot && blot.domNode && blot.domNode.tagName === 'IMG') {
          setPosition(null);
          setShowColorPicker(false);
          return;
        }

        const quillBounds = quill.getBounds(range.index, range.length);
        const editorRect = (quill.root.parentElement as HTMLElement).getBoundingClientRect();
        const toolbarWidth = 380;
        let left = editorRect.left + quillBounds.left + (quillBounds.width / 2) - (toolbarWidth / 2);
        // Keep within viewport bounds
        left = Math.max(8, Math.min(left, window.innerWidth - toolbarWidth - 8));
        setPosition({
          top: editorRect.top + quillBounds.top - 52,
          left,
        });
        setFormats(quill.getFormat(range.index, range.length));
      } else {
        setPosition(null);
        setShowColorPicker(false);
      }
    };

    const updatePosition = () => {
      const range = quill.getSelection();
      if (range) handleSelectionChange(range);
    };

    quill.on('selection-change', handleSelectionChange);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      quill.off('selection-change', handleSelectionChange);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
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

// ========== FLOATING IMAGE TOOLBAR ==========
function FloatingImageToolbar({ quillRef, onEditAlt }: { quillRef: React.RefObject<ReactQuill | null>; onEditAlt: (index: number, currentAlt: string) => void }) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [currentLayout, setCurrentLayout] = useState('inline');
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleSelectionChange = (range: any) => {
      if (range && range.length === 1) {
        const [blot] = quill.getLeaf(range.index);
        if (blot && blot.domNode && blot.domNode.tagName === 'IMG') {
          const imgRect = blot.domNode.getBoundingClientRect();
          const editorRect = (quill.root.parentElement as HTMLElement).getBoundingClientRect();
          
          const toolbarWidth = 220;
          let left = editorRect.left + (imgRect.left - editorRect.left) + (imgRect.width / 2) - (toolbarWidth / 2);
          left = Math.max(8, Math.min(left, window.innerWidth - toolbarWidth - 8));
          
          setPosition({
            top: imgRect.top - 52,
            left,
          });
          setActiveImageIndex(range.index);
          const layout = blot.domNode.getAttribute('data-layout') || 'inline';
          setCurrentLayout(layout);
          return;
        }
      }
      setPosition(null);
      setActiveImageIndex(null);
    };

    const handleEditorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        const blot = Quill.find(target);
        if (blot) {
          const index = quill.getIndex(blot);
          const currentSelection = quill.getSelection();
          if (!currentSelection || currentSelection.index !== index || currentSelection.length !== 1) {
            quill.setSelection(index, 1, 'user');
          }
        }
      }
    };

    const updatePosition = () => {
      if (activeImageIndex !== null) {
        const range = quill.getSelection();
        if (range) handleSelectionChange(range);
      }
    };

    quill.root.addEventListener('click', handleEditorClick);
    quill.on('selection-change', handleSelectionChange);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => { 
        quill.root.removeEventListener('click', handleEditorClick);
        quill.off('selection-change', handleSelectionChange); 
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
    };
  }, [quillRef]);

  if (!position || activeImageIndex === null) return null;

  const setLayout = (layout: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    quill.formatText(activeImageIndex, 1, 'layout', layout);
    setCurrentLayout(layout);
  };

  const handleAltClick = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const [blot] = quill.getLeaf(activeImageIndex);
    if (blot && blot.domNode) {
        const currentAlt = blot.domNode.getAttribute('alt') || '';
        onEditAlt(activeImageIndex, currentAlt);
    }
  };

  const btnClass = (active: boolean) =>
    `w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${active ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/10'}`;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-150"
      style={{ top: position.top, left: position.left }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] px-1.5 py-1.5 flex items-center gap-1 border border-white/10 relative">
        <button className={btnClass(currentLayout === 'inline')} onClick={() => setLayout('inline')} title="Standard / Center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><rect x="7" y="5" width="10" height="14" rx="2"/><line x1="10" y1="9" x2="14" y2="9"/><line x1="10" y1="13" x2="14" y2="13"/></svg>
        </button>
        <button className={btnClass(currentLayout === 'wide')} onClick={() => setLayout('wide')} title="Lebar (Wide)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><rect x="4" y="5" width="16" height="14" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="17" y2="13"/></svg>
        </button>
        <button className={btnClass(currentLayout === 'fullBleed')} onClick={() => setLayout('fullBleed')} title="Penuh (Full Bleed)">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="13" x2="20" y2="13"/></svg>
        </button>
        
        <div className="w-px h-5 bg-white/20 mx-1.5"></div>
        
        <button onClick={handleAltClick} className="px-3 h-8 text-[12px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          Alt text
        </button>
        
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900/95 border-b border-r border-white/10 rotate-45" />
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
            top: editorRect.top + bounds.top,
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

    const updatePosition = () => {
      const range = quill.getSelection();
      if (range) handleSelectionChange(range);
    };

    quill.on('selection-change', handleSelectionChange);
    quill.on('text-change', handleTextChange);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      quill.off('selection-change', handleSelectionChange);
      quill.off('text-change', handleTextChange);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
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
              quill.formatText(range.index, 1, 'layout', 'inline');
              quill.insertText(range.index + 1, '\n', 'user');
              quill.formatLine(range.index + 1, 1, 'align', 'center');
              quill.insertText(range.index + 2, '\n', 'user');
              quill.formatLine(range.index + 2, 1, 'align', false);
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
          quill.insertText(range.index + 1, '\n', 'user');
          quill.formatLine(range.index + 1, 1, 'align', 'center');
          quill.insertText(range.index + 2, '\n', 'user');
          quill.formatLine(range.index + 2, 1, 'align', false);
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
      className="fixed z-40 flex items-center"
      style={{ top: position.top - 8, left: editorRect.left - 48 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-10 h-10 relative z-10 flex items-center justify-center rounded-full border transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          ${expanded ? 'border-gray-900 bg-gray-900 text-white rotate-45 shadow-lg shadow-gray-900/20' : 'border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 bg-white group'}`}
        title="Sisipkan blok"
      >
        <Plus className="w-6 h-6 outline-none transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
      </button>

      <div 
        className={`flex items-center gap-1 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] px-2 py-1.5 absolute left-8 pl-4 transition-all duration-300 origin-left 
          ${expanded ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' : 'opacity-0 scale-50 -translate-x-6 pointer-events-none'}`}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => insertBlock(action.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 active:scale-95 transition-all group ${action.color}`}
            title={action.label}
          >
                <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              </button>
            ))}
      </div>
    </div>
  );
}

// ========== MAIN UPLOAD PAGE ==========
export default function UploadPage() {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [formulaInput, setFormulaInput] = useState('');
  const [formulaTab, setFormulaTab] = useState('Umum');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractedThumbnail, setExtractedThumbnail] = useState<string | null>(null);
  const [finalThumbnail, setFinalThumbnail] = useState<string | null>(null);
  const [thumbnailFit, setThumbnailFit] = useState<'cover' | 'contain'>('cover');
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [previewDescription, setPreviewDescription] = useState('');
  const [descriptionEdited, setDescriptionEdited] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [altModalParams, setAltModalParams] = useState<{ index: number; text: string } | null>(null);

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
    'blockquote', 'code-block', 'divider', 'layout', 'alt', 'align'
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
  // We allow clicking the first publish to open modal regardless of metadata
  const canOpenPreview = title.trim() && hasContent;
  const canPublishFinal = title.trim() && hasContent && meta.mataPelajaran;

  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index);
    const newThumb = availableImages[index];
    setExtractedThumbnail(newThumb);
    setFinalThumbnail(newThumb);
    setThumbnailFit('cover');
    setIsCropping(false);
  };

  const handleOpenPreview = () => {
    if (!canOpenPreview) return;
    
    const urls: string[] = [];
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    setAvailableImages(urls);
    
    if (urls.length > 0) {
        if (!extractedThumbnail || !urls.includes(extractedThumbnail)) {
            setExtractedThumbnail(urls[0]);
            setFinalThumbnail(urls[0]);
            setSelectedImageIndex(0);
            setThumbnailFit('cover');
        } else {
            setSelectedImageIndex(urls.indexOf(extractedThumbnail));
        }
    } else {
        setExtractedThumbnail(null);
        if(!finalThumbnail) setFinalThumbnail(null);
    }
    
    setIsCropping(false);
    if (!descriptionEdited) {
      const strippedContent = content.replace(/<[^>]*>?/gm, '');
      setPreviewDescription(strippedContent.length > 150 ? strippedContent.substring(0, 150) + '...' : strippedContent);
    }
    setShowPreviewModal(true);
  };

  const handleApplyCrop = async () => {
    if (extractedThumbnail && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(extractedThumbnail, croppedAreaPixels);
        setFinalThumbnail(croppedImage);
        setThumbnailFit('cover');
        setIsCropping(false);
      } catch (e) {
        console.error('Failed to crop image', e);
        showToast('Gagal menerapkan crop gambar. Pastikan format gambar valid.', 'error');
      }
    }
  };

  const handleSubmit = async () => {
    if (!canPublishFinal) return;
    setIsSubmitting(true);

    try {
      await axios.post('/api/v1/posts', {
        title: title.trim(),
        content: content,
        description: previewDescription,
        thumbnail: finalThumbnail || extractedThumbnail,
        thumbnail_fit: thumbnailFit,
        mapel: meta.mataPelajaran,
        jenjang: meta.jenjang,
        kelas: meta.kelas.toString(),
        semester: meta.semester.toString(),
        tags: meta.tags,
        visibility: 'public'
      });
      showToast('Catatan berhasil dipublikasikan!', 'success');
      navigate(-1);
    } catch (error) {
      console.error('Gagal mempublikasikan catatan:', error);
      showToast('Terjadi kesalahan saat menyimpan catatan.', 'error');
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
                onClick={handleOpenPreview}
                disabled={!canOpenPreview}
                className="flex items-center gap-1.5 bg-emerald-600 text-white px-5 py-2.5 rounded-full text-[13px] font-['Lexend_Deca'] font-extrabold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 hover:shadow-[0_4px_12px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200"
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* Story Preview Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-12">
                <h1 className="font-['Lexend_Deca'] font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">Story Preview</h1>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-8 h-8" strokeWidth={2} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                
                {/* Left Side: Thumbnail Preview */}
                <div className="flex-1 max-w-xl">
                  <div className={`w-full aspect-video bg-gray-50 rounded-2xl bg-gray-100/80 mb-4 flex flex-col items-center justify-center text-center p-8 border border-gray-200/50 relative overflow-hidden group ${isCropping ? 'ring-4 ring-primary' : ''}`}>
                    {isCropping && extractedThumbnail ? (
                      <div className="absolute inset-0 z-20 bg-black">
                        <Cropper
                          image={extractedThumbnail}
                          crop={crop}
                          zoom={zoom}
                          aspect={16 / 9}
                          onCropChange={setCrop}
                          onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels as any)}
                          onZoomChange={setZoom}
                        />
                        <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                           <button onClick={() => setIsCropping(false)} className="px-3 py-1.5 bg-gray-900/50 text-white rounded text-xs font-bold hover:bg-gray-900/80 transition-colors">Batal</button>
                           <button onClick={handleApplyCrop} className="px-3 py-1.5 bg-primary text-white rounded text-xs font-bold shadow-md hover:bg-primary/90 transition-colors">Terapkan Crop</button>
                        </div>
                      </div>
                    ) : finalThumbnail || extractedThumbnail ? (
                      <img src={finalThumbnail || extractedThumbnail!} alt="Thumbnail" className={`absolute inset-0 w-full h-full ${thumbnailFit === 'cover' ? 'object-cover' : 'object-contain'}`} />
                    ) : (
                      <>
                        <h4 className="font-['Manrope'] font-semibold text-gray-500 mb-2">Include a high-quality image in your story to make it more inviting to readers.</h4>
                        <p className="text-xs text-gray-400 font-['Manrope']">Gambar yang kamu tambahkan di dalam tulisan otomatis akan tampil di sini.</p>
                      </>
                    )}

                    {!isCropping && extractedThumbnail && (
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                         <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
                            <button onClick={() => { setFinalThumbnail(extractedThumbnail); setThumbnailFit('contain'); }} className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${thumbnailFit==='contain' && finalThumbnail === extractedThumbnail ? 'bg-gray-900 text-white':'text-gray-500 hover:bg-gray-100'}`}>Tampil Utuh</button>
                            <button onClick={() => setIsCropping(true)} className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">Sesuaikan Ruang Crop</button>
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Selector Carousel */}
                  {!isCropping && availableImages.length > 1 && (
                    <div className="mb-4 animate-in fade-in zoom-in-95 duration-300">
                      <p className="text-[13px] font-['Lexend_Deca'] font-extrabold text-gray-900 mb-2.5">Pilih Sampul Khusus</p>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                         {availableImages.map((img, idx) => (
                             <button 
                               key={idx}
                               onClick={() => handleSelectImage(idx)}
                               className={`w-[88px] h-[52px] shrink-0 rounded-[10px] overflow-hidden border-2 transition-all duration-200 cursor-pointer ${selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/30 scale-[1.02] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                               title={`Gambar ${idx+1}`}
                             >
                                <img src={img} alt={`Pilihan Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                             </button>
                         ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 font-['Manrope'] text-gray-500 border-b border-gray-100 pb-6 group">
                    <div className="relative">
                      <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ubah judul catatan..."
                        className="w-full font-['Lexend_Deca'] text-xl font-bold text-gray-900 mb-1 border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none bg-transparent transition-colors py-1"
                      />
                      <textarea 
                        value={previewDescription}
                        onChange={(e) => {
                           setPreviewDescription(e.target.value);
                           setDescriptionEdited(true);
                        }}
                        placeholder="Tulis subjudul/ringkasan singkat yang menarik..."
                        className="w-full text-sm leading-relaxed border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none bg-transparent transition-colors resize-none overflow-hidden min-h-[60px]"
                        rows={3}
                      />
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-400 font-['Manrope'] font-medium mt-4">
                    Note: Perubahan metadata di sini akan memengaruhi cara catatanmu ditemukan oleh pelajar lain di Ba-Yu.
                  </p>
                </div>

                {/* Right Side: Meta Inputs */}
                <div className="w-full lg:w-[400px] shrink-0">
                  
                  {/* Mapel Row */}
                  <div className="mb-8">
                     <p className="font-['Lexend_Deca'] font-bold text-gray-900 text-[15px] mb-2">Kategori Mapel <span className="text-red-500">*</span></p>
                     <p className="text-[13px] text-gray-500 font-['Manrope'] mb-3">Bantu pelajar menemukan catatan spesifik.</p>
                     
                     {/* Horizontal Scroll for Mapel - cleaner UX */}
                     <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-2 px-2">
                      {mataPelajaran.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMeta({ ...meta, mataPelajaran: m.name })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-['Manrope'] font-semibold border transition-all duration-200 shrink-0 ${
                            meta.mataPelajaran === m.name
                              ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span>{m.icon}</span> {m.name}
                        </button>
                      ))}
                     </div>
                  </div>

                  {/* Pendidikan & Kelas Row */}
                  <div className="mb-8">
                     <p className="font-['Lexend_Deca'] font-bold text-gray-900 text-[15px] mb-2">Tingkat Pendidikan</p>
                     <p className="text-[13px] text-gray-500 font-['Manrope'] mb-3">Tentukan audiens kelas sasaran catatan ini.</p>
                     
                     <div className="flex gap-2 flex-wrap mb-3">
                      {jenjangOptions.map((j) => (
                        <button
                          key={j.id}
                          onClick={() => setMeta({ ...meta, jenjang: j.id, kelas: j.kelas[0], semester: 1 })}
                          className={`px-3 py-1 rounded-full text-[12px] font-['Lexend_Deca'] font-bold border transition-all duration-200 ${
                            meta.jenjang === j.id
                              ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                          }`}
                        >
                          {j.label}
                        </button>
                      ))}
                     </div>

                     <div className="flex gap-3">
                        <select
                          value={meta.kelas}
                          onChange={(e) => setMeta({ ...meta, kelas: e.target.value })}
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-['Manrope'] font-semibold focus:outline-none focus:border-primary transition-all cursor-pointer"
                        >
                          {kelasOptions.map((k) => (
                            <option key={k} value={k}>{meta.jenjang === 'Kuliah' ? k : `Kelas ${k}`}</option>
                          ))}
                        </select>

                        <select
                          value={meta.semester}
                          onChange={(e) => setMeta({ ...meta, semester: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-['Manrope'] font-semibold focus:outline-none focus:border-primary transition-all cursor-pointer"
                        >
                          {Array.from({ length: maxSemester }, (_, i) => i + 1).map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </select>
                     </div>
                  </div>

                  {/* Tags Row */}
                  <div className="mb-10">
                    <p className="font-['Lexend_Deca'] font-bold text-gray-900 text-[15px] mb-2">Tags / Keywords</p>
                    <p className="text-[13px] text-gray-500 font-['Manrope'] mb-3">Tambahkan hingga 5 kata kunci agar mudah dicari.</p>
                    
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
                      placeholder="Add a topic (press Enter)..."
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg text-[14px] font-['Manrope'] focus:outline-none focus:bg-white focus:border-primary/50 transition-all mb-3"
                    />
                    
                    <div className="flex flex-wrap gap-2">
                       {meta.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-[12px] font-['Manrope'] font-semibold shrink-0">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publish Area */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                     <button
                        onClick={handleSubmit}
                        disabled={!canPublishFinal || isSubmitting}
                        className="bg-emerald-600 text-white px-7 py-2 rounded-full text-[14px] font-['Manrope'] font-bold disabled:opacity-40 hover:bg-emerald-700 transition-colors cursor-pointer"
                     >
                        {isSubmitting ? 'Publishing...' : 'Publish now'}
                     </button>
                     <button className="text-[14px] font-['Manrope'] text-gray-500 hover:text-gray-900 transition-colors">
                        Simpan draf
                     </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

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
              .notion-editor .ql-editor p { margin-bottom: 0.5em; position: relative; }
              /* Caption Placeholder via CSS */
              .notion-editor .ql-editor p:has(img) + p.ql-align-center:has(> br:only-child)::before,
              .notion-editor .ql-editor .ql-video + p.ql-align-center:has(> br:only-child)::before {
                 content: "Type caption for image (optional)";
                 color: #9ca3af;
                 display: block;
                 text-align: center;
                 font-style: italic;
                 font-size: 0.9em;
                 pointer-events: none;
              }
              .notion-editor .ql-editor img, .notion-editor .ql-editor .ql-video { 
                  border-radius: 12px; 
                  display: block !important; 
                  margin-left: auto !important; 
                  margin-right: auto !important; 
                  margin-top: 2em !important; 
                  margin-bottom: 0.5em !important; 
                  cursor: pointer; 
                  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              }
              /* Layout Modifications */
              .notion-editor .ql-editor img[data-layout="inline"] {
                  max-width: 70%;
              }
              .notion-editor .ql-editor img[data-layout="wide"] {
                  max-width: 100%;
                  width: 100%;
              }
              .notion-editor .ql-editor img[data-layout="fullBleed"] {
                  max-width: none;
                  width: 100vw !important;
                  margin-left: 50% !important;
                  transform: translateX(-50%);
                  border-radius: 0;
                  height: auto;
                  object-fit: contain;
                  max-height: 85vh;
              }
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

          {/* Floating Image Toolbar */}
          <FloatingImageToolbar quillRef={quillRef} onEditAlt={(index, text) => setAltModalParams({ index, text })} />

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

        {/* Alt Text Modal */}
        {altModalParams && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAltModalParams(null)}>
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900">Alternative text</h3>
                  <p className="text-[13px] font-['Manrope'] text-gray-400 mt-1">Deskripsikan gambar ini untuk pembaca dengan gangguan penglihatan</p>
                </div>
                <button onClick={() => setAltModalParams(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-5">
                <textarea 
                  value={altModalParams.text}
                  onChange={(e) => setAltModalParams({ ...altModalParams, text: e.target.value })}
                  placeholder="Contoh: Seorang guru sedang mengajar di depan kelas yang berisi murid-murid..."
                  className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-['Manrope'] focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => setAltModalParams(null)} className="px-5 py-2 text-sm font-['Manrope'] font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Batal</button>
                <button onClick={() => {
                  const quill = quillRef.current?.getEditor();
                  if (quill) quill.formatText(altModalParams.index, 1, 'alt', altModalParams.text);
                  setAltModalParams(null);
                }} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-['Manrope'] font-semibold hover:bg-emerald-700 transition-colors shadow-sm">Simpan</button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom hint — sticky so it respects sidebar layout */}
        {!canOpenPreview && (
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 py-3 z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-['Manrope'] text-gray-400 text-center px-4">
              {!title.trim() ? '✏️  Mulai dengan menulis judul' : !hasContent ? '📝  Tulis isi catatan' : ''}
            </p>
          </div>
        )}

      </div>
    </MobileLayout>
  );
}