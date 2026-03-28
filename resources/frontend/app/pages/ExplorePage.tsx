import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Search, Filter, BookOpen, Check, Eye, Heart, Upload, LogIn, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { mockNotes, mataPelajaran, getUserById } from '../data/mockData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth-modal';

export default function ExplorePage() {
  const { isAuthenticated } = useAuth();
  const [activeSegment, setActiveSegment] = useState<'kategori' | 'populer' | 'terbaru'>('kategori');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth modal for guest users
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  // Reveal animations for guest mode
  useEffect(() => {
    if (!isAuthenticated) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.explore-reveal').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [isAuthenticated, activeSegment]);

  const tabItems = [
    { key: 'kategori' as const, label: 'Untuk Anda', icon: Sparkles },
    { key: 'populer' as const, label: 'Terpopuler', icon: TrendingUp },
    { key: 'terbaru' as const, label: 'Terbaru', icon: Clock },
  ];

  // === SHARED CONTENT ===
  const exploreContent = (
    <div className={!isAuthenticated ? 'bg-[#FAFAFA]' : ''}>
      
      {/* Hero Section — Guest Only */}
      {!isAuthenticated && (
        <div className="relative overflow-hidden bg-white pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-gray-100">
          {/* Decorative orbs */}
          <div className="absolute top-10 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-[5%] w-56 h-56 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="explore-reveal opacity-0 translate-y-6" style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                <BookOpen className="w-3.5 h-3.5" />
                Perpustakaan Digital Ba-Yu
              </div>
              <h1 className="font-['Lexend_Deca'] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight mb-4 leading-[1.1]">
                Jelajahi Ribuan <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">Catatan Belajar</span>
              </h1>
              <p className="text-gray-500 font-['Manrope'] text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                Temukan materi terbaik dari pelajar dan pakar pendidikan di seluruh Indonesia. Gratis untuk semua.
              </p>
            </div>
            
            {/* Search Bar — Premium */}
            <div className="explore-reveal opacity-0 translate-y-6 max-w-2xl" style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari mata pelajaran, topik, atau kata kunci..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-13 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.08)] transition-all shadow-sm placeholder:text-gray-400"
                  />
                </div>
                <button className="w-14 h-14 bg-primary hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 shrink-0">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logged-in Header */}
      {isAuthenticated && (
        <div className="px-6 md:px-0 pt-7 md:pt-2 pb-6">
          <h1 className="text-2xl font-['Lexend_Deca'] font-bold text-gray-900">Eksplorasi</h1>
          <p className="text-gray-500 font-['Manrope'] text-sm mt-1">Temukan materi belajar terbaik untukmu</p>
          {/* Search for logged in */}
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari biologi kelas 10..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <button className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-primary transition-colors flex-shrink-0">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className={`${isAuthenticated ? 'px-6 md:px-0' : 'max-w-7xl mx-auto px-6 sm:px-8 pt-10 sm:pt-14'} mb-10`}>
        <div className="explore-reveal opacity-0 translate-y-6" style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
          <h2 className={`font-['Lexend_Deca'] font-bold text-gray-900 mb-5 ${isAuthenticated ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
            Mata Pelajaran
          </h2>
          <div className={`grid gap-3 ${isAuthenticated ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 md:gap-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'}`}>
            {mataPelajaran.map((subject, i) => (
              <button
                key={subject.id}
                className={`bg-white border border-gray-100 p-4 flex gap-3 items-center hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all text-left group ${
                  isAuthenticated ? 'rounded-2xl' : 'rounded-[1.25rem]'
                }`}
                style={!isAuthenticated ? { transitionDelay: `${i * 30}ms` } : undefined}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  {subject.icon}
                </div>
                <div className="min-w-0">
                   <h3 className="font-['Lexend_Deca'] font-bold text-sm text-gray-900 truncate">
                     {subject.name}
                   </h3>
                   <p className="text-[10px] font-['Manrope'] text-gray-400 truncate font-semibold">
                     120+ Catatan
                   </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Tab Navigation */}
      <div className={`${isAuthenticated ? 'px-6 md:px-0' : 'max-w-7xl mx-auto px-6 sm:px-8'} mb-8`}>
        <div className="explore-reveal opacity-0 translate-y-6" style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
          {!isAuthenticated ? (
            /* Premium Pill Tabs for Guests */
            <div className="inline-flex bg-gray-100/80 rounded-2xl p-1.5 gap-1">
              {tabItems.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSegment(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] font-['Lexend_Deca'] font-bold text-sm transition-all duration-300 ${
                    activeSegment === tab.key
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            /* Underline Tabs for Logged In */
            <div className="flex gap-8 border-b border-gray-200">
              {tabItems.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSegment(tab.key)}
                  className={`pb-4 relative font-['Lexend_Deca'] font-semibold text-sm transition-colors ${
                    activeSegment === tab.key ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {activeSegment === tab.key && (
                    <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      <div className={`${isAuthenticated ? 'px-6 md:px-0' : 'max-w-7xl mx-auto px-6 sm:px-8'}`}>
        <div className={`grid gap-6 ${isAuthenticated ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {mockNotes.map((note, i) => {
            const author = getUserById(note.authorId);
            return (
              <Link
                key={note.id}
                to={`/note/${note.id}`}
                className={`explore-reveal opacity-0 translate-y-6 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full border border-gray-100 ${
                  isAuthenticated ? 'rounded-2xl shadow-sm' : 'rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                }`}
                style={{ transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, box-shadow 0.3s ease` }}
              >
                {/* Thumbnail */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={note.thumbnail}
                    alt={note.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {note.isValidated && (
                    <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Check className="w-3.5 h-3.5" /> Tervalidasi
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> 12 Hal
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-[10px] font-['Manrope'] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                      {note.mataPelajaran}
                    </span>
                    <span className="text-[10px] font-['Manrope'] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      {note.jenjang}
                    </span>
                  </div>
                  
                  <h4 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[15px] mb-4 leading-snug flex-1">
                    {note.title}
                  </h4>

                  {/* Author & Stats */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={author?.avatar}
                        alt={author?.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <p className="font-['Manrope'] font-bold text-xs text-gray-900 truncate w-24">
                          {author?.name}
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium">2 jam yang lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                      <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                        <Eye className="w-3.5 h-3.5" /> <span>{note.views}</span>
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                        <Heart className="w-3.5 h-3.5" /> <span>{note.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Guest CTA Banner */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 pb-16">
          <div className="explore-reveal opacity-0 translate-y-6" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-purple-700 rounded-[2rem] p-8 sm:p-14 text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="font-['Lexend_Deca'] font-extrabold text-white text-2xl sm:text-3xl mb-3 tracking-tight">
                  Punya catatan bagus?
                </h3>
                <p className="text-white/80 font-['Manrope'] text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Bergabung dan bagikan catatan belajarmu ke ribuan pelajar di seluruh Indonesia. Gratis selamanya!
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button 
                    onClick={() => openAuthModal('register')}
                    className="bg-white text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Daftar & Upload
                  </button>
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-white border-2 border-white/30 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sudah Punya Akun
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Logged-in: dashboard layout
  if (isAuthenticated) {
    return <MobileLayout>{exploreContent}</MobileLayout>;
  }

  // Guest: landing page layout with reveal styles
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <style>{`
        .explore-reveal.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      <Navbar variant="default" />
      {exploreContent}
      <Footer />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authTab} 
      />
    </div>
  );
}