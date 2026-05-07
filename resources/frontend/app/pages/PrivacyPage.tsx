import { ArrowLeft, Shield, Eye, Lock, Database, Info, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import ApplicationLogo from '../components/ApplicationLogo';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-['Manrope']">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-indigo-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-['Lexend_Deca'] font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:shadow-md group-hover:shadow-indigo-500/10 transition-all">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:block">Kembali ke Beranda</span>
          </button>
          <div className="flex items-center gap-3">
            <ApplicationLogo className="w-10 h-10 drop-shadow-sm" />
            <span className="font-['Lexend_Deca'] font-black text-2xl tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ba-Yu</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
        <div className="bg-white rounded-[2.5rem] border border-indigo-50 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.08)] overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-slate-950 px-10 py-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>
            
            <h1 className="relative font-['Lexend_Deca'] text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Kebijakan <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Privasi</span>
            </h1>
            <p className="relative text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Data Anda aman bersama Ba-Yu. Kami menjaga transparansi dan perlindungan data sebagai <span className="text-white">Prioritas Utama</span>.
            </p>
          </div>

          <div className="p-8 sm:p-14 space-y-16">
            {/* Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: Lock, label: 'Aman', desc: 'Data dienkripsi standar industri.', color: 'indigo' },
                { icon: Eye, label: 'Transparan', desc: 'Terbuka tentang data yang diambil.', color: 'purple' },
                { icon: Database, label: 'Terkontrol', desc: 'Anda punya kendali penuh.', color: 'amber' }
              ].map((p, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-[2rem] text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-5 shadow-sm border border-${p.color}-100`}>
                    <p.icon className={`w-7 h-7 text-${p.color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-950 text-lg mb-2">{p.label}</h3>
                  <p className="text-sm text-gray-600 font-medium">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Data Collection */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <Info className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">1. Data yang Kami Kumpulkan</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Kami hanya mengumpulkan informasi minimal yang diperlukan untuk menunjang proses belajar Anda:
              </p>
              <div className="grid gap-4 mt-6">
                {[
                  { title: 'Informasi Profil', text: 'Nama, alamat email, dan jenjang pendidikan Anda.' },
                  { title: 'Konten Belajar', text: 'Catatan, gambar, dan komentar yang Anda unggah.' },
                  { title: 'Data Teknis', text: 'Log aktivitas untuk perbaikan performa platform.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl items-center shadow-sm">
                    <div className="w-2 h-10 rounded-full bg-indigo-600"></div>
                    <div>
                      <h4 className="font-bold text-gray-950">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Usage */}
            <section className="space-y-6">
              <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">2. Penggunaan Data</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <p className="font-bold text-indigo-600 mb-4 underline underline-offset-4">Data Anda digunakan untuk:</p>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>Memungkinkan Anda berbagi dan mengunduh catatan.</span>
                  </li>
                  <li className="flex gap-4 items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>Memberikan notifikasi penting terkait aktivitas belajar.</span>
                  </li>
                  <li className="flex gap-4 items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>Meningkatkan fitur platform berbasis feedback Anda.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <div className="pt-10">
              <div className="relative p-12 bg-indigo-600 rounded-[3rem] text-center overflow-hidden shadow-xl shadow-indigo-500/20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <h3 className="relative font-['Lexend_Deca'] text-2xl font-bold text-white mb-4">Punya Pertanyaan Lain?</h3>
                <p className="relative text-indigo-100 text-lg mb-8 max-w-lg mx-auto">Kami di sini untuk membantu Anda memahami privasi di Ba-Yu.</p>
                <a href="mailto:privacy@ba-yu.id" className="relative inline-block bg-white text-indigo-600 px-10 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-1">
                  Hubungi Tim Privasi
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-20 text-center text-gray-900 text-sm font-bold opacity-60">
        &copy; 2026 Ba-Yu Platform. Privasi Anda adalah Amanah Kami.
      </footer>
    </div>
  );
}
