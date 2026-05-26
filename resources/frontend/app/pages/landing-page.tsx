import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ScrollToTop } from '../components/scroll-to-top';
import { AuthModal } from '../components/auth-modal';
import ApplicationLogo from '../components/ApplicationLogo';
import {
  BookOpen, Search, Shield, Zap, ArrowRight,
  Globe, Users, Star, CheckCircle2, Layers,
  PenTool, Flame, Trophy, Eye, Bookmark
} from 'lucide-react';

/* ===================================================
   DATA: Multilingual "Education" words
   =================================================== */
const EDUCATION_WORDS = [
  { word: 'Education', lang: 'English' },
  { word: 'Pendidikan', lang: 'Indonesia' },
  { word: '教育', lang: '日本語' },
  { word: '교육', lang: '한국어' },
  { word: 'التعليم', lang: 'العربية' },
  { word: 'Bildung', lang: 'Deutsch' },
  { word: 'Éducation', lang: 'Français' },
  { word: 'Educación', lang: 'Español' },
  { word: 'การศึกษา', lang: 'ไทย' },
  { word: 'शिक्षा', lang: 'हिन्दी' },
];

/* ===================================================
   DATA: Subjects for Toggle
   =================================================== */
const SUBJECTS = [
  { name: 'Matematika', icon: '📐' },
  { name: 'Sains', icon: '🔬' },
  { name: 'Sastra', icon: '📚' },
  { name: 'Geografi', icon: '🌍' },
  { name: 'Coding', icon: '💻' },
  { name: 'Sejarah', icon: '🏛️' },
];

/* ===================================================
   DATA: Multilingual "Learn" words
   =================================================== */
const LEARN_WORDS = ['Belajar', '學習', '勉強', 'LEARN', 'تعلم', 'APRENDER'];

/* ===================================================
   DATA: Slot Machine Characters
   =================================================== */
const SLOT_CHARS = [
  'A', 'B', '教', 'C', '학', 'D', 'E', '育', 'F',
  'G', '📐', 'H', 'I', '🔬', 'J', 'K', '📚', 'L',
  'M', '💻', 'N', 'O', '🌍', 'P', 'Q', '🏛️', 'R',
  'S', '📖', 'T', 'U', '✏️', 'V', 'W', '🎓', 'X',
];

/* ===================================================
   COMPONENT: Landing Page
   =================================================== */
export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [activeWord, setActiveWord] = useState(0);
  const [activeSubject, setActiveSubject] = useState(0);
  const [activeLearnWord, setActiveLearnWord] = useState(0);

  // Refs for scroll-driven animations
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll progress for hero — the long section drives the "opening" animation
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Phase A: Circle expands and fills screen (0% → 40% scroll)
  const circleScale = useTransform(heroProgress, [0, 0.35], [1, 60]);
  const circleOpacity = useTransform(heroProgress, [0, 0.3, 0.4], [1, 1, 0]);
  // Phase B: Full-color bg fades in as circle finishes (30% → 45%)
  const bgOpacity = useTransform(heroProgress, [0.3, 0.45], [0, 1]);
  // Phase C: Giant typography appears (40% → 60%)
  const titleY = useTransform(heroProgress, [0.4, 0.55], [80, 0]);
  const titleOpacity = useTransform(heroProgress, [0.4, 0.55], [0, 1]);
  // Phase D: Title fades out (70% → 85%)
  const titleExitOpacity = useTransform(heroProgress, [0.7, 0.85], [1, 0]);
  const bgExitOpacity = useTransform(heroProgress, [0.75, 0.9], [1, 0]);
  // Scroll hint fades quickly
  const scrollHintOpacity = useTransform(heroProgress, [0, 0.08], [1, 0]);

  const openAuthModal = useCallback((tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  }, []);

  // Rotate education words
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % EDUCATION_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Rotate subjects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubject((prev) => (prev + 1) % SUBJECTS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Rotate learn words
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLearnWord((prev) => (prev + 1) % LEARN_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentSubject = SUBJECTS[activeSubject];

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 bg-white dark:bg-[#050505] min-h-screen overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <ScrollToTop />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
      />

      {/* =============================================
          PHASE 1: HERO — EXPANDING CIRCLE "OPENING"
          Long scroll section so circle fills fully first
          ============================================= */}
      <section ref={heroRef} className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Base white/dark canvas */}
          <div className="absolute inset-0 bg-white dark:bg-[#050505] z-0" />

          {/* The expanding circle with Ba-Yu Logo */}
          <motion.div
            className="absolute z-10 w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              scale: circleScale,
              opacity: circleOpacity,
              background: 'linear-gradient(135deg, #5D5CE6, #8B5CF6)',
            }}
          >
            <ApplicationLogo
              className="w-12 h-12 rounded-xl"
              style={{ transform: 'scale(0.018)' }}
            />
          </motion.div>

          {/* Full primary background (appears seamlessly after circle covers viewport) */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              opacity: bgOpacity,
              background: 'linear-gradient(135deg, #5D5CE6, #7B6BF5, #8B5CF6)',
            }}
          />

          {/* BG exit fade (so it goes back to white before next section) */}
          <motion.div
            className="absolute inset-0 z-25 bg-white dark:bg-[#050505]"
            style={{ opacity: useTransform(heroProgress, [0.78, 0.95], [0, 1]) }}
          />

          {/* Giant "BA-YU" typography */}
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            style={{
              y: titleY,
              opacity: useTransform(heroProgress, (p) => {
                // Combine entry (titleOpacity) and exit (titleExitOpacity)
                if (p < 0.4) return 0;
                if (p < 0.55) return (p - 0.4) / 0.15; // fade in
                if (p < 0.7) return 1; // hold
                if (p < 0.85) return 1 - (p - 0.7) / 0.15; // fade out
                return 0;
              }),
            }}
          >
            <div className="text-center px-4">
              <h1
                className="font-black text-white tracking-tighter leading-[0.85]"
                style={{ fontSize: 'clamp(3.5rem, 16vw, 14rem)' }}
              >
                BA-YU
              </h1>
              <p
                className="font-extrabold text-white/25 tracking-widest uppercase mt-2"
                style={{ fontSize: 'clamp(0.8rem, 2vw, 1.5rem)', letterSpacing: '0.4em' }}
              >
                BelajarYuk
              </p>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-[0.25em] uppercase">Scroll</span>
            <motion.div
              className="w-5 h-9 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center p-1"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-1 bg-gray-400 rounded-full"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          PHASE 2: "Made for [Education] Share"
          ============================================= */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#050505] overflow-hidden">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#5D5CE6 1px, transparent 1px), linear-gradient(90deg, #5D5CE6 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm md:text-base font-bold text-gray-400 dark:text-gray-500 tracking-[0.25em] uppercase mb-6">
              Platform Catatan Belajar
            </p>

            {/* Main heading with rotating word */}
            <h2 className="font-black tracking-tighter leading-[0.9]">
              <span
                className="block text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
              >
                Made for
              </span>

              {/* Rotating education word */}
              <span className="relative block overflow-hidden" style={{ height: 'clamp(3rem, 10vw, 8rem)' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWord}
                    className="absolute inset-x-0 block font-black text-primary"
                    style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {EDUCATION_WORDS[activeWord].word}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span
                className="block text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
              >
                Share
              </span>
            </h2>

            {/* Language indicator */}
            <AnimatePresence mode="wait">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 mt-5"
                key={activeWord}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                  {EDUCATION_WORDS[activeWord].lang}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Ba-Yu Card */}
          <motion.div
            className="mt-14 max-w-xs mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-xl"
              style={{ background: 'linear-gradient(135deg, #5D5CE6 0%, #8B5CF6 100%)' }}
              whileHover={{ rotateY: 6, rotateX: -3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-lg tracking-tight">Ba-Yu</span>
                  <ApplicationLogo className="w-7 h-7 rounded-md opacity-60" />
                </div>
                <div>
                  <div className="w-9 h-6 bg-white/20 rounded-md mb-2" />
                  <p className="text-white/50 text-[10px] tracking-widest uppercase">Student Card</p>
                  <p className="text-white font-bold text-xs mt-0.5">BelajarYuk Premium</p>
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          PHASE 3: SPLIT-SCREEN — "REAL SMART"
          ============================================= */}
      <section className="relative overflow-hidden">
        <motion.div
          className="flex flex-col md:flex-row min-h-[50vh]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Left: Abstract community visual */}
          <div
            className="flex-1 relative overflow-hidden min-h-[35vh]"
            style={{ background: 'linear-gradient(135deg, #13111C 0%, #2D1B69 50%, #5D5CE6 100%)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Soft blobs */}
              <motion.div
                className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)' }}
                animate={{ x: [-15, 15, -15], y: [-8, 12, -8] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-28 h-28 md:w-40 md:h-40 rounded-full left-1/4"
                style={{ background: 'radial-gradient(circle, rgba(93,92,230,0.4) 0%, transparent 70%)' }}
                animate={{ x: [10, -10, 10], y: [8, -15, 8] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <div className="relative z-10 text-center p-8">
                <Users className="w-12 h-12 md:w-16 md:h-16 text-white/30 mx-auto mb-3" />
                <p className="text-white/50 font-bold text-xs tracking-widest uppercase">Komunitas Belajar</p>
              </div>
            </div>
          </div>

          {/* Right: Bold text block */}
          <div className="flex-1 flex items-center justify-center p-10 md:p-16 bg-primary">
            <div className="text-center md:text-left">
              <motion.h3
                className="font-black text-white leading-[0.85] tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                REAL<br />SMART
              </motion.h3>
              <motion.p
                className="text-white/60 font-medium text-sm md:text-base mt-4 max-w-xs"
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Belajar dengan materi terverifikasi dari komunitas terpercaya.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Abstract visual with vertical typography */}
        <motion.div
          className="relative h-[40vh] md:h-[55vh] overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #5D5CE6, #8B5CF6)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-6 md:gap-12 items-center">
              <motion.span
                className="text-white/10 font-black hidden md:block"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', writingMode: 'vertical-rl' as any }}
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                共有学習
              </motion.span>
              <div className="text-center">
                <h3
                  className="font-black text-white tracking-tighter leading-[0.85]"
                  style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)' }}
                >
                  SHARE<br />
                  <span className="text-white/25">YOUR</span><br />
                  NOTES
                </h3>
              </div>
              <motion.span
                className="text-white/10 font-black hidden md:block"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', writingMode: 'vertical-rl' as any }}
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                教育共有
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =============================================
          PHASE 4: INTERACTIVE SUBJECT TOGGLE
          ============================================= */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#13111C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p
            className="text-center text-white/40 font-bold text-xs tracking-[0.25em] uppercase mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Satu Platform, Semua Mata Pelajaran
          </motion.p>

          {/* Giant Toggle */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white/10 backdrop-blur-md rounded-full h-20 md:h-24 flex items-center px-2 md:px-3">
              {/* Moving knob */}
              <motion.div
                className="absolute h-[calc(100%-10px)] aspect-square rounded-full bg-white shadow-2xl flex items-center justify-center"
                animate={{
                  left: `calc(${(activeSubject / (SUBJECTS.length - 1)) * 100}% - ${(activeSubject / (SUBJECTS.length - 1)) * 60}px + 5px)`,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSubject}
                    className="text-2xl md:text-4xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.25 }}
                  >
                    {currentSubject.icon}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Track labels */}
              <div className="relative z-10 flex justify-between w-full px-1">
                {SUBJECTS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSubject(i)}
                    className={`text-sm md:text-base transition-opacity duration-200 ${i === activeSubject ? 'opacity-0' : 'opacity-30 hover:opacity-60'}`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Subject name */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.h3
                key={activeSubject}
                className="font-black text-white tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentSubject.name.toUpperCase()}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Two mockups side by side */}
          <motion.div
            className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* App mockup */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="bg-white dark:bg-[#1C1A29] rounded-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-[#13111C] p-3 flex items-center gap-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] font-mono text-gray-400 ml-1">Ba-Yu</span>
                </div>
                <div className="p-5 text-center">
                  <span className="text-4xl">{currentSubject.icon}</span>
                  <p className="font-black text-gray-900 dark:text-white text-sm mt-3 tracking-tight">SHARE YOUR</p>
                  <p className="font-black text-primary text-xl tracking-tight">KNOWLEDGE</p>
                </div>
              </div>
            </div>

            {/* Billboard mockup */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="bg-[#0a0a0f] rounded-xl overflow-hidden aspect-video flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent" />
                <div className="text-center relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeSubject}
                      className="font-black text-white tracking-tighter text-2xl md:text-3xl"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {currentSubject.name.toUpperCase()}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-white/20 text-[10px] font-bold tracking-widest mt-1">DIGITAL BILLBOARD</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          PHASE 5: KINETIC TYPOGRAPHY + SLOT MACHINE
          ============================================= */}
      <section className="relative bg-white dark:bg-[#050505] overflow-hidden">
        {/* Breathing text */}
        <motion.div
          className="py-20 md:py-28 text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 dark:text-gray-500 text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
            Made to make learning clear
          </p>
          <p className="text-gray-900 dark:text-white font-black text-xl md:text-2xl mt-2">
            for everyone.
          </p>
        </motion.div>

        {/* Large rotating "Belajar" */}
        <div className="py-6 md:py-10 text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeLearnWord}
              className="font-black text-gray-900 dark:text-white tracking-tighter"
              style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
              initial={{ y: '40%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-40%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {LEARN_WORDS[activeLearnWord]}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Story cards */}
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 py-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto">
            {[
              { text: 'JAKARTA\nTO\nTOKYO', rotate: -2 },
              { text: 'SEMUA\nILMU\nDI SINI', rotate: 1 },
              { text: 'BELAJAR\nTANPA\nBATAS', rotate: -1 },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="aspect-[9/16] rounded-2xl md:rounded-3xl flex items-center justify-center p-4 shadow-lg cursor-pointer bg-primary"
                style={{ rotate: `${card.rotate}deg` }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-white font-black text-center leading-tight tracking-tight text-sm md:text-xl whitespace-pre-line">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="py-8 overflow-hidden bg-primary">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="text-white/90 font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter mx-6 md:mx-8">
                MAX KNOWLEDGE • MIN EFFORT •{' '}
              </span>
            ))}
          </div>
        </div>

        {/* Slot Machine Grid */}
        <div className="py-16 md:py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-6 md:grid-cols-9 gap-1.5 md:gap-2 overflow-hidden" style={{ maxHeight: '280px' }}>
              {Array(9).fill(null).map((_, colIdx) => (
                <div
                  key={colIdx}
                  className={`flex flex-col animate-slot-spin ${colIdx >= 6 ? 'hidden md:flex' : ''}`}
                  style={{
                    animationDuration: `${5 + colIdx * 0.8}s`,
                    animationDirection: colIdx % 2 === 0 ? 'normal' : 'reverse',
                  }}
                >
                  {[...SLOT_CHARS, ...SLOT_CHARS].map((char, charIdx) => (
                    <div
                      key={charIdx}
                      className="w-full aspect-square rounded-lg md:rounded-xl flex items-center justify-center font-black text-base md:text-xl mb-1.5 md:mb-2 bg-primary/10 dark:bg-primary/20 text-primary"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          PHASE 6: BENTO GRID — FITUR BA-YU
          ============================================= */}
      <section className="relative py-20 md:py-28 bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase mb-3">Selami Detailnya</p>
            <h2
              className="font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Semua yang kamu butuhkan,<br />
              <span className="text-primary">dalam satu platform.</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {/* 1 — Catatan Terstruktur (wide) */}
            <motion.div
              className="md:col-span-2 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Catatan Terstruktur</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                Organisir catatan berdasarkan mata pelajaran, kelas, dan semester secara otomatis. Tidak ada lagi catatan yang hilang.
              </p>
              {/* Mini mockup */}
              <div className="bg-gray-50 dark:bg-[#1C1A29] rounded-xl border border-gray-100 dark:border-white/5 p-3.5">
                {[
                  { name: 'Sophie Beck', subject: 'Matematika', badge: '⭐ Terverifikasi', rating: '4.8' },
                  { name: 'Ahmad Rifai', subject: 'Fisika', badge: '📝 Draft', rating: '—' },
                  { name: 'Lina Chen', subject: 'Biologi', badge: '⭐ Terverifikasi', rating: '4.9' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 ${i < 2 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">{item.name[0]}</div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">{item.badge}</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{item.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2 — Validasi Pakar */}
            <motion.div
              className="md:col-span-1 group bg-primary text-white rounded-2xl md:rounded-3xl p-7 md:p-9 relative overflow-hidden hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2">Validasi Pakar</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Catatan diverifikasi oleh pakar terverifikasi. Belajar dengan materi yang akurat dan terjamin.
                </p>
                <div className="flex items-center gap-1.5 mt-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white/80 fill-white/80" />
                  ))}
                  <span className="text-white/60 text-xs font-bold ml-1">5.0</span>
                </div>
              </div>
            </motion.div>

            {/* 3 — Editor Cerdas */}
            <motion.div
              className="md:col-span-1 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <PenTool className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Editor Cerdas</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Rich text editor dengan dukungan LaTeX, highlight, dan formatting yang intuitif.
              </p>
            </motion.div>

            {/* 4 — Pencarian Universal (wide) */}
            <motion.div
              className="md:col-span-2 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6 items-center"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Pencarian Universal</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Temukan kalimat spesifik di dalam ribuan catatan dalam hitungan milidetik.
                </p>
              </div>
              <div className="w-full sm:w-48 h-32 bg-gray-50 dark:bg-[#1C1A29] rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-200 dark:text-gray-700" />
              </div>
            </motion.div>

            {/* 5 — Streak & Gamifikasi */}
            <motion.div
              className="md:col-span-1 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Streak Harian</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Gamifikasi yang membuatmu konsisten belajar setiap hari. Raih badge eksklusif.
              </p>
            </motion.div>

            {/* 6 — Keamanan Data */}
            <motion.div
              className="md:col-span-1 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Keamanan Data</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Catatan terenkripsi end-to-end. Kontrol privasi penuh di tanganmu.
              </p>
            </motion.div>

            {/* 7 — Komunitas Aktif */}
            <motion.div
              className="md:col-span-1 group bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 p-7 md:p-9 hover:shadow-lg transition-shadow"
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Komunitas Aktif</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Bergabung dengan ribuan pelajar. Diskusi, berbagi referensi, dan tumbuh bersama.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          PHASE 7: CTA
          ============================================= */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#050505] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(#5D5CE6 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <motion.div
          className="max-w-3xl mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Mulai Perjalanan<br />
            <span className="text-primary">Belajarmu Hari Ini.</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Bergabunglah dengan ribuan pelajar cerdas yang sudah merasakan cara belajar yang lebih efektif, terstruktur, dan menyenangkan.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={() => openAuthModal('register')}
            className="relative inline-flex items-center gap-2.5 px-10 md:px-14 py-4 md:py-5 rounded-full font-bold text-base md:text-lg text-white overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #5D5CE6, #8B5CF6)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Mulai Belajar Sekarang</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Gratis Selamanya
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Setup 30 Detik
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" /> 4.9 Rating
            </span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
