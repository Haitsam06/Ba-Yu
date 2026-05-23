import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { NoteCard } from "../components/NoteCard";
import { NoteCardSkeleton } from "../components/ui/skeletons";
import { TagList } from "../components/ui/TagList";
import { DefaultThumbnail, AvatarImage } from "../components/ui/DefaultImages";
import { Skeleton } from "../components/ui/skeleton";
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
    UserMinus,
    Loader2,
    Lock,
} from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

export default function PublicProfilePage() {
    const { id } = useParams(); // Mengambil ID dari URL
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<"catatan" | "aktivitas">(
        (tabParam as "catatan" | "aktivitas") || "catatan"
    );// State untuk Modal Followers & Following
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const [followersList, setFollowersList] = useState<any[]>([]);
    const [followingList, setFollowingList] = useState<any[]>([]);
    const [isLoadingFollows, setIsLoadingFollows] = useState(false);

    const { user: currentUser } = useAuth();

    const fetchFollowsData = async () => {
        if (!id) return;
        setIsLoadingFollows(true);
        try {
            const [followersRes, followingRes] = await Promise.all([
                axios.get(`/api/v1/users/${id}/followers`),
                axios.get(`/api/v1/users/${id}/following`)
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
    const { showToast } = useToast();

    const [profileUser, setProfileUser] = useState<any>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);
    const [isTogglingFollow, setIsTogglingFollow] = useState(false);

    const openParam = searchParams.get("open");

    // Sync state if URL changes
    useEffect(() => {
        if (tabParam && ["catatan", "aktivitas"].includes(tabParam)) {
            setActiveTab(tabParam as "catatan" | "aktivitas");
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

    useEffect(() => {
        if (openParam === "followers") {
            setShowFollowers(true);
        } else if (openParam === "following") {
            setShowFollowing(true);
        }
    }, [openParam]);

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
                const userData = res.data.data || res.data;
                setProfileUser(userData);
                setIsFollowing(userData.is_followed_by_me || false);
                setIsPending(userData.is_follow_pending || false);
            } catch (error: any) {
                if (error.response?.status === 403) {
                    if (error.response.data.is_private_restricted) {
                        const restrictedUser = error.response.data.data;
                        restrictedUser.is_private_restricted = true;
                        setProfileUser(restrictedUser);
                        setIsFollowing(false);
                        setIsPending(error.response.data.is_follow_pending || false);
                    } else {
                        showToast(error.response.data.message || "Akses ditolak", "error");
                        navigate(-1);
                    }
                } else {
                    console.error("Gagal mengambil data profil", error);
                    showToast("Pengguna tidak ditemukan", "error");
                    navigate(-1);
                }
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

    const [unfollowTarget, setUnfollowTarget] = useState<{id: string, name: string, is_private: boolean} | null>(null);

    const handleFollowToggle = async (targetUserId?: string, targetName?: string, isTargetPrivate?: boolean) => {
        if (!currentUser) {
            showToast("Silakan login untuk mengikuti pengguna ini", "warning");
            navigate("/login");
            return;
        }

        const isMainProfile = !targetUserId;
        const targetId = targetUserId || id;
        const currentIsFollowing = isMainProfile ? isFollowing : (
            followersList.find(u => (u._id || u.id) === targetId)?.is_followed_by_me || 
            followingList.find(u => (u._id || u.id) === targetId)?.is_followed_by_me || false
        );

        if (currentIsFollowing && !showUnfollowDialog) {
            setUnfollowTarget({
                id: targetId!,
                name: targetName || profileUser?.name || "Pengguna",
                is_private: isTargetPrivate ?? profileUser?.is_private ?? false
            });
            setShowUnfollowDialog(true);
            return;
        }

        setIsTogglingFollow(true);
        try {
            const tk = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
            const res = await axios.post(`/api/v1/users/${targetId}/follow`, {}, {
                headers: { Authorization: `Bearer ${tk}` },
            });
            
            const status = res.data.status;
            
            if (isMainProfile) {
                if (status === 'unfollowed') {
                    setIsFollowing(false);
                    setIsPending(false);
                    setProfileUser((prev: any) => ({
                        ...prev,
                        followers_count: Math.max(0, (prev?.followers_count || 0) - 1)
                    }));
                    showToast("Berhenti mengikuti", "info");
                } else if (status === 'pending') {
                    setIsPending(true);
                    setIsFollowing(false);
                    showToast("Permintaan mengikuti dikirim", "success");
                } else {
                    setIsFollowing(true);
                    setIsPending(false);
                    setProfileUser((prev: any) => ({
                        ...prev,
                        followers_count: (prev?.followers_count || 0) + 1
                    }));
                    showToast("Berhasil mengikuti", "success");
                }
            } else {
                const updateList = (list: any[]) => list.map(u => {
                    if ((u._id || u.id) === targetId) {
                        if (status === 'unfollowed') {
                            return { ...u, is_followed_by_me: false, is_follow_pending: false };
                        } else if (status === 'pending') {
                            return { ...u, is_followed_by_me: false, is_follow_pending: true };
                        } else {
                            return { ...u, is_followed_by_me: true, is_follow_pending: false };
                        }
                    }
                    return u;
                });
                setFollowersList(prev => updateList(prev));
                setFollowingList(prev => updateList(prev));
                
                if (status === 'unfollowed') showToast("Berhenti mengikuti", "info");
                else if (status === 'pending') showToast("Permintaan mengikuti dikirim", "success");
                else showToast("Berhasil mengikuti", "success");
            }
            
            setShowUnfollowDialog(false);
            setUnfollowTarget(null);
        } catch (error) {
            console.error(error);
            showToast("Gagal memproses permintaan", "error");
        } finally {
            setIsTogglingFollow(false);
        }
    };

    if (isLoadingProfile) {
        return (
            <MobileLayout>
                <div className="pb-16 bg-white dark:bg-[#13111C] min-h-screen animate-pulse">
                    {/* Cover Banner Skeleton */}
                    <Skeleton className="w-full h-32 sm:h-48 rounded-none" />

                    {/* Main Profile Content Container */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative mb-6">
                        {/* Avatar & Top Actions */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="relative -mt-12 sm:-mt-16">
                                <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-[#13111C]" />
                            </div>
                            <div className="pt-3">
                                <Skeleton className="w-24 h-8 sm:w-28 sm:h-10 rounded-full" />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mb-5 space-y-3">
                            <Skeleton className="h-7 w-1/3" />
                            
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/5" />
                            </div>

                            <div className="space-y-2 pt-2">
                                <Skeleton className="h-4 w-full max-w-xl" />
                                <Skeleton className="h-4 w-4/5 max-w-lg" />
                            </div>

                            {/* Stats */}
                            <div className="flex gap-5 mt-4">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation Skeleton */}
                    <div className="border-b border-gray-100 dark:border-white/5 mb-4 pt-2">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6">
                            <div className="flex gap-8 px-1 pb-4">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    </div>

                    {/* Tab Content Skeleton */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="space-y-6 pt-4">
                            {[...Array(3)].map((_, i) => (
                                <NoteCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </MobileLayout>
        );
    }

    const jenjangSekolah = (() => {
        const p = profileUser?.profesi;
        const j = profileUser?.jenjang_pendidikan;
        const s = profileUser?.school;
        if (s) {
            return p === "Umum" ? s : (p ? `${p} di ${s}` : s);
        }
        if (p === "Umum") return "Umum";
        if (p === "Pelajar" && j && j !== "Umum" && j !== "Kuliah") return `Pelajar ${j}`;
        return p || (j ? `Pelajar ${j}` : "Pelajar EduPlatform");
    })();

    return (
        <MobileLayout>
            <div className="pb-16 bg-white dark:bg-[#13111C] min-h-screen">
                {/* 1. Cover Banner (Twitter Aspect Ratio) */}
                <div className="w-full h-32 sm:h-48 bg-gradient-to-r from-[#E0E7FF] to-[#DBEAFE] dark:from-[#2E2C4B]/60 dark:to-[#1C1A29] relative overflow-hidden block">
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
                                className="relative border-4 border-white dark:border-[#13111C] bg-white dark:bg-[#1C1A29] w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-sm"
                            />
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                             <button
                                onClick={() => handleFollowToggle()}
                                disabled={isTogglingFollow}
                                className={`flex items-center gap-1.5 px-5 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold text-[13px] sm:text-[14px] transition-all ${
                                    isFollowing 
                                    ? "bg-white dark:bg-[#1C1A29] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-white/10 hover:border-red-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 group" 
                                    : isPending
                                        ? "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 cursor-default"
                                        : "bg-gray-900 text-white border border-gray-900 hover:bg-black dark:bg-primary dark:border-primary dark:hover:bg-indigo-700"
                                }`}
                            >
                                {isTogglingFollow ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : isFollowing ? (
                                    <>
                                        <UserCheck className="w-4 h-4 group-hover:hidden" />
                                        <UserMinus className="w-4 h-4 hidden group-hover:block" />
                                        <span className="group-hover:hidden">Mengikuti</span>
                                        <span className="hidden group-hover:block">Batal Ikuti</span>
                                    </>
                                ) : isPending ? (
                                    <>
                                        <Clock className="w-4 h-4" /> Diminta
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
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-[22px] sm:text-[24px] font-extrabold font-['Lexend_Deca'] text-gray-900 dark:text-gray-100 leading-tight">
                                    {profileUser?.name ? profileUser.name : (profileUser?.username ? `@${profileUser.username}` : "Pengguna")}
                                </h1>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                    {profileUser?.role === "pakar" && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[12px] border border-emerald-100 dark:border-emerald-500/20">
                                            <ShieldCheck className="w-3.5 h-3.5" /> Pakar
                                        </span>
                                    )}
                                    {profileUser?.role === "admin" && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[12px] border border-purple-100 dark:border-purple-500/20">
                                            <Shield className="w-3.5 h-3.5" /> Admin
                                        </span>
                                    )}
                                    {(profileUser?.follows_me || searchParams.get('hint') === 'follower') && (
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-wider">
                                            Mengikuti Anda
                                        </span>
                                    )}
                                </div>
                            </div>
                            {profileUser?.name && profileUser?.username && (
                                <p className="text-[14px] text-gray-500 font-medium font-['Manrope']">@{profileUser.username}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 mt-2 font-['Manrope'] text-[14px] text-gray-500">
                            {profileUser?.role !== "pakar" && profileUser?.role !== "admin" && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" /> {jenjangSekolah}
                                </span>
                            )}
                            
                            <span className="flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-4 h-4" /> Bergabung 2023
                            </span>
                        </div>

                        {profileUser?.bio && (
                            <p className="mt-3.5 text-[14px] text-gray-700 dark:text-gray-300 font-['Manrope'] leading-relaxed max-w-xl">
                                {profileUser.bio}
                            </p>
                        )}

                        {/* Stats - Horizontal Twitter Style */}
                        <div className="flex items-center gap-5 mt-4 text-[14px] font-['Manrope']">
                            <button 
                                onClick={() => setShowFollowing(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 dark:text-gray-100 font-bold">{profileUser?.following_count ?? profileUser?.following ?? 0}</strong> Mengikuti
                            </button>
                            
                            <button 
                                onClick={() => setShowFollowers(true)}
                                className="hover:underline outline-none text-gray-500 transition-colors"
                            >
                                <strong className="text-gray-900 dark:text-gray-100 font-bold">{profileUser?.followers_count ?? profileUser?.followers ?? 0}</strong> Pengikut
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Sticky Tab Navigation - Ba-Yu Signature Style */}
                <div
                    id="profil-tabs"
                    className="sticky top-0 bg-white dark:bg-[#13111C] z-40 border-b border-gray-100 dark:border-white/10 mb-4 pt-2"
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
                                            ? "text-gray-950 dark:text-gray-100"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-100"
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

                {/* Private Account UI Override */}
                {profileUser?.is_private_restricted ? (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-5 border border-slate-100 dark:border-white/10">
                            <Lock className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-xl mb-2">Akun ini bersifat Privat</h3>
                        <p className="font-['Manrope'] text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                            Ikuti akun ini untuk melihat catatan, aktivitas, dan siapa saja yang ia ikuti.
                        </p>
                    </div>
                ) : (
                    /* 4. Tab Panels - Ba-Yu Classic Card Styles */
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
                                        key={note.id || note._id}
                                        note={note}
                                        onLike={handleLikePost}
                                    />
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">
                                        Belum Terdapat Rilisan
                                    </h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
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
                                        <div key={i} className="p-5 border border-gray-100 dark:border-white/5 rounded-3xl bg-white dark:bg-[#1C1A29] animate-pulse flex flex-col gap-4">
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
                                            className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors bg-transparent outline-none cursor-pointer"
                                        >
                                            <div className="flex-1 min-w-0 flex flex-col w-full h-full text-left">
                                                <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-950 dark:text-gray-100 font-bold">
                                                     <div className="flex items-center gap-1.5">
                                                         <AvatarImage src={profileUser?.avatar} alt={profileUser?.name} size={20} className="ring-2 ring-transparent" />
                                                         <span className="font-black text-gray-950 dark:text-gray-100 tracking-tight">{profileUser?.name}</span>
                                                     </div>
                                                     <span className="text-gray-700 dark:text-gray-400 px-0.5">{activity.parent_comment_id ? "membalas komentar di" : "berkomentar di"}</span>
                                                     <span className="font-black text-gray-950 dark:text-gray-100 tracking-tight line-clamp-1">{activity.post?.title || "Catatan"}</span>
                                                </div>

                                                <div className="block mb-3 font-['Lexend_Deca']">
                                                    <h2 className="text-[17px] md:text-[19px] font-extrabold text-gray-950 dark:text-gray-100 leading-[1.5] tracking-tight group-hover:text-primary transition-colors line-clamp-3 italic">
                                                        "{activity.content}"
                                                    </h2>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                                            <Clock className="w-[14px] h-[14px] text-gray-500 dark:text-gray-400" strokeWidth={2} />
                                                            <span className="text-[13px] font-['Manrope'] font-semibold">
                                                                {new Date(activity.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 ml-2">
                                                            <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                                                                <Heart className="w-[14px] h-[14px]" />
                                                                <span className="text-[12px] font-bold">{activity.likes_count || 0}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1C1A29] relative shadow-sm dark:shadow-none border border-gray-100/50 dark:border-white/5">
                                                {activity.post?.thumbnail ? (
                                                    <img src={activity.post.thumbnail} alt={activity.post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                                        <FileText className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm text-gray-800 dark:text-gray-100 text-[10px] font-['Lexend_Deca'] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1.5">
                                                    <MessageCircle className="w-3 h-3" /> DISKUSI
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[18px] mb-2">
                                        Belum Ada Aktivitas
                                    </h3>
                                    <p className="font-['Manrope'] text-[14px] text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                                        {profileUser?.name} belum memberikan komentar pada catatan apa pun.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                )}
            </div>

            {/* Modal Followers Clean */}
            {showFollowers && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowFollowers(false)}>
                    <div className="bg-white dark:bg-[#1C1A29] w-full max-w-sm rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5">
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[16px]">Pengikut {profileUser?.name}</h3>
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
                                            {f._id !== currentUser?.id && f.id !== currentUser?.id && (
                                                <button 
                                                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold font-['Manrope'] transition-all ${
                                                        f.is_followed_by_me 
                                                            ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20' 
                                                            : f.is_follow_pending
                                                                ? 'bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-default'
                                                                : 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (f.is_followed_by_me) {
                                                            handleFollowToggle(f._id || f.id, f.name, f.is_private);
                                                        } else if (!f.is_follow_pending) {
                                                            handleFollowToggle(f._id || f.id);
                                                        }
                                                    }}
                                                >
                                                    {f.is_followed_by_me ? 'Mengikuti' : f.is_follow_pending ? 'Diminta' : 'Ikuti'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Users className="w-10 h-10 text-gray-200 mb-3" />
                                    <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 dark:text-gray-100 text-[15px] mb-1">Belum ada pengikut</h4>
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
                            <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 text-[16px]">{profileUser?.name} Mengikuti</h3>
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
                                            className={`flex items-center gap-4 py-3 hover:bg-gray-50 transition-colors px-2 ${i !== followingList.length - 1 ? 'border-b border-gray-100' : ''}`} 
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => { setShowFollowing(false); navigate(`/profile/${f._id || f.id}`); }}>
                                                <AvatarImage src={f.avatar} alt={f.name} size={46} className="rounded-full ring-2 ring-slate-100 dark:ring-white/5" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-['Lexend_Deca'] font-bold text-[15px] text-gray-900 dark:text-gray-100 leading-tight truncate">{f.name}</h4>
                                                    <p className="font-['Manrope'] text-[13px] text-gray-500 capitalize mt-0.5 truncate">{f.role}</p>
                                                </div>
                                            </div>
                                            {f._id !== currentUser?.id && f.id !== currentUser?.id && (
                                                <button 
                                                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold font-['Manrope'] transition-all ${
                                                        f.is_followed_by_me 
                                                            ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20' 
                                                            : f.is_follow_pending
                                                                ? 'bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-default'
                                                                : 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (f.is_followed_by_me) {
                                                            handleFollowToggle(f._id || f.id, f.name, f.is_private);
                                                        } else if (!f.is_follow_pending) {
                                                            handleFollowToggle(f._id || f.id);
                                                        }
                                                    }}
                                                >
                                                    {f.is_followed_by_me ? 'Mengikuti' : f.is_follow_pending ? 'Diminta' : 'Ikuti'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Users className="w-10 h-10 text-gray-200 mb-3" />
                                    <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 dark:text-gray-100 text-[15px] mb-1">Masih Kosong</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={showUnfollowDialog}
                onOpenChange={(open) => {
                    setShowUnfollowDialog(open);
                    if (!open) setUnfollowTarget(null);
                }}
                onConfirm={() => handleFollowToggle(unfollowTarget?.id)}
                title={`Batal ikuti ${unfollowTarget?.name || profileUser?.name}?`}
                description={(unfollowTarget?.is_private || profileUser?.is_private)
                    ? `Akun ini bersifat privat. Jika kamu berhenti mengikuti, kamu harus mengirim permintaan mengikuti lagi untuk melihat catatan dan aktivitasnya.` 
                    : `Kamu tidak akan lagi melihat catatan dan aktivitas dari ${unfollowTarget?.name || profileUser?.name} di berandamu.`}
                confirmText={isTogglingFollow ? "Memproses..." : "Ya, Batal Ikuti"}
                cancelText="Tidak"
                variant="danger"
            />
        </MobileLayout>
    );
}