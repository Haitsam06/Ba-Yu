import { ArrowLeft, Server, Activity, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import ApplicationLogo from '../components/ApplicationLogo';

export default function StatusPage() {
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="relative font-['Lexend_Deca'] text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Status <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Sistem</span>
            </h1>
            <p className="relative text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Semua sistem saat ini beroperasi dengan normal.
            </p>
          </div>

          <div className="p-8 sm:p-14 space-y-6">
             <div className="grid sm:grid-cols-2 gap-4">
                 {[
                     { name: "API Services", status: "Operational", icon: Activity },
                     { name: "Database", status: "Operational", icon: Server },
                     { name: "File Storage", status: "Operational", icon: Server },
                     { name: "CDN & Assets", status: "Operational", icon: Activity }
                 ].map((service, i) => (
                     <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                         <div className="flex items-center gap-4">
                             <service.icon className="w-6 h-6 text-slate-400" />
                             <span className="font-['Lexend_Deca'] font-bold text-slate-900 dark:text-slate-100">{service.name}</span>
                         </div>
                         <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                             {service.status}
                         </span>
                     </div>
                 ))}
             </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center text-slate-900 dark:text-slate-400 text-sm font-bold opacity-60">
        &copy; 2026 Ba-Yu Platform. Semua Hak Dilindungi.
      </footer>
    </div>
  );
}
