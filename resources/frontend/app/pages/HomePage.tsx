import { MobileLayout } from '../components/MobileLayout';
import { Eye, Heart, Check, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { mockNotes, mockUsers, getUserById, mataPelajaran } from '../data/mockData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const currentUser = user?.role === 'pakar' 
    ? { ...mockUsers[0], name: user.name, avatar: user.avatar }
    : user?.role === 'admin'
    ? { ...mockUsers[0], name: user.name, avatar: user.avatar }
    : mockUsers[0];
  const recentNotes = mockNotes.slice(0, 6);
  const displayedSubjects = mataPelajaran.slice(0, 5); // 5 subjects for better grid

  return (
    <MobileLayout>
      <div className="pb-8">
        
        {/* Desktop Header / Title */}
        <div className="px-6 md:px-0 pt-7 md:pt-2 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-['Lexend_Deca'] font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground font-['Manrope'] text-sm mt-1">
              Selamat datang kembali, {currentUser.name.split(' ')[0]}!
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
             <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <span className="text-sm font-['Manrope'] font-semibold text-primary">Status:</span>
                <span className="text-sm font-['Manrope'] text-foreground capitalize">{currentUser.jenjang}</span>
             </div>
          </div>
        </div>

        <div className="px-6 md:px-0">
          {/* Hero Banner - Widescreen Dashboard Style */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-white font-['Lexend_Deca'] font-bold text-2xl md:text-3xl mb-3 leading-tight">
                Tingkatkan Belajarmu dengan Catatan Terbaik!
              </h2>
              <p className="text-white/90 font-['Manrope'] text-sm md:text-base mb-6 leading-relaxed">
                Jelajahi ribuan catatan tervalidasi dari siswa berprestasi. Bagikan catatanmu sendiri dan rasakan manfaat belajar bersama komunitas.
              </p>
              
              <div className="flex items-center gap-4">
                <Link
                  to="/upload"
                  className="bg-white text-primary px-6 py-3 rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-md hover:bg-gray-50 hover:shadow-lg transition-all"
                >
                  Mulai Bagikan Catatan
                </Link>
                <Link
                  to="/explore"
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-['Lexend_Deca'] font-semibold text-sm border border-white/30 hover:bg-white/30 transition-all hidden md:block"
                >
                  Eksplorasi
                </Link>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 self-start md:self-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                    <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                   <p className="font-['Manrope'] text-white/80 text-xs mb-1">Total Catatan</p>
                   <p className="font-['Lexend_Deca'] font-bold text-3xl text-white">1,248</p>
                </div>
            </div>
          </div>

          {/* Quick Subject Grid - Desktop friendly (5 cols) */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-['Lexend_Deca'] font-bold text-xl text-foreground">
                Kategori Pelajaran
              </h3>
              <Link to="/explore" className="text-primary font-['Manrope'] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {displayedSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/explore?subject=${subject.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col items-center text-center group"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${subject.color}15` }}
                  >
                    {subject.icon}
                  </div>
                  <h4 className="font-['Lexend_Deca'] font-bold text-foreground text-sm mb-1">
                    {subject.name}
                  </h4>
                  <p className="text-xs font-['Manrope'] text-muted-foreground">
                    {Math.floor(Math.random() * 100) + 20} materi
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             {/* Left Column: Recent Notes */}
             <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-['Lexend_Deca'] font-bold text-xl text-foreground flex items-center gap-2">
                    Catatan Terbaru <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full">{recentNotes.length} BARU</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {recentNotes.slice(0, 6).map((note) => {
                    const author = getUserById(note.authorId);
                    return (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                      >
                        <div className="relative h-40 bg-gray-100 overflow-hidden">
                          <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {note.isValidated && (
                            <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                              <Check className="w-3 h-3" /> Tervalidasi
                            </div>
                          )}
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <span className="inline-block text-[10px] font-['Manrope'] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg mb-3 self-start">
                            {note.mataPelajaran}
                          </span>
                          
                          <h4 className="font-['Lexend_Deca'] font-bold text-foreground text-base mb-3 line-clamp-2 leading-snug flex-1">
                            {note.title}
                          </h4>

                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                               <img src={author?.avatar} alt={author?.name} className="w-6 h-6 rounded-full object-cover" />
                               <span className="text-xs font-['Manrope'] text-muted-foreground truncate w-20">{author?.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground text-xs font-medium">
                              <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                                <Eye className="w-3.5 h-3.5" /> {note.views}
                              </div>
                              <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                                <Heart className="w-3.5 h-3.5" /> {note.likes}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
             </div>

             {/* Right Column: Trending/Popular */}
             <div className="xl:col-span-1">
                <div className="flex items-center gap-2 mb-5">
                  <h3 className="font-['Lexend_Deca'] font-bold text-xl text-foreground">
                    Populer Minggu Ini
                  </h3>
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
                  {recentNotes.slice(2, 6).map((note, index) => {
                    const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                    return (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="flex items-start gap-4 group"
                      >
                        <div className="font-['Lexend_Deca'] font-bold text-2xl text-gray-200 mt-1 w-6 text-center group-hover:text-primary transition-colors">
                            {index + 1}
                        </div>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${subject?.color}20` }}
                        >
                          <span className="text-xl">{subject?.icon}</span>
                        </div>

                        <div className="flex-1 min-w-0 border-b border-gray-50 pb-4 group-last:border-0 group-last:pb-0">
                          <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                            {note.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                            <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-md">{note.mataPelajaran}</span>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-400" /> {note.likes}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  
                  <Link to="/explore" className="w-full mt-2 py-3 bg-gray-50 hover:bg-primary/5 hover:text-primary text-muted-foreground font-['Lexend_Deca'] font-semibold text-sm rounded-xl transition-all text-center border border-gray-100">
                     Lihat Trending Lainnya
                  </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}