import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'motion/react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ScrollToTop } from '../components/scroll-to-top';
import { AuthModal } from '../components/auth-modal';
import ApplicationLogo from '../components/ApplicationLogo';
import {
  BookOpen, Search, Shield, Zap, ArrowRight,
  Globe, Users, Star, CheckCircle2, Layers,
  PenTool, Flame, Trophy, Eye, Bookmark, Sparkles,
  Code, Award, Share2, CornerDownRight, Terminal,
  Shuffle
} from 'lucide-react';
import { mataPelajaran } from '../data/mockData';
/* ===================================================
   DATA: Multilingual "Education" words
   =================================================== */
const MULTI_LANG_TEXTS = [
  { code: 'EN', flag: '🇬🇧', lang: 'English', text: 'Hello,\nShare your notes\nHere!', badge: 'ACTIVE MULTI-LANG', glyphs: ['A', 'Ω', '✎', '✍'] },
  { code: 'ID', flag: '🇮🇩', lang: 'Indonesia', text: 'Halo,\nBagikan catatanmu\ndi Sini!', badge: 'AKTIF MULTI-BAHASA', glyphs: ['a', 'b', 'c', '✍'] },
  { code: 'JP', flag: '🇯🇵', lang: '日本語', text: 'こんにちは、\nここでノートを\n共有して！', badge: 'マルチ言語対応', glyphs: ['あ', 'か', 'さ', 'た'] },
  { code: 'KR', flag: '🇰🇷', lang: '한국어', text: '안녕하세요,\n여기서 노트를\n공유하세요!', badge: '다국어 지원 활성', glyphs: ['가', '나', '다', '라'] },
  { code: 'ZH', flag: '🇨🇳', lang: '简体中文', text: '你好，\n在此分享你的\n笔记！', badge: '多语言模式开启', glyphs: ['文', '字', '书', '学'] },
  { code: 'AR', flag: '🇸🇦', lang: 'العربية', text: 'مرحباً،\nشارك ملاحظاتك\nهنا!', badge: 'نشط متعدد اللغات', glyphs: ['أ', 'ب', 'ت', 'ث'] },
  { code: 'ES', flag: '🇪🇸', lang: 'Español', text: '¡Hola,\ncomparte tus notas\naquí!', badge: 'MULTILINGÜE ACTIVO', glyphs: ['á', 'é', 'í', 'ó'] },
  { code: 'FR', flag: '🇫🇷', lang: 'Français', text: 'Bonjour,\npartagez vos notes\nici !', badge: 'ACTIF MULTILINGUE', glyphs: ['à', 'è', 'ù', 'ç'] },
  { code: 'DE', flag: '🇩🇪', lang: 'Deutsch', text: 'Hallo,\nteilen Sie Ihre Notizen\nhier!', badge: 'AKTIV MULTILINGUAL', glyphs: ['ä', 'ö', 'ü', 'ß'] },
  { code: 'RU', flag: '🇷🇺', lang: 'Русский', text: 'Привет,\nподелись своими заметками\nздесь!', badge: 'АКТИВНЫЙ ЯЗЫК', glyphs: ['А', 'Б', 'В', 'Г'] },
  { code: 'PT', flag: '🇵🇹', lang: 'Português', text: 'Olá,\ncompartilhe suas notas\naqui!', badge: 'MULTILINGUE ATIVO', glyphs: ['ã', 'õ', 'ç', 'ê'] },
  { code: 'IT', flag: '🇮🇹', lang: 'Italiano', text: 'Ciao,\ncondividi le tue note\nqui!', badge: 'MULTILINGUA ATTIVO', glyphs: ['à', 'è', 'ì', 'ò'] },
  { code: 'IN', flag: '🇮🇳', lang: 'हिन्दी', text: 'नमस्ते,\nअपने नोट्स यहाँ\nसाझा करें!', badge: 'सक्रिय बहुभाषी', glyphs: ['अ', 'आ', 'इ', 'ई'] },
  { code: 'TR', flag: '🇹🇷', lang: 'Türkçe', text: 'Merhaba,\nnotlarınızı burada\npaylaşın!', badge: 'AKTİF ÇOK DİLLİ', glyphs: ['ç', 'ğ', 'ı', 'ö'] },
  { code: 'VN', flag: '🇻🇳', lang: 'Tiếng Việt', text: 'Xin chào,\nhãy chia sẻ ghi chú\ntại đây!', badge: 'ĐA NGÔN NGỮ HOẠT ĐỘNG', glyphs: ['ă', 'â', 'đ', 'ê'] },
  { code: 'TH', flag: '🇹🇭', lang: 'ไทย', text: 'สวัสดี\nแบ่งปันบันทึกของคุณ\nที่นี่!', badge: 'เปิดใช้งานหลายภาษา', glyphs: ['ก', 'ข', 'ค', 'ง'] },
  { code: 'NL', flag: '🇳🇱', lang: 'Nederlands', text: 'Hallo,\ndeel je notities\nhier!', badge: 'AKTIEF MULTI-TAAL', glyphs: ['a', 'b', 'c', 'd'] },
  { code: 'PL', flag: '🇵🇱', lang: 'Polski', text: 'Cześć,\npodziel się notatkami\ntutaj!', badge: 'AKTYWNY MULTI-LANG', glyphs: ['ą', 'ć', 'ę', 'ł'] },
  { code: 'SE', flag: '🇸🇪', lang: 'Svenska', text: 'Hej,\ndela dina anteckningar\nhär!', badge: 'AKTIV MULTI-LANG', glyphs: ['å', 'ä', 'ö', 's'] },
  { code: 'NO', flag: '🇳🇴', lang: 'Norsk', text: 'Hei,\ndel notatene dine\nher!', badge: 'AKTIV FLERSPRÅKLIG', glyphs: ['æ', 'ø', 'å', 'n'] },
  { code: 'DK', flag: '🇩🇰', lang: 'Dansk', text: 'Hej,\ndel dine noter\nher!', badge: 'AKTIV FLERSPROGET', glyphs: ['æ', 'ø', 'å', 'd'] },
  { code: 'FI', flag: '🇫🇮', lang: 'Suomi', text: 'Hei,\njaa muistiinpanosi\ntäällä!', badge: 'MONIKIELINEN', glyphs: ['ä', 'ö', 'f', 's'] },
  { code: 'GR', flag: '🇬🇷', lang: 'Ελληνικά', text: 'Γεια σας,\nμοιραστείτε τις σημειώσεις\nσας εδώ!', badge: 'ΕΝΕΡΓΟΠΟΙΗΜΕΝΟ', glyphs: ['α', 'β', 'γ', 'δ'] },
  { code: 'IL', flag: '🇮🇱', lang: 'עברית', text: 'שלום,\nשתף את ההערות\nשלך כאน์!', badge: 'פעيل רב-לשוני', glyphs: ['א', 'ב', 'ג', 'ד'] },
  { code: 'IR', flag: '🇮🇷', lang: 'فارسی', text: 'سلام,\nیادداشت های خود را در اینجا\nبه اشتراک بگذارید!', badge: 'فعال چند زبانه', glyphs: ['ا', 'ب', 'پ', 'ت'] },
  { code: 'UA', flag: '🇺🇦', lang: 'Українська', text: 'Привіт,\nподіліться своїми нотатками\nтут!', badge: 'АКТИВНА МУЛЬТИМОВНІСТЬ', glyphs: ['А', 'Б', 'В', 'Г'] },
  { code: 'RO', flag: '🇷🇴', lang: 'Română', text: 'Bună,\nîmpărtășește-ți notițele\naici!', badge: 'MULTILINGV ACTIV', glyphs: ['ă', 'â', 'î', 'ș'] },
  { code: 'HU', flag: '🇭🇺', lang: 'Magyar', text: 'Szia,\noszd meg a jegyzeteidet\nitt!', badge: 'AKTÍV TÖBBNYELVŰ', glyphs: ['á', 'é', 'í', 'ó'] },
  { code: 'CZ', flag: '🇨🇿', lang: 'Čeština', text: 'Ahoj,\npoděl se o své poznámky\nzde!', badge: 'AKTIVNÍ MULTI-LANG', glyphs: ['á', 'č', 'ď', 'é'] },
  { code: 'SK', flag: '🇸🇰', lang: 'Slovenčina', text: 'Ahoj,\npodeľ sa o svoje poznámky\ntu!', badge: 'AKTÍVNY MULTI-LANG', glyphs: ['á', 'č', 'ď', 'é'] },
  { code: 'BG', flag: '🇧🇬', lang: 'Български', text: 'Здравейте,\nсподелете вашите мисли\nтук!', badge: 'АКТИВЕН ЕЗИК', glyphs: ['А', 'Б', 'В', 'Г'] },
  { code: 'MS', flag: '🇲🇾', lang: 'Melayu', text: 'Helo,\nkongsi pemikiran anda\ndi sini!', badge: 'AKTIF MULTI-BAHASA', glyphs: ['a', 'b', 'c', 'd'] },
  { code: 'SU', flag: '🇮🇩', lang: 'Sunda', text: 'Sampurasun,\nbagikeun pamikiran anjeun\ndi dieu!', badge: 'AKTIF MULTI-BAHASA', glyphs: ['a', 'b', 'c', 'd'] },
  { code: 'JV', flag: '🇮🇩', lang: 'Jawa', text: 'Halo,\nbagikan gagasanmu\ning kene!', badge: 'AKTIF MULTI-BAHASA', glyphs: ['a', 'b', 'c', 'd'] },
  { code: 'PH', flag: '🇵🇭', lang: 'Tagalog', text: 'Kamusta,\nibahagi ang iyong mga saloobin\ndito!', badge: 'AKTIBONG MULTILINGGUAL', glyphs: ['a', 'b', 'c', 'd'] },
  { code: 'IS', flag: '🇮🇸', lang: 'Íslenska', text: 'Hæ,\ndeildu hugsunum þínum\nhér!', badge: 'VIRKT MARGMÁL', glyphs: ['á', 'ð', 'é', 'í'] }
];

/* ===================================================
   COMPONENT: Slot Machine Flag Reel
   =================================================== */
function Reel({ activeIndex, delay }: { activeIndex: number; delay: number }) {
  return (
    <div className="relative h-16 w-16 overflow-hidden bg-black/50 border border-white/10 rounded-xl flex items-center justify-center shadow-[inset_0_4px_16px_rgba(0,0,0,0.8)]">
      {/* 3D Vignette Overlay for curved cylinder effect */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none opacity-80" />
      
      {/* Centered Slot Highlight Area */}
      <div className="absolute inset-y-3 inset-x-0 bg-[#5D5CE6]/5 border-y border-[#5D5CE6]/25 pointer-events-none z-10" />
      {/* Centered Slot Laser Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#5D5CE6]/45 pointer-events-none z-10 -translate-y-1/2" />

      <motion.div
        className="absolute top-0 left-0 w-full flex flex-col items-center justify-start"
        animate={{ y: -activeIndex * 64 }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 14,
          mass: 0.8,
          delay: delay
        }}
      >
        {MULTI_LANG_TEXTS.map((lang, idx) => (
          <div key={idx} className="h-16 w-16 flex items-center justify-center text-3xl select-none leading-none pt-0.5">
            <span className="inline-block transform -translate-y-0.5 select-none">{lang.flag}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ===================================================
   COMPONENT: Infinite Scroll Marquee Row
   =================================================== */
function MarqueeRow({ items, direction = 'left', speed = 30 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className="flex w-full overflow-hidden py-1 relative">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl text-sm font-bold text-white hover:border-[#5D5CE6]/25 transition-all duration-300 select-none"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const row1Items = [
  "🌐 52+ Bahasa Didukung",
  "📝 Editor LaTeX & Markdown",
  "📚 Topik Belajar yang Luas",
  "🎒 Dari Jenjang Sekolah Dasar hingga Kuliah",
  "🔥 Sistem Streak & Habit",
  "🔍 Pencarian Topik & Catatan",
];

const row2Items = [
  "📐 Tulis Rumus KaTeX Mudah",
  "🎓 Belajar Bersama Komunitas",
  "📂 Kumpulan Catatan Lengkap",
  "💬 Saling Berbagi Catatan",
  "🏆 Tumbuh & Berkembang Bersama",
  "🌍 Akses Belajar Kapan Saja",
];

/* ===================================================
   DATA: Subjects for Toggle
   =================================================== */
const SUBJECTS = [
  { name: 'Matematika', icon: '📐', desc: 'Rumus LaTeX & Kalkulus kompleks kini gampang dipahami.', tags: ['Formula LaTeX', 'Kalkulus & Aljabar', 'Metode Pembuktian'] },
  { name: 'Sains', icon: '🔬', desc: 'Dari hukum termodinamika hingga struktur sel biologi.', tags: ['Hukum Fisika', 'Struktur Sel Biologi', 'Reaksi Kimia'] },
  { name: 'Bahasa', icon: '📚', desc: 'Analisis tata bahasa, prosa, dan retorika linguistik.', tags: ['Tata Bahasa', 'Linguistik', 'Prosa & Retorika'] },
  { name: 'Sosial', icon: '🌍', desc: 'Peta tektonik, demografi, dan struktur sosiologi masyarakat.', tags: ['Geografi', 'Demografi Penduduk', 'Struktur Sosiologi'] },
  { name: 'Coding', icon: '💻', desc: 'Catat snippet kode, dokumentasi API, dan logika algoritma.', tags: ['Snippet Kode', 'Logika Algoritma', 'Struktur Data'] },
  { name: 'Sejarah', icon: '🏛️', desc: 'Garis waktu peradaban, arsip sejarah, dan peninggalan kuno.', tags: ['Garis Waktu Peradaban', 'Arsip Sejarah', 'Peninggalan Kuno'] },
];

/* ===================================================
   DATA: Slot Machine / Feature Tags for Cockpit
   =================================================== */
const COCKPIT_FEATURES = [
  {
    id: 'latex',
    title: 'LaTeX Rich Editor',
    badge: 'Formula Cerdas',
    icon: Code,
    color: '#8B5CF6',
    desc: 'Tulis rumus matematika dan sains seindah jurnal akademis profesional menggunakan render engine KaTeX berkecepatan tinggi.',
    mockupType: 'editor',
  },
  {
    id: 'verification',
    title: 'Pakar Verified',
    badge: 'Jaminan Akurasi',
    icon: Award,
    color: '#10B981',
    desc: 'Setiap catatan krusial dapat ditinjau oleh pakar bidang studi atau guru terverifikasi untuk memastikan kebenaran rumus dan konsep.',
    mockupType: 'badge',
  },
  {
    id: 'search',
    title: 'Pencarian Instan',
    badge: 'Sub-second Index',
    icon: Search,
    color: '#3B82F6',
    desc: 'Cari kata kunci, topik, bahkan rumus LaTeX spesifik di seluruh catatan komunitas secara instan secepat kedipan mata.',
    mockupType: 'search',
  },
  {
    id: 'community',
    title: 'Habit & Streak',
    badge: 'Fokus Harian',
    icon: Flame,
    color: '#EF4444',
    desc: 'Bangun kebiasaan belajar harian yang konsisten bersama ribuan pelajar lain dengan sistem streak interaktif dan reward eksklusif.',
    mockupType: 'streak',
  }
];

/* ===================================================
   COMPONENT: Floating Grain Background Element
   =================================================== */
function GrainNoise() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />
  );
}

/* ===================================================
   COMPONENT: Text Scroll Highlight Reveal (Motto Style)
   =================================================== */
function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = "Kami percaya bahwa pendidikan terbaik lahir dari kolaborasi. Ba-Yu hadir untuk membantu Anda menyusun gagasan, berbagi wawasan, dan tumbuh bersama dalam komunitas belajar yang saling mendukung.";
  const words = text.split(" ");

  return (
    <div ref={containerRef} className="relative py-28 md:py-40 bg-[#080616] overflow-hidden flex items-center justify-center">
      {/* Decorative radial lighting behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"
           style={{ background: 'radial-gradient(circle, #5D5CE6 0%, transparent 60%)' }} />
      <GrainNoise />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <p className="text-xs md:text-sm font-semibold text-[#8B5CF6] tracking-[0.2em] uppercase mb-6 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin-slow" /> VISI KAMI
        </p>

        <h3 className="font-display font-bold tracking-tight leading-[1.3] text-left md:text-center" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            
            // Highly responsive color highlight transition based on scroll position (completes at viewport center)
            const rangeStart = start * 0.22 + 0.18;
            const rangeEnd = end * 0.22 + 0.22;
            const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.15, 1]);
            const color = useTransform(
              scrollYProgress, 
              [rangeStart, rangeEnd], 
              ['rgba(255,255,255,0.15)', '#ffffff']
            );
            const scale = useTransform(
              scrollYProgress,
              [rangeStart, rangeEnd],
              [0.98, 1]
            );

            return (
              <motion.span 
                key={i} 
                className="inline-block mr-3 md:mr-4 mb-2 origin-left transition-all"
                style={{ opacity, color, scale }}
              >
                {word}
              </motion.span>
            );
          })}
        </h3>

        <motion.div 
          className="mt-12 inline-flex items-center gap-3 text-xs md:text-sm font-semibold text-[#8B5CF6] border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 px-5 py-2.5 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CornerDownRight className="w-4 h-4" />
          <span>Filosofi Ba-Yu — Belajar, Berbagi, Tumbuh Bersama</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ===================================================
   COMPONENT: Cyberpunk Scramble/Morphing Text Effect
   =================================================== */
function MorphingText({ text, className = "" }: { text: string; className?: string }) {
  const [displayVal, setDisplayVal] = useState(text);
  const prevTextRef = useRef(text);

  useEffect(() => {
    let iterations = 0;
    const maxLen = Math.max(text.length, prevTextRef.current.length);
    const interval = setInterval(() => {
      setDisplayVal(() => {
        let result = "";
        for (let i = 0; i < maxLen; i++) {
          const targetChar = text[i] || "";
          
          if (targetChar === " " || targetChar === "\n" || targetChar === ":" || targetChar === "_" || targetChar === "-" || targetChar === "[" || targetChar === "]") {
            result += targetChar;
            continue;
          }

          if (i < iterations) {
            result += targetChar;
          } else {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return result;
      });

      if (iterations >= maxLen) {
        clearInterval(interval);
        prevTextRef.current = text;
      }
      iterations += 0.5;
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayVal}</span>;
}

/* ===================================================
   COMPONENT: Interactive Count-Up Animation
   =================================================== */
function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * to));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [to, duration]);

  return <span>{count}</span>;
}

/* ===================================================
   COMPONENT: Interactive Holographic Topic Warp Section
   =================================================== */
function TopicWarpSection({ openAuthModal }: { openAuthModal: (tab: 'login' | 'register') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Golden ratio hash for evenly-distributed horizontal positions
  const GOLDEN_RATIO = 0.618033988749895;
  
  const WARP_TOPICS = mataPelajaran.map((m, idx) => {
    // Golden ratio hashing for beautifully-spaced horizontal distribution (5%–95%)
    const hash = ((idx * GOLDEN_RATIO) % 1);
    const left = `${(hash * 90) + 5}%`;
    
    // Stagger: ~0.8s gap so all 78 topics start within ~62s, then loop continuously  
    const delay = idx * 0.8;
    
    // Variable speeds between 18s–28s for natural parallax depth feel
    const speed = 18 + ((idx * 7) % 11);
    
    // 3 depth layers: small (far), medium, large (near) — for parallax illusion
    const depthLayer = idx % 3;
    const fontSize = depthLayer === 0 ? 'text-[9px] md:text-[11px]' : depthLayer === 1 ? 'text-[11px] md:text-sm' : 'text-xs md:text-base';
    const maxOpacity = depthLayer === 0 ? 0.35 : depthLayer === 1 ? 0.55 : 0.75;
    const glowIntensity = depthLayer === 0 ? 4 : depthLayer === 1 ? 6 : 10;
    
    return {
      text: m.name,
      left,
      delay,
      speed,
      fontSize,
      maxOpacity,
      glowIntensity,
      sway: Math.sin(idx * 5.7) * (12 + depthLayer * 8)
    };
  });

  return (
    <div ref={containerRef} className="relative min-h-[100vh] md:min-h-[110vh] lg:min-h-[120vh] w-full bg-transparent flex items-center justify-center">
      
      {/* Background Starfield — more dots for cosmic depth */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${1 + (i % 3) * 0.5}px`,
              height: `${1 + (i % 3) * 0.5}px`,
              top: `${((i * 37) % 90) + 5}%`,
              left: `${((i * 53) % 90) + 5}%`,
              opacity: 0.12 + (i % 4) * 0.06,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Subtle radial glow behind center text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      {/* Floating Sparkling Subjects — Dreamy White, Parallax Depth, Elegant (No overflow-hidden to allow seamless floating up) */}
      <div className="absolute inset-0 pointer-events-none w-full h-full">
        {WARP_TOPICS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "10vh", x: 0, opacity: 0 }}
            animate={{
              y: ["10vh", "-125vh"],
              x: [0, item.sway, 0, -item.sway, 0],
              opacity: [0, item.maxOpacity * 0.5, item.maxOpacity, item.maxOpacity * 0.8, 0]
            }}
            transition={{
              y: { duration: item.speed, repeat: Infinity, ease: "linear", delay: item.delay },
              x: { duration: item.speed * 0.8, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              opacity: { duration: item.speed, repeat: Infinity, ease: "linear", delay: item.delay, times: [0, 0.1, 0.4, 0.8, 1] }
            }}
            style={{
              left: item.left,
              bottom: '-5%',
              filter: `drop-shadow(0 0 ${item.glowIntensity}px rgba(255,255,255,0.35))`
            }}
            className={`absolute font-sans font-medium text-white/90 ${item.fontSize} tracking-[0.15em] uppercase select-none pointer-events-none whitespace-nowrap`}
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      {/* Centered Cinematic Title — Elegant italic serif with soft glow & masked backdrop blur */}
      <div className="relative z-10 max-w-2xl px-6 text-center py-20 pointer-events-none flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 px-8 py-4 md:px-12 md:py-6 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center"
        >
          <h3
            className="font-serif italic font-light text-white text-2xl md:text-3xl lg:text-4xl tracking-wider select-none leading-none"
            style={{ textShadow: '0 0 25px rgba(255,255,255,0.2), 0 0 50px rgba(255,255,255,0.1)' }}
          >
            dan masih banyak lagi...
          </h3>
        </motion.div>
      </div>
    </div>
  );
}

/* ===================================================
   COMPONENT: Interactive Landing Page
   =================================================== */
export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [activeWord, setActiveWord] = useState(0);
  const [activeSubject, setActiveSubject] = useState(0);
  const [activeCockpitTab, setActiveCockpitTab] = useState('latex');
  
  // Custom cursor tracker coordinates for Hero glowing orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Spring-smoothed values for smooth floating lag effect
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // 3D Card tilt motion hooks
  const cardRef = useRef<HTMLDivElement>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const cardRotateX = useTransform(cardY, [-0.5, 0.5], [12, -12]);
  const cardRotateY = useTransform(cardX, [-0.5, 0.5], [-12, 12]);

  const springRotateX = useSpring(cardRotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(cardRotateY, { stiffness: 200, damping: 25 });

  // Glare follow overlay
  const glareLeft = useTransform(cardX, [-0.5, 0.5], ["-20%", "80%"]);
  const glareTop = useTransform(cardY, [-0.5, 0.5], ["-20%", "80%"]);
  const springGlareLeft = useSpring(glareLeft, { stiffness: 200, damping: 25 });
  const springGlareTop = useSpring(glareTop, { stiffness: 200, damping: 25 });

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left - width / 2;
    const mouseYRel = e.clientY - rect.top - height / 2;
    cardX.set(mouseXRel / width);
    cardY.set(mouseYRel / height);
  }, [cardX, cardY]);

  const handleCardMouseLeave = useCallback(() => {
    cardX.set(0);
    cardY.set(0);
  }, [cardX, cardY]);

  // 3D Subject Card tilt motion hooks
  const subCardRef = useRef<HTMLDivElement>(null);
  const subCardX = useMotionValue(0);
  const subCardY = useMotionValue(0);

  const subRotateX = useTransform(subCardY, [-0.5, 0.5], [8, -8]);
  const subRotateY = useTransform(subCardX, [-0.5, 0.5], [-8, 8]);

  const springSubRotateX = useSpring(subRotateX, { stiffness: 150, damping: 20 });
  const springSubRotateY = useSpring(subRotateY, { stiffness: 150, damping: 20 });

  const handleSubCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!subCardRef.current) return;
    const rect = subCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left - width / 2;
    const mouseYRel = e.clientY - rect.top - height / 2;
    subCardX.set(mouseXRel / width);
    subCardY.set(mouseYRel / height);
  }, [subCardX, subCardY]);

  const handleSubCardMouseLeave = useCallback(() => {
    subCardX.set(0);
    subCardY.set(0);
  }, [subCardX, subCardY]);

  // Rotating Multilingual texts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % MULTI_LANG_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotating Subjects Autoplay (Eksplorasi Topik)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubject((prev) => (prev + 1) % SUBJECTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Rotating Cockpit Features Autoplay (Fitur Inti)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCockpitTab((prev) => {
        const currentIndex = COCKPIT_FEATURES.findIndex(f => f.id === prev);
        const nextIndex = (currentIndex + 1) % COCKPIT_FEATURES.length;
        return COCKPIT_FEATURES[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const openAuthModal = useCallback((tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  }, []);

  const currentSubject = SUBJECTS[activeSubject];
  const activeCockpit = COCKPIT_FEATURES.find(f => f.id === activeCockpitTab) || COCKPIT_FEATURES[0];

  return (
    <div className="font-sans text-gray-100 bg-[#06050e] min-h-screen overflow-x-clip selection:bg-[#5D5CE6]/30 selection:text-white">
      <Navbar theme="dark" />
      <ScrollToTop />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
      />

      {/* =============================================
          1. KINETIC HERO SECTION (Motto-Godly Aesthetics)
          ============================================= */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[95vh] flex items-center justify-center pt-44 md:pt-48 lg:pt-52 pb-16 overflow-hidden bg-[#06050e]"
      >
        {/* Fine Matrix grid styling in background */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#5D5CE6 1px, transparent 1px), linear-gradient(90deg, #5D5CE6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <GrainNoise />

        {/* Ambient background light orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full blur-[120px] opacity-[0.15] bg-[#5D5CE6] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.12] bg-[#8B5CF6] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Interactive Mouse-Tracking Glowing Follower */}
        <motion.div 
          className="absolute w-[35vw] h-[35vw] rounded-full blur-[100px] bg-gradient-to-tr from-[#5D5CE6] to-[#8B5CF6] pointer-events-none opacity-[0.18]"
          style={{
            left: glowX,
            top: glowY,
            x: '-50%',
            y: '-50%'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center text-center">
          {/* Majestic Typography Title */}
          <h1 className="font-display font-extrabold tracking-tight leading-[1.2] text-white flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
              style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}
            >
              Belajar. Berbagi.
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5D5CE6] to-[#8B5CF6]"
              style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}
            >
              Berkembang.
            </motion.span>

            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block tracking-normal font-medium text-gray-300 mt-6 max-w-3xl px-4 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)' }}
            >
              Ubah catatan belajarmu dari jenjang sekolah dasar hingga kuliah menjadi portofolio wawasan terstruktur dengan editor LaTeX yang mudah.
            </motion.span>
          </h1>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto cursor-pointer relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-base text-white overflow-hidden group shadow-lg shadow-[#5D5CE6]/25"
              style={{ background: 'linear-gradient(135deg, #5D5CE6, #8B5CF6)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Mulai Belajar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all text-gray-300"
            >
              Telusuri Catatan
            </button>
          </motion.div>

          {/* Gorgeous Dual-Direction Marquee (Horizontal for clean, premium vibe) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl mt-20 py-8 overflow-hidden select-none"
          >
            {/* Side Vignette Fades (Left & Right gradients) */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06050e] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06050e] to-transparent z-10 pointer-events-none" />

            {/* Straight Marquee wrapper */}
            <div className="flex flex-col gap-4">
              <MarqueeRow items={row1Items} direction="left" speed={28} />
              <MarqueeRow items={row2Items} direction="right" speed={32} />
            </div>
            
            {/* Ambient subtle glow beneath */}
            <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-16 bg-gradient-to-r from-[#5D5CE6]/10 to-[#8B5CF6]/10 blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* =============================================
          2. THE CORE PHILOSOPHY TEXT SECTION (ScrollReveal)
          ============================================= */}
      <ScrollRevealText />

      {/* =============================================
          3. MULTILINGUAL "MADE FOR LEARNING" SHOWCASE
          ============================================= */}
      <section className="relative py-24 bg-[#06050e] overflow-hidden">
        <GrainNoise />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            
            {/* Left Box: Title and Language Cloud */}
            <div className="flex-1 flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs md:text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase mb-4">
                  AKSESIBILITAS GLOBAL
                </p>
                <h2 className="font-display font-extrabold tracking-tight leading-[1.1] text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Akses Ilmu<br />
                  <span className="text-[#5D5CE6]">Tanpa Batas</span><br />
                  Bahasa.
                </h2>
                <p className="text-gray-400 mt-6 max-w-md text-sm md:text-base leading-relaxed">
                  Ba-Yu mendukung tampilan antarmuka dalam 52+ bahasa, memungkinkan pelajar dari berbagai belahan dunia untuk berkolaborasi dan belajar dengan nyaman menggunakan platform kami.
                </p>
              </motion.div>

              {/* Premium mechanical horizontal gaming console for active language and acak bahasa */}
              <div className="mt-12 flex items-center gap-6 p-5 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-2xl max-w-md shadow-2xl relative group/slot overflow-hidden">
                {/* Ambient glow behind slot */}
                <div className="absolute -inset-10 bg-[#5D5CE6]/8 rounded-full blur-3xl opacity-0 group-hover/slot:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Reels Chamber on the Left */}
                <div className="relative p-3.5 bg-black/45 border border-white/10 rounded-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.85)] flex gap-2">
                  <Reel activeIndex={activeWord} delay={0} />
                  <Reel activeIndex={activeWord} delay={0.12} />
                  <Reel activeIndex={activeWord} delay={0.24} />
                  
                  {/* Laser target cursor line on the left/right sides of reels */}
                  <div className="absolute inset-y-0 left-0 w-[2.5px] bg-gradient-to-b from-transparent via-[#5D5CE6]/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-[2.5px] bg-gradient-to-b from-transparent via-[#5D5CE6]/50 to-transparent pointer-events-none" />
                </div>

                {/* Info Panel & Premium SPIN Button on the Right */}
                <div className="flex flex-col gap-3 justify-center items-start z-10 flex-1">
                  <div>
                    <span className="text-[9px] text-[#8B5CF6] font-bold uppercase tracking-wider block mb-0.5">Bahasa Aktif</span>
                    <p className="text-base font-bold text-white leading-tight font-display">
                      {MULTI_LANG_TEXTS[activeWord].lang}
                    </p>
                  </div>
                  
                  {/* Premium Pill AI Scrambler Button (No text, sleek pill shape, glowing, Shuffle icon) */}
                  <div className="relative mt-2">
                    {/* Pulsing outer glow invitation */}
                    <div className="absolute inset-0 rounded-full bg-[#5D5CE6]/15 border border-[#5D5CE6]/20 animate-pulse pointer-events-none scale-105" />
                    
                    <motion.button
                      onClick={() => {
                        const randomIdx = Math.floor(Math.random() * MULTI_LANG_TEXTS.length);
                        setActiveWord(randomIdx);
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 0 20px rgba(93,92,230,0.5)'
                      }}
                      whileTap={{ scale: 0.96 }}
                      className="cursor-pointer h-10 w-28 rounded-full bg-gradient-to-r from-[#5D5CE6] to-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-[#5D5CE6]/25 border border-white/20 hover:brightness-110 transition-all duration-300 relative overflow-hidden group"
                      title="Acak Bahasa"
                    >
                      {/* Subtly animated shuffle icon */}
                      <Shuffle className="w-4.5 h-4.5 text-white filter drop-shadow-[0_0_4px_rgba(255,255,255,0.6)] group-hover:rotate-12 transition-transform duration-300" />
                      
                      {/* Moving light sheen effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Big Interactive 3D Parallax Card */}
            <div className="flex-1 flex justify-center items-stretch" style={{ perspective: 1000 }}>
              <motion.div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="w-full min-h-[380px] bg-gradient-to-br from-[#120F2D] via-[#0E0C23] to-[#0A0917] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-default origin-center select-none"
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glowing border outline effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#5D5CE6]/30 via-transparent to-[#8B5CF6]/30 opacity-60 pointer-events-none blur-[0.5px]" />
                
                {/* Dynamic sheet glare overlay reflection */}
                <motion.div
                  className="absolute w-[150%] h-[150%] pointer-events-none rounded-full blur-3xl opacity-[0.09] bg-white -z-10"
                  style={{
                    left: springGlareLeft,
                    top: springGlareTop,
                    x: "-50%",
                    y: "-50%"
                  }}
                />

                {/* Ambient breathing back-glow */}
                <motion.div 
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#5D5CE6] to-[#8B5CF6] opacity-[0.12] blur-md -z-20 pointer-events-none"
                  animate={{
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Dynamic light accent */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
                
                {/* Floating Translucent Background Glyphs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0">
                  <AnimatePresence>
                    {(MULTI_LANG_TEXTS[activeWord].glyphs || ['A', 'B', 'C', 'D']).map((glyph, gIdx) => {
                      const positions = [
                        { top: '12%', left: '15%' },
                        { top: '20%', right: '18%' },
                        { bottom: '25%', left: '25%' },
                        { bottom: '15%', right: '15%' }
                      ];
                      const pos = positions[gIdx % positions.length];
                      return (
                        <motion.span
                          key={`${activeWord}-glyph-${gIdx}`}
                          initial={{ opacity: 0, scale: 0.6, rotate: -20, filter: 'blur(2px)' }}
                          animate={{ 
                            opacity: 0.08, 
                            scale: 1, 
                            rotate: 0, 
                            filter: 'blur(1px)',
                            y: [0, -15, 0],
                          }}
                          exit={{ opacity: 0, scale: 0.6, rotate: 20, filter: 'blur(3px)' }}
                          transition={{
                            opacity: { duration: 0.6 },
                            scale: { duration: 0.6 },
                            rotate: { duration: 0.6 },
                            y: {
                              duration: 5 + gIdx * 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                          className="absolute text-6xl font-black text-white pointer-events-none select-none font-display"
                          style={{
                            ...pos,
                            transform: "translateZ(15px)"
                          }}
                        >
                          {glyph}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <Globe className="w-8 h-8 text-[#5D5CE6] animate-pulse" />
                  
                  {/* Dynamic scrolling matrix cyber code */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#5D5CE6] animate-pulse" />
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest font-mono uppercase">
                      LOCALE: <MorphingText text={`BAYU_${MULTI_LANG_TEXTS[activeWord].code}`} />
                    </span>
                  </div>
                </div>

                {/* Huge dynamic text display */}
                <div className="my-8 relative z-10 overflow-hidden h-[180px] flex items-center" style={{ transform: "translateZ(45px)" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWord}
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full text-left"
                    >
                      <h3 className="font-display font-bold text-white tracking-tight leading-snug whitespace-pre-line" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                        {MULTI_LANG_TEXTS[activeWord].text}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/5 pt-6 flex items-center justify-between text-xs text-gray-500 font-semibold relative z-10" style={{ transform: "translateZ(30px)" }}>
                  {/* Dynamic scrolling badge */}
                  <span className="text-[10px] tracking-wider text-gray-400 font-bold uppercase transition-all duration-300">
                    <MorphingText text={(MULTI_LANG_TEXTS[activeWord].badge || 'AKTIF MULTI-BAHASA').toUpperCase()} />
                  </span>
                  
                  {/* Dynamic interactive count-up supported languages */}
                  <span className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-300">
                    <Users className="w-4 h-4 text-[#5D5CE6]" /> 
                    <span>
                      <CountUp to={52} />+ Bahasa Didukung
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* =============================================
          4 & 5. SEAMLESS SUBJECT EXPLORATION & TOPIC WARP
          ============================================= */}
      <div className="relative bg-[#06050e] overflow-hidden border-t border-b border-white/5">
        <GrainNoise />

        {/* Section 4: Interactive Subject Rotator (Transparent seamless background) */}
        <section className="relative py-24 bg-transparent">
          {/* Ambient neon backdrop glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-[0.05] pointer-events-none"
               style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 60%)' }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs md:text-sm font-semibold text-[#5D5CE6] tracking-[0.2em] uppercase mb-4">
                EKSPLORASI TOPIK
              </p>
              <h2 className="font-display font-extrabold tracking-tight text-white text-3xl md:text-4xl leading-tight">
                Beragam Bidang Ilmu dalam Satu Platform.
              </h2>
            </div>

            {/* Subject Navigation Ribbon */}
            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth justify-start md:justify-center">
              {SUBJECTS.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSubject(i)}
                  className={`cursor-pointer flex items-center gap-2.5 px-6 py-4 rounded-2xl border text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
                    i === activeSubject
                      ? 'bg-[#5D5CE6] border-[#5D5CE6] text-white shadow-lg shadow-[#5D5CE6]/20 scale-[1.02]'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>

            {/* Interactive 3D Showcase Card */}
            <div className="mt-10 max-w-4xl mx-auto" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSubject}
                  ref={subCardRef}
                  onMouseMove={handleSubCardMouseMove}
                  onMouseLeave={handleSubCardMouseLeave}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    rotateX: springSubRotateX,
                    rotateY: springSubRotateY,
                    transformStyle: "preserve-3d"
                  }}
                  className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10 cursor-default select-none group/subcard"
                >
                  {/* Dynamic light sheet glare reflection */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#5D5CE6]/15 via-transparent to-[#8B5CF6]/15 opacity-50 pointer-events-none blur-[0.5px]" />
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#5D5CE6]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Side: Illustration Box with Dynamic SVGs vector background */}
                  <div 
                    className="w-full md:w-1/3 aspect-square rounded-2xl bg-[#0d0b1a] border border-white/5 flex items-center justify-center text-7xl md:text-8xl shadow-inner relative overflow-hidden shrink-0"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {/* Decorative dynamic vector outlines behind icon based on activeSubject */}
                    <svg className="absolute inset-0 w-full h-full stroke-white/5 fill-none stroke-[1.5] pointer-events-none opacity-40 z-0 scale-95" viewBox="0 0 100 100">
                      {activeSubject === 0 && ( // Matematika: Cartesian grids
                        <g>
                          <line x1="0" y1="50" x2="100" y2="50" />
                          <line x1="50" y1="0" x2="50" y2="100" />
                          <circle cx="50" cy="50" r="25" />
                          <circle cx="50" cy="50" r="40" strokeDasharray="3,3" />
                        </g>
                      )}
                      {activeSubject === 1 && ( // Sains: Orbiting loops
                        <g>
                          <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(30 50 50)" />
                          <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-30 50 50)" />
                          <circle cx="50" cy="50" r="10" />
                        </g>
                      )}
                      {activeSubject === 2 && ( // Bahasa: Book margin text lines
                        <g>
                          <line x1="15" y1="20" x2="85" y2="20" />
                          <line x1="15" y1="35" x2="85" y2="35" />
                          <line x1="15" y1="50" x2="70" y2="50" />
                          <line x1="15" y1="65" x2="80" y2="65" />
                          <line x1="15" y1="80" x2="55" y2="80" />
                        </g>
                      )}
                      {activeSubject === 3 && ( // Sosial: Globe lines
                        <g>
                          <circle cx="50" cy="50" r="42" />
                          <ellipse cx="50" cy="50" rx="42" ry="18" />
                          <ellipse cx="50" cy="50" rx="18" ry="42" />
                          <line x1="8" y1="50" x2="92" y2="50" />
                        </g>
                      )}
                      {activeSubject === 4 && ( // Coding: Brackets & syntax tree
                        <g>
                          <path d="M 25,25 L 45,50 L 25,75" />
                          <path d="M 75,25 L 55,50 L 75,75" />
                          <line x1="45" y1="70" x2="55" y2="30" />
                        </g>
                      )}
                      {activeSubject === 5 && ( // Sejarah: Concentric rings
                        <g>
                          <circle cx="50" cy="50" r="12" />
                          <circle cx="50" cy="50" r="28" strokeDasharray="4,2" />
                          <circle cx="50" cy="50" r="44" />
                          <line x1="50" y1="8" x2="50" y2="92" />
                        </g>
                      )}
                    </svg>
                    
                    {/* Floating glow behind emoji */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#5D5CE6]/10 to-[#8B5CF6]/10 opacity-0 group-hover/subcard:opacity-100 transition-opacity duration-700" />
                    
                    <span className="relative z-10 transform group-hover/subcard:scale-110 group-hover/subcard:rotate-6 transition-transform duration-500 select-none">
                      {currentSubject.icon}
                    </span>
                  </div>

                  {/* Right Side: Description content */}
                  <div className="flex-1 text-left" style={{ transform: "translateZ(45px)" }}>
                    <span className="text-[10px] font-bold text-[#8B5CF6] tracking-widest uppercase font-mono block">EKSPLORASI BIDANG</span>
                    <h3 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight mt-2.5 leading-none">
                      {currentSubject.name}
                    </h3>
                    <p className="text-gray-400 mt-5 text-sm md:text-base leading-relaxed">
                      {currentSubject.desc}
                    </p>
                    
                    {/* Floating feature pills inside subject */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {currentSubject.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs font-bold text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-[#5D5CE6]/35 hover:bg-white/10 transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => openAuthModal('register')}
                      className="cursor-pointer mt-8 inline-flex items-center gap-2.5 text-sm font-bold text-white hover:text-[#5D5CE6] transition-colors group"
                    >
                      <span>Jelajahi Catatan {currentSubject.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 5: Topic Warp (Transparent seamless component) */}
        <TopicWarpSection openAuthModal={openAuthModal} />
      </div>

      {/* =============================================
          6. CORE FEATURES BENTO GRID (Unifies Core features & Mockups)
          ============================================= */}
      <section className="relative py-24 bg-[#080615] overflow-hidden border-t border-white/5">
        <GrainNoise />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div className="text-left">
              <p className="text-xs md:text-sm font-semibold text-[#8B5CF6] tracking-[0.2em] uppercase mb-4">
                FITUR INTI
              </p>
              <h2 className="font-display font-extrabold tracking-tight text-white text-3xl md:text-4xl leading-tight">
                Teknologi Di Balik Ba-Yu.
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base max-w-sm text-left leading-relaxed">
              Kami merancang ekosistem mencatat yang cerdas untuk membantumu menyusun, memverifikasi, dan menguasai setiap materi pelajaran dengan efektif.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cell 1: LaTeX Rich Editor (Double Width) */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-8 border border-white/10 flex flex-col justify-between min-h-[380px] hover:border-[#8B5CF6]/30 transition-all duration-300 relative group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6]">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">01 / RICH EDITOR</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-tight">LaTeX Rich Editor</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-md font-medium">Tulis rumus matematika, kalkulus, dan sains seindah jurnal akademis profesional menggunakan render engine KaTeX berkecepatan tinggi.</p>
              </div>

              {/* LaTeX Mockup Widget */}
              <div className="mt-8 bg-[#0c0a1a]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 font-mono text-[11px] w-full shadow-inner relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 text-[9px] text-gray-500 font-bold">
                  <span>LaTeX EDITOR ENGINE</span>
                  <span className="text-[#8B5CF6] animate-pulse">ACTIVE RENDERING</span>
                </div>
                <p className="text-emerald-400 font-bold">// Input KaTeX:</p>
                <p className="text-gray-300 mt-0.5 font-semibold">{"$$\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}$$"}</p>
                
                <p className="text-emerald-400 font-bold mt-3">// Output Rendered:</p>
                <div className="mt-2 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-base font-display font-black">
                  {"$$\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}$$"}
                </div>
              </div>
            </div>

            {/* Cell 2: Verified Pakar (Standard Width) */}
            <div className="bg-gradient-to-br from-[#5D5CE6] to-[#8B5CF6] rounded-3xl p-8 flex flex-col justify-between min-h-[380px] hover:shadow-lg hover:shadow-[#5D5CE6]/20 transition-all duration-300 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-white/70 font-bold uppercase tracking-widest font-mono">02 / VERIFIED ACCURACY</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-tight">Ditinjau Guru & Pakar</h3>
                <p className="text-white/80 mt-2 text-sm leading-relaxed">
                  Tidak ada lagi keraguan materi salah. Belajar dengan tenang dari catatan tepercaya yang disetujui reviewer ahli.
                </p>
              </div>

              {/* Expert Profile Mockup Widget */}
              <div className="mt-8 bg-black/45 backdrop-blur-md rounded-2xl p-5 border border-white/10 w-full shadow-inner text-center relative z-10">
                <h4 className="text-white font-display text-sm font-bold tracking-tight">Dr. Hermawan, M.T.</h4>
                <p className="text-[10px] text-gray-300 mt-0.5 font-medium uppercase tracking-wider">Reviewer Ahli / Dosen Matematika</p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[9px] uppercase tracking-wider font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AKURASI: VERIFIED
                </div>
              </div>
            </div>

            {/* Cell 3: Streak Tracker (Standard Width) */}
            <div className="bg-[#0c0a1a] border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[380px] hover:border-[#EF4444]/30 transition-all duration-300 relative group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EF4444]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">03 / HABIT & STREAK</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-tight">Streak Konsistensi</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  Bangun kebiasaan belajar harian yang solid bersama ribuan pelajar lain dengan sistem streak harian interaktif.
                </p>
              </div>

              {/* Flame Streak Mockup Widget */}
              <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 flex items-center justify-between gap-4 w-full shadow-inner relative z-10">
                <div className="text-left">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Streak Harian</p>
                  <h4 className="text-white font-display text-lg font-black mt-0.5 tracking-tight">45 Hari Beruntun</h4>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-500 animate-pulse">
                  <Flame className="w-6 h-6 fill-red-500/10" />
                </div>
              </div>
            </div>

            {/* Cell 4: Sub-second Search Index (Double Width) */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-8 border border-white/10 flex flex-col justify-between min-h-[380px] hover:border-[#3B82F6]/30 transition-all duration-300 relative group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3B82F6]">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">04 / INSTANT ACCESS</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-tight">Pencarian Instan</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-md font-medium">Cari rumus LaTeX spesifik, teori fisika, atau snippet pemrograman di seluruh catatan publik komunitas secara instan dalam hitungan milidetik.</p>
              </div>

              {/* Search Mockup Widget */}
              <div className="mt-8 bg-[#0c0a1a]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 w-full shadow-inner relative z-10">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-mono font-bold text-white flex-1 animate-pulse">hukum termodinamika...</span>
                  <span className="text-[9px] text-gray-500 font-mono">0.02ms</span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Siklus Carnot & Entropi Gas</span>
                    <span className="text-[#3B82F6] font-bold">12 Temuan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 5: Student Community (Full Width Banner) */}
            <div className="md:col-span-3 bg-gradient-to-br from-[#0c0a1a] via-[#100c25] to-[#150f38] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-8 hover:border-[#8B5CF6]/50 transition-all duration-300 relative group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Left: Icon + Avatars */}
              <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6]">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex -space-x-2">
                  {['H', 'B', 'M', 'Y'].map((char, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0c0a1a] bg-gradient-to-tr from-[#5D5CE6] to-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-black">
                      {char}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 relative z-10">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">05 / SOCIAL LEARNING</span>
                <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight leading-tight mt-2">Belajar Bersama</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-xl">
                  Bagikan catatanmu dan diskusikan rumus-rumus sains serta kode pemrograman bersama ribuan pelajar berdedikasi tinggi lainnya.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] text-[#8B5CF6] font-black tracking-wider uppercase">
                  <Users className="w-3.5 h-3.5" /> +12.000 MAHASISWA AKTIF
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =============================================
          7. CINEMATIC GRADIENT CTA SECTION (Gravity / Magnetic Hover style)
          ============================================= */}
      <section className="relative py-28 md:py-40 bg-[#06050e] overflow-hidden border-t border-white/5">
        <GrainNoise />

        {/* Massive atmospheric background glowing flow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vw] rounded-full blur-[140px] opacity-[0.22] pointer-events-none bg-gradient-to-r from-[#5D5CE6] via-[#7B6BF5] to-[#8B5CF6]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs md:text-sm font-semibold text-gray-400 tracking-[0.2em] uppercase mb-6">
            MULAI SEKARANG
          </p>
          
          <h2 className="font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Mulai Perjalanan<br />
            Belajarmu Hari Ini.
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed">
            Bergabunglah secara gratis dan temukan cara yang lebih terstruktur untuk mengatur catatan serta wawasan belajarmu.
          </p>

          {/* Magnetic CTA Button */}
          <motion.button
            onClick={() => openAuthModal('register')}
            className="cursor-pointer relative inline-flex items-center justify-center gap-3 px-14 py-6 rounded-full font-bold text-base md:text-lg text-white overflow-hidden shadow-2xl shadow-[#5D5CE6]/30 group"
            style={{ background: 'linear-gradient(135deg, #5D5CE6, #8B5CF6)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="relative z-10 flex items-center gap-2 tracking-wide">
              Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>

          {/* Value indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#5D5CE6]" /> Gratis Selamanya</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#5D5CE6]" /> Setup Instan</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#5D5CE6]" /> 12K+ Anggota</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
