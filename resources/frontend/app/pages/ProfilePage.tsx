import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { NoteCardSkeleton } from '../components/ui/skeletons';
import { Settings, Edit, FileText, Bookmark, Eye, Heart, MessageCircle, Users, Shield, BarChart3, Clock, CheckCircle, ChevronRight, Activity, Calendar, Sparkles, MapPin, Link as LinkIcon, Star } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { ApplyPakarModal } from '../components/ApplyPakarModal';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'catatan' | 'bookmarks' | 'aktivitas';
  
  const [activeTab, setActiveTab] = useState<'catatan' | 'bookmarks' | 'aktivitas'>(tabParam || 'catatan');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const { user } = useAuth();
  const { bookmarkedIds, isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  // Sync state if URL changes
  useEffect(() => {
    if (tabParam && ['catatan', 'bookmarks', 'aktivitas'].includes(tabParam)) {
      setActiveTab(tabParam);
      // Auto-scroll logic added here
      setTimeout(() => {
        const tabsEl = document.getElementById('profil-tabs');
        if (tabsEl) {
          tabsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'catatan' | 'bookmarks' | 'aktivitas') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const [activities, setActivities] = useState<any[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const fetchActivities = async () => {
    setIsLoadingActivities(true);
    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.get('/api/profile/activities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActivities(res.data.data);
    } catch (error) {
      console.error("Gagal ngambil aktivitas", error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  // 🔥 BATAS MESIN 🔥
  
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  const handleLikePost = async (postId: string) => {
    if (!user) return showToast('Silakan login terlebih dahulu untuk menyukai catatan.', 'warning');
    
    setNotes(prev => prev.map(note => {
      if ((note._id || note.id) === postId) {
        const isCurrentlyLiked = note.is_liked || false;
        return { 
          ...note, 
          likes_count: isCurrentlyLiked ? Math.max(0, (note.likes_count || 0) - 1) : (note.likes_count || 0) + 1,
          is_liked: !isCurrentlyLiked
        };
      }
      return note;
    }));

    try {
      const tk = localStorage.getItem('bayu-token');
      await axios.post(`/api/v1/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${tk}` }
      });
    } catch(e) {
      console.error(e);
    }
  };

  // Fetch user notes from API
  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const userId = user?.id || user?._id;
        if(userId) {
          const response = await axios.get(`/api/v1/posts?user_id=${userId}`);
          setNotes(response.data.data || []);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error('Error fetching user notes:', error);
      } finally {
        setIsLoadingNotes(false);
      }
    };
    fetchUserNotes();
  }, [user]);
  
  const currentUser = {
      id: user?.id || user?._id || '',
      name: user?.name || 'Pengguna',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      role: user?.role || 'siswa',
      jenjang: user?.jenjang_pendidikan || '-',
      bio: user?.bio || '',
      school: user?.school || '',
      followers: user?.followers_count || 0,
      following: user?.following_count || 0,
  };
    
  // Find notes based on matched ID (Now using API data)
  const userNotes = notes.map(note => ({
    ...note,
    id: note._id || note.id,
    title: note.title,
    createdAt: note.created_at ? new Date(note.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
    thumbnail: note.thumbnail || null,
    mataPelajaran: note.mapel || 'Umum',
    jenjang: note.jenjang || '-',
    kelas: note.kelas || '-',
    isValidated: note.is_verified,
    likes: note.likes_count || 0,
    is_liked: note.is_liked || false,
    comments: note.comments_count || 0,
    views: note.views || 0,
    author: note.user ? { ...note.user, avatar: note.user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' } : { name: 'Anonim', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }
  }));
  
  // Real bookmarked notes from API
  const [bookmarkedNotes, setBookmarkedNotes] = useState<any[]>([]);
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(false);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      if (bookmarkedIds.size === 0) {
        setBookmarkedNotes([]);
        return;
      }
      setIsLoadingBookmarks(true);
      try {
        const response = await axios.get('/api/v1/posts');
        const allPosts = response.data.data || [];
        const filtered = allPosts.filter((p: any) => bookmarkedIds.has(p._id || p.id));
        setBookmarkedNotes(filtered.map((n: any) => ({
          ...n,
          id: n._id || n.id,
          title: n.title,
          thumbnail: n.thumbnail || null,
          mataPelajaran: n.mapel || 'Umum',
          likes: n.likes_count || 0,
          comments: n.comments_count || 0,
          author: n.user ? { ...n.user, avatar: n.user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' } : { name: 'Anonim', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }
        })));
      } catch (err) {
        console.error('Error fetching bookmarked posts:', err);
      } finally {
        setIsLoadingBookmarks(false);
      }
    };
    fetchBookmarkedPosts();
  }, [bookmarkedIds]);

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
                    {currentUser.role === 'pakar' 
                      ? 'Pakar Pendidikan Tersertifikasi' 
                      : currentUser.role === 'admin' 
                        ? 'Administrator Sistem' 
                        : `Pelajar ${currentUser.jenjang} ${currentUser.school ? `di ${currentUser.school}` : 'yang Gemar Belajar'}`}
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

                {currentUser.bio ? (
                  <div className="bg-gray-100 rounded-2xl p-4 sm:p-5 border border-gray-200 max-w-2xl mx-auto sm:mx-0 shadow-sm">
                     <p className="font-['Manrope'] text-[15px] text-gray-800 leading-relaxed italic whitespace-pre-wrap">
                       "{currentUser.bio}"
                     </p>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-2xl p-4 sm:p-5 border border-gray-200 max-w-2xl mx-auto sm:mx-0 shadow-sm">
                     <p className="font-['Manrope'] text-[15px] text-gray-500 italic">
                        Belum ada bio.
                     </p>
                  </div>
                )}
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
            <div id="profil-tabs" className="sticky top-0 sm:top-[60px] bg-white/95 backdrop-blur-md z-20 border-b border-gray-100 mb-8 pt-2">
               <div className="flex gap-8 overflow-x-auto scrollbar-hide px-1">
                  {[
                    { id: 'catatan', label: 'Catatan Rilisan', count: userNotes.length },
                    { id: 'bookmarks', label: 'Tersimpan', count: bookmarkedNotes.length },
                    { id: 'aktivitas', label: 'Aktivitas Diskusi', count: activities.length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as any)}
                      className={`relative pb-4 font-['Lexend_Deca'] font-semibold text-[15px] whitespace-nowrap transition-colors flex items-center gap-2 ${
                        activeTab === tab.id ? 'text-gray-900 border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
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
                 <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                   {isLoadingNotes ? (
                      <div className="space-y-0">
                         {[...Array(3)].map((_, i) => (
                            <NoteCardSkeleton key={i} />
                         ))}
                      </div>
                   ) : userNotes.length > 0 ? userNotes.map((note) => (
                      <article 
                        key={note.id} 
                        className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none"
                      >
                         <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                            {/* Author Header */}
                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                               <div className="flex items-center gap-1.5">
                                 <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt={user?.name} className="w-[20px] h-[20px] rounded-full object-cover ring-2 ring-transparent" />
                                 <span className="font-medium text-gray-900 tracking-tight">{user?.name}</span>
                               </div>
                               <span className="text-gray-400 px-0.5">di</span>
                               <span className="font-semibold text-gray-800 tracking-tight">
                                 {note.mataPelajaran}
                               </span>
                               <span className="text-[10px] text-gray-400 mx-0.5">•</span>
                               <span className="text-gray-500 tracking-tight">
                                 {note.jenjang === 'Kuliah' ? `S${note.kelas || '1'} Semester ${note.semester || 1}` : `${note.jenjang} Kelas ${note.kelas}`}
                               </span>
                            </div>

                            {/* Title */}
                            <Link to={`/note/${note.id}`} className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer">
                              <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                {note.title}
                              </h2>
                            </Link>

                            {/* Excerpt */}
                            <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-6 pr-2">
                                {note.description}
                            </p>

                            {/* Meta Footer (Medium Style) */}
                            <div className="flex items-center justify-between mt-auto">
                               <div className="flex items-center gap-1.5 text-gray-500">
                                  <Star className="w-[14px] h-[14px] text-amber-500 fill-amber-500" strokeWidth={1} />
                                  <span className="text-[13px] font-['Manrope'] font-medium">
                                    {note.createdAt}
                                  </span>
                               </div>
                               
                               <div className="flex items-center gap-3 shrink-0 ml-4">
                                  <button onClick={(e) => { e.preventDefault(); handleLikePost(note.id); }} className={`flex items-center gap-1.5 transition-colors focus:outline-none ${note.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} title={`${note.likes} suka`}>
                                    <Heart className={`w-[15px] h-[15px] ${note.is_liked ? 'fill-red-500' : ''}`} strokeWidth={2} />
                                    <span className="text-[13px] font-['Manrope'] font-medium">{note.likes}</span>
                                  </button>
                                  <Link to={`/note/${note.id}#comments-section`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none" title={`${note.comments} komentar`}>
                                    <MessageCircle className="w-[15px] h-[15px]" strokeWidth={2} />
                                    <span className="text-[13px] font-['Manrope'] font-medium">{note.comments}</span>
                                  </Link>
                               </div>
                            </div>
                         </div>

                         {/* Thumbnail */}
                         {note.thumbnail ? (
                            <div className="w-full sm:w-[150px] md:w-[180px] h-[160px] sm:h-[120px] md:h-[135px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
                               <Link to={`/note/${note.id}`} className="block w-full h-full outline-none cursor-pointer">
                                 <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                               </Link>
                            </div>
                         ) : (
                            <div className="hidden sm:block sm:w-[150px] md:w-[180px] shrink-0 pointer-events-none"></div>
                         )}
                      </article>
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
                 <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                    {isLoadingBookmarks ? (
                      <div className="space-y-0">
                         {[...Array(3)].map((_, i) => (
                            <NoteCardSkeleton key={i} />
                         ))}
                      </div>
                    ) : bookmarkedNotes.length > 0 ? bookmarkedNotes.map((note) => (
                      <article 
                        key={note.id} 
                        className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none"
                      >
                         <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                            {/* Author Header */}
                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                               <div className="flex items-center gap-1.5 outline-none">
                                 <img src={note.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt={note.author?.name} className="w-[20px] h-[20px] rounded-full object-cover ring-2 ring-transparent" />
                                 <span className="font-medium text-gray-900 tracking-tight">{note.author?.name}</span>
                               </div>
                               <span className="text-gray-400 px-0.5">di</span>
                               <span className="font-semibold text-gray-800 tracking-tight">
                                 {note.mataPelajaran}
                               </span>
                               <span className="text-[10px] text-gray-400 mx-0.5">•</span>
                               <span className="text-gray-500 tracking-tight">
                                 {note.jenjang === 'Kuliah' ? `S${note.kelas || '1'} Semester ${note.semester || 1}` : `${note.jenjang} Kelas ${note.kelas}`}
                               </span>
                            </div>

                            {/* Title */}
                            <Link to={`/note/${note.id}`} className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer">
                              <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                {note.title}
                              </h2>
                            </Link>

                            {/* Excerpt */}
                            <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-6 pr-2">
                                {note.description || 'Tidak ada deskripsi tersedia.'}
                            </p>

                            {/* Meta Footer (Medium Style) */}
                            <div className="flex items-center justify-between mt-auto">
                               <div className="flex items-center gap-1.5 text-gray-500">
                                  <Star className="w-[14px] h-[14px] text-amber-500 fill-amber-500" strokeWidth={1} />
                                  <span className="text-[13px] font-['Manrope'] font-medium">
                                    {note.createdAt || '-'}
                                  </span>
                               </div>
                               
                               <div className="flex items-center gap-3 shrink-0 ml-4">
                                  <button onClick={(e) => { e.preventDefault(); handleLikePost(note.id); }} className={`flex items-center gap-1.5 transition-colors focus:outline-none ${note.is_liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} title={`${note.likes} suka`}>
                                    <Heart className={`w-[15px] h-[15px] ${note.is_liked ? 'fill-red-500' : ''}`} strokeWidth={2} />
                                    <span className="text-[13px] font-['Manrope'] font-medium">{note.likes || 0}</span>
                                  </button>
                                  <Link to={`/note/${note.id}#comments-section`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none" title={`${note.comments} komentar`}>
                                    <MessageCircle className="w-[15px] h-[15px]" strokeWidth={2} />
                                    <span className="text-[13px] font-['Manrope'] font-medium">{note.comments || 0}</span>
                                  </Link>
                                  <button aria-label="Save" onClick={(e) => { e.preventDefault(); toggleBookmark(note.id); }} className={`p-1.5 rounded-full transition-all duration-300 outline-none active:scale-75 ml-1 ${isBookmarked(note.id) ? 'text-primary scale-110' : 'opacity-0 md:opacity-100 text-gray-400 hover:text-primary md:group-hover:opacity-100'}`}>
                                     <Bookmark className={`w-[18px] h-[18px] transition-all duration-300 ${isBookmarked(note.id) ? 'fill-primary' : ''}`} strokeWidth={1.5} />
                                  </button>
                               </div>
                            </div>
                         </div>

                         {/* Thumbnail */}
                         {note.thumbnail ? (
                            <div className="w-full sm:w-[150px] md:w-[180px] h-[160px] sm:h-[120px] md:h-[135px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
                               <Link to={`/note/${note.id}`} className="block w-full h-full outline-none cursor-pointer">
                                 <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                               </Link>
                            </div>
                         ) : (
                            <div className="hidden sm:block sm:w-[150px] md:w-[180px] shrink-0 pointer-events-none"></div>
                         )}
                      </article>
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
                 <div className="w-full">
            {isLoadingActivities ? (
              <div className="py-20 text-center text-gray-500 font-['Manrope'] animate-pulse">Memuat jejak digitalmu...</div>
            ) : activities.length > 0 ? (
              <div className="flex flex-col gap-4 mt-2">
                {activities.map((activity: any) => (
                  <div 
                    key={activity.id} 
                    onClick={() => navigate(`/note/${activity.post_id}#comment-${activity.id}`)}
                    className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all text-left cursor-pointer hover:border-primary/40 group"
                  >
                    <div className="text-sm text-gray-500 mb-3 font-['Manrope']">
                      {activity.parent_comment_id ? (
                         <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold mr-2">Balasan</span>
                      ) : (
                         <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold mr-2">Komentar</span>
                      )}
                      di catatan: <span className="font-semibold text-primary group-hover:underline">{activity.post?.title || 'Catatan telah dihapus'}</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-700 text-[15px] font-['Manrope'] leading-relaxed">
                      "{activity.content}"
                    </div>
                    <div className="text-xs text-gray-400 mt-4 flex items-center gap-1.5 font-['Manrope']">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(activity.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[19px] mb-2">Belum Ada Riwayat</h3>
                <p className="font-['Manrope'] text-[15px] text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Ruang ini akan dipenuhi dengan jejak interaksi diskusi dan ulasanmu seiring waktu.
                </p>
              </div>
            )}
          </div>
               )}

            </div>
        </div>
      </div>
      
      <ApplyPakarModal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} />
    </MobileLayout>
  );
}