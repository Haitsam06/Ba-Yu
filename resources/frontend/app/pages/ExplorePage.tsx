import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Search, Filter, BookOpen, Check, Eye, Heart } from 'lucide-react';
import { mockNotes, mataPelajaran, getUserById } from '../data/mockData';
import { Link } from 'react-router';

export default function ExplorePage() {
  const [activeSegment, setActiveSegment] = useState<'kategori' | 'populer' | 'terbaru'>('kategori');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MobileLayout>
      <div className="pb-8">
        {/* Header - Dashboard Style */}
        <div className="px-6 md:px-0 pt-7 md:pt-2 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-['Lexend_Deca'] font-bold text-foreground">Eksplorasi</h1>
            <p className="text-muted-foreground font-['Manrope'] text-sm mt-1">
              Temukan materi belajar terbaik untukmu
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 md:px-0 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari biologi kelas 10..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <button className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-gray-50 hover:text-primary transition-colors flex-shrink-0">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 md:px-0 mb-10">
          <h2 className="font-['Lexend_Deca'] font-bold text-lg text-foreground mb-4">
            Mata Pelajaran
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {mataPelajaran.map((subject) => (
              <button
                key={subject.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-3 items-center hover:shadow-md hover:border-primary/30 transition-all text-left group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${subject.color}15` }}
                >
                  {subject.icon}
                </div>
                <div className="min-w-0">
                   <h3 className="font-['Lexend_Deca'] font-bold text-sm text-foreground truncate">
                     {subject.name}
                   </h3>
                   <p className="text-[10px] font-['Manrope'] text-muted-foreground truncate">
                     120+ Catatan
                   </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feed Headers Tabs */}
        <div className="px-6 md:px-0 mb-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveSegment('kategori')}
              className={`pb-4 relative font-['Lexend_Deca'] font-semibold text-sm transition-colors ${
                activeSegment === 'kategori' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Untuk Anda
              {activeSegment === 'kategori' && (
                <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveSegment('populer')}
              className={`pb-4 relative font-['Lexend_Deca'] font-semibold text-sm transition-colors ${
                activeSegment === 'populer' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Terpopuler
              {activeSegment === 'populer' && (
                <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveSegment('terbaru')}
              className={`pb-4 relative font-['Lexend_Deca'] font-semibold text-sm transition-colors ${
                activeSegment === 'terbaru' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Terbaru
              {activeSegment === 'terbaru' && (
                <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Notes Grid (Reduced columns for desktop clarity) */}
        <div className="px-6 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockNotes.map((note) => {
              const author = getUserById(note.authorId);
              return (
                <Link
                  key={note.id}
                  to={`/note/${note.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={note.thumbnail}
                      alt={note.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {note.isValidated && (
                      <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Check className="w-3.5 h-3.5" /> Tervalidasi Oleh Pakar
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> 12 Hal
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block text-[10px] font-['Manrope'] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                        {note.mataPelajaran}
                      </span>
                      <span className="text-[10px] font-['Manrope'] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        {note.jenjang}
                      </span>
                    </div>
                    
                    <h4 className="font-['Lexend_Deca'] font-bold text-foreground text-base mb-4 leading-snug flex-1">
                      {note.title}
                    </h4>

                    {/* Author & Stats footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={author?.avatar}
                          alt={author?.name}
                          className="w-7 h-7 rounded-full object-cover border border-gray-100"
                        />
                        <div>
                          <p className="font-['Manrope'] font-bold text-xs text-foreground truncate w-24">
                            {author?.name}
                          </p>
                          <p className="text-[9px] text-muted-foreground">2 jam yang lalu</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground text-xs font-medium">
                        <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                          <Eye className="w-4 h-4" /> 
                          <span>{note.views}</span>
                        </div>
                        <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" /> 
                          <span>{note.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}