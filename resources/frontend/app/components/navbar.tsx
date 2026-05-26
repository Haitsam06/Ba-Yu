import { Link } from 'react-router';
import { Button } from './ui/button';
import ApplicationLogo from './ApplicationLogo'; // Logo
import { useState, useEffect } from 'react';
import { AuthModal } from './auth-modal';
import { useAuth } from '../contexts/AuthContext';
import { AvatarImage } from './ui/DefaultImages';
import { useTranslation } from '../hooks/useTranslation';

interface NavbarProps {
  variant?: 'default' | 'dashboard';
  theme?: 'light' | 'dark';
}

export function Navbar({ variant = 'default', theme = 'light' }: NavbarProps) {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

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

  const getNavContainerClass = () => {
    if (isScrolled) {
      if (theme === 'dark') {
        return 'max-w-5xl bg-[#0c0a1b]/70 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-2xl h-[68px] px-6 sm:px-10 border backdrop-blur-xl';
      }
      return 'max-w-5xl bg-white/70 dark:bg-[#161423]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] rounded-2xl h-[68px] px-6 sm:px-10';
    }
    return 'max-w-7xl bg-transparent border-transparent h-24 sm:h-28 px-6 sm:px-10';
  };

  const getLinkClass = () => {
    if (theme === 'dark') {
      return 'text-white/80 hover:text-white transition-colors font-semibold text-[15px] hover:-translate-y-0.5 transform duration-200';
    }
    return 'text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-semibold text-[15px] hover:-translate-y-0.5 transform duration-200';
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
          className={`w-full flex items-center justify-between overflow-hidden ${getNavContainerClass()}`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <ApplicationLogo
              style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              className={`group-hover:scale-105 group-hover:shadow-md transition-transform drop-shadow-sm ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
            />
            <span 
              style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }} 
              className={`font-extrabold tracking-tight bg-gradient-to-r ${theme === 'dark' ? 'from-white to-[#A78BFA]' : 'from-primary to-[#8B5CF6]'} bg-clip-text text-transparent ${isScrolled ? 'text-lg' : 'text-2xl'}`}
            >
              Ba-Yu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link to="/" className={getLinkClass()}>
              {t("navbar.home") || "Beranda"}
            </Link>
            <a href="#tentang" className={getLinkClass()}>
              {t("navbar.about") || "Tentang"}
            </a>
            <Link to="/katalog" className={getLinkClass()}>
              {t("navbar.explore") || "Jelajahi"}
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && user ? (
              <Link to="/profile" className="group rounded-full p-1 border border-transparent hover:border-gray-200 transition-colors">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  size={isScrolled ? 32 : 40}
                  className={`shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all`}
                />
              </Link>
            ) : (
              <>
                <button
                  className={`hidden md:block font-bold px-3 sm:px-4 py-2 rounded-full transition-colors text-sm ${
                    theme === 'dark'
                      ? 'text-white/80 hover:text-white hover:bg-white/5'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50/50 dark:hover:bg-white/5'
                  }`}
                  onClick={() => openAuthModal('login')}
                >
                  {t("navbar.login") || "Masuk"}
                </button>
                <button
                  className={`${
                    theme === 'dark'
                      ? 'bg-white hover:bg-gray-100 text-[#0c0a1a] shadow-lg shadow-white/5'
                      : 'bg-primary hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:shadow-primary/30'
                  } rounded-full font-bold transition-all hover:-translate-y-0.5 ${
                    isScrolled 
                      ? 'px-5 py-2 text-sm' 
                      : 'px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-[15px]'
                  }`}
                  onClick={() => openAuthModal('register')}
                >
                  {t("navbar.register_free") || "Daftar Gratis"}
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