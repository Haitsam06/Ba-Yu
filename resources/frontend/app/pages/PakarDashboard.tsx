import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Eye, Clock, Search, Filter, ShieldCheck, Map, BookOpen, ChevronRight } from 'lucide-react';
import { mataPelajaran } from '../data/mockData';
import { Link } from 'react-router';
import { useToast } from '../contexts/ToastContext';
import axios from 'axios';

type VerificationStatus = 'pending' | 'approved' | 'all';

export default function PakarDashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<VerificationStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();
  
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/posts');
      const formattedNotes = (response.data.data || []).map((note: any) => ({
        ...note,
        id: note._id || note.id,
        author: note.user ? { ...note.user, avatar: note.user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' } : { name: 'Anonim', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' },
        createdAt: note.created_at || note.createdAt,
        description: note.content ? note.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'Tidak ada deskripsi',
        mataPelajaran: note.mapel || 'Lainnya',
        kelas: note.kelas || '-',
        isValidated: note.is_verified || false,
      }));
      setNotes(formattedNotes);
    } catch (error) {
      console.error('Error fetching posts:', error);
      showToast('Gagal memuat data antrean', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (noteId: string, status: 'approve' | 'reject') => {
    if (status === 'reject') {
      showToast('Fitur tolak saat ini belum didukung sistem backend', 'warning');
      return;
    }

    try {
      const tk = localStorage.getItem('bayu-token');
      await axios.put(`/api/v1/posts/${noteId}/verify`, {}, {
        headers: { Authorization: `Bearer ${tk}` }
      });
      
      showToast('Catatan berhasil disetujui!', 'success');
      
      // Update local state directly to feel fast
      setNotes(prev => prev.map(note => 
        (note.id === noteId ? { ...note, isValidated: true, is_verified: true } : note)
      ));
    } catch (error) {
      console.error('Verification error:', error);
      showToast('Gagal memverifikasi catatan', 'error');
    }
  };

  const pendingNotes = notes.filter(note => !note.isValidated);
  const verifiedNotes = notes.filter(note => note.isValidated);

  const filteredNotes = (filter === 'all' 
    ? notes
    : filter === 'pending' 
    ? pendingNotes 
    : filter === 'approved'
    ? verifiedNotes
    : []).filter(note => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        note.title?.toLowerCase().includes(q) ||
        note.mataPelajaran?.toLowerCase().includes(q) ||
        note.author?.name?.toLowerCase().includes(q)
      );
    });

  const stats = [
    { label: 'Perlu Verifikasi', value: pendingNotes.length, color: 'bg-orange-500', icon: Clock, extra: 'Urgent' },
    { label: 'Telah Disetujui', value: verifiedNotes.length, color: 'bg-emerald-500', icon: CheckCircle, extra: 'Bulan ini' },
    { label: 'Total Database', value: notes.length, color: 'bg-blue-500', icon: Eye, extra: 'Keseluruhan' },
  ];

  return (
    <MobileLayout>
      <div className="pb-8 bg-gray-50/50 min-h-screen">
        {/* Widescreen Header & Stats Ribbon */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-6 md:px-10 pt-8 pb-16 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
                    alt={user?.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg bg-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="text-white/80 font-['Manrope'] text-sm tracking-wide uppercase">Workspace Pakar</p>
                       <ShieldCheck className="w-4 h-4 text-yellow-300" />
                    </div>
                    <h2 className="text-white font-['Lexend_Deca'] font-bold text-2xl mt-0.5">
                      {user?.name || 'Pakar Sistem'}
                    </h2>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-white text-teal-700 hover:bg-teal-50 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" /> Mode Baca Massal
                  </button>
                </div>
             </div>

             {/* Stats Grid - 3 Columns on Desktop */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
               {stats.map((stat, index) => {
                 const Icon = stat.icon;
                 return (
                   <div
                     key={index}
                     className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-lg hover:bg-white/15 transition-all group"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                         <Icon className="w-5 h-5 text-white" />
                       </div>
                       <span className="text-[11px] font-['Lexend_Deca'] font-bold text-white/90 bg-white/10 px-2 py-1 rounded-md border border-white/5 tracking-wider uppercase">
                         {stat.extra}
                       </span>
                     </div>
                     <div>
                       <p className="text-3xl font-['Lexend_Deca'] font-bold text-white mb-1">
                         {isLoading ? '-' : stat.value}
                       </p>
                       <p className="text-sm font-['Manrope'] text-white/80 font-medium tracking-wide">
                         {stat.label}
                       </p>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Main Dashboard Workspace */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
             
             {/* Left Column (Main Data Area) */}
             <div className="xl:col-span-3 space-y-6">
                {/* Search & Tabs Controls */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 md:p-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari mata pelajaran, judul, atau author..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent hover:border-gray-200 rounded-2xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                    {/* Filter Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide py-1">
                      {[
                        { id: 'pending', label: 'Perlu Verifikasi (Pending)' },
                        { id: 'approved', label: 'Telah Disetujui' },
                        { id: 'all', label: 'Semua Antrean' },
                      ].map((tab) => {
                        const isActive = filter === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-['Lexend_Deca'] font-semibold text-sm whitespace-nowrap transition-all ${
                              isActive
                                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                                : 'bg-transparent text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            {tab.label}
                            {tab.id === 'pending' && pendingNotes.length > 0 && !isLoading && (
                              <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'}`}>
                                {pendingNotes.length}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                      <div className="animate-spin w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) : filteredNotes.length === 0 ? (
                    <div className="py-16 text-center bg-gray-50 border border-gray-100 border-dashed rounded-3xl">
                       <CheckCircle className="w-16 h-16 text-teal-300 mx-auto mb-4" />
                       <h4 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 mb-1">Tidak Ada Antrean</h4>
                       <p className="text-sm text-gray-500 font-['Manrope']">Saat ini antrean filter yang Anda pilih sedang kosong.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotes.map((note) => {
                        const author = note.author;
                        const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                        return (
                          <div
                            key={note.id}
                            className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5 md:p-6 group relative overflow-hidden"
                          >
                            {!note.isValidated && (
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                            )}

                            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-3">
                                  <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${subject?.color || '#eee'}15` }}
                                  >
                                    <span className="text-2xl">{subject?.icon || '📚'}</span>
                                  </div>
                                  <div>
                                    <h4 className="font-['Lexend_Deca'] font-bold text-gray-900 text-base md:text-lg mb-0.5 line-clamp-1">
                                      {note.title}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-['Lexend_Deca'] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200">
                                        {note.mataPelajaran}
                                      </span>
                                      <span className="text-[10px] font-['Lexend_Deca'] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200">
                                        Kelas {note.kelas}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="font-['Manrope'] text-sm text-gray-600 line-clamp-2 md:pl-[60px] opacity-90">
                                  {note.description}
                                </p>
                                <div className="flex items-center gap-3 mt-4 md:pl-[60px]">
                                  <img
                                    src={author?.avatar}
                                    alt={author?.name}
                                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                                  />
                                  <span className="text-xs font-['Manrope'] font-medium text-gray-500">
                                    Oleh <span className="font-bold text-gray-700">{author?.name}</span>
                                  </span>
                                  <span className="text-gray-300 mx-1">•</span>
                                  <span className="text-xs font-['Manrope'] text-gray-500">{new Date(note.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                                </div>
                              </div>
                              
                              <div className="w-full md:w-48 lg:w-56 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                {note.isValidated ? (
                                    <>
                                        <div className="bg-emerald-50 text-emerald-600 rounded-xl py-3 px-4 font-['Lexend_Deca'] font-bold text-sm text-center border border-emerald-100 flex items-center justify-center gap-2">
                                            <CheckCircle className="w-4 h-4" /> Telah Dinilai
                                        </div>
                                        <Link
                                            to={`/note/${note.id}`}
                                            className="py-2.5 bg-white text-gray-600 rounded-xl font-['Lexend_Deca'] font-semibold text-sm text-center hover:bg-gray-50 transition-colors border border-gray-200"
                                        >
                                            Baca Detail
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleVerify(note.id, 'approve')}
                                            className="w-full py-2.5 bg-emerald-500 text-white rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-sm transition-colors hover:bg-emerald-600 flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" /> Validasi Layak
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleVerify(note.id, 'reject')}
                                                className="flex-1 py-2.5 bg-white text-red-500 border border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-colors flex items-center justify-center"
                                                title="Tolak Catatan"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                            <Link
                                                to={`/note/${note.id}`}
                                                className="flex-[2] py-2.5 bg-gray-50 text-gray-700 rounded-xl font-['Lexend_Deca'] font-semibold text-sm text-center hover:bg-gray-100 transition-colors border border-gray-200"
                                            >
                                                Baca Detail
                                            </Link>
                                        </div>
                                    </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
             </div>

             {/* Right Column (Sidebar) */}
             <div className="xl:col-span-1 space-y-6">
                
                {/* Guidelines Panel */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-cyan-500"></div>
                    <div className="flex items-center gap-3 mb-5">
                       <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100">
                          <Map className="w-6 h-6 text-teal-600" />
                       </div>
                       <div>
                          <h3 className="font-['Lexend_Deca'] font-bold text-gray-900">Panduan Pakar</h3>
                          <p className="font-['Manrope'] text-[11px] text-gray-500">Standar Kurikulum 2026</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       {[
                         { title: 'Akurasi Teori', desc: 'Pastikan rumus dan teori pendukung sesuai materi resmi.', num: 1 },
                         { title: 'Tidak Plagiat', desc: 'Konten harus merupakan pemikiran riil atau rangkuman mandiri pengguna.', num: 2 },
                         { title: 'Kerapian Visual', desc: 'Tolak bila tulisan tangan tidak dapat dibaca sama sekali.', num: 3 }
                       ].map((rule) => (
                          <div key={rule.num} className="flex gap-3">
                             <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">{rule.num}</div>
                             <div>
                                <h4 className="font-['Manrope'] font-bold text-sm text-gray-800">{rule.title}</h4>
                                <p className="font-['Manrope'] text-xs text-gray-500 mt-0.5 leading-relaxed">{rule.desc}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <button className="w-full mt-6 py-3 bg-teal-50 text-teal-700 rounded-xl text-sm font-['Lexend_Deca'] font-semibold transition-colors hover:bg-teal-100 flex items-center justify-center gap-2">
                       Unduh Pedoman Lengkap <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

             </div>
             
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
