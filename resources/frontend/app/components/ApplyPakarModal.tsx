import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { mockCertifications } from '../data/mockData';

interface ApplyPakarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyPakarModal({ isOpen, onClose }: ApplyPakarModalProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    keahlian: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Mock push to the exported array
      mockCertifications.push({
        id: `cert-${Date.now()}`,
        userId: user?.id || user?._id || 'unknown',
        name: formData.name,
        email: formData.email,
        documentUrl: `Sertifikat_${formData.keahlian.replace(/\s+/g, '_')}.pdf`,
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0]
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting && !isSuccess ? onClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {!isSubmitting && !isSuccess && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-[70]"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}

              {isSuccess ? (
                <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-['Lexend_Deca'] text-gray-900 mb-2">Berhasil Terkirim!</h3>
                  <p className="text-gray-500 font-['Manrope']">Sertifikat Anda sedang ditinjau oleh pihak Admin.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl md:text-2xl font-bold font-['Lexend_Deca'] text-gray-900">Sertifikasi Pakar</h2>
                    <p className="text-sm text-gray-500 font-['Manrope'] mt-2 leading-relaxed">
                      Unggah portofolio/sertifikat yang membuktikan keahlian Anda agar bisa divalidasi sebagai Pakar Pendidikan.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-['Manrope']">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all text-sm"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-['Manrope']">
                        Pendidikan Terakhir / Keahlian
                      </label>
                      <input
                        type="text"
                        name="keahlian"
                        value={formData.keahlian}
                        onChange={handleChange}
                        placeholder="Contoh: S1 Matematika Murni"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all text-sm"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-['Manrope']">
                        Unggah Bukti Dokumen (Sertifikat/Ijazah)
                      </label>
                      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-xl px-6 pt-5 pb-6 flex justify-center hover:border-primary transition-colors hover:bg-primary/5 cursor-pointer relative">
                        <input
                           type="file"
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                           required
                           disabled={isSubmitting}
                        />
                        <div className="space-y-1 text-center pointer-events-none">
                          <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                              Pilih File PDF/JPG
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Maks. ukuran 5MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Kirim Pengajuan <FileText className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
