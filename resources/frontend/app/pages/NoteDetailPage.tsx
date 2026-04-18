import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import {
    ArrowLeft,
    Share2,
    Bookmark,
    Heart,
    Eye,
    MessageCircle,
    Flag,
    Check,
    Star,
    DownloadCloud,
    LogIn,
    ArrowUp,
    Calendar,
    Clock,
    ShieldCheck,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import {
    getNoteById,
    getUserById,
    getCommentsByNoteId,
    mockNotes,
} from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { useBookmarks } from "../contexts/BookmarkContext";
import { AuthModal } from "../components/auth-modal";
// @ts-ignore
import "react-quill/dist/quill.snow.css";
// @ts-ignore // Just in case, though we apply custom styles
import "katex/dist/katex.min.css";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { ArticleSkeleton } from "../components/ui/skeletons";

export default function NoteDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { showToast } = useToast();
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [replyingTo, setReplyingTo] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [replyText, setReplyText] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeCommentMenu, setActiveCommentMenu] = useState<string | null>(
        null,
    );
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    const handleDownloadPDF = () => {
        const content = document.getElementById("area-materi-pdf");
        if (!content) return;

        const originalHTML = document.body.innerHTML;

        document.body.innerHTML = `
        <div style="padding: 40px; color: black; background: white; font-family: sans-serif;">
            <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 20px;">
                ${note?.title || "Materi Catatan"} 
            </h1>
            <hr style="margin-bottom: 20px; border-color: #eee;" />
            ${content.outerHTML}
        </div>
    `;

        setTimeout(() => {
            window.print();
            document.body.innerHTML = originalHTML;
            window.location.reload();
        }, 100);
    };

    const handleShare = async () => {
        const shareData = {
            title: note?.title || "Catatan Menarik di Ba-Yu",
            text: `Eh, cek catatan keren ini deh: "${note?.title || "Materi Belajar"}" karya ${author?.name || "seseorang"}. Cuma di Ba-Yu! 🚀`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                showToast(
                    "Link catatan berhasil disalin ke clipboard!",
                    "success",
                );
            }
        } catch (error) {
            console.log("Gagal share atau share dibatalkan:", error);
        }
    };

    const handleFollowToggle = async () => {
        if (!author || !author.id) return;

        if (isFollowing) {
            if (
                !window.confirm(
                    `Yakin ingin berhenti mengikuti ${author.name}?`,
                )
            ) {
                return;
            }
        }

        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const response = await axios.post(
                `/api/users/${author.id}/follow`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            if (response.data.status === "followed") {
                setIsFollowing(true);
                setFollowerCount((prev) => prev + 1);
                showToast("Berhasil mengikuti penulis!", "success");
            } else {
                setIsFollowing(false);
                setFollowerCount((prev) => prev - 1);
                showToast("Berhenti mengikuti penulis.", "info");
            }
        } catch (error: any) {
            console.error("Gagal toggle follow:", error);
            showToast(
                error.response?.data?.message || "Gagal memproses permintaan.",
                "error",
            );
        }
    };

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportTarget, setReportTarget] = useState<{
        type: "note" | "comment";
        id: string;
        title?: string;
    } | null>(null);
    const [reportReason, setReportReason] = useState("");
    const [reportDescription, setReportDescription] = useState("");
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authTab, setAuthTab] = useState<"login" | "register">("login");

    const [note, setNote] = useState<any>(null);
    const [author, setAuthor] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [validator, setValidator] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hash = window.location.hash;

        if (hash && comments && comments.length > 0) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });

                    element.classList.add(
                        "bg-yellow-50",
                        "transition-colors",
                        "duration-1000",
                    );
                    setTimeout(
                        () => element.classList.remove("bg-yellow-50"),
                        2000,
                    );
                }
            }, 500);
        }
    }, [comments]);

    useEffect(() => {
        if (window.location.hash && comments.length > 0) {
            setTimeout(() => {
                const el = document.getElementById(
                    window.location.hash.slice(1),
                );
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    el.classList.add(
                        "bg-indigo-50/50",
                        "transition-colors",
                        "duration-1000",
                    );
                    setTimeout(
                        () => el.classList.remove("bg-indigo-50/50"),
                        2000,
                    );
                }
            }, 500); // give dom time to render
        }
    }, [comments, window.location.hash]);

    useEffect(() => {
        const fetchNoteDetail = async () => {
            if (!id) return;
            try {
                const token =
                    localStorage.getItem("bayu-token") ||
                    sessionStorage.getItem("bayu-token");

                const response = await axios.get(`/api/v1/posts/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                const n = response.data.data;

                setLiked(n.is_liked === true);

                setNote({
                    ...n,
                    id: n._id || n.id,
                    title: n.title,
                    content: n.content,
                    createdAt: n.created_at
                        ? new Date(n.created_at).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "",
                    thumbnail: n.thumbnail || null,
                    mataPelajaran: n.mapel || "Umum",
                    jenjang: n.jenjang || "-",
                    kelas: n.kelas || "-",
                    semester: n.semester || "-",
                    isValidated: n.is_verified,
                    likes: n.likes_count || 0,
                    comments: n.comments_count || 0,
                    views: n.views || 0,
                    description: n.content
                        ? n.content
                              .replace(/<[^>]*>?/gm, "")
                              .substring(0, 150) + "..."
                        : "",
                });

                setAuthor(
                    n.user
                        ? {
                              ...n.user,
                              avatar:
                                  n.user.avatar ||
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
                              role: n.user.role || "siswa",
                              followers_count: n.user.followers_count || 0,
                              is_followed_by_me:
                                  n.user.is_followed_by_me || false,
                              totalCatatan: 0,
                              followers: 0,
                          }
                        : {
                              name: "Anonim",
                              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
                              role: "siswa",
                              totalCatatan: 0,
                              followers: 0,
                          },
                );

                // Handle comments logic if available, for now map simple
                setComments(n.comments || []);

                if (user && n.likes) {
                    const isLiked = n.likes.some(
                        (l: any) =>
                            l.user_id === user.id || l.user_id === user._id,
                    );
                    setLiked(isLiked);
                }

                if (n.is_verified) {
                    setValidator({
                        name: "Tim Pakar Ba-Yu",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                    });
                }
            } catch (err) {
                console.error("Error fetching note", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNoteDetail();
    }, [id]);

    useEffect(() => {
        if (!isLoading && location.hash === "#comments-section") {
            setTimeout(() => {
                const commentsSection =
                    document.getElementById("comments-section");
                if (commentsSection) {
                    commentsSection.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [isLoading, location.hash]);

    useEffect(() => {
        if (author) {
            setFollowerCount(author.followers_count || 0);
            setIsFollowing(author.is_followed_by_me || false);
        }
    }, [author]);

    const openAuthModal = (tab: "login" | "register") => {
        setAuthTab(tab);
        setShowAuthModal(true);
    };

    const requireAuth = (action: () => void) => {
        if (!isAuthenticated) {
            openAuthModal("login");
            return;
        }
        action();
    };

    const SkeletonContainer = isAuthenticated
        ? ({ children }: { children: React.ReactNode }) => (
              <MobileLayout showBottomNav={false}>{children}</MobileLayout>
          )
        : ({ children }: { children: React.ReactNode }) => (
              <div className="min-h-screen bg-white">
                  <Navbar variant="default" />
                  {children}
              </div>
          );

    if (isLoading) {
        return (
            <SkeletonContainer>
                <ArticleSkeleton />
            </SkeletonContainer>
        );
    }

    if (!note || !author) {
        const notFoundContent = (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-gray-500 font-['Manrope']">
                    Catatan tidak ditemukan atau telah dihapus.
                </p>
            </div>
        );
        if (isAuthenticated)
            return (
                <MobileLayout showBottomNav={false}>
                    {notFoundContent}
                </MobileLayout>
            );
        return (
            <div className="min-h-screen bg-[#FAFAFA]">
                <Navbar variant="default" />
                {notFoundContent}
                <Footer />
            </div>
        );
    }

    const handleComment = async () => {
        if (!isAuthenticated) return openAuthModal("login");
        if (!commentText.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.post(
                `/api/v1/posts/${id}/comments`,
                { content: commentText },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const newComment = { ...res.data.data, user: user }; // inject user for UI
            setComments((prev: any[]) => [...prev, newComment]);
            setCommentText("");
            setNote((prev: any) => ({ ...prev, comments: prev.comments + 1 }));
        } catch (e: any) {
            showToast(
                e.response?.data?.message || "Gagal mengirim komentar",
                "error",
            );
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!isAuthenticated) return openAuthModal("login");

        if (!window.confirm("Yakin mau hapus komentar ini?")) return;

        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            await axios.delete(`/api/v1/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setComments((prev: any[]) =>
                prev.filter((c: any) => c.id !== commentId),
            );

            setNote((prev: any) => ({ ...prev, comments: prev.comments - 1 }));
            showToast("Komentar berhasil dihapus!", "success");
        } catch (e: any) {
            console.error(e);
            showToast(
                e.response?.data?.message || "Gagal menghapus komentar",
                "error",
            );
        }
    };

    const handleReplySubmit = async (parentId: string) => {
        if (!isAuthenticated) return openAuthModal("login");
        if (!replyText.trim() || isSubmittingReply) return;
        setIsSubmittingReply(true);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.post(
                `/api/v1/posts/${id}/comments`,
                {
                    content: replyText,
                    parent_comment_id: parentId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const newComment = { ...res.data.data, user: user };
            setComments((prev: any[]) => [...prev, newComment]);
            setReplyingTo(null);
            setReplyText("");
            setNote((prev: any) => ({ ...prev, comments: prev.comments + 1 }));
        } catch (e: any) {
            showToast(
                e.response?.data?.message || "Gagal mengirim balasan",
                "error",
            );
        } finally {
            setIsSubmittingReply(false);
        }
    };

    const handleLikePost = async () => {
        if (!isAuthenticated) return openAuthModal("login");
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");

            const res = await axios.post(
                `/api/v1/posts/${id}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            // Langsung tempel data dari Backend lu ke UI
            setLiked(res.data.is_liked);
            setNote((prev: any) => ({ ...prev, likes: res.data.likes_count }));
        } catch (e) {
            console.error(e);
            showToast("Gagal memproses Like", "error");
        }
    };

    const handleReportSubmit = async () => {
        if (!isAuthenticated) return openAuthModal("login");
        if (!reportReason || !reportDescription)
            return showToast("Mohon isi semua field!", "warning");
        setIsSubmittingReport(true);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const url =
                reportTarget?.type === "note"
                    ? `/api/v1/posts/${reportTarget.id}/report`
                    : `/api/v1/comments/${reportTarget?.id}/report`;

            await axios.post(
                url,
                { reason: reportReason, description: reportDescription },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            showToast(
                "Laporan berhasil dikirim, terima kasih telah menjaga lingkungan hijau Ba-Yu!",
                "success",
            );
            setShowReportModal(false);
            setReportReason("");
            setReportDescription("");
        } catch (e: any) {
            showToast(
                e.response?.data?.message || "Gagal mengirim laporan.",
                "error",
            );
        } finally {
            setIsSubmittingReport(false);
        }
    };

    const handleVerifyPakar = async () => {
        if (
            !window.confirm(
                "Verifikasi catatan ini sebagai materi yang akurat?",
            )
        )
            return;
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            await axios.put(
                `/api/v1/posts/${id}/verify`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            showToast("Catatan berhasil diverifikasi!", "success");
        } catch (e: any) {
            showToast(
                e.response?.data?.message || "Gagal memverifikasi catatan.",
                "error",
            );
        }
    };

    // Get Recommendations
    const allOtherNotes = mockNotes.filter((n) => n.id !== note.id);
    const recommendedNotes = allOtherNotes
        .filter((n) => n.mataPelajaran === note.mataPelajaran)
        .slice(0, 2);
    if (recommendedNotes.length < 2) {
        const remaining = allOtherNotes.filter(
            (n) => !recommendedNotes.includes(n),
        );
        recommendedNotes.push(
            ...remaining.slice(0, 2 - recommendedNotes.length),
        );
    }

    // Here, we simulate HTML content if the mock data just provides plain text.
    // We'll wrap it in standard paragraph tags to work with Quill's styling.
    const processedContent = note.content.includes("<")
        ? note.content
        : `<p>${note.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p><br/><br/><p class="text-gray-500 italic text-center">...[Unduh file versi komplit di Bawah]...</p>`;

    const noteContent = (
        <div className={`pb-20 ${!isAuthenticated ? "pt-16 sm:pt-20" : ""}`}>
            {/* Notion/Medium-style Stylesheet explicitly for Reading Mode */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        .notion-reader .ql-editor { padding: 0 !important; font-family: 'Manrope', sans-serif; font-size: 19px; line-height: 1.8; color: #292929; }
        .notion-reader .ql-editor h1 { font-family: 'Lexend Deca', sans-serif; font-size: 2em; font-weight: 800; margin: 1.5em 0 0.5em; color: #111827; letter-spacing: -0.02em; }
        .notion-reader .ql-editor h2 { font-family: 'Lexend Deca', sans-serif; font-size: 1.5em; font-weight: 700; margin: 1.5em 0 0.5em; color: #1f2937; letter-spacing: -0.01em; }
        .notion-reader .ql-editor h3 { font-family: 'Lexend Deca', sans-serif; font-size: 1.25em; font-weight: 600; margin: 1.2em 0 0.5em; color: #374151; }
        .notion-reader .ql-editor p { margin-bottom: 1.25em; }
        .notion-reader .ql-editor p:has(img) { display: flex; justify-content: center; text-align: center; width: 100%; }
        .notion-reader .ql-editor b, .notion-reader .ql-editor strong { font-weight: 700; color: #111827; }
        .notion-reader .ql-editor img { border-radius: 12px; margin: 2em auto; display: block; max-width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #f3f4f6; }
        .notion-reader .ql-editor ul, .notion-reader .ql-editor ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        .notion-reader .ql-editor li { margin-bottom: 0.5em; }
        .notion-reader .ql-editor blockquote { border-left: 4px solid #4f46e5; padding-left: 1em; margin: 1.5em 0; font-style: italic; color: #4b5563; background: #fafafa; padding: 1em 1em 1em 1.5em; border-radius: 0 8px 8px 0; }
        .notion-reader .ql-editor code { background: #f3f4f6; padding: 0.2em 0.4em; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.85em; color: #ef4444; }
        .notion-reader .ql-editor pre { background: #1f2937; color: #f3f4f6; padding: 1em; border-radius: 12px; overflow-x: auto; margin-bottom: 1.2em; }
        .notion-reader .ql-editor .ql-formula { padding: 4px 8px; background: #faf5ff; border-radius: 6px; border: 1px solid #e9d5ff; color: #7c3aed; display: inline-block; font-size: 0.9em; margin: 0 0.2em; }
      `,
                }}
            />

            {/* Top Bar - Clean / Sticky */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100/50 z-30 transition-all">
                <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors" />
                    </button>

                    <div className="flex items-center gap-1">
                        {(user?.role === "pakar" || user?.role === "admin") && (
                            <button
                                onClick={handleVerifyPakar}
                                className="hidden sm:flex mr-2 items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-lg text-[13px] font-['Lexend_Deca'] font-bold transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4" /> Verifikasi
                            </button>
                        )}
                        <button
                            onClick={handleShare}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                        >
                            <Share2 className="w-[18px] h-[18px]" />
                        </button>
                        <button
                            onClick={() =>
                                requireAuth(() => toggleBookmark(note.id))
                            }
                            className={`p-2 rounded-full transition-colors ${isBookmarked(note.id) ? "text-primary bg-primary/5 hover:bg-primary/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                        >
                            <Bookmark
                                className={`w-[18px] h-[18px] ${isBookmarked(note.id) ? "fill-primary" : ""}`}
                            />
                        </button>
                        <button
                            onClick={() =>
                                requireAuth(() => {
                                    setReportTarget({
                                        type: "note",
                                        id: note.id,
                                        title: note.title,
                                    });
                                    setShowReportModal(true);
                                })
                            }
                            className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-500 hover:text-red-500"
                        >
                            <Flag className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-5 lg:px-0 pt-8 mt-2">
                {/* Title */}
                <h1 className="font-['Lexend_Deca'] font-extrabold text-[2.5rem] md:text-[3.25rem] text-gray-900 mb-4 leading-[1.12] tracking-tight">
                    {note.title}
                </h1>

                {/* Category & Tags (Substack / Medium style over title) */}
                <div className="flex flex-wrap gap-2.5 mb-8 items-center">
                    <span className="text-[12px] font-['Lexend_Deca'] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        {note.mataPelajaran}
                    </span>
                    <span className="text-[14px] font-['Manrope'] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {note.jenjang === "Kuliah"
                            ? `${note.kelas || "1"}`
                            : `${note.jenjang} Kelas ${note.kelas}`}
                    </span>
                    <span className="text-[14px] font-['Manrope'] font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hidden sm:block">
                        Semester {note.semester}
                    </span>
                </div>

                {/* Medium-style Author Info Bar */}
                <div className="flex items-center gap-4 py-4 mb-6">
                    <Link to={`/profile/${author._id || author.id}`}>
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100 bg-gray-50 hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer"
                        />
                    </Link>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/profile/${author._id || author.id}`}
                                className="font-['Manrope'] font-bold text-gray-900 text-[15px] hover:text-primary transition-colors"
                            >
                                {author.name}
                            </Link>
                            {isAuthenticated &&
                                user?.id !== author.id &&
                                user?.id !== author._id &&
                                user?._id !== author.id &&
                                user?._id !== author._id && (
                                    <button
                                        onClick={() =>
                                            requireAuth(handleFollowToggle)
                                        }
                                        className={`text-sm font-['Manrope'] font-semibold transition-colors ${
                                            isFollowing
                                                ? "text-gray-500 hover:text-gray-700"
                                                : "text-emerald-600 hover:text-emerald-700"
                                        }`}
                                    >
                                        • {isFollowing ? "Mengikuti" : "Ikuti"}
                                    </button>
                                )}
                            {!isAuthenticated && (
                                <button
                                    onClick={() => openAuthModal("login")}
                                    className="text-sm font-['Manrope'] text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                                >
                                    • Ikuti
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-[13px] font-['Manrope'] text-gray-500 mt-0.5">
                            <div className="flex items-center gap-1.5">
                                <span>{note.createdAt}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>5 mnt baca</span>
                            </div>
                            {author.role === "pakar" && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                                    <span className="text-green-600 font-semibold flex items-center gap-1 hidden sm:flex">
                                        <Check className="w-3.5 h-3.5" /> Pakar
                                        Terverifikasi
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interactivity Bar Top */}
                <div className="flex items-center justify-between py-3 border-y border-gray-100/80 mb-10 px-1">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleLikePost}
                            className="flex items-center gap-2 text-[15px] font-['Manrope'] font-medium transition-colors group"
                            aria-label="Suka catatan"
                        >
                            <Heart
                                className={`w-5 h-5 transition-transform group-hover:scale-110 ${liked ? "fill-red-500 text-red-500" : "text-gray-500 group-hover:text-red-500"}`}
                            />
                            <span
                                className={
                                    liked ? "text-red-500" : "text-gray-500"
                                }
                            >
                                {note.likes}
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                const commentsSection =
                                    document.getElementById("comments-section");
                                if (commentsSection) {
                                    commentsSection.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                            className="flex items-center gap-2 text-[15px] font-['Manrope'] font-medium text-gray-500 hover:text-gray-800 transition-colors group"
                        >
                            <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-transform group-hover:scale-110" />
                            <span>{comments.length}</span>
                        </button>

                        <div className="flex items-center gap-2 text-[15px] font-['Manrope'] font-medium text-gray-500 ml-2 hidden sm:flex">
                            <Eye className="w-5 h-5 text-gray-500" />
                            <span>{note.views}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {note.isValidated && (
                            <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wide font-['Manrope'] font-bold border border-green-100/50">
                                <Check className="w-3 h-3" />
                                Review Pakar
                            </div>
                        )}
                    </div>
                </div>

                {/* Editor Content Area (Borderless Notion / Substack View) */}
                <div
                    id="area-materi-pdf"
                    className="notion-reader ql-snow mb-16"
                >
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                </div>
                {/* 🔥 KURUNG TUTUPNYA PINDAH KE SINI YA DER! 🔥 */}

                {/* Paywall simulatiom if not logged in (Optional UI flair, matching mock design "Download PDF") */}
                <div className="mt-14 bg-gray-50/80 rounded-3xl p-8 md:p-10 text-center border border-gray-100">
                    <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 mb-3">
                        Ingin membaca materi ini secara offline?
                    </h3>
                    <p className="font-['Manrope'] text-[15px] text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                        Unduh file aslinya dalam format PDF untuk dipelajari
                        kapan saja tanpa koneksi internet.
                    </p>
                    <button
                        onClick={handleDownloadPDF}
                        className="mx-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-['Lexend_Deca'] font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <DownloadCloud className="w-5 h-5" /> Download PDF
                        Materi
                    </button>
                </div>

                {/* Bottom Banner Validation (Minimalist Bright Style) */}
                {note.isValidated && validator && (
                    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 shadow-sm border border-indigo-100/60 w-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 flex-1 relative z-10">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                                <Check className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 mb-1.5">
                                    Materi Terverifikasi
                                </h4>
                                <p className="font-['Manrope'] text-gray-600 text-[15px] leading-relaxed max-w-lg">
                                    Konten catatan ini telah melalui pemeriksaan
                                    kebenaran materi oleh pakar pendidikan
                                    terpercaya Ba-Yu.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/80 rounded-2xl p-4 border border-indigo-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 shrink-0 shrink-0 w-full sm:w-auto relative z-10 backdrop-blur-sm">
                            <img
                                src={validator.avatar}
                                alt={validator.name}
                                className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
                            />
                            <div>
                                <p className="text-[11px] font-['Manrope'] text-gray-500 uppercase tracking-wide mb-0.5">
                                    Divalidasi Oleh
                                </p>
                                <p className="text-[15px] font-['Lexend_Deca'] font-bold text-primary">
                                    {validator.name}
                                </p>
                                {note.rating && (
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < note.rating! ? "fill-yellow-400 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Separator */}
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-16"></div>

                {/* Author Bottom Profile (Substack style) */}
                <div className="mb-20">
                    <h4 className="font-['Lexend_Deca'] font-bold text-[13px] text-gray-400 uppercase tracking-widest mb-6 text-center sm:text-left">
                        DITULIS OLEH
                    </h4>
                    <div className="bg-transparent flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <Link to={`/profile/${author._id || author.id}`}>
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shrink-0 border border-gray-100 hover:ring-4 hover:ring-primary/20 transition-all cursor-pointer"
                            />
                        </Link>
                        <div className="flex-1">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Link
                                    to={`/profile/${author._id || author.id}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    <h3 className="font-['Lexend_Deca'] font-extrabold text-[28px] text-gray-900 hover:text-primary transition-colors">
                                        {author.name}
                                    </h3>
                                </Link>
                                {author.role === "pakar" && (
                                    <div
                                        className="bg-green-500 text-white p-0.5 rounded-full"
                                        title="Verified Expert"
                                    >
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            <p className="font-['Manrope'] text-[16px] text-gray-600 mb-6 max-w-xl leading-relaxed">
                                {author.role === "pakar"
                                    ? "Pakar Pendidikan tersertifikasi yang aktif membimbing siswa dan meninjau ribuan catatan."
                                    : `Siswa ${author.jenjang} yang aktif membagikan catatannya. Mari belajar bersama dan raih prestasi!`}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={() =>
                                        requireAuth(handleFollowToggle)
                                    }
                                    className={`w-full sm:w-auto px-8 py-3 rounded-full text-[15px] font-['Manrope'] font-bold transition-all ${
                                        isFollowing
                                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            : "bg-gray-900 text-white hover:bg-black"
                                    }`}
                                >
                                    {isFollowing
                                        ? "Mengikuti"
                                        : "Ikuti Penulis"}
                                </button>

                                <div className="flex items-center gap-6 mt-4 sm:mt-0 font-['Manrope'] text-[15px] text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-gray-900">
                                            {followerCount}
                                        </span>{" "}
                                        Pengikut
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-gray-900">
                                            {author.totalCatatan || 0}
                                        </span>{" "}
                                        Tulisan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section (Bottom placement) */}
                <div
                    id="comments-section"
                    className="mb-24 pt-10 border-t border-gray-100"
                >
                    <h4 className="font-['Lexend_Deca'] font-bold text-2xl text-gray-900 mb-8">
                        Diskusi ({comments.length})
                    </h4>

                    {/* Comment Input */}
                    {isAuthenticated ? (
                        <div className="mb-12 flex gap-4 bg-white p-2 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                            <img
                                src={
                                    user?.avatar ||
                                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                }
                                alt="Your avatar"
                                className="w-10 h-10 rounded-full border border-gray-200 object-cover shrink-0 hidden sm:block m-4"
                            />
                            <div className="flex-1 p-2">
                                <textarea
                                    dir="ltr"
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    placeholder="Apa pendapatmu? Jadilah yang pertama memulai diskusi."
                                    className="w-full px-2 py-2 bg-transparent border-none font-['Manrope'] text-base text-left resize-none focus:outline-none focus:ring-0 min-h-[80px]"
                                />
                                <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-3">
                                    <p className="text-xs text-gray-400 font-['Manrope'] px-2">
                                        Format dengan Markdown didukung (segera)
                                    </p>
                                    <button
                                        onClick={handleComment}
                                        disabled={
                                            !commentText.trim() ||
                                            isSubmittingComment
                                        }
                                        className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-['Lexend_Deca'] font-semibold disabled:opacity-40 transition-all shadow-sm"
                                    >
                                        {isSubmittingComment
                                            ? "Mengirim..."
                                            : "Kirim"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-12 bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                            <MessageCircle className="w-8 h-8 text-gray-400 mb-3" />
                            <h5 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 mb-1">
                                Punya Pertanyaan?
                            </h5>
                            <p className="font-['Manrope'] text-[15px] text-gray-500 mb-6">
                                Gabung dengan diskusi dan tanyakan langsung ke
                                penulis atau pakar.
                            </p>
                            <button
                                onClick={() => openAuthModal("login")}
                                className="px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl text-[15px] font-['Lexend_Deca'] font-bold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-5 h-5" /> Masuk untuk
                                Berkomentar
                            </button>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6 sm:space-y-8">
                        {comments.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="font-['Manrope'] text-base text-gray-400">
                                    Belum ada komentar.
                                </p>
                            </div>
                        ) : (
                            comments
                                .filter((c) => !c.parent_comment_id)
                                .map((root) => {
                                    const rootId = root._id || root.id;
                                    const childReplies = comments.filter(
                                        (c) => c.parent_comment_id === rootId,
                                    );

                                    const renderCommentItem = (
                                        comment: any,
                                        isReply: boolean = false,
                                    ) => {
                                        const cAuth =
                                            comment.user ||
                                            getUserById(comment.userId);
                                        if (!cAuth) return null;
                                        const cid = comment._id || comment.id;
                                        const currentLikes =
                                            comment.likes_count || 0;
                                        const isLiked =
                                            comment.is_liked ||
                                            comment.is_liked_by_me ||
                                            false;

                                        return (
                                            <div
                                                key={`comment-el-${cid}`}
                                                id={`comment-${cid}`}
                                                className={`flex gap-3 sm:gap-4 p-2 rounded-2xl ${isReply ? "bg-gray-50/50" : ""}`}
                                            >
                                                <Link
                                                    to={`/profile/${cAuth._id || cAuth.id}`}
                                                >
                                                    <img
                                                        src={
                                                            cAuth.avatar ||
                                                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
                                                        }
                                                        alt={cAuth.name}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0 border border-gray-100 hover:ring-2 hover:ring-primary/20 transition-all"
                                                    />
                                                </Link>
                                                <div className="flex-1 w-full overflow-hidden">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="flex items-center gap-2 cursor-pointer">
                                                            <Link
                                                                to={`/profile/${cAuth._id || cAuth.id}`}
                                                                className="font-['Manrope'] font-bold text-base text-gray-900 hover:underline hover:text-primary transition-colors"
                                                            >
                                                                {cAuth.name}
                                                            </Link>
                                                            {cAuth.role ===
                                                                "pakar" && (
                                                                <Check className="w-3.5 h-3.5 bg-green-500 text-white rounded-full p-[2px]" />
                                                            )}
                                                            <span className="text-xs font-['Manrope'] text-gray-400">
                                                                {new Date(
                                                                    comment.created_at ||
                                                                        comment.createdAt ||
                                                                        new Date(),
                                                                ).toLocaleDateString(
                                                                    "id-ID",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "short",
                                                                    },
                                                                )}
                                                            </span>
                                                        </div>

                                                        <div className="relative">
                                                            <button
                                                                onClick={() =>
                                                                    setActiveCommentMenu(
                                                                        activeCommentMenu ===
                                                                            cid
                                                                            ? null
                                                                            : cid,
                                                                    )
                                                                }
                                                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                                                            >
                                                                <MoreHorizontal className="w-5 h-5" />
                                                            </button>

                                                            {activeCommentMenu ===
                                                                cid && (
                                                                <>
                                                                    <div
                                                                        className="fixed inset-0 z-40"
                                                                        onClick={() =>
                                                                            setActiveCommentMenu(
                                                                                null,
                                                                            )
                                                                        }
                                                                    />
                                                                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 overflow-hidden transform origin-top-right transition-all">
                                                                        {isAuthenticated &&
                                                                            user &&
                                                                            (user._id ||
                                                                                user.id) ===
                                                                                (cAuth._id ||
                                                                                    cAuth.id ||
                                                                                    comment.user_id) && (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setActiveCommentMenu(
                                                                                            null,
                                                                                        );
                                                                                        handleDeleteComment(
                                                                                            cid,
                                                                                        );
                                                                                    }}
                                                                                    className="w-full text-left px-4 py-2.5 text-[14px] font-['Manrope'] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                                >
                                                                                    <Trash2 className="w-4 h-4" />{" "}
                                                                                    Hapus
                                                                                    Komentar
                                                                                </button>
                                                                            )}
                                                                        <button
                                                                            onClick={() =>
                                                                                requireAuth(
                                                                                    () => {
                                                                                        setActiveCommentMenu(
                                                                                            null,
                                                                                        );
                                                                                        setReportTarget(
                                                                                            {
                                                                                                type: "comment",
                                                                                                id: cid,
                                                                                            },
                                                                                        );
                                                                                        setShowReportModal(
                                                                                            true,
                                                                                        );
                                                                                    },
                                                                                )
                                                                            }
                                                                            className="w-full text-left px-4 py-2.5 text-[14px] font-['Manrope'] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                                        >
                                                                            <Flag className="w-4 h-4 text-gray-500" />{" "}
                                                                            Laporkan
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="font-['Manrope'] text-[15.5px] text-gray-800 leading-relaxed mb-2.5 break-words">
                                                        {comment.content ||
                                                            comment.text}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-[13px] font-['Manrope'] font-semibold text-gray-500">
                                                        <button
                                                            onClick={async () => {
                                                                if (
                                                                    !isAuthenticated
                                                                )
                                                                    return openAuthModal(
                                                                        "login",
                                                                    );
                                                                try {
                                                                    const tk =
                                                                        localStorage.getItem(
                                                                            "bayu-token",
                                                                        ) ||
                                                                        sessionStorage.getItem(
                                                                            "bayu-token",
                                                                        );

                                                                    const res =
                                                                        await axios.post(
                                                                            `/api/v1/comments/${cid}/like`,
                                                                            {},
                                                                            {
                                                                                headers:
                                                                                    {
                                                                                        Authorization: `Bearer ${tk}`,
                                                                                    },
                                                                            },
                                                                        );

                                                                    setComments(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            prev.map(
                                                                                (
                                                                                    c,
                                                                                ) =>
                                                                                    (c._id ||
                                                                                        c.id) ===
                                                                                    cid
                                                                                        ? {
                                                                                              ...c,
                                                                                              likes_count:
                                                                                                  res
                                                                                                      .data
                                                                                                      .likes_count,
                                                                                              is_liked:
                                                                                                  res
                                                                                                      .data
                                                                                                      .is_liked,
                                                                                              is_liked_by_me:
                                                                                                  res
                                                                                                      .data
                                                                                                      .is_liked,
                                                                                          }
                                                                                        : c,
                                                                            ),
                                                                    );
                                                                } catch (e) {
                                                                    console.error(
                                                                        e,
                                                                    );
                                                                    showToast(
                                                                        "Gagal memproses like komentar",
                                                                        "error",
                                                                    );
                                                                }
                                                            }}
                                                            className={`flex items-center gap-1.5 transition-colors ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
                                                        >
                                                            <Heart
                                                                className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`}
                                                            />{" "}
                                                            Suka{" "}
                                                            {currentLikes > 0 &&
                                                                `(${currentLikes})`}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (
                                                                    !isAuthenticated
                                                                )
                                                                    return openAuthModal(
                                                                        "login",
                                                                    );
                                                                setReplyingTo({
                                                                    id: cid,
                                                                    name: cAuth.name,
                                                                });
                                                                setReplyText(
                                                                    "",
                                                                );
                                                            }}
                                                            className="flex items-center gap-1.5 hover:text-gray-900"
                                                        >
                                                            <MessageCircle className="w-3.5 h-3.5" />{" "}
                                                            Balas
                                                        </button>
                                                    </div>

                                                    {replyingTo?.id === cid && (
                                                        <div className="mt-4 bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-3 items-end sm:items-center">
                                                            <textarea
                                                                dir="ltr"
                                                                autoFocus
                                                                placeholder={`Membalas ${cAuth.name}...`}
                                                                value={
                                                                    replyText
                                                                }
                                                                onChange={(e) =>
                                                                    setReplyText(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full sm:flex-1 bg-transparent border-none text-[15px] font-['Manrope'] text-left focus:outline-none focus:ring-0 resize-none h-[40px] pt-2"
                                                                onKeyDown={async (
                                                                    e,
                                                                ) => {
                                                                    if (
                                                                        e.key ===
                                                                            "Enter" &&
                                                                        !e.shiftKey
                                                                    ) {
                                                                        e.preventDefault();
                                                                        await handleReplySubmit(
                                                                            rootId,
                                                                        ); // reply matches the parent root
                                                                    }
                                                                }}
                                                            />
                                                            <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-gray-50 pt-2 sm:pt-0">
                                                                <button
                                                                    onClick={() =>
                                                                        setReplyingTo(
                                                                            null,
                                                                        )
                                                                    }
                                                                    className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-['Lexend_Deca'] font-bold bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                                                >
                                                                    Batal
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleReplySubmit(
                                                                            rootId,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !replyText.trim() ||
                                                                        isSubmittingReply
                                                                    }
                                                                    className="px-4 py-1.5 text-white bg-primary hover:bg-indigo-600 disabled:opacity-50 text-xs font-['Lexend_Deca'] font-bold rounded-lg transition-colors shadow-sm"
                                                                >
                                                                    {isSubmittingReply
                                                                        ? "Menyimpan..."
                                                                        : "Kirim"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    };

                                    return (
                                        <div
                                            key={rootId}
                                            className="flex flex-col gap-3 sm:gap-4"
                                        >
                                            {renderCommentItem(root, false)}
                                            {childReplies.length > 0 && (
                                                <div className="ml-10 sm:ml-12 flex flex-col gap-3 sm:gap-4 border-l-[3px] border-gray-100 pl-4 sm:pl-5">
                                                    {childReplies.map((child) =>
                                                        renderCommentItem(
                                                            child,
                                                            true,
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        )}
                    </div>
                </div>

                {/* Recommended Notes Section */}
                <div className="mt-8 mb-24 border-t border-gray-100 pt-16">
                    <h4 className="font-['Lexend_Deca'] font-bold text-2xl text-gray-900 mb-8 border-l-4 border-primary pl-4">
                        Rekomendasi Catatan Lainnya
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedNotes.map((recNote) => {
                            const recAuthor = getUserById(recNote.authorId);
                            return (
                                <Link
                                    key={recNote.id}
                                    to={`/notes/${recNote.id}`}
                                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                                >
                                    <div className="relative h-48 overflow-hidden bg-gray-50">
                                        <img
                                            src={recNote.thumbnail}
                                            alt={recNote.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wide font-['Lexend_Deca'] font-bold text-primary shadow-sm">
                                            {recNote.mataPelajaran}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                            {recNote.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={recAuthor?.avatar}
                                                    alt={recAuthor?.name}
                                                    className="w-8 h-8 rounded-full border border-gray-100 object-cover"
                                                />
                                                <span className="text-sm font-['Manrope'] font-bold text-gray-700">
                                                    {recAuthor?.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <Heart className="w-4 h-4 text-gray-400" />{" "}
                                                    {recNote.likes}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </article>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 text-white rounded-full shadow-xl hover:bg-black hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                    aria-label="Kembali ke atas"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
            )}
        </div>
    );

    const modals = (
        <>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultTab={authTab}
            />

            {/* Modal Report */}
            {showReportModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 mb-2">
                            Laporkan{" "}
                            {reportTarget?.type === "note"
                                ? "Catatan"
                                : "Komentar"}
                        </h3>
                        <p className="font-['Manrope'] text-sm text-gray-500 mb-4">
                            Bantu kami menjaga lingkungan belajar yang positif
                            dan aman.
                        </p>

                        <div className="mb-4">
                            <label className="block font-['Manrope'] text-sm font-semibold text-gray-700 mb-1.5">
                                Alasan Pelaporan
                            </label>
                            <select
                                value={reportReason}
                                onChange={(e) =>
                                    setReportReason(e.target.value)
                                }
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            >
                                <option value="">Pilih Alasan...</option>
                                <option value="Spam">
                                    Spam pemasaran/promosi
                                </option>
                                <option value="Informasi Palsu">
                                    Informasi keliru / misinformasi
                                </option>
                                <option value="Kata Kasar">
                                    Menggunakan kata kasar / ujaran kebencian
                                </option>
                                <option value="Pelecehan">
                                    Pelecehan atau intimidasi
                                </option>
                                <option value="Lainnya">Lainnya...</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block font-['Manrope'] text-sm font-semibold text-gray-700 mb-1.5">
                                Deskripsi Singkat
                            </label>
                            <textarea
                                value={reportDescription}
                                onChange={(e) =>
                                    setReportDescription(e.target.value)
                                }
                                placeholder="Beritahu kami lebih detail tentang laporan ini..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none h-24"
                            ></textarea>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="px-5 py-2 rounded-xl font-['Manrope'] font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReportSubmit}
                                disabled={isSubmittingReport}
                                className="px-5 py-2 rounded-xl font-['Lexend_Deca'] font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isSubmittingReport
                                    ? "Mengirim..."
                                    : "Kirim Laporan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    if (isAuthenticated) {
        return (
            <MobileLayout showBottomNav={false}>
                {noteContent}
                {modals}
            </MobileLayout>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar variant="default" />
            {noteContent}
            <Footer />
            {modals}
        </div>
    );
}
