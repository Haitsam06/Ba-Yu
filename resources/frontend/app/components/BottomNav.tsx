import { Home, Search, Plus, Bell, User, LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  const renderNavItems = () => {
    const isPakar = user?.role === 'pakar';
    const isAdmin = user?.role === 'admin';

    // Role-based navigation config
    const items = [
      { path: '/home', icon: Home, label: 'Beranda' },
      { path: '/explore', icon: Search, label: 'Eksplor' },
      isPakar 
          ? { path: '/pakar', icon: LayoutGrid, label: 'Dashboard' }
          : { path: '/notifications', icon: Bell, label: 'Notifikasi' },
      { path: '/profile', icon: User, label: 'Profil' },
    ].filter(Boolean) as any[];

    return items.map((item, idx) => {
      const active = isActive(item.path);

      // Standard Nav Item
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 outline-none ${
            active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`relative flex items-center justify-center w-14 h-9 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-50/80' : 'bg-transparent'}`}>
             <item.icon className={`w-[22px] h-[22px] transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`} strokeWidth={active ? 2.5 : 2} />
             {item.path === '/notifications' && !active && (
               <div className="absolute top-2 right-3.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
             )}
          </div>
          <span className={`text-[10px] mt-1 font-['Manrope'] font-bold tracking-wide transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
            {item.label}
          </span>
        </Link>
      );
    });
  };

  return (
    <div className="w-full h-full bg-transparent">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center justify-around h-[70px] px-2 relative pt-1">
          {renderNavItems()}
        </div>
      </div>
    </div>
  );
}