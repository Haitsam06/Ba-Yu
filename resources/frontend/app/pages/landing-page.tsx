import { Link } from 'react-router';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ScrollToTop } from '../components/scroll-to-top';
import { Button } from '../components/ui/button';
import { BookOpen, Filter, Share2, ArrowRight, Users, FileText, Star, CheckCircle, Zap, TrendingUp, CheckCircle2, Flame, Trophy, Shield, Sparkles, Type, Image as ImageIcon, Bold, Italic, Underline, Heading1, List } from 'lucide-react';
import { motion } from 'motion/react';
import { FeatureCarousel } from '../components/feature-carousel';
import { useState } from 'react';
import { AuthModal } from '../components/auth-modal';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTop />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authTab}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 pb-16 md:pb-28 min-h-[80vh] md:min-h-[85vh] flex items-center">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary -z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-50/30 to-transparent -z-10" />
        
        {/* Subtle Animated Orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-primary/10 to-purple-200/20 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-[8%] w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-gradient-to-tr from-accent/15 to-blue-100/20 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6 md:space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="inline-flex items-center gap-2 md:gap-2.5 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 md:px-5 py-2 md:py-2.5 shadow-sm text-sm md:text-base transition-all duration-300"
                style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(93, 92, 230, 0.2)' }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(93, 92, 230, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(93, 92, 230, 0.2)';
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                </motion.div>
                <span className="text-xs md:text-sm font-semibold text-primary">Platform Belajar Terpercaya di Indonesia</span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-3 md:space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight"
                >
                  Belajar Lebih{' '}
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                    Cerdas
                  </span>
                  <br />
                  Lebih{' '}
                  <span className="bg-gradient-to-r from-accent via-amber-500 to-accent bg-clip-text text-transparent">
                    Terstruktur
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  Platform manajemen catatan belajar yang membantu pelajar Indonesia mengorganisir, berbagi, dan mendiskusikan materi pembelajaran dengan lebih efektif.
                </motion.p>
              </div>

              {/* Key Features Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start"
              >
                {[
                  { icon: CheckCircle, text: 'Gratis Selamanya', color: 'from-green-50 to-emerald-50', textColor: 'text-green-700', iconColor: 'text-green-600' },
                  { icon: BookOpen, text: 'Upload Unlimited', color: 'from-blue-50 to-cyan-50', textColor: 'text-blue-700', iconColor: 'text-blue-600' },
                  { icon: Users, text: 'Validasi Pakar', color: 'from-purple-50 to-pink-50', textColor: 'text-purple-700', iconColor: 'text-purple-600' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`flex items-center gap-1.5 md:gap-2 bg-gradient-to-br ${item.color} border border-gray-200/50 rounded-full px-3 md:px-4 py-2 md:py-2.5 shadow-sm cursor-pointer`}
                  >
                    <item.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${item.iconColor}`} />
                    <span className={`text-xs md:text-sm font-semibold ${item.textColor}`}>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    onClick={() => openAuthModal('register')}
                    className="bg-primary hover:bg-primary/90 h-14 px-8 rounded-xl shadow-lg shadow-primary/25 font-bold text-base group"
                  >
                    Mulai Gratis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <a href="#features">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 rounded-xl border-2 hover:border-primary hover:bg-primary/5 font-semibold text-base"
                    >
                      Lihat Fitur
                    </Button>
                  </motion.div>
                </a>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-5 pt-6 border-t border-border/50"
              >
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
                  ].map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt=""
                      className="w-12 h-12 rounded-full border-3 border-white shadow-md"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.15, zIndex: 10, y: -2 }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.08 }}
                      >
                        <Star className="w-4 h-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Dipercaya oleh <span className="font-bold text-foreground">5,000+</span> pelajar
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Mockup & Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Main Device Mockup */}
              <motion.div 
                className="relative z-10 w-full max-w-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-100 bg-gray-100">
                  <motion.img
                    src="https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGFwcCUyMG1vY2t1cCUyMHNjcmVlbnxlbnwxfHx8fDE3NzE1NTYzMzZ8MA&ixlib=rb-4.1.0&q=80&w=600"
                    alt="Ba-Yu App"
                    className="rounded-[2rem] w-full h-auto object-contain"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating Stats Card - Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, y: 0 }}
                  className="absolute top-8 -left-6 lg:left-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-gray-100 z-20 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">Unlimited</div>
                      <div className="text-sm font-medium text-muted-foreground">Upload Catatan</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Stats Card - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, y: 0 }}
                  className="absolute bottom-8 -right-6 lg:right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-gray-100 z-20 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shadow-lg">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">Pakar</div>
                      <div className="text-sm font-medium text-muted-foreground">Validasi Terpercaya</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Success Badge - Top Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
              >
                <motion.div
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  className="absolute top-1/4 -right-4 lg:-right-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-2xl p-3 z-20 cursor-pointer"
                >
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs font-black uppercase">Gratis</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Rating Badge - Middle Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-1/2 -left-4 lg:-left-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl shadow-2xl p-3 z-20 cursor-pointer"
                >
                  <div className="text-center">
                    <Star className="w-6 h-6 mx-auto mb-1 fill-white" />
                    <div className="text-xs font-black">4.9/5</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {[
              { value: '100%', label: 'Gratis Selamanya' },
              { value: '24/7', label: 'Akses Tanpa Batas' },
              { value: 'Unlimited', label: 'Upload Catatan' },
              { value: 'Pakar', label: 'Validasi Terpercaya' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-primary-foreground/80 text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-4"
            >
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fitur Unggulan</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
            >
              Fitur yang Membantu{' '}
              <span className="bg-gradient-to-r from-primary to-[#7B68EE] bg-clip-text text-transparent">
                Belajarmu
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            >
              Semua yang kamu butuhkan untuk membuat catatan belajar lebih efektif dan terorganisir
            </motion.p>
          </div>

          {/* Feature Carousel */}
          <FeatureCarousel />
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-secondary/50 via-white to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Editor Notion-Style</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Buat Catatan Kayak di{' '}
                <span className="bg-gradient-to-r from-primary to-[#7B68EE] bg-clip-text text-transparent">
                  Notion, Tapi Lebih Mudah!
                </span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8">
                WYSIWYG editor yang super intuitif - tinggal klik toolbar dan langsung keliatan hasilnya. Format text, insert gambar, semua dalam 1 tempat! ✨
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  { 
                    icon: Type, 
                    title: 'Format Visual Langsung', 
                    desc: 'Klik Bold langsung bold, klik Heading langsung gede. No coding!',
                    color: '#5D5CE6'
                  },
                  { 
                    icon: ImageIcon, 
                    title: 'Insert Gambar Bebas', 
                    desc: 'Upload foto di mana aja dalam catatan - mix text & gambar sebebasnya',
                    color: '#FFD166'
                  },
                  { 
                    icon: Zap, 
                    title: 'Toolbar Lengkap', 
                    desc: 'Headings, Lists, Highlight, Link, Code - semua ada & gampang dipakai',
                    color: '#8B5CF6'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-xl hover:bg-white/80 transition-all cursor-pointer group"
                  >
                    <div 
                      className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 text-sm md:text-base text-gray-900 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Interactive Editor Preview */}
              <motion.div 
                className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 md:p-3 flex gap-1.5 md:gap-2">
                  {[Bold, Italic, Underline, Heading1, List, ImageIcon].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.15 }}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center cursor-pointer shadow-sm hover:bg-[#5D5CE6] hover:border-[#5D5CE6] transition-colors group"
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </motion.div>
                  ))}
                </div>

                {/* Editor Content */}
                <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-5 md:h-6 bg-gradient-to-r from-primary to-primary/60 rounded font-bold"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="h-2.5 md:h-3 bg-gray-200 rounded"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="h-2.5 md:h-3 bg-gray-200 rounded"
                  />
                  
                  {/* Image placeholder */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.3, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    className="h-20 md:h-24 bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 rounded-xl border-2 border-dashed border-accent/40 flex items-center justify-center cursor-pointer group"
                  >
                    <div className="text-center">
                      <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-amber-700 font-medium">Klik untuk upload foto</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="h-2.5 md:h-3 bg-gray-200 rounded"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="h-2.5 md:h-3 bg-accent/60 rounded"
                  />
                </div>
              </motion.div>

              {/* Floating badges - Hidden on mobile */}
              <motion.div 
                initial={{ scale: 0, rotate: -15, y: 20 }}
                whileInView={{ scale: 1, rotate: -5, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="hidden md:block absolute -top-4 -left-4 bg-primary rounded-2xl shadow-2xl p-3 border-2 border-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="font-bold text-white text-sm">WYSIWYG</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ scale: 0, rotate: 10, y: 20 }}
                whileInView={{ scale: 1, rotate: 5, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="hidden md:block absolute -bottom-6 -right-6 bg-accent rounded-2xl shadow-2xl p-4 border-2 border-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-amber-700" />
                  <span className="font-bold text-amber-900">Easy Peasy! 🎉</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Simple & Clean */}
      <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden">
        {/* Clean Soft Gradient Background - Konsisten dengan Hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#7B68EE] to-secondary" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        
        {/* Subtle Animated Orbs - Soft & Clean */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-[15%] w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-accent/15 rounded-full blur-3xl"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Avatar Badge - Simple */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 md:px-5 py-2.5 md:py-3"
            >
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/50"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm font-semibold text-white">Bergabung dengan 12,500+ pelajar</span>
            </motion.div>

            {/* Heading - Simple & Clean */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight px-4"
            >
              Siap Mulai Belajar<br />
              Lebih Efektif?
            </motion.h2>

            {/* CTA Button - Simple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => openAuthModal('register')}
                  className="bg-white hover:bg-white/90 text-primary font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Mulai Gratis Sekarang
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}