import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import {
    Clock,
    Heart,
    MessageCircle,
    Bookmark,
    ShieldCheck,
    FileText,
    MoreHorizontal,
    Share2,
    Download,
    Edit2,
    Trash2,
    AlertTriangle,
    X,
    Lock
} from "lucide-react";
import { AvatarImage, DefaultThumbnail } from "./ui/DefaultImages";
import { TagList } from "./ui/TagList";
import { useBookmarks } from "../contexts/BookmarkContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

interface NoteCardProps {
    note: {
        id: string;
        title: string;
        description: string;
        thumbnail: string | null;
        author: {
            id: string | number;
            _id?: string | number;
            name: string;
            username?: string;
            avatar: string | null;
            is_private?: boolean;
        };
        mataPelajaran: string;
        jenjang?: string;
        kelas?: string;
        semester?: string;
        createdAt: string | Date;
        updatedAt?: string | Date;
        views?: number;
        likes?: number;
        comments?: number;
        is_liked?: boolean;
        is_verified?: boolean;
        submitted_for_review?: boolean;
        tags?: string[];
        read_time?: number;
    };
    onLike?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    className?: string;
    showBookmark?: boolean;
    isDraft?: boolean;
    renderActions?: (note: any) => React.ReactNode;
}

export function NoteCard({ note, onLike, onDelete, className = "", showBookmark = true, isDraft = false, renderActions }: NoteCardProps) {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const authorId = note.author?.id || note.author?._id;
    
    const formatDate = (dateValue: any) => {
        if (!dateValue) return "Baru saja";
        const d = new Date(dateValue);
        if (isNaN(d.getTime())) return "Baru saja";
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formattedDate = formatDate(note.createdAt);
    const formattedUpdateDate = note.updatedAt ? formatDate(note.updatedAt) : formattedDate;

    const targetUrl = isDraft ? `/upload?id=${note.id}` : `/note/${note.id}`;

    return (
        <article
            className={`group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-8 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors bg-transparent outline-none ${className} ${isDraft ? 'cursor-pointer' : ''}`}
        >
            {/* Feed Text */}
            <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                {/* Author Header */}
                <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-gray-800 dark:text-gray-400">
                    <Link
                        to={`/profile/${authorId}`}
                        className="flex items-center gap-1.5 group/author outline-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AvatarImage
                            src={note.author?.avatar}
                            alt={note.author?.name || note.author?.username}
                            size={20}
                            className="ring-2 ring-slate-100 dark:ring-white/5 group-hover/author:ring-primary/20 transition-all"
                        />
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-950 dark:text-gray-200 group-hover/author:underline tracking-tight">
                                {note.author?.name ? note.author.name : (note.author?.username ? `@${note.author.username}` : "Anonim")}
                            </span>
                            {note.author?.is_private && (
                                <Lock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                            )}
                        </div>
                    </Link>
                    <span className="text-gray-700 dark:text-gray-500 px-0.5 font-bold">
                        di
                    </span>
                    <span className="font-extrabold text-gray-900 dark:text-gray-300 tracking-tight">
                        {note.mataPelajaran}
                    </span>
                    {note.jenjang && note.jenjang !== "Umum" && note.jenjang !== "-" && (
                        <>
                            <span className="text-[10px] text-gray-700 dark:text-gray-500 mx-0.5 font-bold">
                                •
                            </span>
                            <span className="text-gray-800 dark:text-gray-400 font-bold tracking-tight">
                                {note.jenjang === "Kuliah"
                                    ? `${note.kelas || "S1/D4"} Semester ${note.semester || 1}`
                                    : (note.kelas && note.kelas !== "Semua" && note.kelas !== "-" ? `${note.jenjang} Kelas ${note.kelas}` : note.jenjang)}
                            </span>
                        </>
                    )}

                    {note.is_verified && (
                        <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-md ml-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                    )}

                    {isDraft && (
                        <span className="ml-1.5 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                            Draft
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link
                    to={targetUrl}
                    className="block mb-2 outline-none font-['Lexend_Deca'] cursor-pointer"
                >
                    <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 dark:text-gray-100 leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        {note.title || (isDraft ? "Draft Tanpa Judul" : "Tanpa Judul")}
                    </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-[15px] font-['Manrope'] text-gray-700 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4 pr-2 font-medium">
                    {note.description}
                </p>

                {/* Tags */}
                {note.tags && note.tags.length > 0 && (
                    <TagList tags={note.tags} />
                )}

                {/* Meta Footer (Medium Style) */}
                <div className={`flex items-center justify-between ${!(note.tags && note.tags.length > 0) ? 'mt-auto' : ''}`}>
                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-500 font-bold">
                        <Clock
                            className="w-[14px] h-[14px] text-gray-600 dark:text-gray-500"
                            strokeWidth={2.5}
                        />
                        <span className="text-[13px] font-['Manrope']">
                            {isDraft ? `Edit terakhir: ${formattedUpdateDate}` : formattedDate}
                        </span>
                    </div>

                    {!isDraft && (
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                            {renderActions ? renderActions(note) : (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (onLike) onLike(note.id);
                                    }}
                                    className={`flex items-center gap-1.5 transition-colors focus:outline-none font-bold ${note.is_liked ? "text-rose-500" : "text-gray-600 dark:text-gray-500 hover:text-rose-500 dark:hover:text-rose-400"}`}
                                    title={`${note.likes || 0} suka`}
                                >
                                    <Heart
                                        className={`w-[15px] h-[15px] transition-all duration-300 ${note.is_liked ? "fill-rose-500 text-rose-500 scale-110" : ""}`}
                                        strokeWidth={2.5}
                                    />
                                    <span className="text-[13px] font-['Manrope']">
                                        {note.likes || 0}
                                    </span>
                                </button>
                                <button
                                    className="flex items-center gap-1.5 text-gray-600 dark:text-gray-500 hover:text-gray-950 dark:hover:text-gray-300 transition-colors focus:outline-none font-bold"
                                    title={`${note.comments || 0} komentar`}
                                >
                                    <MessageCircle
                                        className="w-[15px] h-[15px] text-gray-600 dark:text-gray-500"
                                        strokeWidth={2.5}
                                    />
                                    <span className="text-[13px] font-['Manrope']">
                                        {note.comments || 0}
                                    </span>
                                </button>
                                {showBookmark && (
                                    <button
                                        aria-label="Save"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleBookmark(note.id);
                                        }}
                                        className={`p-1.5 rounded-full transition-all duration-300 outline-none active:scale-75 ml-1 ${isBookmarked(note.id) ? "text-primary scale-110" : "text-gray-500 hover:text-primary"}`}
                                    >
                                        <Bookmark
                                            className={`w-[18px] h-[18px] transition-all duration-300 ${isBookmarked(note.id) ? "fill-primary" : ""}`}
                                            strokeWidth={2}
                                        />
                                    </button>
                                )}
                            </>
                            )}

                            {/* Dropdown Menu */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowMenu(!showMenu);
                                    }}
                                    className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none"
                                >
                                    <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                </button>
                                {showMenu && (
                                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-[#1C1A29] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/5 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <button
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                e.stopPropagation(); 
                                                setShowMenu(false); 
                                                if(navigator.share) { 
                                                    navigator.share({ title: note.title, url: `${window.location.origin}/note/${note.id}` }); 
                                                } else { 
                                                    navigator.clipboard.writeText(`${window.location.origin}/note/${note.id}`); 
                                                    showToast("Tautan disalin!", "success");
                                                } 
                                            }}
                                            className="w-full text-left px-4 py-2 text-[13px] font-['Manrope'] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <Share2 className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Bagikan
                                        </button>
                                        <button
                                            onClick={async (e) => { 
                                                e.preventDefault(); 
                                                e.stopPropagation(); 
                                                setShowMenu(false); 
                                                showToast("Menyiapkan PDF...", "info");
                                                try {
                                                    const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
                                                    const res = await axios.get(`/api/v1/posts/${note.id}`, {
                                                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                                                    });
                                                    downloadNoteAsPDF(res.data.data, showToast);
                                                } catch (err) {
                                                    showToast("Gagal mengunduh catatan", "error");
                                                }
                                            }}
                                            className="w-full text-left px-4 py-2 text-[13px] font-['Manrope'] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Unduh
                                        </button>
                                        
                                        {user && (user.id === authorId || user._id === authorId) && !note.is_verified && !note.submitted_for_review && (
                                            <>
                                                <div className="h-px bg-gray-100 dark:bg-white/5 my-1"></div>
                                                <button
                                                    onClick={async (e) => { 
                                                        e.preventDefault(); 
                                                        e.stopPropagation(); 
                                                        setShowMenu(false); 
                                                        try {
                                                            const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
                                                            await axios.post(`/api/v1/posts/${note.id}/ajukan`, {}, {
                                                                headers: { Authorization: `Bearer ${token}` }
                                                            });
                                                            showToast("Catatan berhasil diajukan ke Pakar!", "success");
                                                        } catch (err) {
                                                            showToast("Gagal mengajukan ke Pakar", "error");
                                                        }
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[13px] font-['Manrope'] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 flex items-center gap-2"
                                                >
                                                    <ShieldCheck className="w-4 h-4" /> Ajukan ke Pakar
                                                </button>
                                            </>
                                        )}

                                        {user && (user.id === authorId || user._id === authorId) && (
                                            <>
                                                <div className="h-px bg-gray-100 dark:bg-white/5 my-1"></div>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setShowMenu(false);
                                                        navigate(`/upload?id=${note.id}`);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[13px] font-['Manrope'] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Edit Catatan
                                                </button>
                                                <button
                                                    onClick={(e) => { 
                                                        e.preventDefault(); 
                                                        e.stopPropagation(); 
                                                        setShowMenu(false); 
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[13px] font-['Manrope'] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Hapus
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnail */}
            <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1C1A29] relative shadow-sm dark:shadow-none">
                <Link
                    to={targetUrl}
                    className="block w-full h-full outline-none cursor-pointer"
                >
                    {note.thumbnail ? (
                        <img
                            src={note.thumbnail}
                            alt={note.title}
                            className="w-full h-full object-cover transition-transform duration-500"
                        />
                    ) : (
                        <DefaultThumbnail 
                            className="w-full h-full rounded-2xl" 
                            subject={note.mataPelajaran}
                            title={note.title}
                        />
                    )}
                    {/* Floating badge */}
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-['Lexend_Deca'] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                        {isDraft ? (
                            <><FileText className="w-3 h-3" /> DRAF</>
                        ) : (
                            <><Clock className="w-3 h-3" /> {note.read_time || 1}m</>
                        )}
                    </div>
                </Link>
            </div>

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="bg-white dark:bg-[#1C1A29] rounded-3xl w-full max-w-sm shadow-xl dark:shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-[#1C1A29] shadow-sm dark:shadow-none">
                                <AlertTriangle className="w-8 h-8" strokeWidth={2.5} />
                            </div>
                            <h3 className="font-['Lexend_Deca'] font-extrabold text-xl text-gray-900 dark:text-gray-100 mb-2">
                                Hapus Catatan?
                            </h3>
                            <p className="text-[13px] text-gray-600 dark:text-gray-400 font-['Manrope'] font-medium mb-6">
                                Tindakan ini tidak dapat dibatalkan. Catatan "{note.title}" akan dihapus permanen dari sistem.
                            </p>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-['Manrope'] font-bold text-[14px] hover:bg-gray-200 dark:hover:bg-white/15 transition-colors disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={async () => {
                                        setIsDeleting(true);
                                        try {
                                            const token = localStorage.getItem("bayu-token") || sessionStorage.getItem("bayu-token");
                                            await axios.delete(`/api/v1/posts/${note.id}`, {
                                                headers: { Authorization: `Bearer ${token}` }
                                            });
                                            showToast("Catatan berhasil dihapus", "success");
                                            setShowDeleteModal(false);
                                            if (onDelete) {
                                                onDelete(note.id);
                                            } else {
                                                window.location.reload();
                                            }
                                        } catch (error) {
                                            showToast("Gagal menghapus catatan", "error");
                                        } finally {
                                            setIsDeleting(false);
                                        }
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-['Manrope'] font-bold text-[14px] hover:bg-red-700 transition-colors shadow-md shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Ya, Hapus"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}

const downloadNoteAsPDF = (fullNote: any, showToast: any) => {
    const rawHtmlToExport = fullNote.content || fullNote.plain_content || "";
    let exportHtml = "";

    if (fullNote.is_restricted) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rawHtmlToExport;
        const children = Array.from(tempDiv.children).slice(0, 3);
        exportHtml = children.map(c => c.outerHTML).join("");
        exportHtml += "<p style='color: #94a3b8; font-style: italic; margin-top: 20px; font-weight: bold;'>[ ... Sisa materi disembunyikan dalam mode pratinjau ... ]</p>";
    } else {
        exportHtml = rawHtmlToExport;
    }

    const printWindow = window.open('', '', 'width=900,height=800');
    if (!printWindow) {
        showToast("Gagal membuka jendela cetak. Pastikan pop-up diizinkan.", "error");
        return;
    }
    const authorName = fullNote.user?.name || fullNote.user?.username || "Penulis";
    const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>${fullNote.title || "Materi Catatan"} - Ba-Yu</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Lexend+Deca:wght@400;600;800&display=swap');
                
                :root {
                    --primary: #4f46e5;
                    --text-main: #1f2937;
                    --text-muted: #6b7280;
                    --bg-color: #ffffff;
                }

                @page {
                    margin: 2cm;
                    size: A4 portrait;
                }

                body { 
                    font-family: 'Manrope', sans-serif; 
                    color: var(--text-main); 
                    line-height: 1.8; 
                    background-color: var(--bg-color);
                    margin: 0;
                    padding: 0;
                    font-size: 11pt;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                .header {
                    text-align: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 2px solid #f3f4f6;
                }

                .header h1 { 
                    font-family: 'Lexend Deca', sans-serif;
                    font-size: 24pt; 
                    font-weight: 800;
                    color: #111827; 
                    margin: 0 0 0.5rem 0;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }

                .meta {
                    font-size: 10pt;
                    color: var(--text-muted);
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    font-weight: 500;
                }

                .content {
                    max-width: 100%;
                }

                /* Typography */
                h2, h3, h4 { 
                    font-family: 'Lexend Deca', sans-serif;
                    color: #111827;
                    margin-top: 1.5em; 
                    margin-bottom: 0.5em; 
                    page-break-after: avoid;
                }
                h2 { font-size: 18pt; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
                h3 { font-size: 14pt; }
                p { margin-bottom: 1.2em; text-align: justify; }
                
                /* Elements */
                img { 
                    max-width: 100%; 
                    height: auto; 
                    border-radius: 8px; 
                    margin: 1.5em auto;
                    display: block;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    page-break-inside: avoid;
                }
                
                blockquote {
                    border-left: 4px solid var(--primary);
                    background: #f8fafc;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: #475569;
                    border-radius: 0 8px 8px 0;
                    page-break-inside: avoid;
                }

                pre { 
                    background: #1e293b; 
                    color: #f8fafc;
                    padding: 1.2rem; 
                    border-radius: 8px; 
                    overflow-x: auto; 
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 9.5pt;
                    page-break-inside: avoid;
                }
                
                code { 
                    font-family: 'Courier New', Courier, monospace; 
                    background: #f1f5f9;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    color: #ef4444;
                    font-size: 0.9em;
                }

                ul, ol { padding-left: 1.5em; margin-bottom: 1.2em; }
                li { margin-bottom: 0.5em; }

                .footer {
                    margin-top: 3rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e5e7eb;
                    text-align: center;
                    font-size: 9pt;
                    color: var(--text-muted);
                }

                .footer-brand {
                    font-family: 'Lexend Deca', sans-serif;
                    font-weight: 800;
                    color: var(--primary);
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${fullNote.title || "Materi Catatan"}</h1>
                <div class="meta">
                    <span>Ditulis oleh: ${authorName}</span>
                    <span>&bull;</span>
                    <span>Diunduh: ${dateStr}</span>
                </div>
            </div>
            
            <div class="content">
                ${exportHtml}
            </div>

            ${fullNote.is_restricted ? `
            <div style="margin-top: 40px; padding: 25px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a; font-family: 'Lexend Deca', sans-serif; font-size: 14pt;">Materi Terproteksi</h4>
                <p style="margin: 0; color: #475569; font-size: 10.5pt; font-family: 'Manrope', sans-serif;">
                    Versi PDF ini hanya memuat sebagian materi. Ikuti penulis <b>@${fullNote.user?.username || 'penulis'}</b> di aplikasi Ba-Yu untuk mengunduh versi lengkapnya.
                </p>
            </div>
            ` : ''}

            <div class="footer">
                Dokumen ini diunduh dari <span class="footer-brand">Ba-Yu</span> - Platform Belajar Masa Depan
            </div>
            
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        window.close();
                    }, 800);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

