import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Settings, Edit, FileText, Bookmark, Eye, Heart, Users, Shield, BarChart3, Clock, CheckCircle, ChevronRight, Activity, Calendar, Sparkles } from 'lucide-react';
import { mockUsers, mockNotes } from '../data/mockData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ApplyPakarModal } from '../components/ApplyPakarModal';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'catatan' | 'bookmarks' | 'aktivitas'>('catatan');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const { user } = useAuth();
  
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

  return (
    <MobileLayout>
      <div className="pb-8">
        {/* Header - Dashboard Style */}
        <div className="px-6 md:px-0 pt-7 md:pt-2 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-['Lexend_Deca'] font-bold text-foreground">Profil Pengguna</h1>
            <p className="text-muted-foreground font-['Manrope'] text-sm mt-1">
              Kelola informasi akun dan kontribusimu
            </p>
          </div>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-primary/30 hover:bg-gray-50 text-foreground font-['Manrope'] font-medium text-sm rounded-xl transition-all shadow-sm"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Pengaturan</span>
          </Link>
        </div>

        {/* Profile Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 md:px-0">
          
          {/* LEFT COL: Profile Card & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Identity */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
               
               <div className="relative mt-8 mb-4 text-center">
                   <div className="relative inline-block">
                     <img
                       src={currentUser.avatar}
                       alt={currentUser.name}
                       className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg mx-auto bg-white"
                     />
                     {currentUser.role !== 'siswa' && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-lg shadow-sm border-2 border-white" title="Verified Expert">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                     )}
                   </div>
                   
                   <h2 className="font-['Lexend_Deca'] font-bold text-foreground text-xl mt-4 mb-1">
                     {currentUser.name}
                   </h2>
                   <p className="font-['Manrope'] text-primary font-medium text-sm mb-4">
                     {currentUser.role === 'pakar' ? 'Pakar Pendidikan' : currentUser.role === 'admin' ? 'Administrator' : `Siswa ${currentUser.jenjang}`}
                   </p>

                   <Link
                     to="/edit-profile"
                     className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-foreground px-5 py-2.5 rounded-xl font-['Manrope'] font-semibold text-sm border border-gray-200 transition-colors w-full justify-center"
                   >
                     <Edit className="w-4 h-4" /> Edit Profil
                   </Link>
               </div>

               <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                  <div className="flex items-center text-sm font-['Manrope'] text-muted-foreground gap-3">
                     <Calendar className="w-4 h-4 text-gray-400" /> Bergabung sejak Okt 2023
                  </div>
                  <div className="flex items-center text-sm font-['Manrope'] text-muted-foreground gap-3">
                     <FileText className="w-4 h-4 text-gray-400" /> Total 12 Catatan Dipublish
                  </div>
               </div>
            </div>

            {/* Application Banner */}
            {user?.role !== 'pakar' && user?.role !== 'admin' && (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-md shadow-indigo-500/20 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-8 -translate-y-8 pointer-events-none"></div>
                 <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                 <h3 className="font-['Lexend_Deca'] font-bold text-white text-lg mb-2">Punya sertifikat/gelar?</h3>
                 <p className="font-['Manrope'] text-white/90 text-sm mb-4">Ayo bagikan ilmu berharga sebagai Pakar Pendidikan resmi di Ba-Yu.</p>
                 <button onClick={() => setApplyModalOpen(true)} className="bg-white text-indigo-600 font-['Lexend_Deca'] font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg transition-all w-full">Daftar Sertifikasi</button>
              </div>
            )}

            {/* Performance/Engagement Stats */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
               <h3 className="font-['Lexend_Deca'] font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-primary" /> Statistik
               </h3>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/20 transition-colors">
                   <Users className="w-6 h-6 text-primary mb-2" />
                   <div className="font-['Lexend_Deca'] font-bold text-2xl text-foreground">{currentUser.followers}</div>
                   <div className="font-['Manrope'] text-xs text-muted-foreground">Pengikut</div>
                 </div>
                 
                 <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/20 transition-colors">
                   <Heart className="w-6 h-6 text-red-500 mb-2" />
                   <div className="font-['Lexend_Deca'] font-bold text-2xl text-foreground">{currentUser.following}</div>
                   <div className="font-['Manrope'] text-xs text-muted-foreground">Mengikuti</div>
                 </div>
                 
                 <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-4 col-span-2 flex items-center justify-between">
                    <div>
                        <div className="font-['Lexend_Deca'] font-bold text-2xl text-primary">12.4k</div>
                        <div className="font-['Manrope'] text-xs text-muted-foreground">Total Views</div>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-primary/10 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-primary" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* RIGHT COL: Main Interactions & Feeds */}
          <div className="lg:col-span-2 space-y-6">
             
            {/* Role-Specific Banner */}
            {user?.role === 'pakar' && (
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-green-500/20">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Lexend_Deca'] font-bold text-white text-xl mb-1">
                      Ruang Kerja Pakar
                    </h3>
                    <p className="font-['Manrope'] text-white/90 text-sm">
                      Ada {mockNotes.filter(n => !n.isValidated).length} catatan baru menunggu untuk diverifikasi.
                    </p>
                  </div>
                </div>
                <Link
                  to="/pakar"
                  className="w-full sm:w-auto bg-white text-green-600 px-6 py-3 rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-sm hover:bg-green-50 transition-colors whitespace-nowrap text-center"
                >
                  Buka Dashboard
                </Link>
              </div>
            )}

            {user?.role === 'admin' && (
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-purple-500/20">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Lexend_Deca'] font-bold text-white text-xl mb-1">
                      Ruang Kontrol Admin
                    </h3>
                    <p className="font-['Manrope'] text-white/90 text-sm">
                      Pantau aktivitas platform dan manajemen konten.
                    </p>
                  </div>
                </div>
                <Link
                  to="/admin"
                  className="w-full sm:w-auto bg-white text-purple-700 px-6 py-3 rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-sm hover:bg-purple-50 transition-colors whitespace-nowrap text-center"
                >
                  Buka Sistem
                </Link>
              </div>
            )}

            {/* Content Tabs */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm min-h-[500px]">
               <div className="flex gap-6 mb-6 border-b border-gray-100">
                  {['catatan', 'bookmarks', 'aktivitas'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 relative font-['Lexend_Deca'] font-semibold text-sm transition-colors capitalize ${
                        activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab} {tab === 'catatan' && `(${userNotes.length})`}
                      {activeTab === tab && (
                        <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
                      )}
                    </button>
                  ))}
               </div>

               {/* TAB PANELS */}
               {activeTab === 'catatan' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                   {userNotes.length > 0 ? userNotes.map((note) => (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group flex flex-col"
                      >
                        <div className="relative h-36 bg-gray-200 overflow-hidden">
                          <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {note.isValidated && (
                            <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                              <CheckCircle className="w-3 h-3" /> Tervalidasi
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <span className="inline-block text-[10px] font-['Manrope'] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2 self-start">
                            {note.mataPelajaran}
                          </span>
                          <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-3 line-clamp-2 leading-tight flex-1">
                            {note.title}
                          </h4>
                          <div className="flex items-center gap-3 text-muted-foreground text-[11px] mt-auto pt-3 border-t border-gray-200/60">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" /> <span>{note.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5" /> <span>{note.likes}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                   )) : (
                     <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                       <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                       <h3 className="font-['Lexend_Deca'] font-semibold text-foreground text-lg mb-2">Belum Terdapat Catatan</h3>
                       <p className="font-['Manrope'] text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                         Kamu belum mempublikasikan catatan apa pun. Mulai bagikan pengetahuanmu sekarang.
                       </p>
                       <Link
                         to="/upload"
                         className="inline-flex bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-all shadow-sm"
                       >
                         Unggah Catatan
                       </Link>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'bookmarks' && (
                 <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                    <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-['Lexend_Deca'] font-semibold text-foreground text-lg mb-2">Belum Ada Bookmark</h3>
                    <p className="font-['Manrope'] text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      Simpan catatan yang berguna agar kamu bisa membacanya kembali kapan saja.
                    </p>
                    <Link
                      to="/explore"
                      className="inline-flex bg-white hover:bg-gray-50 text-primary border border-gray-200 px-6 py-2.5 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-all shadow-sm"
                    >
                      Jelajahi Materi
                    </Link>
                 </div>
               )}

               {activeTab === 'aktivitas' && (
                 <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-['Lexend_Deca'] font-semibold text-foreground text-lg mb-2">Aktivitas Kosong</h3>
                    <p className="font-['Manrope'] text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      Belum ada rekam jejak aktivitas yang bisa ditampilkan di sini.
                    </p>
                 </div>
               )}

            </div>
          </div>
        </div>
      </div>
      
      <ApplyPakarModal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} />
    </MobileLayout>
  );
}