import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../components/MobileLayout';
import { Mail, Lock, User, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'pelajar',
    jenjang: 'SMA'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
            const email = formData.email.toLowerCase();
            if (email === 'admin@gmail.com') {
                window.location.href = '/admin';
            } else if (email === 'pakar@gmail.com') {
                window.location.href = '/pakar';
            } else {
                window.location.href = '/home';
            }
        } else {
            setError('Email atau password salah');
        }
    } else {
        window.location.href = '/home';
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen flex flex-col px-6 py-8 bg-white relative">
        {/* Simple background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Logo & Title */}
        <div className="text-center mb-10 mt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">BY</span>
          </div>
          <h1 className="font-['Lexend_Deca'] text-3xl font-bold text-foreground mb-2">Ba-Yu</h1>
          <p className="font-['Manrope'] text-muted-foreground">Platform Berbagi Catatan Belajar</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-['Lexend_Deca'] font-medium transition-all ${
              isLogin ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-['Lexend_Deca'] font-medium transition-all ${
              !isLogin ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-['Manrope'] font-medium text-foreground mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Masukkan nama lengkap"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-['Manrope'] font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="nama@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-['Manrope'] font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-['Manrope'] font-medium text-foreground mb-2">
                Jenjang Pendidikan
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={formData.jenjang}
                  onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Kuliah">Kuliah</option>
                </select>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm text-primary font-['Manrope'] font-medium"
              >
                Lupa Password?
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm font-['Manrope'] text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-['Lexend_Deca'] font-semibold shadow-lg shadow-primary/30 mb-6 hover:shadow-xl transition-all"
          >
            {isLogin ? 'Masuk' : 'Daftar'}
          </button>

          {/* Social Login */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground font-['Manrope']">
                Atau lanjutkan dengan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] font-medium text-foreground hover:bg-gray-50 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] font-medium text-foreground hover:bg-gray-50 transition-all"
            >
              <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
              Apple
            </button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
}