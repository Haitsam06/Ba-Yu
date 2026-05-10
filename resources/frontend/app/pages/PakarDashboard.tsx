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

type VerificationStatus = "pending" | "approved" | "all";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, reason: string) => void;
    type: "approve" | "reject";
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
                <div className={`p-6 md:p-8 pb-4 flex justify-between items-start ${type === 'approve' ? 'bg-indigo-50/50 dark:bg-indigo-500/10' : 'bg-rose-50/50 dark:bg-rose-500/10'}`}>
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${type === 'approve' ? 'bg-indigo-600 text-white' : 'bg-rose-600 text-white'}`}>
                            {type === 'approve' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                        </div>
                        <div>
                            <h3 className="font-['Lexend_Deca'] text-xl font-bold text-slate-800 dark:text-slate-100">
                                {type === 'approve' ? 'Validasi Materi' : 'Tolak Materi'}
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
                            {type === 'approve' ? 'Feedback untuk Penulis' : 'Alasan Penolakan'}
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={type === 'approve' ? 'Berikan saran yang membangun...' : 'Jelaskan kekurangan materi ini...'}
                            className="w-full h-28 p-4 bg-white dark:bg-[#13111C] border border-slate-200 dark:border-white/10 rounded-xl text-[14px] font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none shadow-sm dark:shadow-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-xl font-['Lexend_Deca'] font-bold text-[12px] uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none">Batal</button>
                        <button onClick={handleFormSubmit} disabled={isSubmitting || (type === 'reject' && !reason.trim())} className={`flex-[2] py-3.5 rounded-xl font-['Lexend_Deca'] font-bold text-[12px] uppercase tracking-wider text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${type === 'approve' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
                            {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={14} />{type === 'approve' ? 'Konfirmasi Validasi' : 'Konfirmasi Tolak'}</>}
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
    const [feedbackType, setFeedbackType] = useState<"approve" | "reject">("approve");

    const sparkData = [{ v: 40 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 55 }, { v: 85 }, { v: 75 }];

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/v1/posts?sort=terbaru");
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

    const handleActionClick = (note: any, type: "approve" | "reject") => {
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
                setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isValidated: true } : n));
            } else {
                await axios.put(`/api/v1/posts/${noteId}/reject`, { reason }, config);
                showToast("Catatan ditolak dengan alasan.", "success");
                setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isRejected: true } : n));
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
                        
                        {/* Compact Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="relative group shrink-0">
                                    <AvatarImage src={user?.avatar} alt={user?.name} size={64} className="relative rounded-2xl shadow-sm border border-slate-100 dark:border-white/10" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-[#1C1A29] rounded-md shadow-sm flex items-center justify-center border border-slate-100 dark:border-white/10"><Sparkles className="w-3 h-3 text-indigo-600 dark:text-primary animate-pulse" /></div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-indigo-600 dark:text-primary font-['Lexend_Deca'] text-[11px] font-black tracking-[0.2em] uppercase">Verified Expert</span>
                                    </div>
                                    <h2 className="text-slate-900 dark:text-slate-100 font-['Lexend_Deca'] font-extrabold text-2xl tracking-tight leading-none">
                                        {user?.name || "Pakar Ba-Yu"}
                                    </h2>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="bg-slate-800 dark:bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-[12px] font-bold font-['Lexend_Deca'] uppercase tracking-wider flex items-center gap-2 hover:bg-slate-900 dark:hover:bg-indigo-700 shadow-sm transition-all"><BookOpen size={16} />Baca Massal</button>
                            </div>
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
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-10 h-10 border-4 border-indigo-100 dark:border-white/10 border-t-indigo-600 rounded-full animate-spin mb-4" />
                                        <span className="text-slate-400 dark:text-slate-500 font-semibold text-[13px] animate-pulse">Menghubungkan Server Pakar...</span>
                                    </div>
                                ) : filteredNotes.length === 0 ? (
                                    <div className="bg-white dark:bg-[#1C1A29] rounded-[24px] py-20 border border-slate-200 dark:border-white/10 border-dashed text-center flex flex-col items-center shadow-sm dark:shadow-none">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[20px] flex items-center justify-center mb-5"><CheckCircle className="w-10 h-10 text-slate-300 dark:text-white/20" /></div>
                                        <h3 className="font-['Lexend_Deca'] text-xl font-bold text-slate-800 dark:text-slate-100 mb-1.5">Tugas Selesai!</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium text-[14px]">Antrean materi verifikasi kamu kosong hari ini.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredNotes.slice(0, visibleItemsCount).map((note) => {
                                            const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                                            return (
                                                <article key={note.id} className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-8 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors bg-transparent outline-none px-4 sm:px-6 rounded-[24px]">
                                                    {/* Feed Text */}
                                                    <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                                        {/* Author Header */}
                                                        <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-slate-800">
                                                            <div className="flex items-center gap-1.5 group/author">
                                                                <AvatarImage src={note.author?.avatar} size={20} className="ring-2 ring-transparent group-hover/author:ring-indigo-500/20 transition-all" />
                                                                <span className="font-bold text-slate-950 dark:text-slate-200 group-hover/author:underline tracking-tight">{note.author?.name}</span>
                                                            </div>
                                                            <span className="text-slate-700 px-0.5 font-bold">di</span>
                                                            <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{note.mataPelajaran}</span>
                                                            {note.kelas && note.kelas !== "-" && note.kelas !== "Semua" && (
                                                                <>
                                                                    <span className="text-[10px] text-slate-400 mx-0.5 font-bold">•</span>
                                                                    <span className="text-slate-800 dark:text-slate-300 font-bold tracking-tight">Kelas {note.kelas}</span>
                                                                </>
                                                            )}
                                                            <span className="text-[10px] text-slate-400 mx-0.5 font-bold">•</span>
                                                            <span className="text-[12px] text-slate-500 dark:text-slate-400 font-bold">{new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                                        </div>

                                                        {/* Title */}
                                                        <h2 className="text-[20px] md:text-[22px] font-extrabold text-slate-900 dark:text-slate-100 leading-[1.25] tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 font-['Lexend_Deca']">
                                                            {note.title}
                                                        </h2>

                                                        {/* Excerpt */}
                                                        <p className="text-[15px] font-['Manrope'] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-5 pr-2 font-medium">
                                                            {note.description}
                                                        </p>

                                                        {/* Action Buttons for Pakar */}
                                                        <div className="flex items-center gap-3 mt-auto flex-wrap">
                                                            {note.isValidated ? (
                                                                <>
                                                                    <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-2 border border-emerald-100 dark:border-emerald-500/20 font-['Lexend_Deca'] font-bold text-[11px] flex items-center gap-2 uppercase tracking-widest"><ShieldCheck size={16} /> Verified</div>
                                                                    <Link to={`/note/${note.id}`} className="px-5 py-2 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-full font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm dark:shadow-none group/btn">Detail<ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" /></Link>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => handleActionClick(note, "approve")} className="px-5 py-2 bg-indigo-600 text-white rounded-full font-['Lexend_Deca'] font-bold text-[11px] shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-1.5 uppercase tracking-widest"><CheckCircle size={14} /> Setuju</button>
                                                                    <button onClick={() => handleActionClick(note, "reject")} className="px-4 py-2 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 text-rose-500 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 transition-all flex items-center shadow-sm dark:shadow-none"><XCircle size={16} /></button>
                                                                    <Link to={`/note/${note.id}`} className="px-5 py-2 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-full font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest flex items-center hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all shadow-sm dark:shadow-none">Detail</Link>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Thumbnail */}
                                                    <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 relative shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
                                                        {note.thumbnail ? (
                                                            <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover transition-transform duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${subject?.color || "#5D5CE6"}10` }}>
                                                                <span className="text-5xl transition-transform duration-500">{subject?.icon || "📘"}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </article>
                                            );
                                        })}
                                        
                                        {filteredNotes.length > visibleItemsCount && (
                                            <div className="mt-8 flex justify-center">
                                                <button onClick={handleLoadMore} className="px-6 py-3 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 text-[13px] shadow-sm transition-all">
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
                                <div className="flex flex-col gap-4">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="bg-white dark:bg-[#1C1A29] rounded-[20px] p-5 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none flex items-center gap-4 group hover:border-indigo-200 dark:hover:border-primary/20 transition-all">
                                                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform bg-slate-50 dark:bg-white/5`}>
                                                    <Icon className={`w-5 h-5 ${stat.color} dark:text-primary`} />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 leading-none mb-1">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-[12px] font-['Manrope'] text-gray-500 font-bold uppercase tracking-wider line-clamp-1">
                                                        {stat.label}
                                                    </p>
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
                                    <div><h3 className="font-['Lexend_Deca'] font-bold text-slate-800 dark:text-slate-100 text-[15px] uppercase tracking-tight">Pedoman</h3><p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-widest">Pakar 2026</p></div>
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
