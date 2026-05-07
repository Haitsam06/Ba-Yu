import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { NoteCardSkeleton } from "../components/ui/skeletons";
import { TagList } from "../components/ui/TagList";
import { DefaultThumbnail, AvatarImage } from "../components/ui/DefaultImages";
import {
    Settings,
    Edit,
    FileText,
    Bookmark,
    Eye,
    Heart,
    MessageCircle,
    Users,
    Shield,
    BarChart3,
    Clock,
    CheckCircle,
    ChevronRight,
    Sparkles,
    MapPin,
    ShieldCheck,
    MoreHorizontal,
    Trash2,
    Pencil,
    X,
    Calendar,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useBookmarks } from "../contexts/BookmarkContext";
import { ApplyPakarModal } from "../components/ApplyPakarModal";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab") as
        | "catatan"
        | "bookmarks"
        | "aktivitas"
        | "draf";

    const [activeTab, setActiveTab] = useState<
        "catatan" | "bookmarks" | "aktivitas" | "draf"
    >(tabParam || "catatan");
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    
    // State untuk Modal Followers & Following
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const { user } = useAuth();
    const { bookmarkedIds, isBookmarked, toggleBookmark } = useBookmarks();
    const { showToast } = useToast();

    // Sync state if URL changes
    useEffect(() => {
        if (
            tabParam &&
            ["catatan", "bookmarks", "aktivitas", "draf"].includes(tabParam)
        ) {
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

    const handleTabChange = (tab: "catatan" | "bookmarks" | "aktivitas" | "draf") => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const [activities, setActivities] = useState<any[]>([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);

    const fetchActivities = async () => {
        setIsLoadingActivities(true);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/profile/activities", {
                headers: { Authorization: `Bearer ${token}` },
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
        fetchDrafts();
    }, []);

    const [drafts, setDrafts] = useState<any[]>([]);
    const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);

    const fetchDrafts = async () => {
        setIsLoadingDrafts(true);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/drafts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDrafts(res.data.data);
        } catch (error) {
            console.error("Gagal ngambil draf", error);
        } finally {
            setIsLoadingDrafts(false);
        }
    };

    const [notes, setNotes] = useState<any[]>([]);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);

    const handleLikePost = async (postId: string) => {
        if (!user)
            return showToast(
                "Silakan login terlebih dahulu untuk menyukai catatan.",
                "warning",
            );

        setNotes((prev) =>
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
            const tk =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            await axios.post(
                `/api/v1/posts/${postId}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${tk}` },
                },
            );
        } catch (e) {
            console.error(e);
        }
    };

    const currentUser = {
        id: user?.id || user?._id || "",
        name: user?.name || "Pengguna",
        avatar: user?.avatar || null,
        role: user?.role || "siswa",
        jenjang: user?.jenjang_pendidikan || "",
        school: user?.school || "",
        followers: user?.followers_count || 0,
        following: user?.following_count || 0,
    };

    const [fetchedNotes, setFetchedNotes] = useState<any[]>([]);

    useEffect(() => {
        const fetchApiNotes = async () => {
            try {
                const response = await axios.get(`/api/v1/posts?user_id=${currentUser.id}&sort=terbaru`);
                setFetchedNotes(response.data.data || response.data || []);
            } catch (error) {
                console.error("Gagal nyedot data:", error);
            } finally {
                setIsLoadingNotes(false);
            }
        };

        if (currentUser?.id) {
            fetchApiNotes();
        }
    }, [currentUser?.id]);

    const userNotes = fetchedNotes.map((note) => ({
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
            ? {
                  ...note.user,
                  avatar: note.user.avatar || null,
              }
            : {
                  name: "Anonim",
                  avatar: null,
              },
    }));

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
                const response = await axios.get("/api/v1/posts");
                const allPosts = response.data.data || [];
                const filtered = allPosts.filter((p: any) =>
                    bookmarkedIds.has(p._id || p.id),
                );
                setBookmarkedNotes(
                    filtered.map((n: any) => ({
                        ...n,
                        id: n._id || n.id,
                        title: n.title,
                        thumbnail: n.thumbnail || null,
                        mataPelajaran: n.mapel || "Umum",
                        likes: n.likes_count || 0,
                        comments: n.comments_count || 0,
                        author: n.user
                            ? {
                                  ...n.user,
                                  avatar: n.user.avatar || null,
                              }
                            : {
                                  name: "Anonim",
                                  avatar: null,
                              },
                    })),
                );
            } catch (err) {
                console.error("Error fetching bookmarked posts:", err);
            } finally {
                setIsLoadingBookmarks(false);
            }
        };
        fetchBookmarkedPosts();
    }, [bookmarkedIds]);

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
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                size={128}
                                className="relative border-4 border-white bg-white w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-sm"
                            />
                            {currentUser.role !== "siswa" && (
                                <div
                                    className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow-sm ring-2 ring-white"
                                    title="Verified Professional"
                                >
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                            )}
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                            <Link
                                to="/settings"
                                className="p-1.5 sm:p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                title="Pengaturan Akun"
                            >
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link
                                to="/edit-profile"
                                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-gray-300 text-gray-900 font-bold text-[13px] sm:text-[14px] hover:bg-gray-50 transition-colors"
                            >
                                Edit profil
                            </Link>
                        </div>
                    </div>

                    {/* Profile Info - Twitter Layout (Left Aligned, Clean) */}
                    <div className="mb-5">
                        <h1 className="text-[22px] sm:text-[24px] font-extrabold font-['Lexend_Deca'] text-gray-900 leading-tight">
                            {currentUser.name}
                        </h1>

                        <div className="flex flex-col gap-1.5 mt-2.5 font-['Manrope'] text-[14px] text-gray-500">
                            {currentUser.role === "pakar" ? (
                                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                    <ShieldCheck className="w-4 h-4" /> Pakar Tersertifikasi
                                </span>
                            ) : currentUser.role === "admin" ? (
                                <span className="flex items-center gap-1.5 text-purple-600 font-medium">
                                    <Shield className="w-4 h-4" /> Administrator Sistem
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" /> 
                                    {currentUser.school && currentUser.jenjang 
                                        ? `${currentUser.jenjang} di ${currentUser.school}` 
                                        : currentUser.school 
                                            ? currentUser.school 
                                            : currentUser.jenjang 
                                                ? `Pelajar ${currentUser.jenjang}` 
                                                : "Pelajar EduPlatform"}
                                </span>
                            )}
                            
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Bergabung Oktober 2023
                            </span>
                        </div>

                        {/* Stats - Horizontal Twitter Style */}
                        <div className="flex items-center gap-5 mt-4 text-[14px] font-['Manrope']">
                            <button 
                                onClick={() => setShowFollowing(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 font-bold">{currentUser.following}</strong> Mengikuti
                            </button>
                            
                            <button 
                                onClick={() => setShowFollowers(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 font-bold">{currentUser.followers}</strong> Pengikut
                            </button>
                        </div>
                    </div>

                    {/* Banners (Kept for functionality but subtly styled) */}
                    {user?.role !== "pakar" && user?.role !== "admin" && (
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                <div className="text-left">
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[14px]">
                                        Daftar Pakar
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setApplyModalOpen(true)}
                                className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold text-[13px] px-5 py-2 rounded-full transition-all"
                            >
                                Daftar
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. Sticky Tab Navigation - Ba-Yu Signature Style */}
                <div
                    id="profil-tabs"
                    className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 mb-4 pt-2"
                >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="flex gap-8 overflow-x-auto scrollbar-hide px-1">
                            {[
                                { id: "catatan", label: "Catatan", count: userNotes.length },
                                { id: "draf", label: "Draf", count: drafts.length },
                                { id: "bookmarks", label: "Tersimpan", count: bookmarkedNotes.length },
                                { id: "aktivitas", label: "Aktivitas", count: activities.length },
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
                                    <article
                                        key={note.id}
                                        className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none"
                                    >
                                        <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                            {/* Author Header */}
                                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-800 font-bold">
                                                <div className="flex items-center gap-1.5">
                                                    <AvatarImage
                                                        src={user?.avatar}
                                                        alt={user?.name}
                                                        size={20}
                                                        className="ring-2 ring-transparent"
                                                    />
                                                    <span className="font-bold text-gray-900 tracking-tight">
                                                        {user?.name}
                                                    </span>
                                                </div>
                                                <span className="text-gray-500 px-0.5">di</span>
                                                <span className="font-extrabold text-gray-900 tracking-tight">
                                                    {note.mataPelajaran}
                                                </span>
                                                {note.jenjang && note.jenjang !== "Umum" && (
                                                    <>
                                                        <span className="text-[10px] text-gray-500 mx-0.5">•</span>
                                                        <span className="text-gray-700 tracking-tight font-extrabold">
                                                            {note.jenjang === "Kuliah"
                                                                ? `${note.kelas || "S1/D4"} Semester ${note.semester || 1}`
                                                                : (note.kelas && note.kelas !== "Semua" ? `${note.jenjang} Kelas ${note.kelas}` : note.jenjang)}
                                                        </span>
                                                    </>
                                                )}
                                                {note.is_verified && (
                                                    <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md ml-1">
                                                        <ShieldCheck className="w-3.5 h-3.5" />
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <Link
                                                to={`/note/${note.id}`}
                                                className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer"
                                            >
                                                <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                                    {note.title}
                                                </h2>
                                            </Link>

                                            {/* Excerpt */}
                                            <p className="text-[15px] font-['Manrope'] text-gray-700 line-clamp-2 leading-relaxed mb-4 pr-2 font-medium">
                                                {note.description}
                                            </p>

                                            {/* Tags */}
                                            <TagList tags={note.tags} />

                                            {/* Meta Footer */}
                                            <div className={`flex items-center justify-between ${!(note.tags && note.tags.length > 0) ? 'mt-auto' : ''}`}>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock className="w-[14px] h-[14px] text-gray-600" strokeWidth={2.5} />
                                                    <span className="text-[13px] font-['Manrope'] font-medium">
                                                        {note.createdAt}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                                    <div className="flex items-center gap-1.5 text-gray-700 font-bold" title={`${note.views} kali dilihat`}>
                                                        <Eye className="w-[15px] h-[15px] text-gray-600" strokeWidth={2.5} />
                                                        <span className="text-[13px] font-['Manrope']">{note.views}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleLikePost(note.id);
                                                        }}
                                                        className={`flex items-center gap-1.5 transition-colors focus:outline-none font-bold ${note.is_liked ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}
                                                        title={`${note.likes} suka`}
                                                    >
                                                        <Heart className={`w-[15px] h-[15px] ${note.is_liked ? "fill-red-600" : "text-gray-600"}`} strokeWidth={2.5} />
                                                        <span className="text-[13px] font-['Manrope']">{note.likes}</span>
                                                    </button>
                                                    <Link
                                                        to={`/note/${note.id}#comments-section`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-1.5 text-gray-700 hover:text-gray-950 transition-colors focus:outline-none font-bold"
                                                        title={`${note.comments} komentar`}
                                                    >
                                                        <MessageCircle className="w-[15px] h-[15px] text-gray-600" strokeWidth={2.5} />
                                                        <span className="text-[13px] font-['Manrope']">{note.comments}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Thumbnail */}
                                        {note.thumbnail ? (
                                            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
                                                <Link to={`/note/${note.id}`} className="block w-full h-full outline-none cursor-pointer">
                                                    <img
                                                        src={note.thumbnail}
                                                        alt={note.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-['Lexend_Deca'] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {note.read_time || 1}m
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden shadow-sm relative">
                                                <Link to={`/note/${note.id}`} className="block w-full h-full outline-none cursor-pointer">
                                                    <DefaultThumbnail className="w-full h-full rounded-2xl" />
                                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-['Lexend_Deca'] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {note.read_time || 1}m
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </article>
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
                                        Bagikan pengetahuanmu dan bantu pelajar lainnya.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "bookmarks" && (
                        <div className="flex flex-col animate-in fade-in duration-500 w-full">
                            {isLoadingBookmarks ? (
                                <div className="space-y-6 pt-4">
                                    {[...Array(3)].map((_, i) => (
                                        <NoteCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : bookmarkedNotes.length > 0 ? (
                                bookmarkedNotes.map((note) => (
                                    <article
                                        key={note.id}
                                        className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none"
                                    >
                                        <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                            {/* Author Header */}
                                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                                                <div className="flex items-center gap-1.5 outline-none">
                                                    <AvatarImage
                                                        src={note.author?.avatar}
                                                        alt={note.author?.name}
                                                        size={20}
                                                        className="ring-2 ring-transparent"
                                                    />
                                                    <span className="font-medium text-gray-900 tracking-tight">
                                                        {note.author?.name}
                                                    </span>
                                                </div>
                                                <span className="text-gray-700 px-0.5 font-bold">di</span>
                                                <span className="font-semibold text-gray-800 tracking-tight">
                                                    {note.mataPelajaran}
                                                </span>
                                                {note.jenjang && note.jenjang !== "Umum" && (
                                                    <>
                                                        <span className="text-[10px] text-gray-700 mx-0.5 font-black">•</span>
                                                        <span className="text-gray-500 tracking-tight">
                                                            {note.jenjang === "Kuliah"
                                                                ? `${note.kelas || "S1/D4"} Semester ${note.semester || 1}`
                                                                : (note.kelas && note.kelas !== "Semua" ? `${note.jenjang} Kelas ${note.kelas}` : note.jenjang)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <Link
                                                to={`/note/${note.id}`}
                                                className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer"
                                            >
                                                <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                                    {note.title}
                                                </h2>
                                            </Link>

                                            <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-4 pr-2">
                                                {note.description || "Tidak ada deskripsi tersedia."}
                                            </p>

                                            <TagList tags={note.tags} />

                                            {/* Meta Footer */}
                                            <div className={`flex items-center justify-between ${!(note.tags && note.tags.length > 0) ? 'mt-auto' : ''}`}>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock className="w-[14px] h-[14px] text-gray-600" strokeWidth={2.5} />
                                                    <span className="text-[13px] font-['Manrope'] font-medium">
                                                        {note.createdAt || "-"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleLikePost(note.id);
                                                        }}
                                                        className={`flex items-center gap-1.5 transition-colors focus:outline-none ${note.is_liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                                                    >
                                                        <Heart className={`w-[15px] h-[15px] ${note.is_liked ? "fill-red-500" : ""}`} strokeWidth={2} />
                                                        <span className="text-[13px] font-['Manrope'] font-medium">{note.likes || 0}</span>
                                                    </button>
                                                    <button
                                                        aria-label="Save"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleBookmark(note.id);
                                                        }}
                                                        className={`p-1.5 rounded-full transition-all duration-300 outline-none active:scale-75 ml-1 ${isBookmarked(note.id) ? "text-primary scale-110" : "opacity-0 md:opacity-100 text-gray-600 hover:text-primary md:group-hover:opacity-100"}`}
                                                    >
                                                        <Bookmark className={`w-[18px] h-[18px] transition-all duration-300 ${isBookmarked(note.id) ? "fill-primary" : ""}`} strokeWidth={1.5} />
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
                                            <div className="w-full sm:w-[150px] md:w-[180px] h-[160px] sm:h-[120px] md:h-[135px] shrink-0 rounded-2xl overflow-hidden shadow-sm">
                                                <Link to={`/note/${note.id}`} className="block w-full h-full outline-none cursor-pointer">
                                                    <DefaultThumbnail className="w-full h-full rounded-2xl" />
                                                </Link>
                                            </div>
                                        )}
                                    </article>
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <Bookmark className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[18px] mb-2">Simpanan Kosong</h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 mb-6">Catatan yang kamu simpan akan muncul di sini.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "draf" && (
                        <div className="flex flex-col animate-in fade-in duration-500 w-full">
                            {isLoadingDrafts ? (
                                <div className="space-y-6 pt-4">
                                    {[...Array(2)].map((_, i) => (
                                        <NoteCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : drafts.length > 0 ? (
                                drafts.map((draft: any) => (
                                    <article
                                        key={draft.id || draft._id}
                                        onClick={() => navigate(`/upload?id=${draft._id || draft.id}`)}
                                        className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none cursor-pointer"
                                    >
                                        <div className="flex-1 min-w-0 flex flex-col w-full h-full text-left">
                                            <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                                                <div className="flex items-center gap-1.5">
                                                    <AvatarImage src={user?.avatar} alt={user?.name} size={20} className="ring-2 ring-transparent" />
                                                    <span className="font-medium text-gray-900 tracking-tight">{user?.name}</span>
                                                </div>
                                                <span className="text-gray-400 px-0.5">di</span>
                                                <span className="font-semibold text-gray-800 tracking-tight">{draft.mapel || "Umum"}</span>
                                                {draft.jenjang && (
                                                    <>
                                                        <span className="text-[10px] text-gray-400 mx-0.5">•</span>
                                                        <span className="text-gray-500 tracking-tight">
                                                            {draft.jenjang === "Kuliah"
                                                                ? `${draft.kelas || "S1/D4"} Semester ${draft.semester || 1}`
                                                                : (draft.kelas ? `${draft.jenjang} Kelas ${draft.kelas}` : draft.jenjang)}
                                                        </span>
                                                    </>
                                                )}
                                                <span className="ml-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold uppercase tracking-wider">
                                                    Draft
                                                </span>
                                            </div>

                                            <div className="block mb-2 font-['Lexend_Deca']">
                                                <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                                    {draft.title || "Draft Tanpa Judul"}
                                                </h2>
                                            </div>

                                            <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-4 pr-2">
                                                {String(draft.plain_content || draft.description || "Belum ada konten...").replace(/&nbsp;/g, ' ')}
                                            </p>

                                            <TagList tags={draft.tags || []} />

                                            <div className={`flex items-center justify-between mt-auto`}>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock className="w-[14px] h-[14px] text-gray-400" strokeWidth={2} />
                                                    <span className="text-[12px] font-['Manrope'] font-medium">
                                                        Edit terakhir: {new Date(draft.updated_at || draft.created_at).toLocaleDateString("id-ID", { month: 'short', day: 'numeric', year: 'numeric'})}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100/50">
                                            {draft.thumbnail ? (
                                                <img src={draft.thumbnail} alt={draft.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <DefaultThumbnail className="w-full h-full transform group-hover:scale-110 transition-transform duration-500" />
                                            )}
                                            <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm text-white text-[10px] font-['Lexend_Deca'] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5">
                                                <FileText className="w-3 h-3" /> DRAF
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[18px] mb-2">Belum Ada Draf</h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 mb-6">Semua catatan yang kamu simpan sebagai draf akan muncul di sini.</p>
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
                                                         <AvatarImage src={user?.avatar} alt={user?.name} size={20} className="ring-2 ring-transparent" />
                                                         <span className="font-black text-gray-950 tracking-tight">{user?.name}</span>
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

                                                    <div className="flex items-center gap-2">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-900 transition-all active:scale-95">
                                                                    <MoreHorizontal className="w-5 h-5" />
                                                                </button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-36 font-['Manrope']">
                                                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    showToast("Fitur hapus komentar segera hadir", "info");
                                                                }}>
                                                                    <Trash2 className="w-4 h-4 mr-2" /> Hapus
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
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
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 max-w-sm mx-auto">Ruang ini akan dipenuhi dengan jejak diskusi dan ulasanmu.</p>
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
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[16px]">Pengikut</h3>
                            <button onClick={() => setShowFollowers(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Users className="w-10 h-10 text-gray-200 mb-3" />
                                <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-[15px] mb-1">Belum ada pengikut</h4>
                                <p className="font-['Manrope'] text-[14px] text-gray-500">Terus berkarya dan bagikan catatanmu!</p>
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
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-[16px]">Mengikuti</h3>
                            <button onClick={() => setShowFollowing(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Users className="w-10 h-10 text-gray-200 mb-3" />
                                <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-[15px] mb-1">Masih Kosong</h4>
                                <p className="font-['Manrope'] text-[14px] text-gray-500 mb-5">Temukan kreator favoritmu di halaman Jelajah.</p>
                                <button onClick={() => {setShowFollowing(false); navigate("/explore")}} className="px-5 py-2 bg-gray-900 text-white rounded-full font-medium text-[13px] hover:bg-black transition-colors">
                                    Cari Kreator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ApplyPakarModal
                isOpen={applyModalOpen}
                onClose={() => setApplyModalOpen(false)}
            />
        </MobileLayout>
    );
}