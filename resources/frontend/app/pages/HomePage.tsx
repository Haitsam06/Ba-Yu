import { MobileLayout } from '../components/MobileLayout';
import { Bookmark, Star, LayoutGrid, Clock, ChevronRight, Eye } from 'lucide-react';
import { mockNotes, getUserById, mockUsers, mataPelajaran, Note } from '../data/mockData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  
  // Destructure content
  const heroNote = mockNotes[0];
  const feedNotes = mockNotes.slice(1, 10);
  const trendingNotes = [...mockNotes].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);

  return (
    <MobileLayout>
      <div className="w-full h-full flex justify-center pb-20">
        
        <div className="w-full max-w-[1140px] px-2 sm:px-4 md:px-6 flex flex-col xl:flex-row gap-10 xl:gap-14">
           
           {/* LEFT COLUMN (MAIN DISCOVERY GRID) */}
           <div className="flex-1 min-w-0">
              
              {/* CATEGORY PILLS */}
              <div className="mb-6 overflow-hidden relative">
                 <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3 snap-x">
                    <button className="shrink-0 px-5 py-2.5 rounded-full bg-primary text-white text-[13px] font-['Lexend_Deca'] font-bold shadow-sm shadow-primary/30 transition-transform active:scale-95 snap-start shrink-0">
                      ✨ Untuk Anda
                    </button>
                    {mataPelajaran.map(mapel => (
                      <Link 
                        key={mapel.id} 
                        to={`/explore?subject=${mapel.id}`}
                        className="shrink-0 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-[13px] font-['Manrope'] font-medium text-gray-700 transition-all border border-gray-100 snap-start"
                      >
                         {mapel.name}
                       </Link>
                    ))}
                 </div>
                 {/* Fade mask for absolute right pill scrolls */}
                 <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
              </div>

              {/* THE HERO ARTICLE (MAGAZINE STYLE) */}
              {heroNote && (
                <div className="mb-12 pb-12 border-b border-gray-100 relative group transition-all duration-500 ease-out flex flex-col md:flex-row gap-8">
                     {/* Hero Text Content */}
                     <div className="flex-1 flex flex-col justify-center z-10 w-full md:w-1/2">
                        <div className="flex items-center gap-2 mb-4">
                           <span className="bg-primary/10 text-primary text-[11px] font-['Lexend_Deca'] font-bold px-2 py-1 rounded-[6px] uppercase tracking-wider">
                             Fokus Utama
                           </span>
                           <span className="text-gray-400 text-[12px] font-medium">• {Math.floor(Math.random() * 8) + 3} min</span>
                        </div>
                        
                        <Link to={`/note/${heroNote.id}`} className="block group/title">
                           <h2 className="text-[28px] md:text-[36px] font-['Lexend_Deca'] font-black text-gray-900 leading-[1.1] mb-4 tracking-tight group-hover/title:text-primary transition-colors line-clamp-3">
                             {heroNote.title}
                           </h2>
                        </Link>

                        <p className="text-[16px] font-['Manrope'] text-gray-500 leading-relaxed mb-8 line-clamp-3 md:line-clamp-2">
                           {heroNote.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-3">
                              {(() => {
                                 const hAuthor = getUserById(heroNote.authorId);
                                 return (
                                   <Link to={`/profile/${hAuthor?.id}`} className="flex items-center gap-3 group/hauth">
                                      <img src={hAuthor?.avatar} alt={hAuthor?.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50 group-hover/hauth:ring-primary/30 transition-all" />
                                      <div className="flex flex-col">
                                         <span className="text-[14px] font-['Lexend_Deca'] font-bold text-gray-900 tracking-tight group-hover/hauth:underline">
                                             {hAuthor?.name}
                                         </span>
                                         <span className="text-[12px] font-['Manrope'] text-gray-500">
                                            {new Date(heroNote.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                         </span>
                                      </div>
                                   </Link>
                                 )
                              })()}
                           </div>
                           <Link to={`/note/${heroNote.id}`} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors shrink-0 outline-none">
                              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                           </Link>
                        </div>
                     </div>
                     
                     {/* Hero Image */}
                     <div className="w-full md:w-[45%] h-[240px] md:h-[320px] overflow-hidden relative shrink-0 rounded-2xl">
                        <Link to={`/note/${heroNote.id}`} className="block w-full h-full">
                           <img 
                             src={heroNote.thumbnail} 
                             alt={heroNote.title} 
                             className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                           />
                        </Link>
                     </div>
                </div>
              )}

              {/* VERTICAL FEED SECTION */}
              <div className="mb-4 flex items-center justify-between px-2">
                 <h3 className="font-['Lexend_Deca'] font-extrabold text-[18px] text-gray-900 tracking-tight flex items-center gap-2">
                   Terbaru <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 </h3>
                 <button className="text-[13px] font-['Lexend_Deca'] font-bold text-primary hover:text-indigo-800 transition-colors">Lihat Semua</button>
              </div>

              <div className="flex flex-col">
                 {feedNotes.map((note) => {
                   const author = getUserById(note.authorId);
                   return (
                     <article key={note.id} className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                        
                        {/* Feed Text */}
                        <div className="flex-1 min-w-0 flex flex-col w-full">
                           
                           {/* Title */}
                           <Link to={`/note/${note.id}`} className="block mb-2.5 outline-none font-['Lexend_Deca']">
                             <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                               {note.title}
                             </h2>
                           </Link>

                           {/* Excerpt */}
                           <p className="text-[15px] font-['Manrope'] font-medium text-gray-500 line-clamp-2 leading-relaxed mb-5 pr-2">
                               {note.description}
                           </p>

                           {/* Meta & Author Footer */}
                           <div className="flex items-center justify-between mt-auto">
                              <Link to={`/profile/${author?.id}`} className="flex items-center gap-2.5 group/author outline-none">
                                <img src={author?.avatar} alt={author?.name} className="w-[28px] h-[28px] rounded-full object-cover ring-2 ring-transparent group-hover/author:ring-primary/20 transition-all" />
                                <div className="flex flex-col">
                                   <span className="text-[13px] font-['Lexend_Deca'] font-bold text-gray-900 tracking-tight group-hover/author:underline">{author?.name}</span>
                                   <span className="text-[11px] font-['Manrope'] font-semibold text-gray-400">{new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                </div>
                              </Link>
                              
                              <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors" title={`${note.views} kali dilihat`}>
                                   <Eye className="w-[14px] h-[14px]" strokeWidth={2} />
                                   <span className="text-[12px] font-['Lexend_Deca'] font-bold text-gray-700">{note.views}</span>
                                 </div>
                                 <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg" title={`Rating ${note.rating || '4.0'}`}>
                                   <Star className="w-[14px] h-[14px] text-amber-500 fill-amber-500" />
                                   <span className="text-[12px] font-['Lexend_Deca'] font-bold text-gray-700">{note.rating || '4.0'}</span>
                                 </div>
                                 <button aria-label="Save" className="opacity-0 md:opacity-100 p-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors outline-none md:group-hover:opacity-100">
                                    <Bookmark className="w-[18px] h-[18px]" strokeWidth={2} />
                                 </button>
                              </div>
                           </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
                           <Link to={`/note/${note.id}`} className="block w-full h-full outline-none">
                             <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                             {/* Floating badge top right */}
                             <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-['Lexend_Deca'] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                               <Clock className="w-3 h-3" /> 5m
                             </div>
                           </Link>
                        </div>
                     </article>
                   );
                 })}
              </div>
           </div>


           {/* RIGHT COLUMN (TRENDING SIDEBAR w/ GIANT NUMBERS) */}
           <div className="hidden xl:block w-[320px] shrink-0 border-l border-gray-100 pl-10">
             <div className="sticky pt-8 pb-12" style={{ top: 'min(72px, calc(100vh - 100% - 24px))' }}>
               
               <div className="pb-8 border-b border-gray-100">
                   <div className="flex items-center gap-2 mb-8">
                     <span className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#FFF2F2] text-[#FF4D4F]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.41C16.94 21.41 21 17.5 21 12.69C21 8.86 18.29 5.56 14.54 4.34C14.07 4.19 13.57 4.41 13.34 4.86C13.1 5.31 13.21 5.86 13.6 6.2C15.82 8.16 16.48 11.45 15.2 14.12C14.93 14.67 14.28 14.88 13.72 14.61C13.16 14.33 12.92 13.64 13.18 13.08C13.69 11.99 13.63 10.73 13.04 9.7C12.78 9.24 12.27 8.97 11.73 9.02C11.19 9.07 10.74 9.42 10.57 9.94C10.15 11.23 9.09 12.18 7.85 12.44C7.03 12.61 6.22 12.41 5.57 11.91C5.17 11.6 4.6 11.66 4.27 12.04C3.41 13.02 3 14.24 3 15.5C3 18.76 5.65 21.41 9 21.41H12Z" fill="currentColor"/>
                          <path d="M12 2C11.45 2 11 2.45 11 3V5C11 5.55 11.45 6 12 6C12.55 6 13 5.55 13 5V3C13 2.45 12.55 2 12 2Z" fill="currentColor"/>
                        </svg>
                     </span>
                     <h3 className="font-['Lexend_Deca'] font-extrabold text-[18px] text-gray-900 tracking-tight">
                        Sedang Populer
                     </h3>
                   </div>
                   
                   <div className="flex flex-col gap-6">
                      {trendingNotes.map((trend, idx) => {
                        const tAuth = getUserById(trend.authorId);
                        return (
                           <div key={trend.id} className="group relative flex gap-4 items-start">
                              {/* Giant Watermark Number */}
                              <div className="w-[32px] shrink-0 mt-[-2px]">
                                 <span className="font-['Lexend_Deca'] font-black text-[28px] text-gray-200 group-hover:text-gray-300 transition-colors select-none">
                                    0{idx + 1}
                                 </span>
                              </div>
                              
                              <div className="flex flex-col flex-1 min-w-0 pt-1.5">
                                 <Link to={`/profile/${tAuth?.id}`} className="flex items-center gap-1.5 mb-2 hover:opacity-80 transition-opacity">
                                   <img src={tAuth?.avatar} alt={tAuth?.name} className="w-[20px] h-[20px] rounded-[6px] object-cover" />
                                   <span className="font-['Lexend_Deca'] font-bold text-[13px] text-gray-700 truncate tracking-tight">{tAuth?.name}</span>
                                 </Link>
                                 <Link to={`/note/${trend.id}`} className="block outline-none">
                                   <h4 className="font-['Lexend_Deca'] font-extrabold text-[16px] text-gray-900 leading-[1.3] group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
                                     {trend.title}
                                   </h4>
                                 </Link>
                                 <div className="font-['Manrope'] text-[12px] text-gray-400 mt-2 font-medium">
                                    {new Date(trend.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                 </div>
                              </div>
                           </div>
                        )
                      })}
                   </div>

                   <button className="w-full mt-6 bg-gray-50 hover:bg-primary/10 text-gray-600 hover:text-primary rounded-2xl py-3 text-[14px] font-['Lexend_Deca'] font-bold transition-colors">
                     Lihat Semua
                   </button>
               </div>
               
               {/* Discover Topics Section */}
               <div className="py-8 border-b border-gray-100">
                  <h3 className="font-['Lexend_Deca'] font-bold text-[16px] text-gray-900 tracking-tight mb-4">
                     Jelajahi Topik Belajar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                     {mataPelajaran.map(tag => (
                       <Link 
                         key={tag.id} 
                         to={`/explore?subject=${tag.id}`}
                         className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-[13px] font-['Manrope'] font-medium text-gray-700 transition-all border border-gray-100"
                       >
                         {tag.name}
                       </Link>
                     ))}
                  </div>
               </div>

               {/* Quick Links */}
               <div className="mt-8 flex flex-wrap gap-x-4 gap-y-3 text-[13px] font-['Manrope'] font-medium text-gray-500">
                  <Link to="#" className="hover:text-gray-900 transition-colors">Bantuan</Link>
                  <Link to="#" className="hover:text-gray-900 transition-colors">Status</Link>
                  <Link to="#" className="hover:text-gray-900 transition-colors">Tentang Kami</Link>
                  <Link to="#" className="hover:text-gray-900 transition-colors">Karir</Link>
                  <Link to="#" className="hover:text-gray-900 transition-colors">Ketentuan</Link>
                  <Link to="#" className="hover:text-gray-900 transition-colors">Privasi</Link>
               </div>

             </div>
           </div>

        </div>
      </div>
    </MobileLayout>
  );
}