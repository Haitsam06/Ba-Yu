import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { NoteCard } from "../components/NoteCard";
import { NoteCardSkeleton } from "../components/ui/skeletons";
import { TagList } from "../components/ui/TagList";
import { DefaultThumbnail, AvatarImage } from "../components/ui/DefaultImages";
import {
    FileText,
    Eye,
    Heart,
    MessageCircle,
    Users,
    Shield,
    Clock,
    CheckCircle,
    ChevronRight,
    MapPin,
    ShieldCheck,
    Calendar,
    MoreHorizontal,
    X,
    UserPlus,
    UserCheck,
    UserMinus
} from "lucide-react";
import { Link, useSearchParams, useParams, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function PublicProfilePage() {
    const { id } = useParams(); // Mengambil ID dari URL
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab") as "catatan" | "aktivitas";

    const [activeTab, setActiveTab] = useState<"catatan" | "aktivitas">(tabParam || "catatan");
    
    // State untuk Modal Followers & Following
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const { user: currentUser } = useAuth();
    const { showToast } = useToast();

    const [profileUser, setProfileUser] = useState<any>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    // Sync state if URL changes
    useEffect(() => {
        if (tabParam && ["catatan", "aktivitas"].includes(tabParam)) {
            setActiveTab(tabParam);
            setTimeout(() => {
                const tabsEl = document.getElementById("profil-tabs");
                if (tabsEl) {
                    tabsEl.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 300);
        }
    }, [tabParam]);

    const handleTabChange = (tab: "catatan" | "aktivitas") => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    // 1. Fetch Data Profil User
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoadingProfile(true);
            try {
                const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                
                const res = await axios.get(`/api/v1/users/${id}`, { headers });
                setProfileUser(res.data.data || res.data);
                setIsFollowing(res.data.data?.is_followed || res.data?.is_followed || false);
            } catch (error) {
                console.error("Gagal mengambil data profil", error);
                showToast("Pengguna tidak ditemukan", "error");
                navigate(-1);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        if (id) {
            // Jika ID sama dengan current user, redirect ke halaman profil pribadi
            if (currentUser && (currentUser.id === id || currentUser._id === id)) {
                navigate("/profile");
            } else {
                fetchProfile();
            }
        }
    }, [id, currentUser, navigate]);

    // 2. Fetch Catatan User
    const [userNotes, setUserNotes] = useState<any[]>([]);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);

    useEffect(() => {
        const fetchApiNotes = async () => {
            setIsLoadingNotes(true);
            try {
                const response = await axios.get(`/api/v1/posts?user_id=${id}&sort=terbaru`);
                const mappedNotes = (response.data.data || response.data || []).map((note: any) => ({
                    ...note,
                    id: note._id || note.id,
                    title: note.title,
                    description: String(note.description || note.plain_content || "").replace(/&nbsp;/g, ' '),
                    createdAt: note.created_at
                        ? new Date(note.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                        : "",
                    thumbnail: note.thumbnail || null,
                    mataPelajaran: note.mapel || "Umum",
                    jenjang: note.jenjang || "-",
                    kelas: note.kelas || "-",
                    isValidated: note.is_verified,
                    likes: note.likes_count || 0,
                    is_liked: note.is_liked || false,
                    comments: note.comments_count || 0,
                    views: note.views || 0,
                    author: note.user
                        ? { ...note.user, avatar: note.user.avatar || null }
                        : { name: profileUser?.name || "Pengguna", avatar: profileUser?.avatar || null },
                }));
                setUserNotes(mappedNotes);
            } catch (error) {
                console.error("Gagal mengambil data catatan:", error);
            } finally {
                setIsLoadingNotes(false);
            }
        };

        if (id) fetchApiNotes();
    }, [id, profileUser]);

    // 3. Fetch Aktivitas User
    const [activities, setActivities] = useState<any[]>([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            setIsLoadingActivities(true);
            try {
                const res = await axios.get(`/api/v1/users/${id}/activities`);
                setActivities(res.data.data || res.data || []);
            } catch (error) {
                console.error("Gagal ngambil aktivitas", error);
            } finally {
                setIsLoadingActivities(false);
            }
        };
        if (id) fetchActivities();
    }, [id]);

    const handleLikePost = async (postId: string) => {
        if (!currentUser)
            return showToast("Silakan login terlebih dahulu untuk menyukai catatan.", "warning");

        setUserNotes((prev) =>
            prev.map((note) => {
                if ((note._id || note.id) === postId) {
                    const isCurrentlyLiked = note.is_liked || false;
                    return {
                        ...note,
                        likes_count: isCurrentlyLiked
                            ? Math.max(0, (note.likes_count || 0) - 1)
                            : (note.likes_count || 0) + 1,
                        is_liked: !isCurrentlyLiked,
                    };
                }
                return note;
            }),
        );

        try {
            const tk = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
            await axios.post(`/api/v1/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${tk}` },
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleFollowToggle = async () => {
        if (!currentUser) {
            showToast("Silakan login untuk mengikuti pengguna ini", "warning");
            navigate("/login");
            return;
        }
        
        const previousState = isFollowing;
        setIsFollowing(!previousState);
        setProfileUser((prev: any) => ({
            ...prev,
            followers_count: previousState 
                ? Math.max(0, (prev?.followers_count || 0) - 1) 
                : (prev?.followers_count || 0) + 1
        }));

        try {
            const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
            await axios.post(`/api/v1/users/${id}/follow`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            // Revert state on error
            setIsFollowing(previousState);
            setProfileUser((prev: any) => ({
                ...prev,
                followers_count: previousState 
                    ? (prev?.followers_count || 0) + 1 
                    : Math.max(0, (prev?.followers_count || 0) - 1)
            }));
            showToast("Gagal mengubah status ikuti", "error");
        }
    };

    if (isLoadingProfile) {
        return (
            <MobileLayout>
                <div className="flex h-screen items-center justify-center bg-white">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
            </MobileLayout>
        );
    }

    const jenjangSekolah = profileUser?.school && profileUser?.jenjang_pendidikan 
        ? `${profileUser.jenjang_pendidikan} di ${profileUser.school}` 
        : profileUser?.school 
            ? profileUser.school 
            : profileUser?.jenjang_pendidikan 
                ? `Pelajar ${profileUser.jenjang_pendidikan}` 
                : "Pelajar EduPlatform";

    return (
        <MobileLayout>
            <div className="pb-16 bg-white min-h-screen">
                {/* 1. Cover Banner (Twitter Aspect Ratio) */}
                <div className="w-full h-32 sm:h-48 bg-gradient-to-r from-[#E0E7FF] to-[#DBEAFE] relative overflow-hidden block">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04]"></div>
                </div>

                {/* 2. Main Profile Content Container */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative mb-6">
                    {/* Avatar & Top Actions (Twitter Layout) */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="relative -mt-12 sm:-mt-16">
                            <AvatarImage
                                src={profileUser?.avatar}
                                alt={profileUser?.name}
                                size={128}
                                className="relative border-4 border-white bg-white w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-sm"
                            />
                            {profileUser?.role !== "siswa" && (
                                <div
                                    className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow-sm ring-2 ring-white"
                                    title="Verified Professional"
                                >
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                            )}
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                            <button
                                onClick={handleFollowToggle}
                                className={`flex items-center gap-1.5 px-5 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold text-[13px] sm:text-[14px] transition-all ${
                                    isFollowing 
                                    ? "bg-white text-gray-900 border border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 group" 
                                    : "bg-gray-900 text-white border border-gray-900 hover:bg-black"
                                }`}
                            >
                                {isFollowing ? (
                                    <>
                                        <UserCheck className="w-4 h-4 group-hover:hidden" />
                                        <UserMinus className="w-4 h-4 hidden group-hover:block" />
                                        <span className="group-hover:hidden">Mengikuti</span>
                                        <span className="hidden group-hover:block">Batal Ikuti</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4" /> Ikuti
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Profile Info - Twitter Layout (Left Aligned, Clean) */}
                    <div className="mb-5">
                        <h1 className="text-[22px] sm:text-[24px] font-extrabold font-['Lexend_Deca'] text-gray-900 leading-tight">
                            {profileUser?.name || "Pengguna"}
                        </h1>

                        <div className="flex flex-col gap-1.5 mt-2.5 font-['Manrope'] text-[14px] text-gray-500">
                            {profileUser?.role === "pakar" ? (
                                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                    <ShieldCheck className="w-4 h-4" /> Pakar Tersertifikasi
                                </span>
                            ) : profileUser?.role === "admin" ? (
                                <span className="flex items-center gap-1.5 text-purple-600 font-medium">
                                    <Shield className="w-4 h-4" /> Administrator Sistem
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" /> {jenjangSekolah}
                                </span>
                            )}
                            
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Bergabung 2023
                            </span>
                        </div>

                        {/* Stats - Horizontal Twitter Style */}
                        <div className="flex items-center gap-5 mt-4 text-[14px] font-['Manrope']">
                            <button 
                                onClick={() => setShowFollowing(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 font-bold">{profileUser?.following_count || 0}</strong> Mengikuti
                            </button>
                            
                            <button 
                                onClick={() => setShowFollowers(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 font-bold">{profileUser?.followers_count || 0}</strong> Pengikut
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Sticky Tab Navigation - Ba-Yu Signature Style */}
                <div
                    id="profil-tabs"
                    className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 mb-4 pt-2"
                >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="flex gap-8 overflow-x-auto scrollbar-hide px-1">
                            {[
                                { id: "catatan", label: "Catatan Rilisan", count: userNotes.length },
                                { id: "aktivitas", label: "Aktivitas Diskusi", count: activities.length },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id as any)}
                                    className={`relative cursor-pointer pb-4 font-['Lexend_Deca'] font-bold text-[15px] whitespace-nowrap transition-colors flex items-center gap-2 ${
                                        activeTab === tab.id
                                            ? "text-gray-950"
                                            : "text-gray-500 hover:text-gray-950"
                                    }`}
                                >
                                    {tab.label}
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                                            activeTab === tab.id 
                                            ? "bg-primary/10 text-primary" 
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full transition-all duration-300"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Tab Panels - Ba-Yu Classic Card Styles */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 min-h-[400px]">
                    {activeTab === "catatan" && (
                        <div className="flex flex-col animate-in fade-in duration-500 w-full">
                            {isLoadingNotes ? (
                                <div className="space-y-6 pt-4">
                                    {[...Array(3)].map((_, i) => (
                                        <NoteCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : userNotes.length > 0 ? (
                                userNotes.map((note) => (
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                        onLike={handleLikePost}
                                    />
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[18px] mb-2">
                                        Belum Terdapat Rilisan
                                    </h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 mb-6 max-w-sm mx-auto">
                                        {profileUser?.name} belum mempublikasikan catatan apa pun.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "aktivitas" && (
                        <div className="w-full animate-in fade-in duration-500">
                            {isLoadingActivities ? (
                                <div className="flex flex-col gap-4 pt-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="p-5 border border-gray-100 rounded-3xl bg-white animate-pulse flex flex-col gap-4">
                                            <div className="flex gap-3">
                                                <div className="w-16 h-5 bg-gray-100 rounded-full"></div>
                                                <div className="w-32 h-5 bg-gray-100 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                                                    <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : activities.length > 0 ? (
                                <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full">
                                    {activities.map((activity: any) => (
                                        <article
                                            key={activity.id}
                                            onClick={() => navigate(`/note/${activity.post_id}#comment-${activity.id}`)}
                                            className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none cursor-pointer"
                                        >
                                            <div className="flex-1 min-w-0 flex flex-col w-full h-full text-left">
                                                <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-950 font-bold">
                                                     <div className="flex items-center gap-1.5">
                                                         <AvatarImage src={profileUser?.avatar} alt={profileUser?.name} size={20} className="ring-2 ring-transparent" />
                                                         <span className="font-black text-gray-950 tracking-tight">{profileUser?.name}</span>
                                                     </div>
                                                     <span className="text-gray-700 px-0.5">{activity.parent_comment_id ? "membalas komentar di" : "berkomentar di"}</span>
                                                     <span className="font-black text-gray-950 tracking-tight line-clamp-1">{activity.post?.title || "Catatan"}</span>
                                                </div>

                                                <div className="block mb-3 font-['Lexend_Deca']">
                                                    <h2 className="text-[17px] md:text-[19px] font-extrabold text-gray-950 leading-[1.5] tracking-tight group-hover:text-primary transition-colors line-clamp-3 italic">
                                                        "{activity.content}"
                                                    </h2>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1.5 text-gray-600">
                                                            <Clock className="w-[14px] h-[14px] text-gray-500" strokeWidth={2} />
                                                            <span className="text-[13px] font-['Manrope'] font-semibold">
                                                                {new Date(activity.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 ml-2">
                                                            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                                                                <Heart className="w-[14px] h-[14px]" />
                                                                <span className="text-[12px] font-bold">{activity.likes_count || 0}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100/50">
                                                {activity.post?.thumbnail ? (
                                                    <img src={activity.post.thumbnail} alt={activity.post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <DefaultThumbnail className="w-full h-full transform group-hover:scale-110 transition-transform duration-500" />
                                                )}
                                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-['Lexend_Deca'] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5">
                                                    <MessageCircle className="w-3 h-3" /> DISKUSI
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[18px] mb-2">Belum Ada Riwayat</h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 max-w-sm mx-auto">{profileUser?.name} belum memiliki interaksi diskusi.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Followers Clean */}
            {showFollowers && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowFollowers(false)}>
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[16px]">Pengikut {profileUser?.name}</h3>
                            <button onClick={() => setShowFollowers(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Users className="w-10 h-10 text-gray-200 mb-3" />
                                <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-[15px] mb-1">Belum ada pengikut</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Following Clean */}
            {showFollowing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowFollowing(false)}>
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[16px]">{profileUser?.name} Mengikuti</h3>
                            <button onClick={() => setShowFollowing(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Users className="w-10 h-10 text-gray-200 mb-3" />
                                <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-[15px] mb-1">Masih Kosong</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </MobileLayout>
    );
}