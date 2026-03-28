import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ScrollToTop } from '../components/scroll-to-top';
import { Button } from '../components/ui/button';
import { BookOpen, Shield, CheckCircle, Zap, Star, Sparkles, Type, ImageIcon, Bold, Italic, Underline, Heading1, List, ArrowRight, Calculator, Globe2, FlaskConical, Languages, Code2, Rocket } from 'lucide-react';
import { AuthModal } from '../components/auth-modal';
import { FeatureCarousel } from '../components/feature-carousel';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isScrolled, setIsScrolled] = useState(false);

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-12');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    // Add slightly delayed stagger classes
    document.querySelectorAll('.reveal').forEach((el, index) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const glassClass = 'bg-white/60 backdrop-blur-lg border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]';

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden selection:bg-primary/20 scroll-smooth">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .reveal { transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
          `,
        }}
      />
      
      <Navbar />
      <ScrollToTop />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authTab}
      />

      {/* HERO SECTION */}
      <section id="beranda" className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white overflow-hidden min-h-[90vh] flex items-center">
        {/* LIGHT RADIAL GRADIENTS */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[radial-gradient(circle,rgba(79,70,229,0.06)_0%,transparent_70%)] rounded-full z-0 pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(192,38,211,0.04)_0%,transparent_70%)] rounded-full z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                
                {/* HERO TEXT */}
                <div className="reveal opacity-0 translate-y-8 text-center lg:text-left mt-10 md:mt-0 lg:col-span-6 xl:col-span-5">
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-indigo-50/80 border border-indigo-100/80 shadow-sm mb-8 lg:mb-10">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span className="text-primary text-[13px] font-bold tracking-wide uppercase">
                            Platform Berbagi Catatan Belajar
                        </span>
                    </div>

                    <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-8">
                        Belajar Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-800">Mudah</span> <br className="hidden xl:block" />
                        dengan Catatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600">Terstruktur</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                        Simpan, bagikan, dan temukan ratusan referensi belajar dari pelajar lainnya. Semuanya terorganisir rapi secara komprehensif untuk membantumu belajar lebih efektif.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-4">
                        <button
                            onClick={() => openAuthModal('register')}
                            className="bg-primary text-white px-9 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transform duration-300 flex items-center justify-center gap-2 group"
                        >
                            Mulai Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="#features"
                            className={`${glassClass} px-9 py-4 rounded-full font-bold text-lg text-gray-700 hover:bg-white hover:border-gray-300 transition-all transform duration-300 hover:-translate-y-0.5 flex items-center justify-center`}
                        >
                            Panduan Fitur
                        </a>
                    </div>
                </div>

                {/* HERO MOCKUP (QLC STYLE FRAME) */}
                <div className="reveal opacity-0 translate-y-12 relative lg:col-span-6 xl:col-span-7" style={{ transitionDelay: '0.15s' }}>
                    {/* Rotated background frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white rounded-[3rem] border border-indigo-100/50 transform rotate-3 z-0 shadow-lg scale-[0.98] mx-auto transition-transform duration-1000 ease-in-out hover:rotate-6"></div>

                    {/* Main Image Frame (No Blur) */}
                    <div className="relative z-10 p-2 sm:p-3 bg-white/40 rounded-[3rem] border border-white shadow-xl aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden group flex items-center justify-center backdrop-blur-sm">
                        <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white/80 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <img
                                src="https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                                alt="Ba-Yu App Mockup"
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Inner glass reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[2.5rem]"></div>
                        </div>
                    </div>

                    {/* Floating Badge (Pakar) */}
                    <div className={`${glassClass} absolute -bottom-6 -left-6 p-4 rounded-2xl shadow-lg z-20 flex items-center gap-3 border border-white/80 transition-transform duration-300 hover:-translate-y-2`}>
                        <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Validasi</p>
                            <p className="text-xs text-gray-600">Pakar Pendidikan</p>
                        </div>
                    </div>
                    
                    {/* Floating Badge (Gratis) */}
                    <div className={`${glassClass} absolute top-10 -right-6 p-4 rounded-2xl shadow-lg z-20 flex items-center gap-3 border border-white/80 transition-transform duration-300 hover:-translate-y-2 hidden md:flex`}>
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">100% Gratis</p>
                            <p className="text-xs text-gray-600">Tanpa Biaya Langganan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* WHY BA-YU (TENTANG) */}
      <section id="tentang" className="py-24 relative bg-[#FDFBF7] border-t border-b border-[#F0ECE1] overflow-hidden">
        {/* Soft Accent Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(79,70,229,0.03)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 lg:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-shadow duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    
                    {/* Graphic Side */}
                    <div className="relative group lg:order-2">
                        <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] transform -translate-x-4 translate-y-4 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-500 ease-out"></div>
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Belajar Bersama" className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-xl border-4 border-white object-cover aspect-[4/3]" />
                    </div>

                    {/* Text Side */}
                    <div className="reveal opacity-0 translate-y-12 lg:order-1" style={{ transitionDelay: '0.15s' }}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-gray-900 leading-[1.15] tracking-tight">
                            Ruang Kolaborasi <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-600">Bagi Pelajar.</span>
                        </h2>

                        <p className="text-gray-600 text-[1.125rem] leading-[1.8] mb-10 text-justify">
                            Jangan biarkan catatan belajarmu menumpuk sia-sia di laci meja. Di <strong className="text-gray-900">Ba-Yu</strong>, kamu bisa membagikan ilmu yang kamu miliki, sekaligus menemukan referensi catatan terbaik dari ribuan pelajar lainnya yang selaras dengan kurikulummu.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex gap-4 items-start hover:border-primary/20 hover:shadow-md transition-all">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Upload Tanpa Batas</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">Simpan semua materi format apapun tanpa takut storage penuh.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex gap-4 items-start hover:border-fuchsia-600/20 hover:shadow-md transition-all">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-fuchsia-600/10 flex items-center justify-center mt-1">
                                    <Zap className="w-6 h-6 text-fuchsia-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Akses Kapan Saja</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">Tersedia fleksibel dan bisa kamu buka dengan lancar dari HP maupun Laptop.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* FEATURE CAROUSEL (Wrapped in Premium Container) */}
      <section className="py-24 bg-gradient-to-b from-[#f8fafc] to-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal opacity-0 translate-y-8">
                <span className="text-fuchsia-600 font-bold text-sm tracking-widest uppercase mb-2 block">Fitur Unggulan</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Fitur yang Membantu Belajarmu</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Semua yang kamu butuhkan untuk membuat catatan belajar lebih efektif dan terorganisir.</p>
            </div>
            
            <div className="reveal opacity-0 translate-y-8" style={{ transitionDelay: '0.2s' }}>
                {/* Re-use the existing feature carousel inside our aesthetic spacing */}
                <FeatureCarousel />
            </div>
        </div>
      </section>

      {/* EXPLORE KATEGORI */}
      <section className="py-24 bg-white relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal opacity-0 translate-y-8">
                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Eksplorasi</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Beragam Kategori Populer</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Temukan ribuan referensi catatan sesuai dengan materi pelajaranmu.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 reveal opacity-0 translate-y-8" style={{ transitionDelay: '0.15s' }}>
                {[
                    { name: 'Matematika', icon: Calculator, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:border-blue-200 hover:shadow-blue-100' },
                    { name: 'Sains & IPA', icon: FlaskConical, color: 'text-green-600', bg: 'bg-green-50', hover: 'hover:border-green-200 hover:shadow-green-100' },
                    { name: 'Bahasa Inggis', icon: Languages, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', hover: 'hover:border-fuchsia-200 hover:shadow-fuchsia-100' },
                    { name: 'Sosial & IPS', icon: Globe2, color: 'text-amber-600', bg: 'bg-amber-50', hover: 'hover:border-amber-200 hover:shadow-amber-100' },
                    { name: 'Pemrograman', icon: Code2, color: 'text-indigo-600', bg: 'bg-indigo-50', hover: 'hover:border-indigo-200 hover:shadow-indigo-100' },
                    { name: 'Lainnya', icon: Rocket, color: 'text-pink-600', bg: 'bg-pink-50', hover: 'hover:border-pink-200 hover:shadow-pink-100' },
                ].map((cat, i) => (
                    <Link key={i} to="/explore" className={`flex flex-col items-center p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cat.hover} group`}>
                        <div className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <cat.icon className={`w-6 h-6 ${cat.color}`} />
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm text-center">{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* EDITOR SHOWCASE (BENTO GRID STYLE) */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Soft Organic Gradients for Ba-Yu Aesthetic */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_60%)] rounded-full z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(192,38,211,0.25)_0%,transparent_60%)] rounded-full z-0 pointer-events-none translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Text Box */}
                <div className="reveal opacity-0 translate-y-12 lg:col-span-5 rounded-[3rem] p-10 md:p-14 bg-white/10 border border-white/20 backdrop-blur-md text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border border-white/30 text-white shadow-inner">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-[1.15]">
                        Buat Catatan Rapi. <br/> <span className="text-white/80 font-light">Sangat Mudah.</span>
                    </h2>
                    <p className="text-lg leading-relaxed font-light text-white/90 mb-10">
                        Gak perlu pusing mikirin format desain. Editor simpel Ba-Yu membantumu merapikan catatan seketika agar enak dibaca oleh siapa pun.
                    </p>
                    
                    <ul className="space-y-5">
                        <li className="flex items-center gap-4 text-white">
                            <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></span> 
                            <span className="font-medium text-[1.1rem]">Ubah Gaya Tulisan Sekali Klik</span>
                        </li>
                        <li className="flex items-center gap-4 text-white">
                            <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></span> 
                            <span className="font-medium text-[1.1rem]">Upload Gambar & Diagram Pendukung</span>
                        </li>
                        <li className="flex items-center gap-4 text-white">
                            <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></span> 
                            <span className="font-medium text-[1.1rem]">Buat Daftar & Header dengan Cepat</span>
                        </li>
                    </ul>
                </div>

                {/* Right Interactive Box (The Mockup) */}
                <div className="reveal opacity-0 translate-y-12 lg:col-span-7" style={{ transitionDelay: '0.2s' }}>
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-900/40 border-4 border-white overflow-hidden group hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {/* Editor Toolbar Header */}
                        <div className="bg-gray-50 border-b border-gray-100 p-4 flex gap-3 px-6 overflow-x-auto no-scrollbar">
                            {[Bold, Italic, Underline, Heading1, List, ImageIcon].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 shrink-0 rounded-xl bg-white border border-gray-200 flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300 text-gray-500">
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>

                        {/* Editor Body Simulator */}
                        <div className="p-8 sm:p-10 space-y-8 bg-white min-h-[350px] sm:min-h-[400px]">
                            {/* Title Skeleton */}
                            <div className="h-10 w-3/4 bg-gray-100 rounded-xl group-hover:bg-primary/10 transition-colors duration-700"></div>
                            
                            {/* Paragraph Skeleton */}
                            <div className="space-y-4">
                                <div className="h-3 w-full bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-700 delay-100"></div>
                                <div className="h-3 w-[95%] bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-700 delay-150"></div>
                                <div className="h-3 w-[85%] bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-700 delay-200"></div>
                            </div>
                            
                            {/* Image Attachment Box */}
                            <div className="h-40 bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-primary/50 transition-colors duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 delay-100">
                                    <ImageIcon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-sm font-semibold text-primary">Upload Thumbnail</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* FINAL CTA (SIMPLE & CLEAN) */}
      <section className="py-24 bg-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            <div className="reveal opacity-0 translate-y-12">
                <span className="inline-block py-2.5 px-6 rounded-full bg-primary/10 border border-primary/20 shadow-sm text-primary text-sm font-bold tracking-wider mb-6">
                    🚀 GABUNG SEKARANG
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                    Mulai Bagikan <br/>Catatan Terbaikmu!
                </h2>
                
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Bergabunglah bersama komunitas yang sudah mendigitalkan cara belajar mereka. Semuanya gratis dan mudah diakses.
                </p>

                <button 
                  onClick={() => openAuthModal('register')}
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                >
                  Daftar Lewat Email Gratis
                </button>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}