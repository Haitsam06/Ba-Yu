import { Link } from 'react-router';
import { Button } from './ui/button';
import ApplicationLogo from './ApplicationLogo'; // Logo
import { useState, useEffect } from 'react';
import { AuthModal } from './auth-modal';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  variant?: 'default' | 'dashboard';
}

export function Navbar({ variant = 'default' }: NavbarProps) {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (variant === 'dashboard') {
    return null; // Dashboard has its own top bar
  }

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  return (
    <>
      {/* Floating Navbar Wrapper */}
      <nav
        style={{ transition: 'top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        className={`fixed left-0 right-0 z-50 flex justify-center ${isScrolled ? 'top-5 px-5 lg:px-8' : 'top-0 px-0'
          }`}
      >
        {/* Dynamic Inner Container */}
        <div
          style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          className={`w-full flex items-center justify-between overflow-hidden ${isScrolled
            ? 'max-w-5xl bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_12px_40px_rgba(79,70,229,0.10)] rounded-[2rem] h-[72px] px-6 sm:px-10'
            : 'max-w-7xl bg-transparent border-transparent h-24 sm:h-28 px-6 sm:px-10'
            }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <ApplicationLogo
              style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              className={`group-hover:scale-105 group-hover:shadow-md transition-transform drop-shadow-sm ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
            />
            <span style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }} className={`font-extrabold tracking-tight bg-gradient-to-r from-primary to-[#8B5CF6] bg-clip-text text-transparent ${isScrolled ? 'text-xl' : 'text-3xl'}`}>
              Ba-Yu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary transition-colors font-semibold text-[15px] hover:-translate-y-0.5 transform duration-200"
            >
              Beranda
            </Link>
            <a
              href="#tentang"
              className="text-gray-600 hover:text-primary transition-colors font-semibold text-[15px] hover:-translate-y-0.5 transform duration-200"
            >
              Tentang
            </a>
            <Link
              to="/katalog"
              className="text-gray-600 hover:text-primary transition-colors font-semibold text-[15px] hover:-translate-y-0.5 transform duration-200"
            >
              Jelajahi
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && user ? (
              <Link to="/profile" className="group rounded-full p-1 border border-transparent hover:border-gray-200 transition-colors">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt={user.name}
                  className={`rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
                />
              </Link>
            ) : (
              <>
                <button
                  className="hidden md:block font-bold text-gray-700 hover:text-primary px-3 sm:px-4 py-2 hover:bg-gray-50/50 rounded-full transition-colors text-sm"
                  onClick={() => openAuthModal('login')}
                >
                  Masuk
                </button>
                <button
                  className={`bg-primary hover:bg-indigo-700 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 ${isScrolled ? 'px-5 py-2 text-sm' : 'px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-[15px]'}`}
                  onClick={() => openAuthModal('register')}
                >
                  Daftar Gratis
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
      />
    </>
  );
}