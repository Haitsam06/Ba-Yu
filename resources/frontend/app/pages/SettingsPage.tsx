import { MobileLayout } from '../components/MobileLayout';
import { ChevronRight, User, Bell, Lock, HelpCircle, Shield, LogOut, Moon, Globe, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { mockUsers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Safe fallback if user state isn't populated yet
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileLayout>
      <div className="min-h-screen pb-4 bg-white">
        {/* Header - Consistent */}
        <div className="px-6 pt-7 pb-6">
          <h1 className="text-foreground font-['Lexend_Deca'] font-bold text-2xl mb-1">
            Pengaturan
          </h1>
          <p className="text-muted-foreground font-['Manrope'] text-sm">
            Kelola akun dan preferensi kamu
          </p>
        </div>

        <div className="px-6">
          {/* Profile Summary Card */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-5 mb-6 shadow-lg">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100'}
                alt={user.name}
                className="w-16 h-16 rounded-2xl border-2 border-white/50 object-cover shadow-xl bg-white/20"
              />
              <div className="flex-1">
                <h2 className="font-['Lexend_Deca'] font-bold text-white text-lg mb-1">
                  {user.name}
                </h2>
                <p className="font-['Manrope'] text-white/90 text-sm">
                  {user.email}
                </p>
              </div>
              <Link
                to="/edit-profile"
                className="bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-xl border border-white/30"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Akun Section */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3 px-1">
              Akun
            </h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <Link
                to="/edit-profile"
                className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Edit Profil
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Ubah nama, bio, dan foto profil
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>

              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Ubah Password
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Perbarui password akun kamu
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Preferensi Section */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3 px-1">
              Preferensi
            </h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Notifikasi
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Atur preferensi notifikasi
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Tampilan
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Mode terang atau gelap
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-['Manrope'] text-xs text-muted-foreground">Terang</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Bahasa
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Pilih bahasa aplikasi
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-['Manrope'] text-xs text-muted-foreground">Indonesia</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </button>
            </div>
          </div>

          {/* Bantuan & Info Section */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3 px-1">
              Bantuan & Info
            </h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Pusat Bantuan
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    FAQ dan panduan penggunaan
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Privasi & Keamanan
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Kebijakan privasi dan syarat layanan
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="font-['Lexend_Deca'] font-bold text-foreground text-xs">
                    v1.0
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                    Tentang Ba-Yu
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Versi aplikasi dan informasi
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3 px-1">
              Zona Berbahaya
            </h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 transition-colors border-b border-gray-100">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-red-600 text-sm">
                    Hapus Akun
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Hapus akun dan semua data secara permanen
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-['Lexend_Deca'] font-semibold text-red-600 text-sm">
                    Keluar
                  </h4>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Keluar dari akun kamu
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}