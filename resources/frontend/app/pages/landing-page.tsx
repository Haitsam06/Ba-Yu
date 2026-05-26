import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ScrollToTop } from '../components/scroll-to-top';
import { ArrowRight, BookOpen, Search, Shield, Sparkles, TrendingUp, Zap, Clock, Bookmark, Eye, Star } from 'lucide-react';
import { AuthModal } from '../components/auth-modal';
import { mockNotes, getUserById } from '../data/mockData';
import { DefaultThumbnail, AvatarImage } from '../components/ui/DefaultImages';

const FADE_UP = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as any }
};

const STAGGER = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

const STAGGER_ITEM = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as any }
};

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  
  // Sticky Scroll State
  const [activeFeature, setActiveFeature] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      // Calculate progress of the sticky section (0 to 1)
      const progress = -rect.top / (rect.height - window.innerHeight);
      
      if (progress < 0.25) setActiveFeature(0);
      else if (progress >= 0.25 && progress < 0.6) setActiveFeature(1);
      else setActiveFeature(2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Mulai dari Mana Saja",
      desc: "Kumpulkan catatan mentah, slide PPT, atau coretan buku. Ba-Yu menyatukan semuanya ke dalam satu ruang belajar digital yang rapi dan terorganisir.",
      image: "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\f1ef4cdb-25db-4679-ad0f-cb7beb18f6c0\\feature_upload_elegant_1779741741001.png"
    },
    {
      title: "Editor Super Cerdas",
      desc: "Ubah materi mentah menjadi catatan terstruktur dalam hitungan detik. Editor Ba-Yu didesain dengan presisi tinggi untuk kenyamanan membaca tanpa batas.",
      image: "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\f1ef4cdb-25db-4679-ad0f-cb7beb18f6c0\\feature_editor_elegant_1779741755501.png"
    },
    {
      title: "Kolaborasi Komprehensif",
      desc: "Belajar tidak pernah sendirian. Temukan, simpan, dan bagikan referensi terbaik dari ribuan pelajar lainnya yang selaras dengan tujuanmu.",
      image: "C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\f1ef4cdb-25db-4679-ad0f-cb7beb18f6c0\\feature_collab_elegant_1779741769370.png"
    }
  ];

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 bg-white dark:bg-[#050505] min-h-screen overflow-x-hidden selection:bg-primary/20">
      
      <Navbar />
      <ScrollToTop />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authTab}
      />

      {/* GODLY HERO SECTION */}
      <section className="pt-40 pb-24 lg:pt-52 lg:pb-32 relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4">
        {/* Subtle abstract background mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_50%)] pointer-events-none"></div>

        <motion.div 
          className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-gray-50/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8 backdrop-blur-md"
          {...FADE_UP}
        >
          <Sparkles className="w-4 h-4 text-primary dark:text-indigo-400" />
          <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold tracking-wide">
            Memperkenalkan Ba-Yu 2.0
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold text-gray-900 dark:text-white tracking-[-0.04em] leading-[1.05] mb-8 max-w-5xl"
          {...FADE_UP}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as any }}
        >
          Masa Depan <br className="hidden sm:block"/> Catatan Belajar.
        </motion.h1>

        <motion.p 
          className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 font-medium max-w-3xl leading-[1.6]"
          {...FADE_UP}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as any }}
        >
          Ba-Yu adalah platform digital modern untuk merapikan, menyimpan, dan membagikan catatan belajarmu dengan kualitas presentasi profesional.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          {...FADE_UP}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as any }}
        >
          <button
            onClick={() => openAuthModal('register')}
            className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 flex items-center justify-center gap-2"
          >
            Mulai Gratis <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* MARQUEE SOCIAL PROOF */}
      <section className="py-10 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Dipercaya oleh ribuan pelajar cerdas</p>
        </div>
        <div className="flex whitespace-nowrap opacity-60 dark:opacity-40" style={{ animation: "scroll 30s linear infinite" }}>
            <style>
                {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `}
            </style>
            <div className="flex gap-20 px-10 items-center">
                {/* Simulated University / School Logos using Text for clean look */}
                {["Universitas Indonesia", "Institut Teknologi Bandung", "Universitas Gadjah Mada", "SMAN 1 Jakarta", "SMA Taruna Nusantara", "Universitas Airlangga", "Binus University"].map((name, i) => (
                    <span key={i} className="text-xl md:text-2xl font-extrabold text-gray-400 dark:text-gray-500 tracking-tight">{name}</span>
                ))}
                {/* Repeat for seamless loop */}
                {["Universitas Indonesia", "Institut Teknologi Bandung", "Universitas Gadjah Mada", "SMAN 1 Jakarta", "SMA Taruna Nusantara", "Universitas Airlangga", "Binus University"].map((name, i) => (
                    <span key={i} className="text-xl md:text-2xl font-extrabold text-gray-400 dark:text-gray-500 tracking-tight">{name}</span>
                ))}
            </div>
        </div>
      </section>

      {/* GODLY INTERACTIVE TABS */}
      <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden" ref={stickyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <motion.h2 
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
                    {...FADE_UP}
                >
                    Dirancang untuk setiap kebutuhan.
                </motion.h2>
                <motion.p 
                    className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                    {...FADE_UP}
                    transition={{ delay: 0.1 }}
                >
                    Baik Anda seorang pelajar, guru, atau mahasiswa, Ba-Yu menyesuaikan dengan cara Anda belajar.
                </motion.p>
            </div>

            {/* Tab Navigation */}
            <motion.div 
                className="flex flex-wrap justify-center gap-2 mb-16"
                {...FADE_UP}
                transition={{ delay: 0.2 }}
            >
                {features.map((feature, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveFeature(idx)}
                        className={`px-6 py-3 rounded-full font-['Lexend_Deca'] font-bold text-sm sm:text-base transition-all duration-300 border ${
                            activeFeature === idx 
                                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-lg scale-105' 
                                : 'bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                    >
                        {feature.title}
                    </button>
                ))}
            </motion.div>

            {/* Tab Content Crossfade */}
            <div className="relative mx-auto max-w-5xl h-auto md:h-[500px] bg-gray-50 dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${activeFeature}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" as any }}
                        className="flex-1 text-center md:text-left"
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                            {features[activeFeature].title}
                        </h3>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            {features[activeFeature].desc}
                        </p>
                        <button onClick={() => openAuthModal('register')} className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all">
                            Eksplorasi Sekarang <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`img-${activeFeature}`}
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" as any }}
                        className="flex-1 w-full relative h-[300px] md:h-full rounded-2xl overflow-hidden shadow-xl"
                    >
                        <img
                            src={features[activeFeature].image}
                            alt={features[activeFeature].title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* BENTO GRID SHOWCASE (Elegant) */}
      <section className="py-32 bg-gray-50/50 dark:bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-20" {...FADE_UP}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                    Dibangun untuk hasil nyata.
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Bukan sekadar penyimpanan awan, melainkan alat produksi cerdas untuk akademis.
                </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              {...STAGGER}
            >
                {/* Bento Item 1 */}
                <motion.div className="md:col-span-2 bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-sm" {...STAGGER_ITEM}>
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Manajemen Kategori Rapi</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        Pisahkan catatan Matematika dari Fisika dengan struktur folder otomatis. Setiap catatan diberi tag secara otomatis berdasarkan konteksnya.
                    </p>
                </motion.div>

                {/* Bento Item 2 */}
                <motion.div className="md:col-span-1 bg-primary text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden" {...STAGGER_ITEM}>
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Keamanan Enterprise</h3>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Data catatanmu dienkripsi penuh dan terlindungi selamanya.
                        </p>
                    </div>
                </motion.div>

                {/* Bento Item 3 */}
                <motion.div className="md:col-span-1 bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-sm" {...STAGGER_ITEM}>
                    <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                        <Zap className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Cepat & Responsif</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        Akses materi di HP, tablet, atau laptop tanpa delay.
                    </p>
                </motion.div>

                {/* Bento Item 4 */}
                <motion.div className="md:col-span-2 bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row gap-8 items-center" {...STAGGER_ITEM}>
                    <div className="flex-1">
                        <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <Search className="w-6 h-6 text-gray-900 dark:text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pencarian Universal</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            Mencari kalimat spesifik di dalam puluhan halaman catatan dalam sepersekian detik.
                        </p>
                    </div>
                    <div className="w-full sm:w-64 h-48 bg-gray-50 dark:bg-black rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-center">
                         <span className="text-gray-300 dark:text-gray-700 font-bold tracking-widest text-sm">UI PREVIEW</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* GODLY CTA SECTION */}
      <section className="py-32 bg-white dark:bg-[#050505] text-center border-t border-gray-100 dark:border-white/5">
        <motion.div className="max-w-4xl mx-auto px-4" {...FADE_UP}>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
                Tingkatkan Kualitas <br/> Belajarmu Hari Ini.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Bergabunglah secara gratis dan mulai digitalkan seluruh catatanmu dalam satu tempat yang indah.
            </p>
            <button 
                onClick={() => openAuthModal('register')}
                className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-bold text-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
                Coba Ba-Yu Gratis
            </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
