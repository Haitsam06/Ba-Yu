import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function SideNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Jelajah' },
    { path: '/notifications', icon: Bell, label: 'Notifikasi' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 z-50 p-6 hidden md:flex flex-col shadow-sm">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <span className="text-xl">📚</span>
        </div>
        <div>
            <h1 className="font-['Lexend_Deca'] font-bold text-xl text-primary">BestLearning</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-['Manrope'] font-medium ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-gray-50 hover:text-foreground'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.path) && item.icon === Home ? 'fill-primary' : ''}`} />
            {item.label}
          </Link>
        ))}
      </div>

      {user?.role !== 'admin' && (
        <Link
          to="/upload"
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-3.5 rounded-xl font-['Lexend_Deca'] font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Upload Catatan
        </Link>
      )}

      {/* User Mini Profile at bottom */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <p className="font-['Lexend_Deca'] font-semibold text-sm text-foreground truncate">{user?.name || "Budi Santoso"}</p>
          <p className="font-['Manrope'] text-xs text-muted-foreground truncate">{user?.jenjang || "SMA"}</p>
        </div>
      </div>
    </div>
  );
}
