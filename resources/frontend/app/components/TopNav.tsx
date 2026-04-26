import { Link, useNavigate } from 'react-router';
import { Menu, Search, Edit3, Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AvatarNotifications from './ui/avatar-notifications';
import ApplicationLogo from './ApplicationLogo';

interface TopNavProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

export function TopNav({ isSidebarExpanded, toggleSidebar }: TopNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-[60px] px-6 lg:px-8 flex items-center justify-between w-full bg-transparent">
      
      {/* LEFT SECTION */}
      <div className="flex items-center flex-1 min-w-0">
        
        {/* Toggle Hamburger */}
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-700 hover:text-primary transition-colors focus:outline-none p-1.5 -ml-1.5 rounded-full hover:bg-primary/5"
          aria-label="Buka Menu"
        >
          <Menu className="w-[22px] h-[22px]" strokeWidth={1.5} />
        </button>

        {/* Ba-Yu Logo (Premium Gradient from Landing Page) */}
        <Link to="/home" className="flex items-center gap-2 mr-6 shrink-0 group">
           <ApplicationLogo className="w-8 h-8" />
           <span className="font-['Lexend_Deca'] font-extrabold text-[22px] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-800 hidden sm:block">
              Ba-Yu
           </span>
        </Link>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center w-full max-w-[280px]">
           <div className="relative w-full group">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" strokeWidth={2} />
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Cari preferensi..."
               className="w-full h-[38px] pl-[38px] pr-4 text-[13.5px] font-['Manrope'] font-medium bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-transparent focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(93,92,230,0.08)] rounded-[12px] transition-all outline-none text-gray-800 placeholder-gray-400"
             />
             {/* Kbd hint */}
             <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 bg-white shadow-sm">/</span>
             </div>
           </div>
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 sm:gap-5 shrink-0 relative">
        <Link 
          to="/not-found"
          className="hidden lg:flex items-center justify-center h-[36px] px-[18px] rounded-full bg-primary text-white text-[13.5px] font-['Manrope'] font-semibold shadow-[0_4px_10px_rgb(93,92,230,0.15)] hover:bg-primary/90 hover:shadow-[0_6px_14px_rgb(93,92,230,0.25)] hover:-translate-y-0.5 transition-all"
        >
          Dapatkan App
        </Link>
        
        <Link 
          to="/upload"
          className="hidden md:flex items-center gap-2 h-[36px] px-2 text-gray-500 hover:text-primary text-[14px] font-['Manrope'] transition-colors"
        >
          <Edit3 className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span>Tulis</span>
        </Link>

        {/* Search icon mapped to mobile view */}
        <button className="sm:hidden text-gray-500 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/5">
          <Search className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="mr-1">
          <AvatarNotifications />
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
           <button 
             onClick={() => setIsProfileOpen(!isProfileOpen)}
             className="focus:outline-none hover:opacity-80 transition-opacity ml-1 ring-2 ring-transparent active:ring-primary/20 rounded-full p-0.5"
           >
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"} 
                alt="Profile" 
                className="w-[34px] h-[34px] rounded-full object-cover bg-gray-50 border border-gray-100"
              />
           </button>

           {/* Dropdown Menu (Medium Clone) */}
           {isProfileOpen && (
             <div className="absolute right-0 top-[48px] w-[260px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                {/* Header (Profile Info) */}
                <Link to="/profile" className="flex items-center gap-3 px-5 py-2 hover:bg-gray-50 transition-colors mb-2 group">
                   <img 
                      src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
                   />
                   <div className="flex flex-col overflow-hidden">
                      <span className="font-['Lexend_Deca'] font-bold text-gray-900 text-[15px] truncate">{user?.name}</span>
                      <span className="text-[13px] font-['Manrope'] text-gray-500 group-hover:text-primary transition-colors">Lihat profil</span>
                   </div>
                </Link>

                <div className="h-px bg-gray-100 my-2 mx-4"></div>

                {/* Main Action Links */}
                <div className="flex flex-col py-1">
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl hover:bg-gray-50 group transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all">
                        <Settings className="w-[18px] h-[18px] text-gray-500 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
                      </div>
                      <span className="font-['Manrope'] text-[14px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Pengaturan</span>
                    </Link>
                   <Link to="/not-found" className="flex items-center gap-3 px-5 py-2 hover:text-gray-900 text-gray-600 transition-colors group">
                      <HelpCircle className="w-[18px] h-[18px] text-gray-500 group-hover:text-gray-700 transition-colors" strokeWidth={1.5} />
                      <span className="text-[14px] font-['Manrope']">Pusat Bantuan</span>
                   </Link>
                </div>

                {/* Sign Out */}
                <div className="flex flex-col py-1 border-t border-gray-100">
                   <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-between px-4 py-3 bg-red-50/50 hover:bg-red-50 group transition-colors text-left rounded-b-2xl">
                     <div>
                       <span className="block text-[13px] font-bold text-rose-600 font-['Lexend_Deca']">Keluar</span>
                       <span className="text-[11px] font-['Manrope'] text-gray-500 group-hover:text-rose-400 transition-colors truncate max-w-[190px]">{user?.email || 'user@example.com'}</span>
                     </div>
                     <LogOut className="w-[18px] h-[18px] text-gray-500 group-hover:text-rose-500 transition-colors" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Footer Links (Mini) */}
                <div className="px-5 pt-3 mt-1 pb-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-['Manrope'] text-gray-500">
                    <Link to="#" className="hover:text-gray-900 transition-colors">Tentang Kami</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors">Blog</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors">Ketentuan</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors">Privasi</Link>
                </div>
             </div>
           )}
        </div>

      </div>
    </header>
  );
}
