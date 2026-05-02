import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { formulaPresets } from './editor.constants';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertFormula: (latex: string) => void;
}

export function FormulaModal({ isOpen, onClose, onInsertFormula }: FormulaModalProps) {
  const initialTab = Object.keys(formulaPresets)[0] || '';
  const [formulaTab, setFormulaTab] = useState<string>(initialTab);
  const [formulaInput, setFormulaInput] = useState<string>('');

  if (!isOpen) return null;

  const insertFormula = (latex: string) => {
    onInsertFormula(latex);
    setFormulaInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-['Lexend_Deca'] font-extrabold text-lg text-gray-900">Sisipkan Rumus</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 pt-3">
          {/* Preset Tabs */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar pb-2">
            {Object.keys(formulaPresets).map(cat => (
              <button
                key={cat}
                onClick={() => setFormulaTab(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Manrope'] font-black whitespace-nowrap transition-colors ${
                  formulaTab === cat ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Preset Grid */}
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
            {formulaPresets[formulaTab]?.map(preset => (
              <button
                key={preset.label}
                onClick={() => insertFormula(preset.latex)}
                className="text-left p-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group overflow-hidden"
              >
                <p className="text-xs font-['Manrope'] font-bold text-gray-600 mb-1.5">{preset.label}</p>
                <div
                  className="text-sm overflow-x-auto overflow-y-hidden"
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(preset.latex, { throwOnError: false }) }}
                />
              </button>
            ))}
          </div>
          {/* Custom Input */}
          <div className="p-5 border-t border-gray-100 mt-3">
            <label className="block text-xs font-['Manrope'] font-black text-gray-600 mb-2 uppercase">
              Atau tulis LaTeX sendiri
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formulaInput}
                onChange={e => setFormulaInput(e.target.value)}
                placeholder="Contoh: x^2 + y^2 = z^2"
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-primary"
                onKeyDown={e => {
                  if (e.key === 'Enter' && formulaInput.trim()) {
                    e.preventDefault();
                    insertFormula(formulaInput.trim());
                  }
                }}
              />
              <button
                onClick={() => formulaInput.trim() && insertFormula(formulaInput.trim())}
                disabled={!formulaInput.trim()}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-['Manrope'] font-semibold disabled:opacity-40 hover:bg-indigo-700 transition-colors"
              >
                Sisipkan
              </button>
            </div>
            {formulaInput.trim() && (
              <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-['Manrope'] text-gray-700 mb-1.5 uppercase tracking-wide font-black">
                  Preview
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(formulaInput, { throwOnError: false }) }}
                />
              </div>
            )}
          </div>
          {/* Close */}
          <div className="p-4 border-t border-gray-100 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm font-['Manrope'] font-bold text-gray-600 hover:text-gray-950 transition-colors">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
