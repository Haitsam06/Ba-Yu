import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './dialog';
import { Input } from './input';
import { Button } from './button';

interface PromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  confirmText?: string;
  cancelText?: string;
}

export function PromptDialog({
  isOpen,
  onOpenChange,
  title,
  placeholder = 'Ketik di sini...',
  defaultValue = '',
  onConfirm,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal'
}: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  const handleConfirm = () => {
    onConfirm(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#1C1A29] border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden p-0 gap-0 shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-['Lexend_Deca'] text-xl font-bold text-gray-900 dark:text-gray-100">{title}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 rounded-2xl h-12 px-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-['Manrope']"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
              if (e.key === 'Escape') {
                onOpenChange(false);
              }
            }}
          />
        </div>
        <DialogFooter className="p-6 pt-2 bg-gray-50/50 dark:bg-white/5 flex flex-row gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
