import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AltTextModalProps {
  isOpen: boolean;
  initialText: string;
  onClose: () => void;
  onSave: (text: string) => void;
}

export function AltTextModal({ isOpen, initialText, onClose, onSave }: AltTextModalProps) {
  const [text, setText] = useState<string>(initialText);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#1C1A29] rounded-2xl w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <h3 className="font-['Lexend_Deca'] font-extrabold text-lg text-gray-900 dark:text-gray-100">Alternative Text</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Deskripsikan gambar untuk pembaca dengan gangguan penglihatan..."
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-['Manrope'] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary resize-none"
          />
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-white/5 flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 text-sm font-['Manrope'] font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
            Batal
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-['Manrope'] font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
