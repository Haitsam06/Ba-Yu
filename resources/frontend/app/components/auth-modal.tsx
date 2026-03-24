import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Eye, EyeOff, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    jenjang: 'SMA', // Default jenjang
  });
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    
    if (activeTab === 'login') {
      const error = await login(formData.email, formData.password);
      if (error) {
         setErrorMsg(error);
         setIsSubmitting(false);
      } else {
         navigate('/home');
         onClose();
      }
    } else {
      const error = await register(formData.name, formData.email, formData.password, formData.jenjang);
      if (error) {
         setErrorMsg(error);
         setIsSubmitting(false);
      } else {
         navigate('/home');
         onClose();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setErrorMsg(null);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-50 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform" />
              </button>

              {/* Header with Gradient */}
              <div className="relative bg-gradient-to-br from-primary via-purple-600 to-primary p-8 pb-16">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full translate-y-16 -translate-x-16 blur-2xl" />

                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3"
                  >
                    <BookOpen className="w-7 h-7 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-white mb-1"
                  >
                    Selamat Datang di Ba-Yu
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90 text-xs"
                  >
                    Platform belajar terpercaya Indonesia
                  </motion.p>
                </div>
              </div>

              {/* Tabs */}
              <div className="relative -mt-10 px-8">
                <div className="bg-white rounded-2xl shadow-xl p-1.5 flex gap-1 border border-gray-100">
                  <button
                    onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
                    className="relative flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  >
                    {activeTab === 'login' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeTab === 'login' ? 'text-white' : 'text-gray-600'}`}>
                      Masuk
                    </span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                    className="relative flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  >
                    {activeTab === 'register' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeTab === 'register' ? 'text-white' : 'text-gray-600'}`}>
                      Daftar
                    </span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 pt-6 pb-6 max-h-[60vh] overflow-y-auto">
                {errorMsg && (
                   <motion.div 
                     initial={{ opacity: 0, y: -10 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center"
                   >
                     {errorMsg}
                   </motion.div>
                )}
                
                <AnimatePresence mode="wait">
                  <motion.form
                    key={activeTab}
                    initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name field - only for register */}
                    {activeTab === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Nama Lengkap
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="nama@email.com"
                          className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-11 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Jenjang field - only for register */}
                    {activeTab === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Jenjang Pendidikan
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <select
                            name="jenjang"
                            value={formData.jenjang}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                            required
                          >
                            <option value="SD">SD (Sekolah Dasar)</option>
                            <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                            <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                            <option value="Kuliah">Kuliah (Perguruan Tinggi)</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Remember me / Forgot password */}
                    {activeTab === 'login' && (
                      <div className="flex items-center justify-between text-xs pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-600">Ingat saya</span>
                        </label>
                        <button
                          type="button"
                          className="text-primary font-semibold hover:underline"
                        >
                          Lupa password?
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 h-11 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 disabled:bg-gray-400 disabled:shadow-none transition-all group"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {activeTab === 'login' ? 'Masuk' : 'Daftar Sekarang'}
                            <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Terms - only for register */}
                    {activeTab === 'register' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[11px] text-gray-500 text-center leading-relaxed"
                      >
                        Dengan mendaftar, kamu menyetujui {' '}
                        <button type="button" className="text-primary font-semibold hover:underline">
                          Syarat & Ketentuan
                        </button>
                      </motion.p>
                    )}
                  </motion.form>
                </AnimatePresence>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600">
                    {activeTab === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                    <button
                      type="button"
                      onClick={() => { setActiveTab(activeTab === 'login' ? 'register' : 'login'); setErrorMsg(null); }}
                      className="text-primary font-bold hover:underline ml-1"
                    >
                      {activeTab === 'login' ? 'Daftar Sekarang' : 'Masuk'}
                    </button>
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}