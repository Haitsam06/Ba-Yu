import { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, BookOpen, ArrowRight, GraduationCap, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

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

  if (!isOpen) return null;

  const inputClass = "w-full pl-12 pr-4 py-3.5 text-[15px] bg-gray-50/80 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white focus:outline-none focus:shadow-[0_0_0_4px_rgba(79,70,229,0.08)] transition-all duration-300 placeholder:text-gray-400 font-medium";
  const labelClass = "block text-[13px] font-extrabold text-gray-600 mb-2.5 tracking-wide uppercase";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 transition-colors duration-200";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        style={{ transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          className={`bg-white rounded-[2rem] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] w-full max-w-[440px] overflow-hidden relative ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 flex items-center justify-center transition-all z-50 group border border-gray-100 shadow-sm"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {activeTab !== 'forgot' && (<>


          {/* Header — Clean Minimal */}
          <div className="px-8 pt-10 pb-3 text-center relative overflow-hidden">
            {/* Subtle background orbs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div 
              style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease' }}
              className={`inline-flex items-center justify-center w-16 h-16 bg-primary rounded-[1.25rem] shadow-lg shadow-primary/25 mb-5 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            
            <h2 
              style={{ transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}
              className={`text-2xl font-extrabold text-gray-900 tracking-tight mb-1.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {activeTab === 'login' ? 'Selamat Datang!' : 'Buat Akun Baru'}
            </h2>
            <p 
              style={{ transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s' }}
              className={`text-gray-400 text-[13px] font-semibold tracking-wide ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {activeTab === 'login' 
                ? 'Masuk ke akun Ba-Yu kamu' 
                : 'Bergabung bersama ribuan pelajar Indonesia'}
            </p>
          </div>

          {/* Tab Switcher — Pill Style */}
          <div className="px-8 pt-4 pb-2">
            <div className="relative bg-gray-100/80 rounded-2xl p-1 flex">
              {/* Sliding Indicator */}
              <div
                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-[14px] shadow-md ${
                  activeTab === 'register' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
                }`}
              />
              <button
                onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
                className={`relative z-10 flex-1 py-3 rounded-[14px] font-bold text-sm transition-colors duration-300 ${
                  activeTab === 'login' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                className={`relative z-10 flex-1 py-3 rounded-[14px] font-bold text-sm transition-colors duration-300 ${
                  activeTab === 'register' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Daftar
              </button>
            </div>
          </div>
          </>)}

          {/* Form Area */}
          <div className="px-8 pt-5 pb-8 max-h-[58vh] overflow-y-auto">
            {/* Error Message */}
            {errorMsg && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold text-center flex items-center justify-center gap-2">
                <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 text-red-500 text-xs">!</span>
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">

              {activeTab !== 'forgot' && (<>
              {/* Name — Register Only */}
              <div
                style={{ transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin 0.3s ease' }}
                className={`overflow-hidden ${activeTab === 'register' ? 'max-h-[120px] opacity-100' : 'max-h-0 opacity-0 !mb-0'}`}
              >
                <label className={labelClass}>Nama Lengkap</label>
                <div className="relative group">
                  <User className={`${iconClass} group-focus-within:text-primary`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama kamu"
                    className={inputClass}
                    required={activeTab === 'register'}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Alamat Email</label>
                <div className="relative group">
                  <Mail className={`${iconClass} group-focus-within:text-primary`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="kamu@email.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={labelClass}>Kata Sandi</label>
                <div className="relative group">
                  <Lock className={`${iconClass} group-focus-within:text-primary`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 karakter"
                    className={`${inputClass} !pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>
              </div>

              {/* Jenjang — Register Only */}
              <div
                style={{ transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin 0.3s ease' }}
                className={`overflow-hidden ${activeTab === 'register' ? 'max-h-[120px] opacity-100' : 'max-h-0 opacity-0 !mb-0'}`}
              >
                <label className={labelClass}>Jenjang Pendidikan</label>
                <div className="relative group">
                  <GraduationCap className={`${iconClass} group-focus-within:text-primary`} />
                  <select
                    name="jenjang"
                    value={formData.jenjang}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    required={activeTab === 'register'}
                  >
                    <option value="SD">SD (Sekolah Dasar)</option>
                    <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                    <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                    <option value="Kuliah">Kuliah (Perguruan Tinggi)</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Login Extras */}
              {activeTab === 'login' && (
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded-md border-2 border-gray-200 text-primary focus:ring-primary/30 focus:ring-offset-0 cursor-pointer"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-gray-500 group-hover:text-gray-700 transition-colors font-medium">Ingat saya</span>
                  </label>
                  <button 
                      type="button" 
                      onClick={() => setActiveTab('forgot')} 
                      className="text-primary font-bold hover:underline underline-offset-2 text-sm"
                  >
                      Lupa sandi?
                  </button>
                </div>
              )}
            </>)}

              {activeTab === 'forgot' && (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lupa Password? 🔒</h3>
            <p className="text-sm text-gray-500">
                Santai, masukin email lu di bawah, nanti kita kirimin link buat bikin password baru.
            </p>
        </div>
        
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
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
            alert("Isi email terlebih dahulu!");
            return;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:8000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ SUKSES: " + data.message);
                setActiveTab('login');
            } else {
                alert("❌ GAGAL: " + data.message);
            }
        } catch (error) {
            alert("Servernya tewas atau belom dinyalain der!");
        } finally {
            setIsSubmitting(false);
        }
    }}
    className="w-full bg-primary hover:bg-indigo-700 disabled:bg-gray-300 text-white h-[52px] rounded-xl font-bold text-[15px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
>
    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Kirim Link Reset"}
</button>
        </div>

        <div className="text-center mt-4">
            <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
            >
                Kembali ke Login
            </button>
        </div>
    </div>
)}

              {/* Submit CTA */}
              {activeTab !== 'forgot' && (
                  <div className="pt-3">
                      <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full flex items-center justify-center gap-2 bg-primary hover:bg-indigo-700 disabled:bg-gray-300 text-white h-[52px] rounded-2xl font-bold text-[15px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                      >
                          {isSubmitting ? (
                              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                          ) : (
                              <>
                                  {activeTab === 'login' ? 'Masuk ke Akun' : 'Buat Akun Gratis'}
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </>
                          )}
                      </button>
                  </div>
              )}

              {/* Terms (Register) */}
              {activeTab === 'register' && (
                <p className="text-[12px] text-gray-400 text-center leading-relaxed pt-1">
                  Dengan mendaftar, kamu setuju dengan{' '}
                  <button type="button" className="text-primary font-semibold hover:underline underline-offset-2">
                    Syarat & Ketentuan
                  </button>
                  {' '}Ba-Yu.
                </p>
              )}
            </form>

            {/* Footer Switch */}
            {activeTab !== 'forgot' && (
                  <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 font-medium">
            {activeTab === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button
                type="button"
                onClick={() => { setActiveTab(activeTab === 'login' ? 'register' : 'login'); setErrorMsg(null); }}
                className="text-primary font-bold hover:underline underline-offset-2 ml-1.5"
            >
                {activeTab === 'login' ? 'Daftar Gratis' : 'Masuk'}
            </button>
            </p>
            </div>
              )}
            </div>
        </div>
      </div>
    </>
  );
}