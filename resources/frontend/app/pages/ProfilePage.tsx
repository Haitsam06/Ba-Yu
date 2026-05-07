import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { NoteCard } from "../components/NoteCard";
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
    Loader2,
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

    const [followersList, setFollowersList] = useState<any[]>([]);
    const [followingList, setFollowingList] = useState<any[]>([]);
    const [isLoadingFollows, setIsLoadingFollows] = useState(false);

    const { user } = useAuth();

    const fetchFollowsData = async () => {
        if (!user?._id && !user?.id) return;
        const userId = user._id || user.id;
        setIsLoadingFollows(true);
        try {
            const [followersRes, followingRes] = await Promise.all([
                axios.get(`/api/v1/users/${userId}/followers`),
                axios.get(`/api/v1/users/${userId}/following`)
            ]);
            setFollowersList(followersRes.data);
            setFollowingList(followingRes.data);
        } catch (error) {
            console.error("Gagal mengambil data followers/following", error);
        } finally {
            setIsLoadingFollows(false);
        }
    };

    useEffect(() => {
        if (showFollowers || showFollowing) {
            fetchFollowsData();
        }
    }, [showFollowers, showFollowing]);
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
        created_at: user?.created_at || null,
        bio: user?.bio || "",
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
            <div className="pb-16 bg-white dark:bg-[#13111C] min-h-screen">
                {/* 1. Cover Banner (Twitter Aspect Ratio) */}
                <div className="w-full h-32 sm:h-48 bg-gradient-to-r from-[#E0E7FF] to-[#DBEAFE] dark:from-[#1C1A29] dark:to-[#222033] relative overflow-hidden block border-b border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] dark:opacity-[0.02]"></div>
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
                                className="relative border-4 border-white dark:border-[#13111C] bg-white dark:bg-[#1C1A29] w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-sm"
                            />
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                            <Link
                                to="/settings"
                                className="p-1.5 sm:p-2 rounded-full border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                title="Pengaturan Akun"
                            >
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link
                                to="/edit-profile"
                                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100 font-bold text-[13px] sm:text-[14px] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                Edit profil
                            </Link>
                        </div>
                    </div>

                    {/* Profile Info - Twitter Layout (Left Aligned, Clean) */}
                    <div className="mb-5">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-[22px] sm:text-[24px] font-extrabold font-['Lexend_Deca'] text-gray-900 dark:text-gray-100 leading-tight">
                                {currentUser.name}
                            </h1>
                            {currentUser.role === "pakar" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[12px] border border-emerald-100 dark:border-emerald-500/20">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Pakar
                                </span>
                            )}
                            {currentUser.role === "admin" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[12px] border border-purple-100 dark:border-purple-500/20">
                                    <Shield className="w-3.5 h-3.5" /> Admin
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 mt-2 font-['Manrope'] text-[14px] text-gray-500 dark:text-gray-400">
                            {currentUser.role !== "pakar" && currentUser.role !== "admin" && (
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
                            
                            <span className="flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-4 h-4" /> Bergabung {currentUser.created_at ? new Date(currentUser.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" }) : "Baru saja"}
                            </span>
                        </div>

                        {currentUser.bio && (
                            <p className="mt-3.5 text-[14px] text-gray-700 dark:text-gray-300 font-['Manrope'] leading-relaxed max-w-xl">
                                {currentUser.bio}
                            </p>
                        )}

                        {/* Stats - Horizontal Twitter Style */}
                        <div className="flex items-center gap-5 mt-4 text-[14px] font-['Manrope']">
                            <button 
                                onClick={() => setShowFollowing(true)}
                                className="hover:underline outline-none text-gray-500 dark:text-gray-400 transition-colors"
                            >
                                <strong className="text-gray-900 dark:text-gray-100 font-bold">{currentUser.following}</strong> Mengikuti
                            </button>
                            
                            <button 
                                onClick={() => setShowFollowers(true)}
                                className="hover:underline outline-none text-gray-500 dark:text-gray-400 transition-colors"
                            >
                                <strong className="text-gray-900 dark:text-gray-100 font-bold">{currentUser.followers}</strong> Pengikut
                            </button>
                        </div>
                    </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[14px]">
                                        Daftar Pakar
                                    </h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium font-['Manrope']">Jadilah kontributor terverifikasi Ba-Yu</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setApplyModalOpen(true)}
                                className="w-full sm:w-auto bg-slate-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 text-white font-bold text-[13px] px-6 py-2 rounded-full transition-all shadow-sm dark:shadow-none"
                            >
                                Daftar
                            </button>
                        </div>
                </div>

                {/* 3. Sticky Tab Navigation - Ba-Yu Signature Style */}
                <div
                    id="profil-tabs"
                    className="sticky top-0 bg-white/95 dark:bg-[#13111C]/95 backdrop-blur-md z-40 border-b border-gray-100 dark:border-white/5 mb-4 pt-2"
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
                                            ? "text-gray-950 dark:text-gray-100"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-200"
                                    }`}
                                >
                                    {tab.label}
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${
                                            activeTab === tab.id 
                                            ? "bg-primary/10 text-primary" 
                                            : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400"
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
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">
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
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                        onLike={handleLikePost}
                                    />
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Bookmark className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">Simpanan Kosong</h3>
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
                                drafts.map((draft: any) => {
                                    const draftData = {
                                        id: draft._id || draft.id,
                                        title: draft.title || "",
                                        description: draft.plain_content || draft.description || "",
                                        thumbnail: draft.thumbnail || null,
                                        author: {
                                            id: user?.id || user?._id || "",
                                            name: user?.name || "",
                                            avatar: user?.avatar || null
                                        },
                                        mataPelajaran: draft.mapel || "Umum",
                                        jenjang: draft.jenjang,
                                        kelas: draft.kelas,
                                        semester: draft.semester,
                                        createdAt: draft.created_at || draft.createdAt,
                                        updatedAt: draft.updated_at || draft.created_at,
                                        tags: draft.tags || []
                                    };
                                    return (
                                        <NoteCard
                                            key={draftData.id}
                                            note={draftData as any}
                                            isDraft={true}
                                        />
                                    );
                                })
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">Belum Ada Draf</h3>
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
                                        <div key={i} className="p-5 border border-gray-100 dark:border-white/5 rounded-3xl bg-white dark:bg-[#1C1A29] animate-pulse flex flex-col gap-4">
                                            <div className="flex gap-3">
                                                <div className="w-16 h-5 bg-gray-100 dark:bg-white/10 rounded-full"></div>
                                                <div className="w-32 h-5 bg-gray-100 dark:bg-white/10 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full shrink-0"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-100 dark:bg-white/10 rounded w-full"></div>
                                                    <div className="h-4 bg-gray-100 dark:bg-white/10 rounded w-4/5"></div>
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
                                            className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors bg-transparent outline-none cursor-pointer"
                                        >
                                            <div className="flex-1 min-w-0 flex flex-col w-full h-full text-left">
                                                 <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-slate-950 dark:text-slate-300 font-bold">
                                                      <div className="flex items-center gap-1.5">
                                                          <AvatarImage src={user?.avatar} alt={user?.name} size={20} className="ring-2 ring-transparent" />
                                                          <span className="font-black text-slate-950 dark:text-slate-100 tracking-tight">{user?.name}</span>
                                                      </div>
                                                      <span className="text-slate-600 dark:text-slate-500 px-0.5">{activity.parent_comment_id ? "membalas komentar di" : "berkomentar di"}</span>
                                                      <span className="font-black text-slate-950 dark:text-slate-100 tracking-tight line-clamp-1">{activity.post?.title || "Catatan"}</span>
                                                 </div>

                                                <div className="block mb-3 font-['Lexend_Deca']">
                                                    <h2 className="text-[17px] md:text-[19px] font-extrabold text-slate-950 dark:text-slate-100 leading-[1.5] tracking-tight group-hover:text-primary transition-colors line-clamp-3 italic">
                                                        "{activity.content}"
                                                    </h2>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-500">
                                                            <Clock className="w-[14px] h-[14px] text-gray-500" strokeWidth={2} />
                                                            <span className="text-[13px] font-['Manrope'] font-semibold">
                                                                {activity.created_at ? new Date(activity.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" }) : "Baru saja"}
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
                                                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all active:scale-95">
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

                                            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1C1A29] relative shadow-sm dark:shadow-none border border-gray-100/50 dark:border-white/5">
                                                {activity.post?.thumbnail ? (
                                                    <img src={activity.post.thumbnail} alt={activity.post.title} className="w-full h-full object-cover transition-transform duration-500" />
                                                ) : (
                                                    <DefaultThumbnail 
                                                        className="w-full h-full transition-transform duration-500" 
                                                        subject={activity.post?.mapel}
                                                        title={activity.post?.title}
                                                    />
                                                )}
                                                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-['Lexend_Deca'] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5">
                                                    <MessageCircle className="w-3 h-3" /> DISKUSI
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">Belum Ada Riwayat</h3>
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
                    <div className="bg-white dark:bg-[#1C1A29] w-full max-w-sm rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[16px]">Pengikut</h3>
                            <button onClick={() => setShowFollowers(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {isLoadingFollows ? (
                                <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-400"/></div>
                            ) : followersList.length > 0 ? (
                                <div className="flex flex-col">
                                    {followersList.map((f, i) => (
                                        <div 
                                            key={i} 
                                            className={`flex items-center gap-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 ${i !== followersList.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`} 
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => { setShowFollowers(false); navigate(`/profile/${f._id || f.id}`); }}>
                                                <AvatarImage src={f.avatar} alt={f.name} size={46} className="rounded-full ring-2 ring-slate-100 dark:ring-white/5" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-['Lexend_Deca'] font-bold text-[15px] text-gray-900 dark:text-gray-100 leading-tight truncate">{f.name}</h4>
                                                    <p className="font-['Manrope'] text-[13px] text-gray-500 capitalize mt-0.5 truncate">{f.role}</p>
                                                </div>
                                            </div>
                                            {f._id !== user?.id && f.id !== user?.id && (
                                                <button 
                                                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold font-['Manrope'] transition-all ${f.is_followed_by_me ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/15' : 'bg-primary text-white hover:bg-primary/90 shadow-sm'}`}
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        try {
                                                            const token = localStorage.getItem('bayu-token') || sessionStorage.getItem('bayu-token');
                                                            const res = await axios.post(`/api/users/${f._id || f.id}/follow`, {}, {
                                                                headers: { Authorization: `Bearer ${token}` }
                                                            });
                                                            setFollowersList(prev => prev.map(u => (u._id || u.id) === (f._id || f.id) ? { ...u, is_followed_by_me: !u.is_followed_by_me } : u));
                                                        } catch(err) {
                                                            console.error(err);
                                                        }
                                                    }}
                                                >
                                                    {f.is_followed_by_me ? 'Mengikuti' : 'Ikuti'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Users className="w-10 h-10 text-gray-200 mb-3" />
                                    <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 dark:text-gray-100 text-[15px] mb-1">Belum ada pengikut</h4>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500">Terus berkarya dan bagikan catatanmu!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Following Clean */}
            {showFollowing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowFollowing(false)}>
                    <div className="bg-white dark:bg-[#1C1A29] w-full max-w-sm rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[16px]">Mengikuti</h3>
                            <button onClick={() => setShowFollowing(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {isLoadingFollows ? (
                                <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-400"/></div>
                            ) : followingList.length > 0 ? (
                                <div className="flex flex-col">
                                    {followingList.map((f, i) => (
                                        <div 
                                            key={i} 
                                            className={`flex items-center gap-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-2 ${i !== followingList.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`} 
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => { setShowFollowing(false); navigate(`/profile/${f._id || f.id}`); }}>
                                                <AvatarImage src={f.avatar} alt={f.name} size={46} className="rounded-full ring-2 ring-slate-50 dark:ring-white/5" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-['Lexend_Deca'] font-bold text-[15px] text-gray-900 dark:text-gray-100 leading-tight truncate">{f.name}</h4>
                                                    <p className="font-['Manrope'] text-[13px] text-gray-500 capitalize mt-0.5 truncate">{f.role}</p>
                                                </div>
                                            </div>
                                            {f._id !== user?.id && f.id !== user?.id && (
                                                <button 
                                                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold font-['Manrope'] transition-all ${f.is_followed_by_me ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/15' : 'bg-primary text-white hover:bg-primary/90 shadow-sm'}`}
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        try {
                                                            const token = localStorage.getItem('bayu-token') || sessionStorage.getItem('bayu-token');
                                                            const res = await axios.post(`/api/users/${f._id || f.id}/follow`, {}, {
                                                                headers: { Authorization: `Bearer ${token}` }
                                                            });
                                                            setFollowingList(prev => prev.map(u => (u._id || u.id) === (f._id || f.id) ? { ...u, is_followed_by_me: !u.is_followed_by_me } : u));
                                                        } catch(err) {
                                                            console.error(err);
                                                        }
                                                    }}
                                                >
                                                    {f.is_followed_by_me ? 'Mengikuti' : 'Ikuti'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Users className="w-10 h-10 text-gray-200 mb-3" />
                                    <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 dark:text-gray-100 text-[15px] mb-1">Masih Kosong</h4>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 mb-5">Temukan kreator favoritmu di halaman Jelajah.</p>
                                    <button onClick={() => {setShowFollowing(false); navigate("/explore")}} className="px-5 py-2 bg-gray-900 text-white rounded-full font-medium text-[13px] hover:bg-black transition-colors">
                                        Cari Kreator
                                    </button>
                                </div>
                            )}
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