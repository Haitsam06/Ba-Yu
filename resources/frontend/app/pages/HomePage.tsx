import { MobileLayout } from '../components/MobileLayout';
import { Eye, Heart, Check, ArrowRight, Search } from 'lucide-react';
import { mockNotes, getUserById, mataPelajaran } from '../data/mockData';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const recentNotes = mockNotes.slice(0, 6);
  const trendingNotes = mockNotes.slice(1, 6);
  const displayedSubjects = mataPelajaran.slice(0, 5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <MobileLayout>
      <div className="pb-8">
        
        {/* Header */}
        <div className="px-6 md:px-0 pt-6 md:pt-2 pb-2">
          <h1 className="text-2xl font-['Lexend_Deca'] font-bold text-gray-900">
            Halo, {user?.name?.split(' ')[0] || 'Pengguna'}
          </h1>
          <p className="text-gray-500 font-['Manrope'] text-sm mt-1">
            Mau belajar apa hari ini?
          </p>
        </div>

        <div className="px-6 md:px-0">

          {/* Search */}
          <form onSubmit={handleSearch} className="mt-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari catatan atau materi..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-['Manrope'] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
              />
            </div>
          </form>

          {/* Kategori */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900">
                Kategori
              </h2>
              <Link to="/explore" className="text-primary font-['Manrope'] font-semibold text-sm flex items-center gap-1 hover:gap-1.5 transition-all">
                Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {displayedSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/explore?subject=${subject.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition-all flex flex-col items-center text-center group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${subject.color}12` }}
                  >
                    {subject.icon}
                  </div>
                  <h4 className="font-['Lexend_Deca'] font-semibold text-gray-800 text-sm">
                    {subject.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             
             {/* Catatan Terbaru */}
             <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900">
                    Terbaru
                  </h2>
                  <Link to="/explore" className="text-primary font-['Manrope'] font-semibold text-sm flex items-center gap-1 hover:gap-1.5 transition-all">
                    Lihat semua <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentNotes.map((note) => {
                    const author = getUserById(note.authorId);
                    return (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col"
                      >
                        <div className="relative h-36 bg-gray-100 overflow-hidden">
                          <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                          {note.isValidated && (
                            <div className="absolute top-2.5 left-2.5 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified
                            </div>
                          )}
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <span className="text-[11px] font-['Manrope'] font-semibold text-primary mb-2">
                            {note.mataPelajaran}
                          </span>
                          
                          <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-sm mb-3 line-clamp-2 leading-snug flex-1">
                            {note.title}
                          </h4>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-2">
                               <img src={author?.avatar} alt={author?.name} className="w-5 h-5 rounded-full object-cover" />
                               <span className="text-xs font-['Manrope'] text-gray-500 truncate max-w-[80px]">{author?.name}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" /> {note.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5" /> {note.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
             </div>

             {/* Populer */}
             <div className="xl:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900">
                    Populer
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                  {trendingNotes.map((note, index) => {
                    return (
                      <Link
                        key={note.id}
                        to={`/note/${note.id}`}
                        className="flex items-start gap-3.5 p-4 hover:bg-gray-50 transition-colors group"
                      >
                        <span className={`font-['Lexend_Deca'] font-bold text-lg mt-0.5 w-6 text-center shrink-0 ${
                          index === 0 ? 'text-amber-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-gray-300'
                        }`}>
                          {index + 1}
                        </span>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                            {note.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-['Manrope']">
                            <span className="text-primary font-semibold">{note.mataPelajaran}</span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" /> {note.likes}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  
                  <div className="p-3">
                     <Link to="/explore" className="block w-full py-3 text-gray-500 hover:text-primary font-['Manrope'] font-semibold text-sm rounded-xl transition-colors text-center hover:bg-gray-50">
                        Lihat lebih banyak
                     </Link>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}