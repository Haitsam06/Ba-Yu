import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Share2, Bookmark, Heart, Eye, MessageCircle, Flag, Check, Star, DownloadCloud } from 'lucide-react';
import { getNoteById, getUserById, getCommentsByNoteId } from '../data/mockData';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const note = getNoteById(id || '');
  const author = note ? getUserById(note.authorId) : null;
  const comments = note ? getCommentsByNoteId(note.id) : [];
  const validator = note?.validatedBy ? getUserById(note.validatedBy) : null;

  if (!note || !author) {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground font-['Manrope']">Catatan tidak ditemukan</p>
        </div>
      </MobileLayout>
    );
  }

  const handleComment = () => {
    if (commentText.trim()) {
      setCommentText('');
      alert('Komentar berhasil ditambahkan!');
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="pb-8">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 md:px-0 py-4 flex items-center justify-between border-b border-gray-100 md:mb-6 mb-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="font-['Lexend_Deca'] font-bold text-lg text-foreground line-clamp-1 flex-1 hidden md:block">
              {note.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full transition-colors ${bookmarked ? 'bg-primary/10 text-primary' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-primary' : ''}`} />
            </button>
            <button className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors text-red-500">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 md:px-0 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {/* Main Reading Area (Left / Center) */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-8">
            {/* Header Content & Title */}
            <div className="pt-4 md:pt-0 border-b border-gray-100 pb-6">
               <div className="flex flex-wrap gap-2 mb-4">
                 <span className="text-xs font-['Manrope'] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                   {note.mataPelajaran}
                 </span>
                 <span className="text-xs font-['Manrope'] font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                   Kelas {note.kelas}
                 </span>
                 <span className="text-xs font-['Manrope'] font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                   Semester {note.semester}
                 </span>
               </div>
               
               <h1 className="font-['Lexend_Deca'] font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                 {note.title}
               </h1>
               
               <div className="flex items-center gap-6 text-muted-foreground">
                 <div className="flex items-center gap-2">
                   <Eye className="w-5 h-5 text-gray-400" />
                   <span className="text-sm font-['Manrope'] font-medium">{note.views.toLocaleString()} views</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Heart className="w-5 h-5 text-red-400" />
                   <span className="text-sm font-['Manrope'] font-medium">{note.likes.toLocaleString()} likes</span>
                 </div>
                 <div className="text-sm font-['Manrope'] text-gray-400 font-medium ml-auto hidden sm:block">
                   Diupload {note.createdAt}
                 </div>
               </div>
            </div>

            {/* Note Thumbnail */}
            <div className="w-full bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-200">
              <img
                src={note.thumbnail}
                alt={note.title}
                className="w-full h-[300px] md:h-[450px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Action Buttons Horizontal Ribbon */}
            <div className="flex flex-col sm:flex-row gap-4 py-2 border-y border-gray-100">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 py-3.5 rounded-2xl font-['Lexend_Deca'] font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  liked
                    ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
                {liked ? 'Telah Disukai' : 'Suka Catatan Ini'} <span>({note.likes + (liked ? 1 : 0)})</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-primary to-blue-600 text-white py-3.5 rounded-2xl font-['Lexend_Deca'] font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <DownloadCloud className="w-5 h-5" /> Download PDF File
              </button>
            </div>

            {/* Description & Actual Content */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm leading-relaxed">
               <h3 className="font-['Lexend_Deca'] font-bold text-xl text-foreground mb-4">
                 Deskripsi
               </h3>
               <p className="font-['Manrope'] text-foreground mb-8 text-[15px] opacity-90">
                 {note.description}
               </p>

               <h3 className="font-['Lexend_Deca'] font-bold text-xl text-foreground mb-4 pt-6 border-t border-gray-50">
                 Pratinjau Catatan
               </h3>
               <div className="prose prose-blue max-w-none font-['Manrope'] text-foreground opacity-90">
                 <p className="whitespace-pre-wrap">{note.content}</p>
                 <p className="whitespace-pre-wrap mt-4 text-gray-500 italic">...[Unduh untuk membaca selengkapnya]...</p>
               </div>
            </div>
            
          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-1 space-y-6">
             
             {/* Author Card */}
             <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-['Lexend_Deca'] font-bold text-sm text-gray-500 mb-4 uppercase tracking-wider">Pembuat Catatan</h4>
                <div className="flex flex-col items-center justify-center text-center">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow-md bg-gray-50"
                    />
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <h3 className="font-['Lexend_Deca'] font-bold text-lg text-foreground">
                        {author.name}
                      </h3>
                      {author.role === 'pakar' && (
                        <div className="bg-green-500 text-white p-0.5 rounded-full" title="Verified Expert">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm font-['Manrope'] text-primary font-medium mb-5">{author.role === 'pakar' ? 'Pakar Pendidikan' : `Siswa ${author.jenjang}`}</p>
                    
                    <div className="flex gap-4 w-full justify-center mb-5 border-y border-gray-100 py-3">
                       <div className="text-center">
                          <div className="font-['Lexend_Deca'] font-bold text-gray-900">{author.totalCatatan}</div>
                          <div className="font-['Manrope'] text-[11px] text-gray-500">Posts</div>
                       </div>
                       <div className="text-center">
                          <div className="font-['Lexend_Deca'] font-bold text-gray-900">{author.followers}</div>
                          <div className="font-['Manrope'] text-[11px] text-gray-500">Pengikut</div>
                       </div>
                    </div>

                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl text-sm font-['Lexend_Deca'] font-semibold transition-colors border border-blue-200">
                      Ikuti Penulis
                    </button>
                </div>
             </div>

             {/* Validation Status */}
             {note.isValidated && validator && (
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-md shadow-green-500/20 text-white relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex gap-3 mb-4 items-center">
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Check className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h4 className="font-['Lexend_Deca'] font-bold text-white text-base leading-tight">
                          Diperiksa Pakar
                        </h4>
                        <p className="font-['Manrope'] text-white/80 text-[11px] mt-0.5">Akurat & Terjamin</p>
                     </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                     <div className="flex items-center gap-3">
                       <img
                         src={validator.avatar}
                         alt={validator.name}
                         className="w-8 h-8 rounded-full object-cover border border-white/40"
                       />
                       <div>
                          <p className="text-xs font-['Manrope'] text-white/70">Divalidasi Oleh:</p>
                          <span className="text-sm font-['Lexend_Deca'] font-bold text-white leading-tight">{validator.name}</span>
                       </div>
                     </div>
                     
                     {note.rating && (
                       <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/10">
                         <span className="text-xs font-['Manrope'] text-white/80 mr-1">Skor Kualitas:</span>
                         {[...Array(5)].map((_, i) => (
                           <Star
                             key={i}
                             className={`w-3.5 h-3.5 ${i < note.rating! ? 'fill-yellow-300 text-yellow-300' : 'fill-white/20 text-white/20'}`}
                           />
                         ))}
                       </div>
                     )}
                  </div>
                </div>
              )}

             {/* Comments Widget */}
             <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-[500px]">
                <h4 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                  Diskusi 
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg text-sm">{comments.length}</span>
                </h4>

                {/* Comment Input Sticky Top */}
                <div className="mb-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full border border-gray-200 absolute left-3 top-3 object-cover"
                    />
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis pendapatmu..."
                      className="w-full pl-13 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-2xl font-['Manrope'] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleComment}
                      disabled={!commentText.trim()}
                      className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-['Lexend_Deca'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-sm"
                    >
                      Kirim
                    </button>
                  </div>
                </div>

                {/* Scrollable Comments List */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 -mr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 opacity-60">
                      <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="font-['Manrope'] text-sm text-gray-500">Jadilah yang pertama berkomentar!</p>
                    </div>
                  ) : (
                    comments.map((comment) => {
                      const commentAuthor = getUserById(comment.userId);
                      if (!commentAuthor) return null;
                      return (
                        <div key={comment.id} className="flex gap-3 group">
                          <img
                            src={commentAuthor.avatar}
                            alt={commentAuthor.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-50 group-hover:bg-gray-100 transition-colors rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-3 inline-block w-full">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-['Lexend_Deca'] font-bold text-xs text-gray-900">
                                  {commentAuthor.name}
                                </span>
                                <span className="text-[10px] font-['Manrope'] font-medium text-gray-400">
                                  {new Date(comment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                              <p className="font-['Manrope'] text-sm text-gray-700 leading-relaxed">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
             </div>

          </div>

        </div>
      </div>
    </MobileLayout>
  );
}
