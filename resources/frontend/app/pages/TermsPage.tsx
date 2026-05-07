import { ArrowLeft, ScrollText, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import ApplicationLogo from '../components/ApplicationLogo';

export default function TermsPage() {
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
              Syarat & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Ketentuan</span>
            </h1>
            <p className="relative text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Terakhir diperbarui: <span className="text-white">7 Mei 2026</span>. Aturan main untuk kenyamanan ekosistem belajar Ba-Yu.
            </p>
          </div>

          <div className="p-8 sm:p-14 space-y-16">
            {/* Intro */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">1. Penerimaan Ketentuan</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Dengan mengakses dan menggunakan platform Ba-Yu, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak melanjutkan penggunaan layanan kami demi keamanan bersama.
              </p>
            </section>

            {/* Account */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">2. Pendaftaran Akun</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>Untuk menggunakan fitur berbagi catatan, Anda diwajibkan mendaftar dengan informasi yang akurat. Anda bertanggung jawab penuh atas:</p>
                <div className="grid gap-4 mt-6">
                  {['Menjaga kerahasiaan kata sandi akun Anda.', 'Segala aktivitas yang terjadi di bawah akun Anda.', 'Memberikan informasi yang benar dan akurat.'].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 items-start">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100 shrink-0 mt-1">{i+1}</div>
                      <p className="font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Content Ownership */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">3. Hak Kekayaan Intelektual</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg bg-indigo-50/30 p-8 rounded-[2rem] border border-indigo-50 italic">
                "Setiap catatan yang Anda unggah ke Ba-Yu tetap menjadi milik Anda. Namun, dengan mengunggahnya, Anda memberikan lisensi kepada Ba-Yu untuk menampilkan, mendistribusikan, dan mempromosikan konten tersebut di dalam ekosistem platform kami untuk tujuan pendidikan."
              </p>
            </section>

            {/* User Conduct */}
            <section className="space-y-6">
              <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-gray-950">4. Aturan Penggunaan</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                  <h3 className="font-['Lexend_Deca'] font-bold text-emerald-900 text-lg mb-4">Hal yang Diperbolehkan</h3>
                  <ul className="text-gray-700 space-y-4 font-medium">
                    <li className="flex gap-3"><span className="text-emerald-500 font-bold">✓</span> Berbagi materi pelajaran asli.</li>
                    <li className="flex gap-3"><span className="text-emerald-500 font-bold">✓</span> Memberikan komentar positif.</li>
                    <li className="flex gap-3"><span className="text-emerald-500 font-bold">✓</span> Mengunduh untuk referensi pribadi.</li>
                  </ul>
                </div>
                <div className="p-8 bg-red-50/50 rounded-[2rem] border border-red-100">
                  <h3 className="font-['Lexend_Deca'] font-bold text-red-900 text-lg mb-4">Hal yang Dilarang</h3>
                  <ul className="text-gray-700 space-y-4 font-medium">
                    <li className="flex gap-3"><span className="text-red-500 font-bold">✕</span> Mengunggah konten plagiat.</li>
                    <li className="flex gap-3"><span className="text-red-500 font-bold">✕</span> Menyebarkan ujaran kebencian.</li>
                    <li className="flex gap-3"><span className="text-red-500 font-bold">✕</span> Merusak sistem platform.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Footer Legal */}
            <div className="pt-16 border-t border-indigo-50 text-center">
              <div className="inline-flex flex-col gap-4">
                <p className="text-gray-900 text-sm font-medium">
                  Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi tim dukungan kami di:
                </p>
                <a href="mailto:support@ba-yu.id" className="text-indigo-600 font-bold text-lg hover:underline underline-offset-8">
                  support@ba-yu.id
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-20 text-center text-gray-900 text-sm font-bold opacity-60">
        &copy; 2026 Ba-Yu Platform. Semua Hak Dilindungi.
      </footer>
    </div>
  );
}
