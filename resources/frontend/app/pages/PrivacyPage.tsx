import { ArrowLeft, Shield, Eye, Lock, Database, Info, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../components/MobileLayout';

export default function PrivacyPage() {
    const navigate = useNavigate();

    return (
        <MobileLayout showBottomNav={false}>
            <div className="min-h-screen pb-10 bg-[#FAFAFA] dark:bg-[#13111C]">
                {/* Header */}
                <div className="sticky top-0 bg-[#FAFAFA]/95 dark:bg-[#13111C]/95 backdrop-blur-md z-20 px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 rounded-full transition-colors shadow-sm dark:shadow-none"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-gray-900 dark:text-gray-100 font-['Lexend_Deca'] font-bold text-lg">
                        Kebijakan Privasi
                    </h1>
                    <div className="w-10"></div>
                </div>

                <div className="max-w-xl mx-auto px-5">
                    {/* Hero Section */}
                    <div className="text-center mb-10 mt-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-500/10 mb-6 border border-indigo-100 dark:border-indigo-500/20">
                            <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="font-['Lexend_Deca'] font-extrabold text-2xl text-gray-900 dark:text-gray-100 mb-3">
                            Privasi Anda
                        </h2>
                        <p className="font-['Manrope'] text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
                            Data Anda aman bersama Ba-Yu. Kami menjaga transparansi dan perlindungan data sebagai prioritas utama.
                        </p>
                    </div>

                    <div className="space-y-6 mb-10">
                        {/* Principles */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: Lock, label: 'Aman', desc: 'Data dienkripsi.' },
                                { icon: Eye, label: 'Transparan', desc: 'Terbuka tentang data.' },
                                { icon: Database, label: 'Terkontrol', desc: 'Anda punya kendali.' }
                            ].map((p, idx) => (
                                <div key={idx} className="bg-white dark:bg-[#1C1A29] rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none text-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-3 border border-slate-100 dark:border-white/10">
                                        <p.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[15px] mb-1">{p.label}</h3>
                                    <p className="font-['Manrope'] text-[13px] text-gray-500 dark:text-gray-400">{p.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Data Collection */}
                        <div className="bg-white dark:bg-[#1C1A29] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                1. Data yang Kami Kumpulkan
                            </h3>
                            <p className="font-['Manrope'] text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Kami hanya mengumpulkan informasi minimal yang diperlukan untuk menunjang proses belajar Anda:
                            </p>
                            <div className="space-y-3">
                                {[
                                    { title: 'Informasi Profil', text: 'Nama, email, dan jenjang pendidikan.' },
                                    { title: 'Konten Belajar', text: 'Catatan, gambar, dan komentar.' },
                                    { title: 'Data Teknis', text: 'Log aktivitas untuk perbaikan.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 items-start p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                        <div>
                                            <h4 className="font-['Manrope'] font-bold text-[14px] text-gray-900 dark:text-gray-100">{item.title}</h4>
                                            <p className="font-['Manrope'] text-[13px] text-gray-500 dark:text-gray-400 mt-1">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Data Usage */}
                        <div className="bg-white dark:bg-[#1C1A29] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                2. Penggunaan Data
                            </h3>
                            <div className="space-y-3">
                                {[
                                    'Memungkinkan berbagi catatan.',
                                    'Memberikan notifikasi penting.',
                                    'Meningkatkan fitur platform.'
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                        <span className="font-['Manrope'] text-[14px] text-gray-600 dark:text-gray-300">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center pb-8 pt-4">
                        <p className="font-['Manrope'] text-[13px] text-gray-400 dark:text-gray-500">
                            &copy; 2026 Ba-Yu Platform.<br/>Privasi Anda adalah Amanah Kami.
                        </p>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
