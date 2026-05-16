import { ArrowLeft, Briefcase, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import ApplicationLogo from '../components/ApplicationLogo';

export default function CareersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#13111C] font-['Manrope'] transition-colors duration-500">
      <header className="bg-white/90 dark:bg-[#13111C]/90 backdrop-blur-xl border-b border-indigo-50 dark:border-white/5 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-['Lexend_Deca'] font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:block">Kembali</span>
          </button>
          <div className="flex items-center gap-3">
            <ApplicationLogo className="w-10 h-10 drop-shadow-sm" />
            <span className="font-['Lexend_Deca'] font-black text-2xl tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ba-Yu</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
        <div className="bg-white dark:bg-[#1C1A29] rounded-[2.5rem] border border-indigo-50 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="relative bg-slate-950 px-10 py-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <h1 className="relative font-['Lexend_Deca'] text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Berkarir di <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Ba-Yu</span>
            </h1>
            <p className="relative text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Bergabung bersama kami membangun ekosistem edukasi masa depan.
            </p>
          </div>

          <div className="p-8 sm:p-14 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-white/10">
                <Briefcase className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h2 className="font-['Lexend_Deca'] text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Belum Ada Lowongan</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Saat ini kami belum membuka posisi baru, namun kami selalu tertarik dengan talenta berbakat.
            </p>
            <a href="mailto:careers@ba-yu.id" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-colors shadow-sm">
                <Mail className="w-5 h-5" /> Hubungi Kami
            </a>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center text-slate-900 dark:text-slate-400 text-sm font-bold opacity-60">
        &copy; 2026 Ba-Yu Platform. Semua Hak Dilindungi.
      </footer>
    </div>
  );
}
