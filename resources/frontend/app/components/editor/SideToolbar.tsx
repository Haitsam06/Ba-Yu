import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Plus, X, Image as ImageIcon, Film, Code, Terminal, Minus, Quote, Bold, Italic, Underline, Highlighter, Link as LinkIcon, Heading1, Heading2, Calculator, List, ListOrdered } from 'lucide-react';
import { HIGHLIGHT_COLORS } from './editor.constants';
import { PromptDialog } from '../ui/PromptDialog';

interface SideToolbarProps {
  quillRef: React.RefObject<ReactQuill | null>;
  onFormulaClick: () => void;
}

export function SideToolbar({ quillRef, onFormulaClick }: SideToolbarProps) {
  const [position, setPosition] = useState<{ top: number } | null>(null);
  const [formats, setFormats] = useState<Record<string, any>>({});
  const [expandedPlus, setExpandedPlus] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [promptConfig, setPromptConfig] = useState<{
    isOpen: boolean;
    title: string;
    placeholder: string;
    value: string;
    onConfirm: (value: string) => void;
  }>({
    isOpen: false,
    title: '',
    placeholder: '',
    value: '',
    onConfirm: () => {},
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const updatePositionAndFormats = () => {
      const range = quill.getSelection();
      if (range) {
        // Sembunyikan jika yang dipilih adalah gambar
        const [blot] = quill.getLeaf(range.index);
        if (blot && blot.domNode && blot.domNode.tagName === 'IMG') {
          setPosition(null);
          return;
        }

        const bounds = quill.getBounds(range.index);
        const editorRect = (quill.root.parentElement as HTMLElement).getBoundingClientRect();
        
        setPosition({
          top: editorRect.top + bounds.top,
        });
        
        setFormats(quill.getFormat(range.index, range.length));
      }
    };

    quill.on('selection-change', updatePositionAndFormats);
    quill.on('text-change', updatePositionAndFormats);
    window.addEventListener('scroll', updatePositionAndFormats, true);
    window.addEventListener('resize', updatePositionAndFormats);
    
    return () => {
      quill.off('selection-change', updatePositionAndFormats);
      quill.off('text-change', updatePositionAndFormats);
      window.removeEventListener('scroll', updatePositionAndFormats, true);
      window.removeEventListener('resize', updatePositionAndFormats);
    };
  }, [quillRef]);

  // Close on click outside
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpandedPlus(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (!position) return null;

  const quill = quillRef.current?.getEditor();
  if (!quill) return null;

  const toggle = (format: string, value?: any) => {
    const range = quill.getSelection(true);
    if (!range) return;
    const current = quill.getFormat(range.index, range.length);
    if (format === 'header') {
      quill.format('header', current.header === value ? false : value);
    } else if (format === 'link') {
      if (current.link) {
        quill.format('link', false);
      } else {
        setPromptConfig({
          isOpen: true,
          title: 'Sisipkan Link',
          placeholder: 'https://example.com',
          value: '',
          onConfirm: (url) => {
            if (url) quill.format('link', url);
          }
        });
      }
    } else if (format === 'list') {
      quill.format('list', current.list === value ? false : value);
    } else {
      quill.format(format, !current[format]);
    }
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

  const applyHighlight = (color: string) => {
    const range = quill.getSelection(true);
    if (!range) return;
    const current = quill.getFormat(range.index, range.length);
    quill.format('background', current.background === color ? false : color);
    setShowColorPicker(false);
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

  const removeHighlight = () => {
    const range = quill.getSelection(true);
    if (!range) return;
    quill.format('background', false);
    setShowColorPicker(false);
    const newRange = quill.getSelection();
    if (newRange) setFormats(quill.getFormat(newRange.index, newRange.length));
  };

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
              const captionText = "Ketik caption gambar di sini...";
              quill.insertEmbed(range.index, 'image', reader.result, 'user');
              quill.formatText(range.index, 1, 'layout', 'inline');
              quill.insertText(range.index + 1, '\n' + captionText, 'user');
              quill.formatLine(range.index + 2, 1, 'align', 'center');
              quill.formatText(range.index + 2, captionText.length, 'color', '#9ca3af');
              quill.formatText(range.index + 2, captionText.length, 'italic', true);
              quill.insertText(range.index + 2 + captionText.length, '\n', 'user');
              quill.formatLine(range.index + 3 + captionText.length, 1, 'align', false);
              quill.formatText(range.index + 3 + captionText.length, 1, 'color', false);
              quill.formatText(range.index + 3 + captionText.length, 1, 'italic', false);
              quill.setSelection(range.index + 2, captionText.length, 'user');
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        break;
      }
      case 'video': {
        setPromptConfig({
          isOpen: true,
          title: 'Sisipkan Video',
          placeholder: 'Masukkan URL YouTube atau Vimeo...',
          value: '',
          onConfirm: (rawUrl) => {
            if (rawUrl) {
                let finalUrl = rawUrl;
                if (rawUrl.includes('youtu.be/')) {
                    const videoId = rawUrl.split('youtu.be/')[1].split('?')[0];
                    finalUrl = `https://www.youtube.com/embed/${videoId}`;
                } 
                else if (rawUrl.includes('youtube.com/watch')) {
                    const safeUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`; 
                    try {
                        const urlParams = new URLSearchParams(new URL(safeUrl).search);
                        const videoId = urlParams.get('v');
                        if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
                    } catch (e) {}
                }
                const captionText = "Ketik caption video di sini...";
                quill.insertEmbed(range.index, 'video', finalUrl, 'user');
                quill.insertText(range.index + 1, '\n' + captionText, 'user');
                quill.formatLine(range.index + 2, 1, 'align', 'center');
                quill.formatText(range.index + 2, captionText.length, 'color', '#9ca3af');
                quill.formatText(range.index + 2, captionText.length, 'italic', true);
                quill.insertText(range.index + 2 + captionText.length, '\n', 'user');
                quill.formatLine(range.index + 3 + captionText.length, 1, 'align', false);
                quill.formatText(range.index + 3 + captionText.length, 1, 'color', false);
                quill.formatText(range.index + 3 + captionText.length, 1, 'italic', false);
                quill.setSelection(range.index + 2, captionText.length, 'user');
            }
          }
        });
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
    setExpandedPlus(false);
  };

  const editorEl = quill.root.parentElement as HTMLElement;
  const editorRect = editorEl.getBoundingClientRect();

  const actions = [
    { id: 'image', icon: ImageIcon, label: 'Gambar', color: 'text-emerald-500' },
    { id: 'video', icon: Film, label: 'Video', color: 'text-blue-500' },
    { id: 'code', icon: Terminal, label: 'Kode', color: 'text-orange-500' },
    { id: 'formula', icon: Calculator, label: 'Rumus', color: 'text-purple-500' },
    { id: 'divider', icon: Minus, label: 'Pemisah', color: 'text-slate-600' },
    { id: 'quote', icon: Quote, label: 'Kutipan', color: 'text-amber-500' },
  ];

  const btnClass = (active: boolean) =>
    `w-8 h-8 flex items-center justify-center rounded-[10px] transition-all duration-200 ${
      active 
        ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm' 
        : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10'
    }`;

  // Hide on mobile (can be too wide), or adapt left position
  const isMobile = window.innerWidth < 640;
  const leftPos = isMobile ? 8 : editorRect.left - 52;

  return (
    <div
      ref={containerRef}
      className="fixed z-40 flex flex-col items-center gap-1.5 transition-all duration-150 ease-out"
      style={{ top: position.top - 16, left: leftPos }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="bg-white/90 dark:bg-[#1C1A29]/90 backdrop-blur-xl rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-1 flex flex-col items-center gap-0.5 border border-slate-200/60 dark:border-white/10">
         <button className={btnClass(!!formats.bold)} onClick={() => toggle('bold')} title="Bold"><Bold className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
         <button className={btnClass(!!formats.italic)} onClick={() => toggle('italic')} title="Italic"><Italic className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
         <button className={btnClass(!!formats.underline)} onClick={() => toggle('underline')} title="Underline"><Underline className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
         <button className={btnClass(!!formats.code)} onClick={() => toggle('code')} title="Inline Code"><Code className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
         
         <div className="relative">
          <button className={btnClass(!!formats.background)} onClick={() => setShowColorPicker(!showColorPicker)} title="Highlight">
            <Highlighter className="w-[16px] h-[16px]" strokeWidth={2.5} />
            {formats.background && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: formats.background }}></div>}
          </button>
          {showColorPicker && (
            <div className="absolute left-full top-0 ml-2 bg-white/95 dark:bg-[#1C1A29]/95 backdrop-blur-xl rounded-[14px] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-2 border border-slate-200/60 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200" onMouseDown={(e) => e.preventDefault()}>
              <div className="flex items-center gap-1.5">
                  {HIGHLIGHT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => applyHighlight(c.color)}
                      className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 ${formats.background === c.color ? 'border-indigo-500 scale-110 shadow-sm' : 'border-transparent'}`}
                      style={{ background: c.color }}
                      title={c.label}
                    />
                  ))}
              </div>
              <div className="h-px w-full bg-slate-100 dark:bg-white/10" />
              <button
                onClick={removeHighlight}
                className="w-full py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:border-red-500 bg-slate-50 dark:bg-white/5 flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-[11px] font-bold"
                title="Hapus warna"
              >
                <X className="w-3 h-3" strokeWidth={3} />
                Hapus Warna
              </button>
            </div>
          )}
         </div>

          <div className="w-5 h-px bg-slate-200 dark:bg-white/10 my-0.5"></div>
          
          <button className={btnClass(formats.header === 1)} onClick={() => toggle('header', 1)} title="Heading 1"><Heading1 className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
          <button className={btnClass(formats.header === 2)} onClick={() => toggle('header', 2)} title="Heading 2"><Heading2 className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
          <button className={btnClass(formats.list === 'bullet')} onClick={() => toggle('list', 'bullet')} title="Bullet List"><List className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
          <button className={btnClass(formats.list === 'ordered')} onClick={() => toggle('list', 'ordered')} title="Numbered List"><ListOrdered className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
          <button className={btnClass(!!formats.link)} onClick={() => toggle('link')} title="Link"><LinkIcon className="w-[16px] h-[16px]" strokeWidth={2.5} /></button>
          
          <div className="w-5 h-px bg-slate-200 dark:bg-white/10 my-1"></div>

         <div className="relative flex justify-center w-full">
            <button
              onClick={() => setExpandedPlus(!expandedPlus)}
              className={`w-8 h-8 relative z-10 flex items-center justify-center rounded-[10px] transition-all duration-300
                ${expandedPlus ? 'bg-indigo-600 text-white rotate-45 shadow-md shadow-indigo-600/30' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 bg-transparent group'}`}
              title="Sisipkan blok"
            >
              <Plus className="w-[18px] h-[18px] outline-none transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
            </button>

            {/* Expanded actions popping out to the right */}
            <div 
              className={`flex items-center gap-1 bg-white/95 dark:bg-[#1C1A29]/95 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-[14px] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] px-2 py-1.5 absolute left-8 top-1/2 -translate-y-1/2 ml-2 transition-all duration-300 origin-left 
                ${expandedPlus ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' : 'opacity-0 scale-50 -translate-x-4 pointer-events-none'}`}
            >
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => insertBlock(action.id)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95 transition-all group ${action.color}`}
                  title={action.label}
                >
                      <action.icon className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>
       </div>

       <PromptDialog
        isOpen={promptConfig.isOpen}
        onOpenChange={(open) => setPromptConfig(prev => ({ ...prev, isOpen: open }))}
        title={promptConfig.title}
        placeholder={promptConfig.placeholder}
        defaultValue={promptConfig.value}
        onConfirm={promptConfig.onConfirm}
       />
     </div>
   );
 }
