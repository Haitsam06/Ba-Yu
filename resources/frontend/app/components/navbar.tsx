import { Link } from 'react-router';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from './auth-modal';

interface NavbarProps {
  variant?: 'default' | 'dashboard';
}

export function Navbar({ variant = 'default' }: NavbarProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  if (variant === 'dashboard') {
    return null; // Dashboard has its own top bar
  }

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-[#7B68EE] bg-clip-text text-transparent">
              Ba-Yu
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Fitur
            </a>
            <Link
              to="/explore"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Jelajahi
            </Link>
            <Button 
              variant="ghost" 
              className="font-semibold"
              onClick={() => openAuthModal('login')}
            >
              Masuk
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 font-semibold shadow-lg shadow-primary/25"
              onClick={() => openAuthModal('register')}
            >
              Daftar
            </Button>
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