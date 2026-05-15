import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { useAuth } from "../contexts/AuthContext";
import {
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    Search,
    Filter,
    ShieldCheck,
    Map,
    BookOpen,
    ChevronRight,
    TrendingUp,
    Zap,
    Activity,
    ArrowUpRight,
    LayoutGrid,
    ListFilter,
    Sparkles,
    FileText,
    Star,
    MessageSquare,
    Send,
    X
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from 'recharts';
import { mataPelajaran } from "../data/mockData";
import { Link } from "react-router";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import { AvatarImage } from "../components/ui/DefaultImages";
import { NoteCard } from "../components/NoteCard";
import { NoteCardSkeleton } from "../components/ui/skeletons";

type VerificationStatus = "pending" | "approved" | "all";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, reason: string) => void;
    type: "approve" | "reject" | "cancel";
    noteTitle: string;
}

const FeedbackModal = ({ isOpen, onClose, onSubmit, type, noteTitle }: FeedbackModalProps) => {
    const [rating, setRating] = useState(5);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleFormSubmit = async () => {
        setIsSubmitting(true);
        await onSubmit(rating, reason);
        setIsSubmitting(false);
        setReason("");
        setRating(5);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1C1A29] w-full max-w-lg rounded-[24px] shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-white/5">
                {/* Modal Header */}
                <div className={`p-6 md:p-8 pb-4 flex justify-between items-start ${type === 'approve' ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : type === 'cancel' ? 'bg-rose-50/50 dark:bg-rose-500/10' : 'bg-rose-50/50 dark:bg-rose-500/10'}`}>
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${type === 'approve' ? 'bg-indigo-600 text-white' : 'bg-rose-600 text-white'}`}>
                            {type === 'approve' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                        </div>
                        <div>
                            <h3 className="font-['Lexend_Deca'] text-xl font-bold text-slate-800 dark:text-slate-100">
                                {type === 'approve' ? 'Validasi Materi' : type === 'cancel' ? 'Batal Verifikasi' : 'Tolak Materi'}
                            </h3>
                            <p className="text-slate-500 text-sm font-medium line-clamp-1 mt-0.5">{noteTitle}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Rating Section */}
                    {type === 'approve' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={14} className="text-amber-500" /> Kualitas Materi
                                </label>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md ${
                                    rating <= 2 ? 'bg-orange-50 text-orange-600' : 
                                    rating <= 3 ? 'bg-indigo-50 text-indigo-600' : 
                                    'bg-emerald-50 text-emerald-600'
                                }`}>
                                    {rating === 1 && "Perlu Perbaikan"}
                                    {rating === 2 && "Cukup Baik"}
                                    {rating === 3 && "Bagus & Akurat"}
                                    {rating === 4 && "Sangat Rekomendasi"}
                                    {rating === 5 && "Luar Biasa / Sempurna"}
                                </span>
                            </div>

                            <div className="relative bg-slate-50/50 dark:bg-white/5 p-6 md:p-8 rounded-[20px] border border-slate-100 dark:border-white/5 flex flex-col items-center group/stars">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/5 via-amber-300/10 to-amber-200/5 opacity-0 group-hover/stars:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />
                                <div className="flex gap-4 relative z-10">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setRating(s)}
                                            className={`group/star transition-all duration-500 transform hover:scale-110 active:scale-95 ${rating >= s ? 'scale-105' : 'scale-100 grayscale opacity-30 hover:grayscale-0 hover:opacity-100'}`}
                                        >
                                            <div className="relative">
                                                <Star
                                                    size={40}
                                                    fill={rating >= s ? "#f59e0b" : "transparent"}
                                                    className={`${rating >= s ? "text-amber-500 drop-shadow-md" : "text-slate-300"} transition-all duration-300`}
                                                    strokeWidth={rating >= s ? 1.5 : 2}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-6 w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden relative">
                                    <div 
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                        style={{ width: `${(rating / 5) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Feedback Textarea */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <MessageSquare size={14} className="text-indigo-500" /> 
                            {type === 'approve' ? 'Feedback untuk Penulis' : type === 'cancel' ? 'Alasan Pembatalan' : 'Alasan Penolakan'}
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={type === 'approve' ? 'Berikan saran yang membangun...' : type === 'cancel' ? 'Alasan membatalkan verifikasi...' : 'Jelaskan kekurangan materi ini...'}
                            className="w-full h-28 p-4 bg-white dark:bg-[#13111C] border border-slate-200 dark:border-white/10 rounded-xl text-[14px] font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none shadow-sm dark:shadow-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-xl font-['Lexend_Deca'] font-bold text-[12px] uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none">Batal</button>
                        <button onClick={handleFormSubmit} disabled={isSubmitting || (type !== 'approve' && !reason.trim())} className={`flex-[2] py-3.5 rounded-xl font-['Lexend_Deca'] font-bold text-[12px] uppercase tracking-wider text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${type === 'approve' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
                            {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={14} />{type === 'approve' ? 'Konfirmasi Validasi' : type === 'cancel' ? 'Konfirmasi Batal' : 'Konfirmasi Tolak'}</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function PakarDashboard() {
    const { user } = useAuth();
    const [filter, setFilter] = useState<VerificationStatus>("pending");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"terbaru" | "terlama">("terbaru");
    const [visibleItemsCount, setVisibleItemsCount] = useState(15);
    const { showToast } = useToast();
    const [notes, setNotes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [selectedNoteForFeedback, setSelectedNoteForFeedback] = useState<any>(null);
    const [feedbackType, setFeedbackType] = useState<"approve" | "reject" | "cancel">("approve");

    const sparkData = [{ v: 40 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 55 }, { v: 85 }, { v: 75 }];

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/v1/posts?sort=terbaru&submitted_for_review=true");
            const formattedNotes = (response.data.data || []).map((note: any) => ({
                ...note,
                id: note._id || note.id,
                author: note.user ? { ...note.user, avatar: note.user.avatar || null } : { name: "Anonim", avatar: null },
                createdAt: note.created_at || note.createdAt,
                description: note.content ? note.content.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").substring(0, 150) + "..." : "Tidak ada deskripsi",
                mataPelajaran: note.mapel || "Lainnya",
                kelas: note.kelas || "-",
                isValidated: note.is_verified || false,
                isRejected: note.is_rejected || false,
            }));
            setNotes(formattedNotes);
        } catch (error) {
            console.error("Error fetching posts:", error);
            showToast("Gagal memuat data antrean", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleActionClick = (note: any, type: "approve" | "reject" | "cancel") => {
        setSelectedNoteForFeedback(note);
        setFeedbackType(type);
        setIsFeedbackModalOpen(true);
    };

    const handleVerifySubmit = async (rating: number, reason: string) => {
        if (!selectedNoteForFeedback) return;
        try {
            const tk = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
            const config = { headers: { Authorization: `Bearer ${tk}` } };
            const noteId = selectedNoteForFeedback.id;
            if (feedbackType === "approve") {
                await axios.put(`/api/v1/posts/${noteId}/verify`, { rating, reason }, config);
                showToast("Catatan berhasil divalidasi!", "success");
                setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isValidated: true, isRejected: false } : n));
            } else if (feedbackType === "cancel") {
                await axios.put(`/api/v1/posts/${noteId}/unverify`, { reason }, config);
                showToast("Verifikasi catatan dibatalkan.", "info");
                setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isValidated: false } : n));
            } else {
                await axios.put(`/api/v1/posts/${noteId}/reject`, { reason }, config);
                showToast("Catatan ditolak dengan alasan.", "success");
                setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isRejected: true, isValidated: false } : n));
            }
            setIsFeedbackModalOpen(false);
        } catch (error) {
            showToast("Gagal memproses verifikasi", "error");
        }
    };

    const pendingNotes = notes.filter((n) => !n.isValidated && !n.isRejected);
    const verifiedNotes = notes.filter((n) => n.isValidated);

    const stats = [
        { label: "Menunggu Validasi", value: pendingNotes.length, color: "text-amber-600", icon: Clock, sparkColor: "#f59e0b" },
        { label: "Materi Disetujui", value: verifiedNotes.length, color: "text-indigo-600", icon: CheckCircle, sparkColor: "#6366f1" },
        { label: "Total Kontrol", value: notes.length, color: "text-slate-600", icon: Activity, sparkColor: "#64748b" },
    ];

    const filteredNotes = (filter === "all" ? notes.filter(n => !n.isRejected) : filter === "pending" ? pendingNotes : verifiedNotes)
        .filter(n => {
            const q = searchQuery.toLowerCase();
            return n.title?.toLowerCase().includes(q) || n.mataPelajaran?.toLowerCase().includes(q) || n.author?.name?.toLowerCase().includes(q);
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
            const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
            return sortBy === "terbaru" ? dateB - dateA : dateA - dateB;
        });

    const handleLoadMore = () => {
        setVisibleItemsCount((prev) => prev + 15);
    };

    return (
        <MobileLayout>
            <div className="w-full h-full flex justify-center pb-20 bg-slate-50/50 dark:bg-[#13111C] min-h-screen font-['Manrope']">
                <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} onSubmit={handleVerifySubmit} type={feedbackType} noteTitle={selectedNoteForFeedback?.title || ""} />

                <div className="w-full max-w-[1140px] px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 lg:justify-center mx-auto mt-8">
                    {/* LEFT COLUMN (MAIN CONTENT) */}
                    <div className="flex-1 w-full lg:max-w-[640px] xl:max-w-[700px] min-w-0">
                        
                        {/* Premium Pakar Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-5">
                                <div className="relative group shrink-0">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-[18px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <AvatarImage src={user?.avatar} alt={user?.name} size={64} className="relative rounded-[16px] shadow-md border-2 border-white dark:border-white/10 ring-1 ring-slate-100 dark:ring-white/5" />
                                    <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center ring-2 ring-white dark:ring-[#13111C]">
                                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 font-['Lexend_Deca'] text-[10px] font-bold tracking-wider rounded-full border border-indigo-100/80 dark:border-indigo-500/20">
                                            <Sparkles className="w-3 h-3" />
                                            Verified Expert
                                        </span>
                                    </div>
                                    <h2 className="text-slate-900 dark:text-slate-100 font-['Lexend_Deca'] font-extrabold text-[22px] tracking-tight leading-none mb-1">
                                        {user?.name || "Pakar Ba-Yu"}
                                    </h2>
                                    <p className="text-[13px] font-['Manrope'] text-slate-500 dark:text-slate-400 font-medium">Panel kurasi dan validasi materi</p>
                                </div>
                            </div>
                            <Link to="/explore" className="px-5 py-2.5 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-['Lexend_Deca'] font-bold text-[12px] tracking-wide flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm dark:shadow-none transition-all group/btn">
                                <BookOpen size={16} />
                                Jelajahi
                                <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                            </Link>
                        </div>

                        <div className="space-y-6">

                            <div className="flex flex-col lg:flex-row items-center gap-4">
                                <div className="flex-1 relative w-full group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" /></div>
                                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari materi berdasarkan judul..." className="block w-full pl-12 pr-6 py-3.5 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 rounded-xl text-[14px] font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm dark:shadow-none" />
                                </div>
                                <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl">
                                    {[
                                        { id: "pending", label: "Antrean", icon: ListFilter },
                                        { id: "approved", label: "Verif", icon: CheckCircle },
                                        { id: "all", label: "Semua", icon: LayoutGrid },
                                    ].map((tab) => {
                                        const active = filter === tab.id;
                                        return (
                                            <button key={tab.id} onClick={() => setFilter(tab.id as any)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-wider transition-all ${active ? "bg-white dark:bg-[#252336] text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/5" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}>
                                                <tab.icon size={14} />{tab.label}
                                                {tab.id === 'pending' && pendingNotes.length > 0 && <span className={`ml-1 px-1.5 py-0.5 rounded-md flex items-center justify-center text-[9px] font-bold ${active ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"}`}>{pendingNotes.length}</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {isLoading ? (
                                    <div className="flex flex-col gap-6">
                                        {[...Array(3)].map((_, i) => (
                                            <NoteCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : filteredNotes.length === 0 ? (
                                    <div className="bg-white dark:bg-[#1C1A29] rounded-[24px] py-20 border border-slate-200 dark:border-white/10 border-dashed text-center flex flex-col items-center shadow-sm dark:shadow-none">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[20px] flex items-center justify-center mb-5"><CheckCircle className="w-10 h-10 text-slate-300 dark:text-white/20" /></div>
                                        <h3 className="font-['Lexend_Deca'] text-xl font-bold text-slate-800 dark:text-slate-100 mb-1.5">Tugas Selesai!</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium text-[14px]">Antrean materi verifikasi kamu kosong hari ini.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col">
                                            {filteredNotes.slice(0, visibleItemsCount).map((note) => (
                                                <NoteCard
                                                    key={note.id}
                                                    note={note}
                                                    renderActions={(n) => (
                                                        <>
                                                            {n.isValidated ? (
                                                                <>
                                                                    <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-3 py-1.5 border border-emerald-100 dark:border-emerald-500/20 font-['Lexend_Deca'] font-bold text-[10px] flex items-center gap-1.5 uppercase tracking-widest"><ShieldCheck size={14} /> Verified</div>
                                                                    <button onClick={() => handleActionClick(n, "cancel")} className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full font-['Lexend_Deca'] font-bold text-[10px] flex items-center gap-1.5 uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-500/30">Batal Verif</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => handleActionClick(n, "approve")} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-['Lexend_Deca'] font-bold text-[10px] hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all flex items-center gap-1.5 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20"><CheckCircle size={14} /> Setuju</button>
                                                                    <button onClick={() => handleActionClick(n, "reject")} className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full font-['Lexend_Deca'] font-bold text-[10px] hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all flex items-center gap-1.5 uppercase tracking-widest border border-rose-100 dark:border-rose-500/20"><XCircle size={14} /> Tolak</button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        {filteredNotes.length > visibleItemsCount && (
                                            <div className="mt-8 flex justify-center">
                                                <button onClick={handleLoadMore} className="px-6 py-3 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 text-[13px] shadow-sm transition-all">
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (SIDEBAR) */}
                    <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 border-l border-gray-100 dark:border-white/5 pl-6 xl:pl-10">
                        <div className="sticky pt-2 pb-12" style={{ top: "min(72px, calc(100vh - 100% - 24px))" }}>
                            
                            <div className="pb-8 border-b border-gray-100 dark:border-white/5 mb-8">
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[16px] text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                                    Statistik Kurasi
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="relative overflow-hidden bg-white dark:bg-[#1C1A29] rounded-[20px] p-5 border border-slate-100 dark:border-white/5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default">
                                                {/* Decorative background element */}
                                                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: stat.sparkColor }} />
                                                
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-slate-50 dark:bg-white/5 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: stat.sparkColor }} />
                                                        <Icon className={`w-[22px] h-[22px] ${stat.color} dark:text-slate-300 relative z-10`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[26px] font-['Lexend_Deca'] font-black text-slate-800 dark:text-slate-100 leading-none tracking-tight mb-1">
                                                            {stat.value}
                                                        </p>
                                                        <p className="text-[13px] font-['Manrope'] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                                                            {stat.label}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#1C1A29] rounded-[24px] p-6 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none relative overflow-hidden mb-6">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-bl-[24px]" />
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-[12px] flex items-center justify-center"><Map className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                                    <div><h3 className="font-['Lexend_Deca'] font-bold text-slate-800 dark:text-slate-100 text-[15px] tracking-tight">Pedoman Pakar</h3><p className="text-[11px] text-indigo-500 dark:text-indigo-400 font-semibold tracking-wide">Edisi 2026</p></div>
                                </div>
                                <div className="space-y-5">
                                    {[
                                        { title: "Verifikasi Teori", desc: "Pastikan rumus standar.", num: 1, c: "bg-blue-500" },
                                        { title: "Originalitas", desc: "Bukan copy-paste murni.", num: 2, c: "bg-indigo-500" },
                                        { title: "Kualitas Visual", desc: "Tulisan/gambar jelas.", num: 3, c: "bg-amber-500" },
                                    ].map((rule) => (
                                        <div key={rule.num} className="flex gap-4 group">
                                            <div className={`w-1.5 h-1.5 rounded-full ${rule.c} mt-1.5 shrink-0`} />
                                            <div><h4 className="text-[12px] font-bold text-slate-800 dark:text-slate-100 mb-0.5">{rule.title}</h4><p className="text-[12px] text-slate-500 font-medium leading-snug">{rule.desc}</p></div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3.5 bg-slate-800 dark:bg-indigo-600 text-white rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-wider shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-2">E-Pedoman<ChevronRight size={14} /></button>
                            </div>
                            
                            <div className="bg-indigo-600 rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-600/20 group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                                <ShieldCheck className="w-8 h-8 mb-4 opacity-80 group-hover:rotate-12 transition-transform duration-500" />
                                <h4 className="font-['Lexend_Deca'] font-bold text-[15px] mb-2 leading-tight tracking-tight">Kualitas Segalanya.</h4>
                                <p className="text-indigo-100 text-[12px] font-medium leading-relaxed">Terima kasih telah kurasi materi berkualitas untuk Ba-Yu.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
