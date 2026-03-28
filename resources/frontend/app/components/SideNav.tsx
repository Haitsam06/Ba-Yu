import { Home, Search, Plus, Bell, User, LayoutDashboard, Bookmark, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface SideNavProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

export function SideNav({ isExpanded, setIsExpanded }: SideNavProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem('bayu-token');
        if (!token) return;
        const res = await axios.get('/api/v1/notifikasi', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data || [];
        setUnreadNotifCount(data.filter((n: any) => !n.is_read).length);
      } catch { /* silent */ }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', icon: Home, label: 'Beranda' },
    { path: '/explore', icon: Search, label: 'Eksplorasi' },
    { path: '/bookmarks', icon: Bookmark, label: 'Tersimpan' },
    { path: '/notifications', icon: Bell, label: 'Notifikasi' },
  ];

  if (user?.role === 'pakar') {
      navItems.push({ path: '/pakar', icon: LayoutDashboard, label: 'Dashboard Pakar' });
  } else if (user?.role === 'admin') {
      navItems.push({ path: '/admin', icon: LayoutDashboard, label: 'Sistem Admin' });
  }

  return (
    <aside 
      className={`bg-white border border-gray-100 flex flex-col fixed top-4 left-4 z-50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-[width] duration-300 ease-out h-[calc(100vh-32px)] ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      {/* Brand logo & Toggle */}
      <div className={`h-24 flex items-center px-4 shrink-0 transition-all ${isExpanded ? 'justify-between' : 'justify-center flex-col gap-2 pt-4'}`}>
        <Link to="/home" className={`flex items-center gap-3 group ${isExpanded ? '' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-primary/10 rounded-[14px] flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
            <span className="text-xl group-hover:scale-110 transition-transform">📚</span>
          </div>
          {isExpanded && (
             <span className="font-['Lexend_Deca'] font-bold text-xl text-primary tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ease-in opacity-100">
                Ba-Yu
             </span>
          )}
        </Link>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`shrink-0 flex items-center justify-center text-gray-400 hover:text-primary transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${
             isExpanded 
               ? 'w-8 h-8 hover:bg-primary/10' 
               : 'w-10 h-10 hover:bg-primary/10 mt-2'
          }`}
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1.5 scrollbar-hide">
        {isExpanded && (
          <div className="mb-2 px-3 text-[11px] font-['Lexend_Deca'] font-bold text-gray-400 uppercase tracking-wider transition-opacity duration-300">
             Menu Utama
          </div>
        )}
        
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  active
                    ? 'bg-primary/10 text-primary font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                } ${isExpanded ? 'px-4 py-3 gap-4 xl:hover:pl-5' : 'p-3 justify-center w-12 h-12 mx-auto'}`}
              >
                <div className="relative shrink-0 flex items-center justify-center w-6 h-6">
                  <item.icon className={`w-5 h-5 transition-transform duration-200 ${
                    active ? 'fill-primary/20 scale-110' : 'group-hover:text-primary group-hover:scale-110'
                  }`} />
                  {/* Notification Badge */}
                  {item.path === '/notifications' && unreadNotifCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-bounce">
                      {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
                    </span>
                  )}
                </div>
                
                {isExpanded && (
                  <span className="font-['Manrope'] font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 opacity-100">
                    {item.label}
                  </span>
                )}
              </Link>

              {/* Pure CSS Tooltip (Visible only when collapsed) */}
              {!isExpanded && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-['Lexend_Deca'] font-medium py-2 px-3 rounded-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] shadow-lg origin-left">
                  {item.label}
                  {/* Tooltip Arrow */}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 rounded-sm"></div>
                </div>
              )}
            </div>
          );
        })}

        {user?.role !== 'admin' && (
          <div className={`mt-6 transition-all duration-300 ${isExpanded ? 'px-2' : 'px-0 mx-auto'}`}>
            <div className="relative group">
              <Link
                to="/upload"
                className={`flex items-center justify-center bg-primary text-white rounded-[14px] shadow-[0_8px_16px_-6px_rgba(59,130,246,0.5)] hover:shadow-[0_12px_20px_-8px_rgba(59,130,246,0.6)] hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                   isExpanded ? 'w-full px-4 py-3 gap-2 font-["Lexend_Deca"] font-semibold text-sm' : 'w-12 h-12 p-0 rounded-2xl'
                }`}
              >
                <Plus className={`w-5 h-5 shrink-0 ${isExpanded ? 'w-4 h-4' : ''}`} />
                {isExpanded && <span className="whitespace-nowrap overflow-hidden">Upload</span>}
              </Link>
              
              {!isExpanded && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-primary text-white text-xs font-['Lexend_Deca'] font-medium py-2 px-3 rounded-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] shadow-lg origin-left">
                  Upload Catatan
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45 rounded-sm"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Mini Profile & Settings */}
      <div className={`p-4 border-t border-gray-50 mt-auto shrink-0 flex ${isExpanded ? 'flex-row items-center justify-between gap-1' : 'flex-col items-center gap-3'}`}>
          {/* Profile Link */}
          <Link 
            to="/profile" 
            className={`flex items-center rounded-2xl transition-all duration-200 hover:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 group relative ${
              isExpanded ? 'p-2 flex-1 min-w-0 gap-3 border border-transparent hover:border-gray-100' : 'justify-center w-12 h-12 border border-transparent hover:border-gray-100'
            }`}
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"}
              alt="Profile"
              className="w-10 h-10 rounded-[12px] object-cover border border-gray-200 shrink-0 group-hover:border-primary/30 transition-colors"
            />
            {isExpanded && (
                <div className="flex-1 min-w-0 pr-1">
                  <p className="font-['Lexend_Deca'] font-semibold text-sm text-gray-900 truncate">{user?.name || "Pengguna"}</p>
                  <p className="font-['Manrope'] text-xs text-gray-500 truncate capitalize">{user?.role || "Siswa"}</p>
                </div>
            )}
            
            {!isExpanded && (
               <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-['Lexend_Deca'] font-medium py-2 px-3 rounded-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] shadow-lg origin-left flex items-center gap-2">
                 <div className="flex flex-col">
                    <span>{user?.name || "Profil Saya"}</span>
                    <span className="text-[10px] text-gray-400 capitalize">{user?.role || "Siswa"}</span>
                 </div>
                 <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 rounded-sm"></div>
               </div>
            )}
          </Link>

          {/* Settings Link */}
          <Link
            to="/settings"
            className={`flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-200 rounded-xl hover:bg-gray-100 group relative ${
              isExpanded ? 'w-10 h-10 shrink-0' : 'w-10 h-10'
            }`}
            aria-label="Pengaturan"
          >
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            
            {!isExpanded && (
               <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-['Lexend_Deca'] font-medium py-2 px-3 rounded-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] shadow-lg origin-left">
                 Pengaturan
                 <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 rounded-sm"></div>
               </div>
            )}
          </Link>
      </div>
    </aside>
  );
}
