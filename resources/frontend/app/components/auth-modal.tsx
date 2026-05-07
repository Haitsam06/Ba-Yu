import { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, BookOpen, ArrowRight, GraduationCap, Loader2, Sparkles, CheckCircle, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import ApplicationLogo from './ApplicationLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    jenjang: 'SMA',
  });
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Sync defaultTab 
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    
    if (activeTab === 'login') {
      const error = await login(formData.email, formData.password, rememberMe);
      if (error) {
         setErrorMsg(error);
         setIsSubmitting(false);
      } else {
         const email = formData.email.toLowerCase();
         if (email === "admin@gmail.com") {
             navigate("/admin");
         } else if (email === "pakar@gmail.com") {
             navigate("/pakar");
         } else {
             navigate("/home");
         }
         onClose();
      }
    } else {
      const error = await register(formData.name, formData.email, formData.password, formData.jenjang);
      if (error) {
         setErrorMsg(error);
         setIsSubmitting(false);
      } else {
         navigate("/home");
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

  if (!isOpen) return null;

  const inputClass = "w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 placeholder:text-gray-400 shadow-sm";
  const labelClass = "block text-[13px] font-['Lexend_Deca'] font-bold text-gray-800 pl-1 mb-1.5";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 group-focus-within:text-indigo-600 transition-colors duration-200";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        style={{ transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />

          {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          className={`bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[440px] max-h-[min(700px,92vh)] flex flex-col overflow-hidden relative ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Subtle Background Decorations */}
          <div className="absolute top-[-5%] right-[-5%] w-48 h-48 bg-indigo-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-purple-100/30 rounded-full blur-3xl -z-10"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all z-50 group border border-gray-200 shadow-sm"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:rotate-90 group-hover:text-gray-900 transition-all duration-300" strokeWidth={2.5} />
          </button>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-8 px-6 sm:px-10">
            {activeTab !== 'forgot' && (
              <div className="mb-6">
                {/* Logo & Title */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center mb-4">
                    <ApplicationLogo className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-md" />
                  </div>
                  <h2 className="font-['Lexend_Deca'] text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-tight tracking-tight">
                    {activeTab === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
                  </h2>
                  <p className="font-['Manrope'] text-[14px] text-gray-600 font-medium">
                    {activeTab === 'login' 
                      ? "Masuk untuk mengakses semua fitur Ba-Yu." 
                      : "Daftar dan mulai kelola catatanmu sekarang."}
                  </p>
                </div>

                {/* Tab Switcher - Clean Style */}
                <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
                  <button
                    onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
                    className={`flex-1 py-2 rounded-xl font-['Lexend_Deca'] text-[13px] sm:text-[14px] font-bold transition-all duration-300 outline-none ${
                      activeTab === 'login'
                        ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                    className={`flex-1 py-2 rounded-xl font-['Lexend_Deca'] text-[13px] sm:text-[14px] font-bold transition-all duration-300 outline-none ${
                      activeTab === 'register'
                        ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Daftar Baru
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl animate-in zoom-in-95 duration-200">
                <p className="text-[13px] font-['Manrope'] font-bold text-red-600 flex items-center justify-center gap-2 text-center">
                  <X className="w-4 h-4" /> {errorMsg}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab !== 'forgot' && (<>
                {/* Name — Register Only */}
                {activeTab === 'register' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                    <label className={labelClass}>Nama Lengkap</label>
                    <div className="relative group">
                      <User className={iconClass} strokeWidth={2.5} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass}
                        required={activeTab === 'register'}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Alamat Email</label>
                  <div className="relative group">
                    <Mail className={iconClass} strokeWidth={2.5} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Password</label>
                  <div className="relative group">
                    <Lock className={iconClass} strokeWidth={2.5} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`${inputClass} !pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 focus:outline-none p-1 rounded-full transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-[18px] h-[18px]" strokeWidth={2.5} /> : <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                {/* Jenjang — Register Only */}
                {activeTab === 'register' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                    <label className={labelClass}>Jenjang Pendidikan</label>
                    <div className="relative group">
                      <GraduationCap className={`${iconClass} pointer-events-none`} strokeWidth={2.5} />
                      <select
                        name="jenjang"
                        value={formData.jenjang}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer font-bold`}
                        required={activeTab === 'register'}
                      >
                        <option value="SD">Sekolah Dasar (SD)</option>
                        <option value="SMP">Menengah Pertama (SMP)</option>
                        <option value="SMA">Menengah Atas (SMA/SMK)</option>
                        <option value="Kuliah">Perguruan Tinggi (Kuliah)</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 pointer-events-none transform rotate-90" />
                    </div>
                  </div>
                )}

                {/* Login Extras */}
                {activeTab === 'login' && (
                  <div className="flex items-center justify-between mt-1 pt-1">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border border-gray-400 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors flex items-center justify-center">
                          <CheckCircle className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${rememberMe ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                        </div>
                      </div>
                      <span className="ml-2.5 text-[14px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                        Ingat saya
                      </span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('forgot')} 
                      className="text-[13px] text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                    >
                      Lupa Password?
                    </button>
                  </div>
                )}
              </>)}

              {activeTab === 'forgot' && (
                <div className="space-y-6 animate-in fade-in zoom-in duration-300 py-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-2xl mb-4 border border-indigo-200 shadow-sm">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-['Lexend_Deca'] text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">Lupa Password?</h3>
                    <p className="font-['Manrope'] text-[14px] text-gray-600 font-medium leading-relaxed">
                      Masukkan email terdaftar untuk menerima link reset password.
                    </p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className={labelClass}>Alamat Email</label>
                    <div className="relative">
                      <Mail className={iconClass} strokeWidth={2.5} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        if (!formData.email) {
                          setErrorMsg("Isi email terlebih dahulu!");
                          return;
                        }
                        setIsSubmitting(true);
                        try {
                          const response = await fetch('http://localhost:8000/api/forgot-password', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ email: formData.email })
                          });
                          const data = await response.json();
                          if (response.ok) {
                            alert("✅ SUKSES: " + data.message);
                            setActiveTab('login');
                          } else {
                            setErrorMsg(data.message);
                          }
                        } catch (error) {
                          setErrorMsg("Koneksi gagal");
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Kirim Link Reset"}
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-[13px] font-bold text-gray-600 hover:text-indigo-600 transition-colors font-['Lexend_Deca']"
                    >
                      Kembali ke Login
                    </button>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              {activeTab !== 'forgot' && (
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Sekarang'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Social Login Separator */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[12px]">
                      <span className="px-4 bg-white text-gray-500 font-['Lexend_Deca'] font-semibold">
                        atau lanjutkan dengan
                      </span>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-300 rounded-2xl font-['Lexend_Deca'] font-bold text-[13px] sm:text-[14px] text-gray-800 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                    >
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-2xl font-['Lexend_Deca'] font-bold text-[13px] sm:text-[14px] text-gray-800 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                    >
                      <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                      Apple
                    </button>
                  </div>
                  
                  {/* Terms (Register) */}
                  {activeTab === 'register' && (
                    <div className="mt-6 px-2 text-center">
                      <p className="text-[12px] text-gray-500 leading-relaxed font-medium font-['Manrope']">
                        Dengan mendaftar, Anda menyetujui{' '}
                        <Link 
                          to="/terms" 
                          target="_blank" 
                          className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors"
                        >
                          Syarat & Ketentuan
                        </Link>
                        {' '}serta{' '}
                        <Link 
                          to="/privacy" 
                          target="_blank" 
                          className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors"
                        >
                          Kebijakan Privasi
                        </Link>
                        {' '}layanan Ba-Yu.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}