import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import {
    Search,
    Filter,
    BookOpen,
    Check,
    Eye,
    Heart,
    MessageCircle,
    Upload,
    LogIn,
    Sparkles,
    TrendingUp,
    Clock,
    Bookmark,
    Star,
    X,
    ShieldCheck,
} from "lucide-react";
import { mataPelajaran } from "../data/mockData";
import axios from "axios";
import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useBookmarks } from "../contexts/BookmarkContext";
import { AuthModal } from "../components/auth-modal";
import { NoteCardSkeleton } from "../components/ui/skeletons";

export default function ExplorePage() {
    const { isAuthenticated } = useAuth();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [activeSegment, setActiveSegment] = useState<
        "kategori" | "populer" | "terbaru"
    >(() => {
        return (
            (sessionStorage.getItem("exploreTab") as
                | "kategori"
                | "populer"
                | "terbaru") || "kategori"
        );
    });

    // Sort untuk popular dan terbaru
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

    useEffect(() => {
        sessionStorage.setItem("exploreTab", activeSegment);
    }, [activeSegment]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTermFromUrl = queryParams.get("q") || "";
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const [experts, setExperts] = useState<any[]>([]);

    // Fetch experts for sidebar
    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const authHeader = isAuthenticated
                    ? {
                          Authorization: `Bearer ${localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token")}`,
                      }
                    : {};
                const res = await axios.get("/api/v1/experts", {
                    headers: authHeader,
                });
                setExperts(res.data.data || []);
            } catch (e) {
                console.error("Gagal fetch pakar:", e);
            }
        };
        fetchExperts();
    }, [isAuthenticated]);

    const handleFollowExpert = async (expertId: string) => {
        if (!isAuthenticated) return openAuthModal("login");
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const response = await axios.post(
                `/api/users/${expertId}/follow`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setExperts((prev) =>
                prev.map((ex) => {
                    if ((ex._id || ex.id) === expertId) {
                        return {
                            ...ex,
                            is_followed_by_me:
                                response.data.status === "followed",
                            followers_count:
                                response.data.status === "followed"
                                    ? (ex.followers_count || 0) + 1
                                    : Math.max(
                                          0,
                                          (ex.followers_count || 0) - 1,
                                      ),
                        };
                    }
                    return ex;
                }),
            );
        } catch (e) {
            console.error("Gagal toggle follow pakar:", e);
        }
    };

    const handleLikePost = async (postId: string) => {
        if (!isAuthenticated) return openAuthModal("login");

        setNotes((prev) =>
            prev.map((note) => {
                if ((note._id || note.id) === postId) {
                    const isCurrentlyLiked = note.is_liked || false;
                    return {
                        ...note,
                        likes: isCurrentlyLiked
                            ? Math.max(0, note.likes - 1)
                            : note.likes + 1,
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

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoadingNotes(true);
            try {
                const keyword = searchTermFromUrl || debouncedSearchQuery;
                
                // --- 2. UBAH BAGIAN PARAMETER API INI ---
                const queryParamsAPI: any = { 
                    sort: activeSegment,
                    order: sortOrder // <--- Kirim parameter asc/desc ke Backend
                };

                if (keyword !== "") {
                    queryParamsAPI.search = keyword;
                }

                const response = await axios.get("/api/v1/posts", {
                    params: queryParamsAPI,
                });
                // ----------------------------------------

                setNotes(response.data.data || []);
            } catch (error) {
                console.error("Pesan Error dari Backend:", error);
            } finally {
                setIsLoadingNotes(false);
            }
        };

        fetchPosts();
    // --- 3. TAMBAHKAN sortOrder KE DALAM KURUNG SIKU DI BAWAH INI ---
    }, [debouncedSearchQuery, searchTermFromUrl, activeSegment, sortOrder]);

    const formattedNotes = notes.map((note) => ({
        ...note,
        id: note._id || note.id,
        author: note.user
            ? {
                  ...note.user,
                  avatar:
                      note.user.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
              }
            : {
                  name: "Anonim",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
              },
        createdAt: note.created_at,
        thumbnail: note.thumbnail || null,
        views: note.views || 0,
        rating: note.rating || 5,
        description: note.content
            ? note.content.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."
            : "Tidak ada deskripsi",
        mataPelajaran: note.mapel || "Lainnya",
        jenjang: note.jenjang || "-",
        kelas: note.kelas || "-",
        likes: note.likes_count || 0,
        comments: note.comments_count || 0,
    }));

    // Auth modal for guest users
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authTab, setAuthTab] = useState<"login" | "register">("login");

    // Filter Modal & States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedJenjang, setSelectedJenjang] = useState<string>("Semua");
    const [selectedTopic, setSelectedTopic] = useState<string>("Semua");

    const jenjangList = [
        "Semua",
        "SD",
        "SMP",
        "SMA",
        "Perguruan Tinggi",
        "Umum",
    ];

    const openAuthModal = (tab: "login" | "register") => {
        setAuthTab(tab);
        setShowAuthModal(true);
    };

    // Reveal animations for guest mode
    useEffect(() => {
        if (!isAuthenticated) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("revealed");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
            );
            document
                .querySelectorAll(".explore-reveal")
                .forEach((el) => observer.observe(el));
            return () => observer.disconnect();
        }
    }, [isAuthenticated, activeSegment]);

    const tabItems = [
        { key: "kategori" as const, label: "Untuk Anda", icon: Sparkles },
        { key: "populer" as const, label: "Terpopuler", icon: TrendingUp },
        { key: "terbaru" as const, label: "Terbaru", icon: Clock },
    ];

    // === SHARED CONTENT ===
    const exploreContent = (
        <div className={!isAuthenticated ? "bg-[#FAFAFA]" : ""}>
            {/* Hero Section — Guest Only */}
            {!isAuthenticated && (
                <div className="relative bg-white pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8">
                        <div
                            className="explore-reveal opacity-0 translate-y-4"
                            style={{
                                transition:
                                    "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            <div className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold tracking-widest uppercase mb-6">
                                <BookOpen className="w-4 h-4 text-gray-300" />
                                Perpustakaan Digital
                            </div>
                            <h1 className="font-['Lexend_Deca'] font-extrabold text-5xl sm:text-6xl text-gray-900 tracking-tight mb-6 leading-[1.05]">
                                Jelajahi Ribuan{" "}
                                <br className="hidden sm:block" />
                                Catatan Belajar.
                            </h1>
                            <p className="text-gray-500 font-['Manrope'] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
                                Temukan materi terkurasi dari pelajar dan pakar
                                pendidikan <br className="hidden md:block" /> di
                                seluruh Indonesia. Gratis selamanya.
                            </p>
                        </div>

                        {/* Search Bar — Premium Minimalist (Centered Medium Style) */}
                        <div
                            className="explore-reveal opacity-0 translate-y-4 max-w-[720px] mx-auto mt-8"
                            style={{
                                transition:
                                    "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                            }}
                        >
                            <div className="flex gap-3">
                                <div className="relative flex-1 group">
                                    <Search
                                        className="absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-800 transition-colors"
                                        strokeWidth={2}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cari preferensi..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full pl-12 pr-5 py-4 bg-gray-50 hover:bg-gray-100 focus:bg-white border text-gray-900 border-transparent focus:border-gray-300 rounded-[14px] font-['Manrope'] text-[15px] font-medium focus:outline-none transition-colors placeholder:text-gray-400 shadow-sm"
                                    />
                                </div>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="w-14 h-14 bg-gray-900 hover:bg-black text-white rounded-[14px] flex items-center justify-center transition-all shrink-0 shadow-md hover:-translate-y-0.5"
                                >
                                    <Filter
                                        className="w-[18px] h-[18px]"
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main 2-Column Container */}
            <div className="w-full flex justify-center pb-12 sm:pb-20">
                <div className="w-full max-w-[1140px] px-0 sm:px-4 md:px-6 flex flex-col xl:flex-row gap-0 xl:gap-14">
                    {/* LEFT COLUMN (Main Feed) */}
                    <div className="flex-1 min-w-0 max-w-[720px] mx-auto xl:mx-0 w-full pt-10">
                        {/* Logged-in Header (Enhanced Medium Style) */}
                        {isAuthenticated && (
                            <div className="px-6 md:px-0 pb-2 mb-4 w-full">
                                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50/80 to-white border border-gray-100/60 rounded-3xl p-6 sm:p-8 shadow-sm mb-2 group/header hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/header:bg-primary/10 transition-colors duration-700"></div>
                                    <div className="relative z-10">
                                        <h1 className="text-[28px] sm:text-[32px] font-['Lexend_Deca'] font-extrabold text-gray-900 tracking-tight leading-tight">
                                            Eksplorasi Topik
                                        </h1>
                                        <p className="text-gray-500 font-['Manrope'] text-[15px] mt-1.5 mb-6">
                                            Temukan materi dan inspirasi terbaru
                                            pilihan.
                                        </p>

                                        <div className="flex gap-3">
                                            <div className="relative flex-1 group">
                                                <Search
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-gray-400 group-focus-within:text-primary transition-colors"
                                                    strokeWidth={2.5}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Cari referensi (contoh: Logaritma Dasar)"
                                                    value={searchQuery}
                                                    onChange={(e) =>
                                                        setSearchQuery(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full pl-11 pr-4 py-3.5 bg-white hover:bg-gray-50/50 focus:bg-white border border-gray-200 focus:border-primary/40 focus:shadow-[0_0_0_4px_rgba(93,92,230,0.08)] rounded-full font-['Manrope'] text-[15px] font-medium focus:outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setIsFilterOpen(true)
                                                }
                                                className="w-[52px] h-[52px] bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-primary/40 hover:text-primary transition-all flex-shrink-0 text-gray-600 shadow-sm"
                                            >
                                                <Filter
                                                    className="w-5 h-5"
                                                    strokeWidth={2.5}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Animated Feed Tab Navigation */}
                        <div className={`px-6 md:px-0 w-full mb-8 ${!isAuthenticated ? "border-b border-gray-100 mt-2" : "px-2"}`}>
                            <div className={`${!isAuthenticated ? "explore-reveal opacity-0 translate-y-4" : ""}`} style={{ transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>
                                
                                <div className={`flex justify-between items-end ${isAuthenticated ? "border-b border-gray-100" : ""}`}>

                                    {/* Bagian Kiri: Tab Navigasi (Untuk Anda, Terpopuler, dsb) */}
                                    <div className={`flex gap-8 overflow-x-auto no-scrollbar relative`}>
                                        {tabItems.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveSegment(tab.key)}
                                                className={`pb-4 relative shrink-0 font-['Lexend_Deca'] text-[15px] transition-colors focus:outline-none flex items-center gap-2 group ${
                                                    activeSegment === tab.key ? "text-gray-900 font-extrabold" : "text-gray-500 font-medium hover:text-gray-900"
                                                }`}
                                            >
                                                <tab.icon className={`w-[16px] h-[16px] transition-colors ${activeSegment === tab.key ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"}`} strokeWidth={activeSegment === tab.key ? 2.5 : 2} />
                                                {tab.label}
                                                {activeSegment === tab.key && (
                                                    <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-gray-900 rounded-t-full shadow-[0_-1px_6px_rgba(0,0,0,0.2)]"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Bagian Kanan: Dropdown Filter Order */}
                                    <div className="pb-3 pl-4 hidden sm:block">
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
                                            className="bg-gray-50/80 border border-gray-200 text-gray-700 text-[13px] font-['Manrope'] font-bold py-1.5 px-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 cursor-pointer hover:bg-gray-100 transition-all appearance-none outline-none text-center shadow-sm"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em', paddingRight: '2rem' }}
                                        >
                                            <option value="desc">Descending</option>
                                            <option value="asc">Ascending</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* Notes Vertical Feed (Medium Style) */}
                        <div
                            className={`px-6 md:px-0 w-full flex flex-col pb-16`}
                        >
                            {isLoadingNotes ? (
                                <div className="space-y-0">
                                    {[...Array(5)].map((_, i) => (
                                        <NoteCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : formattedNotes.length > 0 ? (
                                formattedNotes.map((note, i) => {
                                    const author = note.author;
                                    return (
                                        <article
                                            key={note.id}
                                            className={`${!isAuthenticated ? "explore-reveal opacity-0 translate-y-4" : ""} group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors bg-transparent outline-none`}
                                            style={
                                                !isAuthenticated
                                                    ? {
                                                          transition: `opacity 0.6s ease ${i * 40}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`,
                                                      }
                                                    : undefined
                                            }
                                        >
                                            {/* Feed Text */}
                                            <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                                {/* Author Header */}
                                                <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-700">
                                                    <Link
                                                        to={`/profile/${author?.id || author?._id}`}
                                                        className="flex items-center gap-1.5 group/author outline-none cursor-pointer"
                                                    >
                                                        <img
                                                            src={author?.avatar}
                                                            alt={author?.name}
                                                            className="w-[20px] h-[20px] rounded-full object-cover ring-2 ring-transparent group-hover/author:ring-primary/20 transition-all"
                                                        />
                                                        <span className="font-medium text-gray-900 group-hover/author:underline tracking-tight">
                                                            {author?.name}
                                                        </span>
                                                    </Link>
                                                    <span className="text-gray-400 px-0.5">
                                                        di
                                                    </span>
                                                    <span className="font-semibold text-gray-800 tracking-tight">
                                                        {note.mataPelajaran}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 mx-0.5">
                                                        •
                                                    </span>
                                                    <span className="text-gray-500 tracking-tight">
                                                        {note.jenjang ===
                                                        "Kuliah"
                                                            ? `S${note.kelas || "1"} Semester ${note.semester || 1}`
                                                            : `${note.jenjang} Kelas ${note.kelas}`}
                                                    </span>

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
                                                <p className="text-[15px] font-['Manrope'] text-gray-500 line-clamp-2 leading-relaxed mb-6 pr-2">
                                                    {note.description}
                                                </p>

                                                {/* Meta Footer (Medium Style) */}
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <Star
                                                            className="w-[14px] h-[14px] text-amber-500 fill-amber-500"
                                                            strokeWidth={1}
                                                        />
                                                        <span className="text-[13px] font-['Manrope'] font-medium">
                                                            {new Date(
                                                                note.createdAt,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 shrink-0 ml-4">
                                                        <div className="flex items-center gap-1.5 text-gray-500" title={`${note.views} kali dilihat`}>
                                                            <Eye className="w-[15px] h-[15px]" strokeWidth={2} />
                                                            <span className="text-[13px] font-['Manrope'] font-medium">
                                                                {note.views}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleLikePost(
                                                                    note.id,
                                                                );
                                                            }}
                                                            className={`flex items-center gap-1.5 transition-colors focus:outline-none ${note.is_liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                                                            title={`${note.likes} suka`}
                                                        >
                                                            <Heart
                                                                className={`w-[15px] h-[15px] ${note.is_liked ? "fill-red-500" : ""}`}
                                                                strokeWidth={2}
                                                            />
                                                            <span className="text-[13px] font-['Manrope'] font-medium">
                                                                {note.likes}
                                                            </span>
                                                        </button>
                                                        <Link
                                                            to={`/note/${note.id}#comments-section`}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
                                                            title={`${note.comments} komentar`}
                                                        >
                                                            <MessageCircle
                                                                className="w-[15px] h-[15px]"
                                                                strokeWidth={2}
                                                            />
                                                            <span className="text-[13px] font-['Manrope'] font-medium">
                                                                {note.comments}
                                                            </span>
                                                        </Link>
                                                        <button
                                                            aria-label="Save"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleBookmark(
                                                                    note.id,
                                                                );
                                                            }}
                                                            className={`p-1.5 rounded-full transition-all duration-300 outline-none active:scale-75 ml-1 ${isBookmarked(note.id) ? "text-primary scale-110" : "opacity-0 md:opacity-100 text-gray-400 hover:text-primary md:group-hover:opacity-100"}`}
                                                        >
                                                            <Bookmark
                                                                className={`w-[18px] h-[18px] transition-all duration-300 ${isBookmarked(note.id) ? "fill-primary" : ""}`}
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Thumbnail */}
                                            {note.thumbnail ? (
                                                <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
                                                    <Link
                                                        to={`/note/${note.id}`}
                                                        className="block w-full h-full outline-none cursor-pointer"
                                                    >
                                                        <img
                                                            src={note.thumbnail}
                                                            alt={note.title}
                                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        {/* Floating badge */}
                                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-['Lexend_Deca'] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />{" "}
                                                            {note.read_time || 1}m
                                                        </div>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="hidden sm:block sm:w-[160px] md:w-[200px] shrink-0 pointer-events-none"></div>
                                            )}
                                        </article>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <BookOpen className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-lg mb-2">
                                        Pencarian Tidak Ditemukan
                                    </h3>
                                    <p className="text-gray-500 font-['Manrope']">
                                        Coba gunakan kata kunci atau filter
                                        lain.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div
                        className={`${!isAuthenticated ? "explore-reveal opacity-0 translate-y-6" : ""} hidden xl:block w-[320px] shrink-0 xl:border-l xl:border-gray-100 xl:pl-10`}
                        style={{
                            transition:
                                "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                        }}
                    >
                        <div
                            className="sticky flex flex-col gap-10 pt-8 pb-12"
                            style={{
                                top: "min(72px, calc(100vh - 100% - 24px))",
                            }}
                        >
                            {/* Penulis Direkomendasikan */}
                            <div>
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[16px] text-gray-900 tracking-tight mb-5 flex items-center gap-2">
                                    <Sparkles
                                        className="w-4 h-4 text-primary"
                                        strokeWidth={2.5}
                                    />{" "}
                                    Pakar Edukasi
                                </h3>
                                <div className="flex flex-col gap-5">
                                    {experts.length > 0 ? (
                                        experts.map((expert: any) => (
                                            <div
                                                key={expert._id || expert.id}
                                                className="flex items-center justify-between group"
                                            >
                                                <Link
                                                    to={`/profile/${expert._id || expert.id}`}
                                                    className="flex items-center gap-3 min-w-0 pr-4 outline-none"
                                                >
                                                    <img
                                                        src={
                                                            expert.avatar ||
                                                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
                                                        }
                                                        alt={expert.name}
                                                        className="w-10 h-10 rounded-full object-cover bg-gray-100 ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                                                    />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-['Lexend_Deca'] font-bold text-[14px] text-gray-900 truncate group-hover:text-primary transition-colors">
                                                            {expert.name}
                                                        </span>
                                                        <span className="font-['Manrope'] font-medium text-[12px] text-gray-500 truncate">
                                                            {expert.followers_count ||
                                                                0}{" "}
                                                            pengikut
                                                        </span>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleFollowExpert(
                                                            expert._id ||
                                                                expert.id,
                                                        )
                                                    }
                                                    className={`px-3.5 py-1.5 rounded-[10px] border font-['Manrope'] text-[12px] font-bold transition-all focus:outline-none ${
                                                        expert.is_followed_by_me
                                                            ? "border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200"
                                                            : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5"
                                                    }`}
                                                >
                                                    {expert.is_followed_by_me
                                                        ? "Mengikuti"
                                                        : "Ikuti"}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 font-['Manrope'] text-sm">
                                            Belum ada pakar terdaftar.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Pencarian Populer (Trending Searches) */}
                            <div>
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[16px] text-gray-900 tracking-tight mb-4 flex items-center gap-2">
                                    <TrendingUp
                                        className="w-4 h-4 text-rose-500"
                                        strokeWidth={2.5}
                                    />{" "}
                                    Sering Dicari
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        "Fisika Kuantum",
                                        "Limit Trigonometri",
                                        "Grammar IELTS",
                                        "SBMPTN 2026",
                                        "Sistem Pencernaan",
                                    ].map((term) => (
                                        <button
                                            key={term}
                                            className="px-3.5 py-2.5 bg-white border border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-600 rounded-2xl font-['Manrope'] text-[13px] font-semibold transition-colors truncate max-w-full text-left focus:outline-none"
                                        >
                                            <Search
                                                className="w-3.5 h-3.5 inline-block mr-1.5 text-gray-400"
                                                strokeWidth={2.5}
                                            />{" "}
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-['Manrope'] font-semibold text-gray-400">
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Bantuan
                                </Link>
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Status
                                </Link>
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Tentang Kami
                                </Link>
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Karir
                                </Link>
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Privasi
                                </Link>
                                <Link
                                    to="#"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Ketentuan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guest CTA Banner */}
            {!isAuthenticated && (
                <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 pb-16">
                    <div
                        className="explore-reveal opacity-0 translate-y-6"
                        style={{
                            transition:
                                "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                        }}
                    >
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-purple-700 rounded-[2rem] p-8 sm:p-14 text-center shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-white text-2xl sm:text-3xl mb-3 tracking-tight">
                                    Punya catatan bagus?
                                </h3>
                                <p className="text-white/80 font-['Manrope'] text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                                    Bergabung dan bagikan catatan belajarmu ke
                                    ribuan pelajar di seluruh Indonesia. Gratis
                                    selamanya!
                                </p>
                                <div className="flex items-center justify-center gap-4 flex-wrap">
                                    <button
                                        onClick={() =>
                                            openAuthModal("register")
                                        }
                                        className="bg-white text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Daftar & Upload
                                    </button>
                                    <button
                                        onClick={() => openAuthModal("login")}
                                        className="text-white border-2 border-white/30 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Sudah Punya Akun
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const filterModalUI = (
        <div
            className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none transition-opacity duration-300 ${isFilterOpen ? "opacity-100" : "opacity-0"}`}
        >
            <div
                className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${isFilterOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={() => setIsFilterOpen(false)}
            />
            <div
                className={`relative w-full sm:w-[500px] max-h-[85vh] sm:max-h-[600px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 ${isFilterOpen ? "pointer-events-auto translate-y-0 scale-100" : "pointer-events-none translate-y-full sm:translate-y-4 sm:scale-95"}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Filter
                                className="w-[18px] h-[18px] text-primary"
                                strokeWidth={2.5}
                            />
                        </div>
                        <h3 className="font-['Lexend_Deca'] font-extrabold text-[18px] text-gray-900 tracking-tight">
                            Filter Referensi
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors focus:outline-none"
                    >
                        <X className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar bg-gray-50/50">
                    {/* Tingkat Pendidikan */}
                    <div>
                        <h4 className="font-['Lexend_Deca'] font-bold text-[15px] text-gray-900 mb-4 flex items-center justify-between">
                            Tingkat Pendidikan
                            {selectedJenjang !== "Semua" && (
                                <span className="text-[11px] font-['Lexend_Deca'] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                                    1 Dipilih
                                </span>
                            )}
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {jenjangList.map((jenjang) => (
                                <button
                                    key={jenjang}
                                    onClick={() => setSelectedJenjang(jenjang)}
                                    className={`px-4 py-2.5 rounded-2xl font-['Manrope'] text-[13.5px] font-bold transition-all border ${
                                        selectedJenjang === jenjang
                                            ? "bg-primary text-white border-primary shadow-[0_4px_12px_rgb(93,92,230,0.3)]"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:shadow-sm"
                                    }`}
                                >
                                    {jenjang}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topik Pembelajaran */}
                    <div>
                        <h4 className="font-['Lexend_Deca'] font-bold text-[15px] text-gray-900 mb-4 flex items-center justify-between">
                            Topik Belajar
                            {selectedTopic !== "Semua" && (
                                <span className="text-[11px] font-['Lexend_Deca'] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                                    1 Dipilih
                                </span>
                            )}
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            <button
                                onClick={() => setSelectedTopic("Semua")}
                                className={`px-4 py-2.5 rounded-2xl font-['Manrope'] text-[13.5px] font-bold transition-all border flex items-center gap-2 ${
                                    selectedTopic === "Semua"
                                        ? "bg-primary text-white border-primary shadow-[0_4px_12px_rgb(93,92,230,0.3)]"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:shadow-sm"
                                }`}
                            >
                                ✨ Semua Topik
                            </button>
                            {mataPelajaran.map((subject) => (
                                <button
                                    key={subject.id}
                                    onClick={() => setSelectedTopic(subject.id)}
                                    className={`px-4 py-2.5 rounded-2xl font-['Manrope'] text-[13.5px] font-bold transition-all border flex items-center gap-2 ${
                                        selectedTopic === subject.id
                                            ? "bg-primary text-white border-primary shadow-[0_4px_12px_rgb(93,92,230,0.3)]"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:shadow-sm"
                                    }`}
                                >
                                    <span>{subject.icon}</span> {subject.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-100 bg-white z-10">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setSelectedJenjang("Semua");
                                setSelectedTopic("Semua");
                            }}
                            className="px-5 py-3.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-extrabold text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-colors w-1/3 border border-gray-200"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="flex-1 px-5 py-3.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-extrabold text-white bg-primary hover:bg-primary/90 shadow-[0_4px_10px_rgb(93,92,230,0.25)] hover:shadow-[0_8px_20px_rgb(93,92,230,0.35)] hover:-translate-y-0.5 transition-all text-center"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Logged-in: dashboard layout
    if (isAuthenticated) {
        return (
            <MobileLayout>
                {exploreContent}
                {filterModalUI}
            </MobileLayout>
        );
    }

    // Guest: landing page layout with reveal styles
    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <style>{`
        .explore-reveal.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
            <Navbar variant="default" />
            {exploreContent}
            {filterModalUI}
            <Footer />
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultTab={authTab}
            />
        </div>
    );
}
