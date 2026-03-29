import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Settings, Edit, FileText, Bookmark, Eye, Heart, Users, Shield, BarChart3, Clock, CheckCircle, ChevronRight, Activity, Calendar, Sparkles, MapPin, Link as LinkIcon } from 'lucide-react';
import { mockUsers, mockNotes } from '../data/mockData';
import { Link, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ApplyPakarModal } from '../components/ApplyPakarModal';

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'catatan' | 'bookmarks' | 'aktivitas';
  
  const [activeTab, setActiveTab] = useState<'catatan' | 'bookmarks' | 'aktivitas'>(tabParam || 'catatan');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const { user } = useAuth();

  // Sync state if URL changes
  useEffect(() => {
    if (tabParam && ['catatan', 'bookmarks', 'aktivitas'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'catatan' | 'bookmarks' | 'aktivitas') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };
  
  // Use auth user if available, fallback to mock user for stats
  const currentUser = {
      ...mockUsers[0],
      id: user?.id || user?._id || mockUsers[0].id,
      name: user?.name || mockUsers[0].name,
      avatar: user?.avatar || mockUsers[0].avatar,
      role: user?.role || 'siswa',
      jenjang: user?.jenjang_pendidikan || 'SMA'
  };
    
  // Find notes based on matched ID
  const userNotes = mockNotes.filter(note => note.authorId === currentUser.id);
  // For bookmarks mock, let's just pick top 3 notes
  const bookmarkedNotes = mockNotes.slice(1, 4);

  return (
    <MobileLayout>
      <div className="pb-16 bg-white min-h-screen">
        
        {/* 1. Full-Width Cover Banner */}
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-[#E0E7FF] via-[#DBEAFE] to-[#F3E8FF] relative overflow-hidden flex items-center justify-center">
            {/* Subtle decorative shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-indigo-200/40 rounded-full blur-2xl translate-y-1/2"></div>
        </div>

        {/* 2. Main Profile Content Container */}
        <div className="max-w-4xl mx-auto px-5 lg:px-0 relative mb-10">
            
            {/* Avatar & Top Actions */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6 relative z-10">
                <div className="relative">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white object-cover bg-white shadow-sm"
                    />
                    {currentUser.role !== 'siswa' && (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-sm border-2 border-white ring-2 ring-transparent transition hover:ring-green-100" title="Verified Professional">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 justify-center sm:justify-start">
                    <Link
                      to="/edit-profile"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-['Lexend_Deca'] font-semibold text-sm transition-all shadow-sm"
                    >
                      <Edit className="w-4 h-4" /> Edit Profil
                    </Link>
                    <Link
                      to="/settings"
                      className="flex-center p-2.5 rounded-full border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-all shadow-sm"
                      title="Pengaturan Akun"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Profile Info (Medium Style) */}
            <div className="text-center sm:text-left mb-8">
                <h1 className="text-2xl sm:text-[32px] font-['Lexend_Deca'] font-extrabold text-gray-900 mb-1 leading-tight tracking-tight">
                    {currentUser.name}
                </h1>
                
                <p className="font-['Manrope'] text-[15px] text-gray-500 font-medium mb-5">
                    {currentUser.role === 'pakar' ? 'Pakar Pendidikan Tersertifikasi' : currentUser.role === 'admin' ? 'Administrator Sistem' : `Pelajar ${currentUser.jenjang} yang Gemar Belajar`}
                </p>
                
                {/* Horizontal Minimalist Stats */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 text-[15px] font-['Manrope'] mb-6 text-gray-600">
                   <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer transition-colors">
                       <strong className="text-gray-900 font-bold">{currentUser.followers}</strong> Pengikut
                   </span>
                   <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer transition-colors">
                       <strong className="text-gray-900 font-bold">{currentUser.following}</strong> Mengikuti
                   </span>
                   <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                   <span className="flex items-center gap-1.5 text-gray-500">
                       <Calendar className="w-4 h-4" /> Bergabung Okt 2023
                   </span>
                </div>

                <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100 max-w-2xl mx-auto sm:mx-0">
                   <p className="font-['Manrope'] text-[15px] text-gray-700 leading-relaxed italic">
                     "Pendidikan adalah senjata paling ampuh untuk mengubah dunia. Senang bisa berbagi catatan di Ba-Yu dan belajar bersama teman-teman seperjuangan!"
                   </p>
                </div>
            </div>

            {/* Application Banners (Inline & Elegant) */}
            {user?.role !== 'pakar' && user?.role !== 'admin' && (
              <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 shadow-sm transition-all hover:shadow-md">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center flex-shrink-0">
                         <Sparkles className="w-6 h-6 text-indigo-500" />
                     </div>
                     <div className="text-center sm:text-left">
                         <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 mb-0.5">Berbagi Ilmu sebagai Pakar</h3>
                         <p className="font-['Manrope'] text-sm text-gray-600">Upload sertifikatmu dan jadilah kontributor tersertifikasi.</p>
                     </div>
                 </div>
                 <button onClick={() => setApplyModalOpen(true)} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-['Lexend_Deca'] font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm">
                   Daftar Sekarang
                 </button>
              </div>
            )}

            {user?.role === 'pakar' && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 shadow-sm transition-all hover:shadow-md">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center flex-shrink-0">
                         <Shield className="w-6 h-6 text-emerald-600" />
                     </div>
                     <div className="text-center sm:text-left">
                         <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 mb-0.5">Ruang Kerja Pakar</h3>
                         <p className="font-['Manrope'] text-sm text-gray-600">Terima kasih atas kontribusi akademismu hari ini!</p>
                     </div>
                 </div>
                 <Link to="/pakar" className="w-full sm:w-auto bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-['Lexend_Deca'] font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm text-center">
                   Buka Dashboard Pakar
                 </Link>
              </div>
            )}

            {user?.role === 'admin' && (
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 shadow-sm transition-all hover:shadow-md">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-purple-100 flex items-center justify-center flex-shrink-0">
                         <BarChart3 className="w-6 h-6 text-purple-600" />
                     </div>
                     <div className="text-center sm:text-left">
                         <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 mb-0.5">Ruang Kontrol Admin</h3>
                         <p className="font-['Manrope'] text-sm text-gray-600">Pantau pertumbuhan platform dan moderasi.</p>
                     </div>
                 </div>
                 <Link to="/admin" className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 font-['Lexend_Deca'] font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm text-center">
                   Masuk ke Sistem Admin
                 </Link>
              </div>
            )}

            {/* 3. Sticky Tab Navigation */}
            <div className="sticky top-0 sm:top-[60px] bg-white/95 backdrop-blur-md z-20 border-b border-gray-100 mb-8 pt-2">
               <div className="flex gap-8 overflow-x-auto scrollbar-hide px-1">
                  {[
                    { id: 'catatan', label: 'Catatan Rilisan', count: userNotes.length },
                    { id: 'bookmarks', label: 'Tersimpan', count: bookmarkedNotes.length },
                    { id: 'aktivitas', label: 'Aktivitas Diskusi', count: 0 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as any)}
                      className={`relative pb-4 font-['Lexend_Deca'] font-semibold text-[15px] whitespace-nowrap transition-colors flex items-center gap-2 ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab.label}
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                         {tab.count}
                      </span>
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full transition-all duration-300"></div>
                      )}
                    </button>
                  ))}
               </div>
            </div>

            {/* 4. Tab Panels */}
            <div className="min-h-[400px]">
               
               {activeTab === 'catatan' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   {userNotes.length > 0 ? userNotes.map((note) => (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                      >
                        <div className="relative h-44 overflow-hidden bg-gray-50">
                          <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wide font-['Lexend_Deca'] font-bold text-primary shadow-sm border border-gray-100">
                            {note.mataPelajaran}
                          </div>
                          {note.isValidated && (
                            <div className="absolute bottom-3 left-3 bg-green-500/90 backdrop-blur text-white text-[11px] uppercase font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                              <CheckCircle className="w-3.5 h-3.5" /> Pakar Terverifikasi
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="font-['Lexend_Deca'] font-bold text-[17px] text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {note.title}
                          </h4>
                          <div className="flex items-center justify-between text-gray-500 text-[13px] mt-auto pt-4 border-t border-gray-50 font-['Manrope'] font-medium">
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-gray-300 group-hover:text-red-400 group-hover:fill-red-400 transition-colors" /> <span>{note.likes}</span></div>
                               <div className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-gray-300" /> <span>{note.views}</span></div>
                            </div>
                            <span className="text-[11px]">{note.createdAt}</span>
                          </div>
                        </div>
                      </Link>
                   )) : (
                     <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center">
                       <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                          <FileText className="w-8 h-8 text-gray-300" />
                       </div>
                       <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[19px] mb-2">Belum Terdapat Rilisan</h3>
                       <p className="font-['Manrope'] text-[15px] text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                         Kamu belum mempublikasikan catatan apa pun. Mulai bagikan pengetahuanmu sekarang dan bantu pelajar lainnya!
                       </p>
                       <Link
                         to="/upload"
                         className="inline-flex bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-['Lexend_Deca'] font-bold text-[14px] transition-all shadow-md hover:-translate-y-0.5"
                       >
                         Mulai Menulis
                       </Link>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'bookmarks' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {bookmarkedNotes.length > 0 ? bookmarkedNotes.map((note) => (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                      >
                        <div className="relative h-44 overflow-hidden bg-gray-50">
                          <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl text-primary shadow-sm border border-gray-100">
                            <Bookmark className="w-4 h-4 fill-primary" />
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <span className="inline-block text-[10px] font-['Manrope'] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-3 self-start uppercase tracking-wider">
                            {note.mataPelajaran}
                          </span>
                          <h4 className="font-['Lexend_Deca'] font-bold text-[17px] text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {note.title}
                          </h4>
                          <div className="flex items-center gap-3 text-gray-500 text-[13px] mt-auto pt-4 border-t border-gray-50 font-['Manrope'] font-medium">
                            <img src={mockUsers.find(u => u.id === note.authorId)?.avatar} className="w-6 h-6 rounded-full" />
                            <span className="truncate">{mockUsers.find(u => u.id === note.authorId)?.name}</span>
                          </div>
                        </div>
                      </Link>
                   )) : (
                     <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                           <Bookmark className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[19px] mb-2">Simpanan Kosong</h3>
                        <p className="font-['Manrope'] text-[15px] text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                          Kamu belum menyimpan referensi apa pun. Jelajahi catatan keren dan tambahkan kemari!
                        </p>
                        <Link
                          to="/explore"
                          className="inline-flex bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-full font-['Lexend_Deca'] font-bold text-[14px] transition-all shadow-sm"
                        >
                          Mulai Eksplorasi
                        </Link>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'aktivitas' && (
                 <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                       <Clock className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[19px] mb-2">Belum Ada Riwayat</h3>
                    <p className="font-['Manrope'] text-[15px] text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                      Ruang ini akan dipenuhi dengan jejak interaksi diskusi dan ulasanmu seiring waktu.
                    </p>
                 </div>
               )}

            </div>
        </div>
      </div>
      
      <ApplyPakarModal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} />
    </MobileLayout>
  );
}