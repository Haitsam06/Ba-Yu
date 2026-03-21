import { Home, Search, Plus, Bell, User, LayoutDashboard, Bookmark, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function SideNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', icon: Home, label: 'Beranda' },
    { path: '/explore', icon: Search, label: 'Eksplorasi' },
    { path: '/bookmarks', icon: Bookmark, label: 'Tersimpan' },
    { path: '/notifications', icon: Bell, label: 'Notifikasi' },
    { path: '/profile', icon: User, label: 'Profil Saya' },
  ];

  if (user?.role === 'pakar') {
      navItems.push({ path: '/pakar', icon: LayoutDashboard, label: 'Dashboard Pakar' });
  } else if (user?.role === 'admin') {
      navItems.push({ path: '/admin', icon: LayoutDashboard, label: 'Sistem Admin' });
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 z-50">
      {/* Brand logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
            <span className="text-xl group-hover:scale-110 transition-transform">📚</span>
          </div>
          <span className="font-['Lexend_Deca'] font-bold text-xl text-primary tracking-tight">BestLearning</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="mb-2 px-3 text-xs font-['Manrope'] font-bold text-gray-400 uppercase tracking-wider">
           Menu Utama
        </div>
        
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all font-['Manrope'] font-medium text-sm ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-foreground'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'fill-primary/20' : ''}`} />
            {item.label}
          </Link>
        ))}

        {user?.role !== 'admin' && (
          <div className="mt-6 px-2">
            <Link
              to="/upload"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Upload Catatan
            </Link>
          </div>
        )}
      </div>

      {/* User Mini Profile */}
      <div className="p-4 border-t border-gray-100">
         <Link to="/settings" className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="font-['Lexend_Deca'] font-semibold text-sm text-foreground truncate">{user?.name || "Pengguna"}</p>
              <p className="font-['Manrope'] text-xs text-muted-foreground truncate capitalize">{user?.role || "Siswa"}</p>
            </div>
            <Settings className="w-4 h-4 text-gray-400" />
         </Link>
      </div>
    </aside>
  );
}
