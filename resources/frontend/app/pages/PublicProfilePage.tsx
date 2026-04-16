import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { NoteCardSkeleton } from '../components/ui/skeletons';
import { FileText, Heart, MessageCircle, Clock, CheckCircle, Calendar, Star, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams, useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';
import { AuthModal } from '../components/auth-modal';

export default function PublicProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'catatan' | 'aktivitas';
  
  const [activeTab, setActiveTab] = useState<'catatan' | 'aktivitas'>(tabParam || 'catatan');
  const { isAuthenticated, user: loggedInUser } = useAuth();
  const { showToast } = useToast();

  const [targetUser, setTargetUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    if (tabParam && ['catatan', 'aktivitas'].includes(tabParam)) {
      setActiveTab(tabParam);
      setTimeout(() => {
        const tabsEl = document.getElementById('profil-tabs');
        if (tabsEl) {
          tabsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'catatan' | 'aktivitas') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    // If the id matches the logged-in user, we can optionally redirect to /profile
    if (isAuthenticated && loggedInUser && (loggedInUser.id === id || loggedInUser._id === id)) {
      navigate('/profile', { replace: true });
    }
  }, [id, isAuthenticated, loggedInUser, navigate]);

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const authHeader = isAuthenticated ? { Authorization: `Bearer ${localStorage.getItem('bayu-token')}` } : {};
      const res = await axios.get(`/api/v1/users/${id}`, { headers: authHeader });
      setTargetUser(res.data.data);
    } catch (e: any) {
      if (e.response?.status === 404) {
        showToast('Pengguna tidak ditemukan!', 'error');
        navigate('/explore');
      }
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchUserNotes = async () => {
    setIsLoadingNotes(true);
    try {
      const response = await axios.get(`/api/v1/posts?user_id=${id}`);
      setNotes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const fetchActivities = async () => {
    setIsLoadingActivities(true);
    try {
      const res = await axios.get(`/api/v1/users/${id}/activities`);
      setActivities(res.data.data);
    } catch (error) {
      console.error("Gagal ngambil aktivitas", error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
      fetchUserNotes();
      fetchActivities();
    }
  }, [id, isAuthenticated]);

  const handleLikePost = async (postId: string) => {
    if (!isAuthenticated) return setShowAuthModal(true);
    
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

  const handleFollowToggle = async () => {
    if (!isAuthenticated) return setShowAuthModal(true);
    if (!targetUser) return;

    if (targetUser.is_followed_by_me) {
      if (!window.confirm(`Yakin ingin berhenti mengikuti ${targetUser.name}?`)) {
        return;
      }
    }

    try {
      const token = localStorage.getItem('bayu-token');
      const response = await axios.post(`/api/users/${targetUser._id || targetUser.id}/follow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.status === 'followed') {
        setTargetUser((prev: any) => ({ ...prev, is_followed_by_me: true, followers_count: (prev.followers_count || 0) + 1 }));
        showToast('Berhasil mengikuti penulis!', 'success');
      } else {
        setTargetUser((prev: any) => ({ ...prev, is_followed_by_me: false, followers_count: Math.max(0, (prev.followers_count || 0) - 1) }));
        showToast('Berhenti mengikuti penulis.', 'info');
      }
    } catch (error: any) {
      console.error("Gagal toggle follow:", error);
      showToast(error.response?.data?.message || 'Gagal memproses permintaan.', 'error');
    }
  };

  if (isLoadingUser) {
    const SkeletonUI = () => (
      <div className="min-h-screen bg-white">
        {!isAuthenticated && <Navbar variant="default" />}
        <div className="w-full h-48 sm:h-64 bg-gray-100 animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-5 lg:px-0 relative mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6 relative z-10">
             <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 animate-pulse border-4 border-white"></div>
          </div>
          <div className="w-48 h-8 bg-gray-200 mt-4 rounded-md animate-pulse"></div>
          <div className="w-64 h-4 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
    return isAuthenticated ? <MobileLayout><SkeletonUI /></MobileLayout> : <SkeletonUI />;
  }

  if (!targetUser) return null;

  const userNotes = notes.map(note => ({
    ...note,
    id: note._id || note.id,
    title: note.title,
    createdAt: note.created_at ? new Date(note.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
    thumbnail: note.thumbnail || null,
    mataPelajaran: note.mapel || 'Umum',
    jenjang: note.jenjang || '-',
    kelas: note.kelas || '-',
    likes: note.likes_count || 0,
    is_liked: note.is_liked || false,
    comments: note.comments_count || 0,
    author: note.user ? { ...note.user, avatar: note.user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' } : { name: targetUser.name, avatar: targetUser.avatar }
  }));

  const mainContent = (
    <div className={`pb-16 bg-white min-h-screen ${!isAuthenticated ? 'pt-16 sm:pt-20' : ''}`}>
        
        {/* Full-Width Cover Banner */}
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-[#E0E7FF] via-[#DBEAFE] to-[#F3E8FF] relative overflow-hidden flex items-center justify-center">
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-colors flex items-center justify-center group z-20">
               <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-indigo-200/40 rounded-full blur-2xl translate-y-1/2"></div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto px-5 lg:px-0 relative mb-10">
            
            {/* Avatar & Top Actions */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6 relative z-10">
                <div className="relative">
                    <img 
                      src={targetUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'} 
                      alt={targetUser.name} 
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white object-cover bg-white shadow-sm"
                    />
                    {targetUser.role !== 'siswa' && (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-sm border-2 border-white ring-2 ring-transparent transition hover:ring-green-100" title="Verified Professional">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>
                
                <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0 justify-center sm:justify-start">
                    <button
                        onClick={handleFollowToggle}
                        className={`w-full sm:w-auto px-8 py-2.5 rounded-full text-[14px] font-['Manrope'] font-bold transition-all shadow-sm ${
                            targetUser.is_followed_by_me 
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-gray-900 text-white hover:bg-black'       
                        }`}
                    >
                        {targetUser.is_followed_by_me ? 'Mengikuti' : 'Ikuti Penulis'}
                    </button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left mb-8">
                <h1 className="text-2xl sm:text-[32px] font-['Lexend_Deca'] font-extrabold text-gray-900 mb-1 leading-tight tracking-tight">
                    {targetUser.name}
                </h1>
                
                <p className="font-['Manrope'] text-[15px] text-gray-500 font-medium mb-5">
                    {targetUser.role === 'pakar' 
                      ? 'Pakar Pendidikan Tersertifikasi' 
                      : targetUser.role === 'admin' 
                        ? 'Administrator Sistem' 
                        : `Pelajar ${targetUser.jenjang_pendidikan || ''} ${targetUser.school ? `di ${targetUser.school}` : ''}`}
                </p>
                
                {/* Horizontal Minimalist Stats */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 text-[15px] font-['Manrope'] mb-6 text-gray-600">
                   <span className="flex items-center gap-1.5">
                       <strong className="text-gray-900 font-bold">{targetUser.followers_count || 0}</strong> Pengikut
                   </span>
                   <span className="flex items-center gap-1.5">
                       <strong className="text-gray-900 font-bold">{targetUser.following_count || 0}</strong> Mengikuti
                   </span>
                   <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                   <span className="flex items-center gap-1.5 text-gray-500">
                       <Calendar className="w-4 h-4" /> Bergabung {new Date(targetUser.created_at || Date.now()).getFullYear()}
                   </span>
                </div>

                {targetUser.bio && (
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 max-w-2xl mx-auto sm:mx-0 shadow-sm">
                     <p className="font-['Manrope'] text-[15px] text-gray-800 leading-relaxed italic whitespace-pre-wrap">
                       "{targetUser.bio}"
                     </p>
                  </div>
                )}
            </div>

            {/* Sticky Tab Navigation */}
            <div id="profil-tabs" className={`sticky bg-white/95 backdrop-blur-md z-20 border-b border-gray-100 mb-8 pt-2 ${isAuthenticated ? 'top-[60px]' : 'top-[60px] sm:top-[70px]'}`}>
               <div className="flex gap-8 overflow-x-auto scrollbar-hide px-1">
                  {[
                    { id: 'catatan', label: 'Catatan Rilisan', count: userNotes.length },
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

            {/* Tab Panels */}
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
                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                               <div className="flex items-center gap-1.5">
                                 <img src={note.author.avatar} alt={note.author.name} className="w-[20px] h-[20px] rounded-full object-cover ring-2 ring-transparent" />
                                 <span className="font-medium text-gray-900 tracking-tight">{note.author.name}</span>
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
                            <Link to={`/note/${note.id}`} className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer">
                              <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                {note.title}
                              </h2>
                            </Link>

                            <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-6 pr-2">
                                {note.description}
                            </p>

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
                       <p className="font-['Manrope'] text-[15px] text-gray-500 max-w-sm mx-auto leading-relaxed">
                         Pengguna ini belum mempublikasikan catatan apa pun untuk dibagikan.
                       </p>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'aktivitas' && (
                 <div className="w-full">
                    {isLoadingActivities ? (
                      <div className="py-20 text-center text-gray-500 font-['Manrope'] animate-pulse">Memuat jejak aktivitas...</div>
                    ) : activities.length > 0 ? (
                      <div className="flex flex-col gap-4 mt-2">
                        {activities.map((activity: any) => (
                          <div 
                            key={activity.id} 
                            onClick={() => navigate(`/note/${activity.post_id}#comment-${activity.id}`)}
                            className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all text-left cursor-pointer hover:border-primary/40 group relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                            
                            <div className="text-sm text-gray-500 mb-3 font-['Manrope'] flex items-center gap-2">
                              {activity.parent_comment_id ? (
                                <span className="flex items-center gap-1.5 text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-xs"><MessageCircle className="w-3.5 h-3.5"/> Membalas</span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-gray-600 font-bold bg-gray-100 px-2 py-0.5 rounded text-xs"><MessageCircle className="w-3.5 h-3.5"/> Berkomentar</span>
                              )}
                              <span>di:</span> <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{activity.post?.title || 'Catatan telah dihapus'}</span>
                            </div>
                            
                            <div className="flex gap-4">
                               <img src={targetUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-100 shrink-0" />
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-['Manrope'] font-bold text-[15px]">{targetUser.name}</span>
                                    <span className="text-gray-400 text-xs font-medium">• {new Date(activity.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric'})}</span>
                                  </div>
                                  <p className="text-gray-800 text-[15px] font-['Manrope'] leading-relaxed whitespace-pre-wrap">
                                    {activity.content}
                                  </p>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                          <MessageCircle className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[19px] mb-2">Belum Ada Aktivitas</h3>
                        <p className="font-['Manrope'] text-[15px] text-gray-500 max-w-sm mx-auto leading-relaxed">
                          Pengguna ini belum pernah memberikan komentar di platform Ba-Yu.
                        </p>
                      </div>
                    )}
                 </div>
               )}
            </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab='login' />
    </div>
  );

  return isAuthenticated ? (
    <MobileLayout>
      {mainContent}
    </MobileLayout>
  ) : (
    <>
      <Navbar variant="default" />
      {mainContent}
      <Footer />
    </>
  );
}
