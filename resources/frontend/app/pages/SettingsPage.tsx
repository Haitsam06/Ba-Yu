import { MobileLayout } from '../components/MobileLayout';
import { 
  ChevronRight, 
  User, 
  Bell, 
  Lock, 
  HelpCircle, 
  Shield, 
  LogOut, 
  Moon, 
  Sun,
  Monitor,
  Globe, 
  Trash2,
  Settings as SettingsIcon,
  CreditCard,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  UserPlus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AvatarImage } from '../components/ui/DefaultImages';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  if (!user) return null;

  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
        const res = await axios.get("/api/v1/follow-requests", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequestCount(res.data.length);
      } catch (error) {
        console.error("Failed to fetch request count", error);
      }
    };
    if (user?.is_private) fetchRequestCount();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SettingRow = ({ icon: Icon, title, subtitle, rightElement, to, color = "text-slate-900 dark:text-slate-100", onClick }: any) => {
    const Content = (
      <div 
        className="flex items-center gap-4 py-4 px-6 active:bg-slate-50 dark:active:bg-white/5 transition-colors cursor-pointer group"
        onClick={onClick}
      >
        <div className={`w-6 h-6 flex items-center justify-center ${color}`}>
          <Icon size={22} />
        </div>
        <div className="flex-1">
          <h4 className={`text-[15px] font-medium tracking-tight ${color === 'text-red-500' ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
            {title}
          </h4>
          {subtitle && <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {rightElement || <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />}
      </div>
    );

    return to ? <Link to={to} className="block">{Content}</Link> : Content;
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-6 pt-6 pb-2 border-t border-slate-50 dark:border-white/5 first:border-none mt-2 first:mt-0">
      <h3 className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  return (
    <MobileLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-black/20 flex justify-center font-['Manrope']">
        <div className="w-full max-w-[800px] min-h-screen border-x border-slate-200 dark:border-white/5 bg-white dark:bg-[#13111C] pb-10">
        {/* TOP NAVIGATION */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-[#13111C]/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-6 py-4 flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 p-1 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Pengaturan</h1>
        </div>

        {/* SEARCH BAR */}
        <div className="px-6 pt-6 pb-2">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari pengaturan..." 
              className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-full py-3 pl-12 pr-4 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-primary/20 focus:bg-white dark:focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* ACCOUNT CENTER */}
        <div className="px-4 mt-6">
          <div className="bg-white dark:bg-[#1C1A29] border border-slate-100 dark:border-white/5 rounded-3xl p-5 shadow-sm hover:shadow-md dark:shadow-none transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-primary rounded-md flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Pusat Akun</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
            </div>
            
            <div className="flex items-center gap-4 mb-5">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                size={50}
                className="rounded-full ring-2 ring-slate-100 dark:ring-white/10"
              />
              <div className="flex-1">
                <h2 className="font-bold text-slate-900 dark:text-slate-100 text-[15px]">{user.name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Profil & Detail Pribadi</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mb-4 font-medium">
              Kelola pengaturan akun dan pengalaman yang terhubung di seluruh platform Ba-Yu.
            </p>

            <div className="space-y-4 border-t border-slate-50 dark:border-white/5 pt-4">
              <Link to="/edit-profile" className="flex items-center justify-between text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400 dark:text-slate-500" />
                  Detail Pribadi
                </div>
                <ChevronRight size={16} className="text-slate-200 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/settings/security" className="flex items-center justify-between text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-primary transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-slate-400 dark:text-slate-500" />
                  Kata Sandi & Keamanan
                </div>
                <ChevronRight size={16} className="text-slate-200 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* SETTINGS LIST */}
        <div className="mt-4">
          <SectionHeader title="Aktivitas Anda" />
          <div className="divide-y divide-slate-50 dark:divide-white/5">
            <SettingRow icon={Bell} title="Notifikasi" to="/notifications" />
            <SettingRow 
              icon={theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor} 
              title="Tampilan" 
              onClick={toggleTheme}
              rightElement={
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">
                    {theme === 'dark' ? 'Gelap' : theme === 'light' ? 'Terang' : 'Sistem'}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
                </div>
              } 
            />
            <SettingRow icon={Globe} title="Bahasa" rightElement={<span className="text-sm text-slate-400 dark:text-slate-500 font-medium">Indonesia</span>} />
          </div>

          <SectionHeader title="Privasi & Konten" />
          <div className="divide-y divide-slate-50 dark:divide-white/5">
            <SettingRow icon={ShieldCheck} title="Privasi Akun" to="/settings/privacy" rightElement={<span className="text-sm text-slate-400 dark:text-slate-500 font-medium">{user.is_private ? "Privat" : "Publik"}</span>} />
            {user.is_private && (
              <SettingRow 
                icon={UserPlus} 
                title="Permintaan Mengikuti" 
                to="/settings/follow-requests" 
                rightElement={
                  <div className="flex items-center gap-3">
                    {requestCount > 0 && (
                      <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {requestCount}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
                  </div>
                } 
              />
            )}
          </div>

          <SectionHeader title="Dukungan & Info" />
          <div className="divide-y divide-slate-50 dark:divide-white/5">
             <SettingRow icon={HelpCircle} title="Bantuan" to="/help" />
             <SettingRow icon={Shield} title="Kebijakan Privasi" to="/privacy" />
             <SettingRow icon={ExternalLink} title="Status Aplikasi" rightElement={<span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-md">Aktif</span>} />
          </div>

          <SectionHeader title="Login" />
          <div className="divide-y divide-slate-50 dark:divide-white/5 pb-10">
             <SettingRow 
                icon={LogOut} 
                title="Keluar" 
                color="text-red-500" 
                onClick={handleLogout}
             />
             <SettingRow 
                icon={AlertTriangle} 
                title="Nonaktifkan Akun" 
                color="text-red-500" 
                to="/settings/privacy"
             />
          </div>

          {/* Footer Branding */}
          <div className="px-6 py-8 border-t border-slate-50 dark:border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2 opacity-30">
               <div className="w-5 h-5 rounded-md bg-slate-900 dark:bg-white flex items-center justify-center">
                 <Sparkles size={10} className="text-white dark:text-[#13111C]" />
               </div>
               <span className="font-['Lexend_Deca'] font-black text-slate-900 dark:text-slate-100 tracking-tighter text-sm">Ba-Yu</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">Version 1.2.4</p>
          </div>
        </div>
        </div>


      </div>
    </MobileLayout>
  );
}