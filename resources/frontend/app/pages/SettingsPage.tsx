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
  Globe, 
  Trash2,
  Settings as SettingsIcon,
  CreditCard,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AvatarImage } from '../components/ui/DefaultImages';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SettingRow = ({ icon: Icon, title, subtitle, rightElement, to, color = "text-slate-900", onClick }: any) => {
    const Content = (
      <div 
        className="flex items-center gap-4 py-4 px-6 active:bg-slate-50 transition-colors cursor-pointer group"
        onClick={onClick}
      >
        <div className={`w-6 h-6 flex items-center justify-center ${color}`}>
          <Icon size={22} />
        </div>
        <div className="flex-1">
          <h4 className={`text-[15px] font-medium tracking-tight ${color === 'text-red-500' ? 'text-red-500' : 'text-slate-900'}`}>
            {title}
          </h4>
          {subtitle && <p className="text-[12px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {rightElement || <ChevronRight size={18} className="text-slate-300" />}
      </div>
    );

    return to ? <Link to={to} className="block">{Content}</Link> : Content;
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-6 pt-6 pb-2 border-t border-slate-50 first:border-none mt-2 first:mt-0">
      <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  return (
    <MobileLayout>
      <div className="min-h-screen pb-10 bg-white font-['Manrope']">
        
        {/* TOP NAVIGATION (Instagram/X Style) */}
        <div className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="text-slate-900 hover:bg-slate-100 p-1 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Pengaturan</h1>
        </div>

        {/* SEARCH BAR (X Style) */}
        <div className="px-6 pt-6 pb-2">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari pengaturan..." 
              className="w-full bg-slate-100 border-none rounded-full py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* ACCOUNT CENTER (Instagram Style) */}
        <div className="px-4 mt-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Pusat Akun</span>
              </div>
              <ChevronRight size={14} className="text-slate-300" />
            </div>
            
            <div className="flex items-center gap-4 mb-5">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                size={50}
                className="rounded-full ring-2 ring-slate-100"
              />
              <div className="flex-1">
                <h2 className="font-bold text-slate-900 text-[15px]">{user.name}</h2>
                <p className="text-xs text-slate-500 font-medium">Profil & Detail Pribadi</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-4 font-medium">
              Kelola pengaturan akun dan pengalaman yang terhubung di seluruh platform Ba-Yu.
            </p>

            <div className="space-y-4 border-t border-slate-50 pt-4">
              <Link to="/edit-profile" className="flex items-center justify-between text-[13px] font-semibold text-slate-700 hover:text-indigo-600 transition-colors group">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  Detail Pribadi
                </div>
                <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <div className="flex items-center justify-between text-[13px] font-semibold text-slate-700 hover:text-indigo-600 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-slate-400" />
                  Kata Sandi & Keamanan
                </div>
                <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* SETTINGS LIST (Streamlined List Style) */}
        <div className="mt-4">
          <SectionHeader title="Aktivitas Anda" />
          <div className="divide-y divide-slate-50">
            <SettingRow icon={Bell} title="Notifikasi" to="/notifications" />
            <SettingRow icon={Moon} title="Tampilan" rightElement={<span className="text-sm text-slate-400 font-medium">Terang</span>} />
            <SettingRow icon={Globe} title="Bahasa" rightElement={<span className="text-sm text-slate-400 font-medium">Indonesia</span>} />
          </div>

          <SectionHeader title="Privasi & Konten" />
          <div className="divide-y divide-slate-50">
            <SettingRow icon={ShieldCheck} title="Privasi Akun" rightElement={<span className="text-sm text-slate-400 font-medium">Publik</span>} />
            <SettingRow icon={MessageSquare} title="Komentar & Tag" />
          </div>

          <SectionHeader title="Dukungan & Info" />
          <div className="divide-y divide-slate-50">
             <SettingRow icon={HelpCircle} title="Bantuan" />
             <SettingRow icon={Shield} title="Kebijakan Privasi" />
             <SettingRow icon={ExternalLink} title="Status Aplikasi" rightElement={<span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">Aktif</span>} />
          </div>

          <SectionHeader title="Login" />
          <div className="divide-y divide-slate-50 pb-10">
             <SettingRow 
                icon={LogOut} 
                title="Keluar" 
                color="text-red-500" 
                onClick={handleLogout}
             />
             <SettingRow 
                icon={Trash2} 
                title="Hapus Akun" 
                color="text-red-500" 
             />
          </div>

          {/* Footer Branding (Minimalist) */}
          <div className="px-6 py-8 border-t border-slate-50 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2 opacity-30">
               <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center">
                  <Sparkles size={10} className="text-white" />
               </div>
               <span className="font-['Lexend_Deca'] font-black text-slate-900 tracking-tighter text-sm">Ba-Yu</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Version 1.2.4</p>
          </div>
        </div>

      </div>
    </MobileLayout>
  );
}