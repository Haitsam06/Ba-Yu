import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Target,
  Zap,
  Activity,
  Heart,
  MessageCircle,
  Eye,
  ShieldCheck,
  ArrowUpRight,
  Inbox,
  Settings2,
  X,
  Calendar,
  Share2,
  MoreHorizontal,
  Flame,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Link, useNavigate } from 'react-router';
import { MobileLayout } from '../components/MobileLayout';
import { AvatarImage, DefaultThumbnail } from '../components/ui/DefaultImages';

const LearningStatisticsPage = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [tempHours, setTempHours] = useState(4);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [currentProgressHours, setCurrentProgressHours] = useState(2.8);
  const navigate = useNavigate();

  // 1. Tambahin state baru buat nampung statistik dari API
  const [stats, setStats] = useState<any>(null);
  const [dynamicWeeklyData, setDynamicWeeklyData] = useState<any[]>([]);

  // 2. Kita ganti fetch-nya pake API Super lu!
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
        
        // Panggil API yang baru lu bikin
        const response = await axios.get("/api/v1/learn/statistics", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const apiData = response.data.data;
        setStats(apiData);

        // 3. Ubah format grafik dari Backend biar cocok sama Recharts Frontend
        // Backend ngirim: { Sen: 4, Sel: 0, ... }
        // Frontend butuh: [{ label: 'Sen', value: 4 }, ...]
        const formattedChart = Object.keys(apiData.weekly_chart).map(key => ({
            label: key,
            value: apiData.weekly_chart[key] // Ini dalam menit ya!
        }));
        setDynamicWeeklyData(formattedChart);

        // 4. Ekstrak data 'post' dari riwayat terakhir buat ditampilin di list bawah
        if (apiData.recent_history && apiData.recent_history.length > 0) {
            const recentPosts = apiData.recent_history.map((history: any) => history.post);
            // Hapus data yang null (jaga-jaga kalo postnya udah dihapus)
            setNotes(recentPosts.filter((post: any) => post !== null));
        }

      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Biarin aja yang bulanan mock data dulu, nanti gampang kalo mau dibikin
  const monthlyData = [
    { label: 'W1', value: 18.5 },
    { label: 'W2', value: 22.4 },
    { label: 'W3', value: 15.8 },
    { label: 'W4', value: 23.5 },
  ];

  // Kalo view-nya weekly, pake data dari API. Kalo monthly pake data bohong-bohongan dulu
  const activeChartData = chartView === 'weekly' ? dynamicWeeklyData : monthlyData;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-200">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">{payload[0].payload.label}</p>
          {/* Gua ganti dari 'Jam' ke 'Menit' biar sesuai sama data aslinya */}
          <p className="text-sm font-black">{payload[0].value} <span className="font-medium text-xs text-slate-400 ml-1">Menit</span></p>
        </div>
      );
    }
    return null;
  };


  return (
    <MobileLayout>
      <div className="min-h-screen bg-white font-['Manrope'] pb-20">
        
        {/* STICKY HEADER (X STYLE) */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-slate-800 hover:bg-slate-100 p-1.5 rounded-full transition-colors">
                 <X size={22} />
              </button>
              <div>
                 <h1 className="text-lg font-bold tracking-tight text-slate-800 leading-none">Statistik Belajar</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Mei 2026 • Progres</p>
              </div>
           </div>
           <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <Share2 size={18} />
           </button>
        </div>

        {/* MAIN FEED LAYOUT (BA-YU NATIVE STYLE) */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-8">
           
           {/* LEFT CONTENT */}
           <div className="flex-1 space-y-8">
              
              {/* DAILY HIGHLIGHT */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-['Lexend_Deca'] font-bold text-slate-800">Ringkasan Hari Ini</h2>
                    <button 
                      onClick={() => setIsGoalModalOpen(true)}
                      className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                       Set Target
                    </button>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* PROGRESS CARD */}
                    <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                       <div className="flex items-center justify-between mb-6">
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                             <Target size={20} />
                          </div>
                          <span className="text-[13px] font-bold text-slate-500">{Math.round(((stats?.summary?.today_duration || 0) / (stats?.daily_target || 1)) * 100) || 0}% Selesai</span>
                       </div>
                       
                       <div className="mb-4">
                          {stats?.summary?.today_duration || 0} mnt <span className="text-sm font-medium text-slate-500">/ {Math.floor((stats?.daily_target || 0) / 60)}j {(stats?.daily_target || 0) % 60}m</span>
                          <p className="text-[13px] font-medium text-slate-500 mt-1">Target belajar harian</p>
                       </div>

                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                          <div 
                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                            style={{ width: `${Math.min(((stats?.summary?.today_duration || 0) / (stats?.daily_target || 1)) * 100, 100) || 0}%` }}                          
                            />
                       </div>
                    </div>

                    {/* STREAK CARD */}
                    <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-[24px] p-6 text-white shadow-lg shadow-orange-200/50 relative overflow-hidden flex flex-col justify-between">
                       <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                       <div className="absolute bottom-4 right-4 opacity-20 transform -rotate-12">
                          <Flame size={100} />
                       </div>
                       
                       <div className="relative z-10 flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                             <Flame size={18} className="text-white" />
                          </div>
                          <span className="text-[13px] font-bold text-orange-50">Current Streak</span>
                       </div>
                       
                       <div className="relative z-10 mt-auto">
                          <h3 className="text-4xl font-['Lexend_Deca'] font-bold tracking-tight">
                             {stats?.summary?.current_streak || 0} <span className="text-lg font-medium text-orange-100">Hari</span>
                          </h3>
                          <p className="text-[13px] text-orange-50 font-medium mt-1">
                             Pertahankan semangat belajarmu!
                          </p>
                       </div>
                    </div>
                 </div>
              </section>

              {/* ACTIVITY CHART SECTION */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-['Lexend_Deca'] font-bold text-slate-800">Analisis Aktivitas</h2>
                    <div className="flex bg-slate-100 rounded-xl p-1">
                       <button 
                         onClick={() => setChartView('weekly')}
                         className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${chartView === 'weekly' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                         Mingguan
                       </button>
                       <button 
                         onClick={() => setChartView('monthly')}
                         className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${chartView === 'monthly' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                         Bulanan
                       </button>
                    </div>
                 </div>

                 <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={activeChartData} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="label" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Manrope' }} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Manrope' }} 
                          />
                          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                          <Bar 
                            dataKey="value" 
                            fill="#4f46e5" 
                            radius={[6, 6, 0, 0]} 
                            barSize={chartView === 'weekly' ? 32 : 48}
                          >
                             {activeChartData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.hours > (chartView === 'weekly' ? 4 : 20) ? '#6366f1' : '#e0e7ff'} 
                                  className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </section>

              {/* RECENT FEED (BA-YU APP STYLE) */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-['Lexend_Deca'] font-bold text-slate-800">Riwayat Terakhir</h2>
                 </div>

                 <div className="grid gap-4">
                    {isLoading ? (
                       [...Array(3)].map((_, i) => (
                          <div key={i} className="bg-white rounded-[20px] p-4 border border-slate-200 animate-pulse flex gap-4">
                             <div className="w-24 h-24 bg-slate-100 rounded-xl shrink-0" />
                             <div className="flex-1 space-y-3 py-2">
                                <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                                <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                             </div>
                          </div>
                       ))
                    ) : (
                       notes.map((note) => (
                          <article key={note.id || note._id} className="bg-white rounded-[20px] p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all group flex gap-4 sm:gap-5">
                             <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 rounded-2xl overflow-hidden shrink-0 relative border border-slate-100">
                                {note.thumbnail ? (
                                   <img src={note.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                ) : (
                                   <DefaultThumbnail 
                                       className="w-full h-full p-4" 
                                       subject={note.mapel}
                                       title={note.title}
                                   />
                                )}
                             </div>
                             
                             <div className="flex-1 min-w-0 py-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5">
                                   <AvatarImage src={note.user?.avatar} size={20} className="rounded-full ring-1 ring-slate-100" />
                                   <span className="text-[12px] font-semibold text-slate-700 truncate">{note.user?.name}</span>
                                   <span className="text-slate-300 text-[10px]">•</span>
                                   <span className="text-[11px] font-medium text-slate-500">{new Date(note.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                
                                <Link to={`/note/${note.id || note._id}`} className="block group-hover:text-indigo-600 transition-colors mb-auto">
                                   <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 leading-[1.3] line-clamp-2">
                                      {note.title}
                                   </h3>
                                </Link>

                                <div className="flex items-center gap-4 mt-3">
                                   <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                                      <Clock size={12} className="text-slate-400" />
                                      <span className="text-[10px] font-bold text-slate-500">{note.read_time || 5} Menit</span>
                                   </div>
                                   <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-rose-500 transition-colors">
                                         <Heart size={14} />
                                         <span>{note.likes_count || 0}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-blue-500 transition-colors">
                                         <MessageCircle size={14} />
                                         <span>{note.comments_count || 0}</span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </article>
                       ))
                    )}
                 </div>
                 
                 <button className="w-full mt-6 py-3.5 bg-white text-[13px] font-bold text-slate-600 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm">
                    Lihat Semua Riwayat
                 </button>
              </section>
           </div>

           {/* RIGHT SIDEBAR (BA-YU STYLE) */}
           <div className="hidden lg:block w-[340px] shrink-0 space-y-6 sticky top-24 self-start">
              
              {/* TOP PERFORMANCE */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
                 <h3 className="text-[16px] font-['Lexend_Deca'] font-bold text-slate-800 mb-5">Pencapaian</h3>
                 <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                          <Award size={20} />
                       </div>
                       <div>
                          <p className="text-[11px] font-medium text-slate-500 mb-0.5">Catatan</p>
                          <h4 className="text-[14px] font-bold text-slate-800 leading-none">{stats?.achievements?.notes_created || 0} Catatan dibuat</h4>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                          <BookOpen size={20} />
                       </div>
                       <div>
                          <p className="text-[11px] font-medium text-slate-500 mb-0.5">Total Materi</p>
                          <h4 className="text-[14px] font-bold text-slate-800 leading-none">{stats?.achievements?.materials_completed || 0} Selesai</h4>
                       </div>
                    </div>
                 </div>
              </div>

              {/* CALENDAR MINI */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
                 <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[16px] font-['Lexend_Deca'] font-bold text-slate-800">Kalender Belajar</h3>
                    <Calendar size={18} className="text-slate-400" />
                 </div>
                 <div className="grid grid-cols-7 gap-1.5">
                    {[...Array(31)].map((_, i) => (
                       <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[12px] font-semibold ${i === 15 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer'}`}>
                          {i + 1}
                       </div>
                    ))}
                 </div>
              </div>

              {/* FOOTER INFO */}
              <p className="text-[12px] font-medium text-slate-400 text-center px-4 leading-relaxed">
                 Data diperbarui otomatis setiap sesi belajar berakhir. © 2026 Ba-Yu Education.
              </p>
           </div>
        </div>

      </div>

      {/* MODAL SET GOAL HARIAN (CLOCK STYLE - ALREADY IMPLEMENTED) */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsGoalModalOpen(false)}
          />
          <div className="bg-white rounded-[40px] w-full max-w-md p-8 md:p-10 relative z-10 shadow-2xl border border-white transform animate-in zoom-in slide-in-from-bottom-8 duration-500 max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setIsGoalModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-[28px] flex items-center justify-center mb-6">
                <Target className="text-indigo-600 w-8 h-8" />
              </div>
              
              <h3 className="font-['Lexend_Deca'] text-2xl font-bold text-slate-800 mb-2 tracking-tight">Set Goal Harian</h3>
              <p className="text-slate-500 text-sm font-medium mb-10 max-w-[280px]">
                Tentukan target durasi belajar harianmu dengan presisi digital.
              </p>
              
              <div className="w-full">
                {/* DIGITAL CLOCK INPUT */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12">
                  {/* HOURS COLUMN */}
                  <div className="flex flex-col items-center gap-3">
                    <button 
                      onClick={() => setTempHours((prev: number) => (prev + 1) % 24)}
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <ChevronRight className="rotate-[-90deg]" size={20} />
                    </button>
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-indigo-50/50 rounded-[28px] border-2 border-indigo-100/50 flex items-center justify-center relative overflow-hidden group focus-within:border-indigo-400 transition-colors">
                       <input 
                         type="text"
                         value={tempHours.toString().padStart(2, '0')}
                         onChange={(e) => {
                           const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                           setTempHours(Math.min(val, 23));
                         }}
                         className="w-full h-full bg-transparent text-center text-4xl sm:text-5xl font-['Lexend_Deca'] font-bold text-indigo-600 tracking-tighter tabular-nums focus:outline-none relative z-10"
                       />
                       <div className="absolute bottom-2 text-[9px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Hours</div>
                    </div>
                    <button 
                      onClick={() => setTempHours((prev: number) => (prev - 1 + 24) % 24)}
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <ChevronRight className="rotate-[90deg]" size={20} />
                    </button>
                  </div>

                  {/* SEPARATOR */}
                  <div className="flex flex-col gap-2 py-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  </div>

                  {/* MINUTES COLUMN */}
                  <div className="flex flex-col items-center gap-3">
                    <button 
                      onClick={() => setTempMinutes((prev: number) => (prev + 5) % 60)}
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <ChevronRight className="rotate-[-90deg]" size={20} />
                    </button>
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-indigo-50/50 rounded-[28px] border-2 border-indigo-100/50 flex items-center justify-center relative overflow-hidden focus-within:border-indigo-400 transition-colors">
                       <input 
                         type="text"
                         value={tempMinutes.toString().padStart(2, '0')}
                         onChange={(e) => {
                           const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                           setTempMinutes(Math.min(val, 59));
                         }}
                         className="w-full h-full bg-transparent text-center text-4xl sm:text-5xl font-['Lexend_Deca'] font-bold text-indigo-600 tracking-tighter tabular-nums focus:outline-none relative z-10"
                       />
                       <div className="absolute bottom-2 text-[9px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Mins</div>
                    </div>
                    <button 
                      onClick={() => setTempMinutes((prev: number) => (prev - 5 + 60) % 60)}
                      className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <ChevronRight className="rotate-[90deg]" size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                   <button 
                      onClick={async () => {
    const totalMenitTarget = (tempHours * 60) + tempMinutes;

    try {
        const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
        
        await axios.post("/api/v1/user/target", { 
            target: totalMenitTarget 
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

       setStats((prevStats: any) => ({
            ...prevStats,
            daily_target: totalMenitTarget
        }));

        setIsGoalModalOpen(false);

    } catch (error) {
        console.error("Gagal nyimpen target:", error);
    }
}}
                      className="w-full py-5 bg-indigo-600 text-white rounded-[24px] text-[13px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-100 hover:-translate-y-1 hover:bg-indigo-700 transition-all duration-300"
                   >
                      Simpan Target Belajar
                   </button>
                   <button 
                      onClick={() => setIsGoalModalOpen(false)}
                      className="w-full mt-4 py-3 text-slate-400 text-[11px] font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
                   >
                      Batalkan
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
    </MobileLayout>
  );
}

export default LearningStatisticsPage;
