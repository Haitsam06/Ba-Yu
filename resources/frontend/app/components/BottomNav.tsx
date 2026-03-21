import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Admin navigation - no upload
  if (user?.role === 'admin') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
        <div className="max-w-[430px] mx-auto">
          <div className="flex items-center justify-around h-16 px-4">
            <Link
              to="/home"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/home') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home className={`w-6 h-6 ${isActive('/home') ? 'fill-primary' : ''}`} />
              <span className="text-xs mt-0.5">Home</span>
            </Link>

            <Link
              to="/explore"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs mt-0.5">Jelajah</span>
            </Link>

            <Link
              to="/notifications"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="text-xs mt-0.5">Notifikasi</span>
            </Link>

            <Link
              to="/profile"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-0.5">Profil</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Pakar navigation - sama seperti user (bisa upload)
  if (user?.role === 'pakar') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
        <div className="max-w-[430px] mx-auto">
          <div className="flex items-center justify-around h-16 px-4 relative">
            <Link
              to="/home"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/home') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home className={`w-6 h-6 ${isActive('/home') ? 'fill-primary' : ''}`} />
              <span className="text-xs mt-0.5">Home</span>
            </Link>

            <Link
              to="/explore"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs mt-0.5">Jelajah</span>
            </Link>

            {/* Upload FAB */}
            <Link
              to="/upload"
              className="flex flex-col items-center justify-center flex-1 -mt-8"
            >
              <div className="bg-primary rounded-full p-4 shadow-lg shadow-primary/50">
                <Plus className="w-7 h-7 text-white" />
              </div>
            </Link>

            <Link
              to="/notifications"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <span className="text-xs mt-0.5">Notifikasi</span>
            </Link>

            <Link
              to="/profile"
              className={`flex flex-col items-center justify-center flex-1 ${
                isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-0.5">Profil</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User navigation (default)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center justify-around h-16 px-4 relative">
          {/* Home */}
          <Link
            to="/home"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/home') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className={`w-6 h-6 ${isActive('/home') ? 'fill-primary' : ''}`} />
            <span className="text-xs mt-0.5">Home</span>
          </Link>

          {/* Explore */}
          <Link
            to="/explore"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs mt-0.5">Jelajah</span>
          </Link>

          {/* Upload FAB */}
          <Link
            to="/upload"
            className="flex flex-col items-center justify-center flex-1 -mt-8"
          >
            <div className="bg-primary rounded-full p-4 shadow-lg shadow-primary/50">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </Link>

          {/* Notifications */}
          <Link
            to="/notifications"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/notifications') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className="relative">
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <span className="text-xs mt-0.5">Notifikasi</span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-0.5">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}