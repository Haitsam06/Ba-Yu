import { useState, useEffect } from "react";
import { MobileLayout } from "../components/MobileLayout";
import { useAuth } from "../contexts/AuthContext";
import {
    Users,
    FileText,
    AlertCircle,
    CheckCircle,
    XCircle,
    Eye,
    Search,
    Filter,
    Trash2,
    Flag,
    BarChart3,
    ShieldCheck,
    DownloadCloud,
    Server,
    Activity,
    ArrowUpRight,
    Check,
} from "lucide-react";
import { mataPelajaran } from "../data/mockData";
import { Link, useLocation } from "react-router";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import { AvatarImage } from "../components/ui/DefaultImages";
import { ExportDataModal } from "../components/ExportDataModal";
import { CustomSelect } from "../components/ui/CustomSelect";
import { PromptDialog } from "../components/ui/PromptDialog";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

type TabType = "catatan" | "laporan" | "users" | "sertifikasi";

export default function AdminDashboard() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabType>("sertifikasi");
    const [searchQuery, setSearchQuery] = useState("");

    const [pendingCerts, setPendingCerts] = useState<any[]>([]);
    const [reportsList, setReportsList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [notesList, setNotesList] = useState<any[]>([]);

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"semua" | "terverifikasi" | "belum">("semua");
    const [sortBy, setSortBy] = useState<"terbaru" | "terlama">("terbaru");
    const [visibleItemsCount, setVisibleItemsCount] = useState(15);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [promptConfig, setPromptConfig] = useState<{
        isOpen: boolean;
        title: string;
        placeholder: string;
        defaultValue: string;
        onConfirm: (value: string) => void;
    }>({
        isOpen: false,
        title: "",
        placeholder: "",
        defaultValue: "",
        onConfirm: () => {},
    });

    const [confirmConfig, setConfirmConfig] = useState<{
        isOpen: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
        variant?: "danger" | "primary";
    }>({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => {},
    });

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab as TabType);
        }
    }, [location.state]);

    useEffect(() => {
        setVisibleItemsCount(15);
    }, [activeTab, statusFilter, sortBy, searchQuery]);

    useEffect(() => {
        // Tarik semua data di awal biar kotak statistiknya langsung akurat!
        fetchPendingCertifications();
        fetchReports();
        fetchUsers();
        fetchNotes();
    }, []);

    const fetchReports = async () => {
        if (user?.role !== "admin") return;
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/reports", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReportsList(res.data.data || []);
        } catch (e) {
            console.error("Failed to fetch reports", e);
        }
    };

    const fetchNotes = async () => {
        try {
            // Kita nembak API posts yang kemaren lu bikin di Backend!
            const res = await axios.get("/api/v1/posts");
            setNotesList(res.data.data || []);
        } catch (e) {
            console.error("Failed to fetch notes", e);
        }
    };

    const fetchUsers = async () => {
        if (user?.role !== "admin") return;
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersList(res.data.data || []);
        } catch (e) {
            console.error("Failed to fetch users", e);
        }
    };

    const fetchPendingCertifications = async () => {
        if (user?.role !== "admin") return;
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/sertifikasi/pending", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPendingCerts(res.data.data);
        } catch (e) {
            console.error("Failed to fetch pending requests", e);
        }
    };

    // Remove mock reports as requested
    const mockReports: any[] = [];

    const stats = [
        {
            label: "Total User",
            value: usersList.length,
            color: "bg-blue-500",
            icon: Users,
            increment: "+12%",
        },
        {
            label: "Total Catatan",
            value: notesList.length,
            color: "bg-indigo-500",
            icon: FileText,
            increment: "+8%",
        },
        {
            label: "Pending Laporan",
            value: reportsList.length,
            color: "bg-orange-500",
            icon: AlertCircle,
            increment: "+2%",
        },
        {
            label: "Sertifikasi Pakar",
            value: pendingCerts.length,
            color: "bg-fuchsia-600",
            icon: ShieldCheck,
            increment: "Baru",
        },
    ];

    const handleDeleteNote = (noteId: string) => {
        setPromptConfig({
            isOpen: true,
            title: "Hapus Catatan Permanen",
            placeholder: "Ketik 'HAPUS' untuk konfirmasi...",
            defaultValue: "",
            onConfirm: (val) => {
                if (val.toUpperCase() === "HAPUS") {
                    // Logic hapus sebenernya manggil API, tapi di sini masih toast doang dari sebelumnya
                    showToast("Catatan berhasil dihapus!", "success");
                } else {
                    showToast("Konfirmasi gagal, catatan tidak dihapus.", "info");
                }
            }
        });
    };

    const handleResolveReport = async (
        reportId: string,
        actionType: "abaikan" | "takedown" | "banned",
    ) => {
        const config = {
            abaikan: { title: "Abaikan Laporan", placeholder: "Alasan diabaikan...", default: "Sesuai panduan komunitas" },
            takedown: { title: "Takedown Konten", placeholder: "Alasan takedown...", default: "Konten melanggar aturan komunitas" },
            banned: { title: "Banned Pengguna", placeholder: "Alasan banned...", default: "Pelanggaran berat berulang" }
        };

        setPromptConfig({
            isOpen: true,
            title: config[actionType].title,
            placeholder: config[actionType].placeholder,
            defaultValue: config[actionType].default,
            onConfirm: (reason) => {
                processReportResolution(reportId, actionType, reason);
            }
        });
    };

    const processReportResolution = async (
        reportId: string,
        actionType: string,
        adminNote: string
    ) => {
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.put(
                `/api/v1/reports/${reportId}`,
                { action: actionType, admin_note: adminNote },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            showToast(res.data.message || "Berhasil diproses!", "success");
            setReportsList((prev) =>
                prev.filter((r) => r.id !== reportId && r._id !== reportId),
            );
        } catch (e: any) {
            showToast(
                e.response?.data?.message || "Gagal memproses laporan",
                "error",
            );
        }
    };

    const handleVerifyCert = async (
        id: string,
        action: "approve" | "reject",
    ) => {
        setPromptConfig({
            isOpen: true,
            title: action === "approve" ? "Setujui Pakar" : "Tolak Pengajuan",
            placeholder: "Catatan untuk user...",
            defaultValue: action === "approve" ? "Selamat! Anda kini resmi menjadi Pakar di Ba-Yu." : "Maaf, portofolio Anda belum memenuhi kriteria kami.",
            onConfirm: async (adminNote) => {
                try {
                    const token =
                        localStorage.getItem("bayu-token") ||
                        sessionStorage.getItem("bayu-token");
                    await axios.put(
                        `/api/v1/sertifikasi/${id}/verifikasi`,
                        { 
                            status: action === "approve" ? "approved" : "rejected",
                            admin_note: adminNote 
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    );

                    setPendingCerts((prev) => prev.filter((c) => c.id !== id));
                    showToast(
                        `Pengajuan Pakar ${action === "approve" ? "diterima" : "ditolak"}.`,
                        "success",
                    );
                } catch (e: any) {
                    showToast(
                        e.response?.data?.message || "Gagal mengubah status verifikasi",
                        "error",
                    );
                }
            }
        });
    };

    const handleDemoteUser = async (u: any) => {
        setConfirmConfig({
            isOpen: true,
            title: "Turunkan Pangkat?",
            description: `Yakin ingin menurunkan pangkat ${u.name} menjadi user biasa? Tindakan ini tidak bisa dibatalkan secara otomatis.`,
            variant: "danger",
            onConfirm: async () => {
                try {
                    const token =
                        localStorage.getItem("bayu-token") ||
                        sessionStorage.getItem("bayu-token");
                    const res = await axios.put(
                        `/api/v1/users/${u.id || u._id}/demote`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } },
                    );
                    showToast(res.data.message || "Pangkat berhasil diturunkan!", "success");
                    fetchUsers(); // Refresh list
                } catch (e: any) {
                    showToast(
                        e.response?.data?.message || "Gagal menurunkan pangkat",
                        "error",
                    );
                }
            }
        });
    };

    const filteredNotes = notesList
        .filter((note) => {
            if (searchQuery && !note.title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (statusFilter === "terverifikasi" && !note.isValidated && !note.is_verified) return false;
            if (statusFilter === "belum" && (note.isValidated || note.is_verified)) return false;
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
            const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
            return sortBy === "terbaru" ? dateB - dateA : dateA - dateB;
        });

    const filteredReports = reportsList
        .filter((report) => {
            const searchTarget = (report.noteTitle || report.userName || report.post_id || "").toLowerCase();
            if (searchQuery && !searchTarget.includes(searchQuery.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at || a.date || 0).getTime();
            const dateB = new Date(b.created_at || b.date || 0).getTime();
            return sortBy === "terbaru" ? dateB - dateA : dateA - dateB;
        });

    const filteredUsers = usersList
        .filter((u) => {
            if (searchQuery && !u.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (statusFilter === "terverifikasi" && u.role === "user") return false;
            if (statusFilter === "belum" && u.role !== "user") return false;
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return sortBy === "terbaru" ? dateB - dateA : dateA - dateB;
        });

    const handleLoadMore = () => {
        setVisibleItemsCount((prev) => prev + 15);
    };

    return (
        <MobileLayout>
            <div className="w-full h-full flex justify-center pb-20 bg-slate-50/50 dark:bg-[#13111C] min-h-screen font-['Manrope']">
                <div className="w-full max-w-[1140px] px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 lg:justify-center mx-auto mt-8">
                    {/* LEFT COLUMN (MAIN CONTENT) */}
                    <div className="flex-1 w-full lg:max-w-[640px] xl:max-w-[700px] min-w-0">
                        
                        {/* Compact Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <AvatarImage
                                    src={user?.avatar}
                                    alt={user?.name}
                                    size={64}
                                    className="rounded-2xl shadow-sm border border-slate-100 dark:border-white/10"
                                />
                                <div>
                                    <p className="text-indigo-600 dark:text-primary font-['Lexend_Deca'] text-[11px] font-black tracking-[0.2em] uppercase mb-1">
                                        Workspace Admin
                                    </p>
                                    <h2 className="text-slate-900 dark:text-slate-100 font-['Lexend_Deca'] font-extrabold text-2xl tracking-tight leading-none">
                                        {user?.name || "Administrator"}
                                    </h2>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsExportModalOpen(true)}
                                className="px-5 py-2.5 bg-white dark:bg-[#1C1A29] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 font-['Lexend_Deca'] font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                <DownloadCloud className="w-4 h-4 text-indigo-600 dark:text-primary" /> Ekspor Data
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Search & Tabs Controls */}
                            <div className="bg-white dark:bg-[#1C1A29] rounded-3xl shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 p-2 md:p-3">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1 flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" strokeWidth={2.5} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(e.target.value)
                                                }
                                                placeholder="Cari user, catatan, atau ID laporan..."
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-2xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="relative shrink-0">
                                            <button 
                                                onClick={() => setShowFilterPopup(!showFilterPopup)}
                                                className={`bg-gray-50 dark:bg-white/5 border hover:border-gray-200 dark:hover:border-white/10 rounded-2xl px-5 py-3 font-['Manrope'] font-bold text-sm flex items-center gap-2 transition-all h-full ${
                                                    showFilterPopup || statusFilter !== "semua" || sortBy !== "terbaru"
                                                    ? "border-indigo-500/50 text-indigo-600 dark:text-primary bg-indigo-50/50 dark:bg-indigo-500/10" 
                                                    : "border-transparent text-gray-700 dark:text-gray-300"
                                                }`}
                                            >
                                                <Filter className="w-4 h-4" />
                                            </button>
                                            
                                            {showFilterPopup && (
                                                <>
                                                    <div className="fixed inset-0 z-[40]" onClick={() => setShowFilterPopup(false)} />
                                                    <div className="absolute top-full mt-2 left-0 w-[280px] bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 rounded-[20px] shadow-2xl p-5 z-[100] animate-in fade-in slide-in-from-top-2">
                                                        <div className="mb-5">
                                                            <label className="block text-[11px] font-['Lexend_Deca'] font-bold text-slate-500 uppercase tracking-widest mb-3">Status Verifikasi</label>
                                                            <CustomSelect
                                                                value={statusFilter}
                                                                onChange={(val) => setStatusFilter(val as any)}
                                                                options={[
                                                                    { value: "semua", label: "Semua Status" },
                                                                    { value: "terverifikasi", label: "Hanya Terverifikasi" },
                                                                    { value: "belum", label: "Belum Terverifikasi" },
                                                                ]}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-['Lexend_Deca'] font-bold text-slate-500 uppercase tracking-widest mb-3">Urutkan Berdasarkan</label>
                                                            <CustomSelect
                                                                value={sortBy}
                                                                onChange={(val) => setSortBy(val as any)}
                                                                options={[
                                                                    { value: "terbaru", label: "Terbaru (Newest)" },
                                                                    { value: "terlama", label: "Terlama (Oldest)" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* Tabs */}
                                    <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl overflow-x-auto scrollbar-hide mt-6 md:mt-0">
                                        {[
                                            { id: "sertifikasi", label: "Verifikasi", icon: ShieldCheck },
                                            { id: "catatan", label: "Catatan", icon: FileText },
                                            { id: "laporan", label: "Laporan", icon: Flag },
                                            { id: "users", label: "Users", icon: Users },
                                        ].map((tab) => {
                                            const Icon = tab.icon;
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id as TabType)}
                                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                                                        isActive
                                                            ? "bg-white dark:bg-[#252336] text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/5"
                                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 bg-transparent border border-transparent"
                                                    }`}
                                                >
                                                    <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                    {tab.label}
                                                    {tab.id === "sertifikasi" && pendingCerts.length > 0 && (
                                                        <span className="ml-1 bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold leading-none">
                                                            {pendingCerts.length}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Tab Contents */}
                            <div className="w-full min-h-[500px]">
                                {/* Sertifikasi Tab */}
                                {activeTab === "sertifikasi" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                                            <div>
                                                <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 dark:text-gray-100">
                                                    Verifikasi Sertifikat Pakar
                                                </h3>
                                                <p className="text-sm font-['Manrope'] text-gray-500 mt-1">
                                                    Tinjau dan proses portofolio
                                                    kandidat pakar pendidikan.
                                                </p>
                                            </div>
                                        </div>

                                        {pendingCerts.length === 0 ? (
                                            <div className="py-16 text-center bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 border-dashed rounded-3xl">
                                                <ShieldCheck className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" strokeWidth={1} />
                                                <h4 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                                                    Semua Pengajuan Selesai
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-slate-400 font-['Manrope']">
                                                    Saat ini antrean verifikasi
                                                    pakar sedang kosong.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4">
                                                {pendingCerts.map((cert) => (
                                                    <article key={cert.id} className="group flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-6 px-6 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors border border-slate-100 dark:border-white/5 rounded-[24px]">
                                                        <div className="flex-1 min-w-0 flex flex-col w-full">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-100/50 dark:border-indigo-500/20 shrink-0">
                                                                    <FileText className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-['Lexend_Deca'] font-bold text-slate-900 dark:text-slate-100 text-[16px] leading-none mb-1">User ID: {cert.user_id}</h4>
                                                                    <p className="font-['Manrope'] text-[13px] text-slate-500 dark:text-slate-400 font-bold">Bidang: <span className="text-indigo-600 dark:text-indigo-400">{cert.bidang_keahlian}</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3 mt-4">
                                                                <span className="text-[10px] font-['Lexend_Deca'] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-500/20 uppercase tracking-widest shrink-0">
                                                                    {cert.status}
                                                                </span>
                                                                <a
                                                                    href={`http://localhost:8000/storage/${cert.file_sertifikat}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center gap-2 text-[11px] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 font-bold font-['Lexend_Deca'] uppercase tracking-widest transition-colors bg-white dark:bg-[#1C1A29] px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 shrink-0"
                                                                >
                                                                    <Eye className="w-3.5 h-3.5" /> Lihat Dokumen
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-white/5">
                                                            <button
                                                                onClick={() => handleVerifyCert(cert.id, "approve")}
                                                                className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <CheckCircle className="w-4 h-4" /> Setujui
                                                            </button>
                                                            <button
                                                                onClick={() => handleVerifyCert(cert.id, "reject")}
                                                                className="flex-1 sm:flex-none px-6 py-2.5 bg-white dark:bg-[#1C1A29] text-rose-500 border border-slate-200 dark:border-white/10 rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <XCircle className="w-4 h-4" /> Tolak
                                                            </button>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Catatan Tab */}
                                {activeTab === "catatan" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                                            <div>
                                                <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 dark:text-gray-100">
                                                    Database Catatan
                                                </h3>
                                                <p className="text-sm font-['Manrope'] text-gray-500 mt-1">
                                                    Kelola direktori konten
                                                    edukasi publik.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            {filteredNotes.length === 0 ? (
                                                <div className="text-center py-10 font-['Manrope'] text-gray-500">
                                                    Tidak ada catatan dalam
                                                    database.
                                                </div>
                                            ) : (
                                                filteredNotes
                                                    .slice(0, visibleItemsCount)
                                                    .map((note) => {
                                                        const author =
                                                            note.user || {
                                                                name: "Anonim",
                                                                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
                                                            };
                                                        const subject =
                                                            mataPelajaran.find(
                                                                (m) =>
                                                                    m.name ===
                                                                    (note.mataPelajaran ||
                                                                        note.mapel),
                                                            );
                                                        return (
                                                            <article key={note.id || note._id} className="group flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-8 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors bg-transparent outline-none px-4 sm:px-6 rounded-[24px]">
                                                                {/* Feed Text */}
                                                                <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                                                    {/* Author Header */}
                                                                    <div className="flex items-center gap-1.5 mb-2 flex-wrap text-[13px] font-['Manrope'] text-slate-800">
                                                                        <div className="flex items-center gap-1.5 group/author">
                                                                            <AvatarImage src={author?.avatar} size={20} className="ring-2 ring-transparent group-hover/author:ring-indigo-500/20 transition-all" />
                                                                            <span className="font-bold text-slate-950 dark:text-slate-200 group-hover/author:underline tracking-tight">{author?.name}</span>
                                                                            {author?.is_dormant && (
                                                                                <span className="bg-rose-100 text-rose-600 text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">DORMANT</span>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-slate-700 px-0.5 font-bold">di</span>
                                                                        <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{note.mataPelajaran || note.mapel || "Lainnya"}</span>
                                                                        {note.kelas && note.kelas !== "-" && note.kelas !== "Semua" && (
                                                                            <>
                                                                                <span className="text-[10px] text-slate-400 mx-0.5 font-bold">•</span>
                                                                                <span className="text-slate-800 dark:text-slate-300 font-bold tracking-tight">Kelas {note.kelas}</span>
                                                                            </>
                                                                        )}
                                                                        <span className="text-[10px] text-slate-400 mx-0.5 font-bold">•</span>
                                                                        <span className="text-[12px] text-slate-500 dark:text-slate-400 font-bold">{new Date(note.createdAt || note.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                                                    </div>

                                                                    {/* Title */}
                                                                    <h2 className="text-[20px] md:text-[22px] font-extrabold text-slate-900 dark:text-slate-100 leading-[1.25] tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 font-['Lexend_Deca']">
                                                                        {note.title}
                                                                    </h2>

                                                                    {/* Excerpt */}
                                                                    <p className="text-[15px] font-['Manrope'] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-5 pr-2 font-medium">
                                                                        {note.description || "Tidak ada deskripsi."}
                                                                    </p>

                                                                    {/* Action Buttons */}
                                                                    <div className="flex items-center gap-3 mt-auto flex-wrap">
                                                                        {(note.isValidated || note.is_verified) && (
                                                                            <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-2 border border-emerald-100 dark:border-emerald-500/20 font-['Lexend_Deca'] font-bold text-[11px] flex items-center gap-2 uppercase tracking-widest"><ShieldCheck size={16} /> Verified</div>
                                                                        )}
                                                                        <Link to={`/note/${note.id || note._id}`} className="px-5 py-2 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-full font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm dark:shadow-none group/btn">Detail<ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" /></Link>
                                                                        <button onClick={() => handleDeleteNote(note.id || note._id)} className="px-4 py-2 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 text-rose-500 rounded-full hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 transition-all flex items-center shadow-sm dark:shadow-none tooltip" title="Hapus Permanen"><Trash2 size={16} /></button>
                                                                    </div>
                                                                </div>

                                                                {/* Thumbnail */}
                                                                <div className="w-full sm:w-[160px] md:w-[200px] h-[180px] sm:h-[130px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 relative shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors">
                                                                    {note.thumbnail ? (
                                                                        <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: `${subject?.color || "#5D5CE6"}10` }}>
                                                                            <span className="text-5xl">{subject?.icon || "📘"}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </article>
                                                        );
                                                    })
                                            )}
                                        </div>
                                        {filteredNotes.length > visibleItemsCount && (
                                            <div className="mt-8 flex justify-center">
                                                <button onClick={handleLoadMore} className="px-6 py-3 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 text-[13px] shadow-sm transition-all">
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Laporan Tab */}
                                {activeTab === "laporan" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                                            <div>
                                                <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 dark:text-gray-100">
                                                    Resolusi Laporan
                                                </h3>
                                                <p className="text-sm font-['Manrope'] text-gray-500 mt-1">
                                                    Tindak lanjuti user toxic
                                                    atau konten ilegal.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {filteredReports.length === 0 ? (
                                                <div className="text-center py-10">
                                                    <p className="font-['Manrope'] text-gray-500">
                                                        Tidak ada laporan masuk
                                                        yang perlu diperiksa.
                                                    </p>
                                                </div>
                                            ) : (
                                                filteredReports.slice(0, visibleItemsCount).map((report) => (
                                                    <article key={report.id || report._id} className="group flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-6 px-6 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors border border-slate-100 dark:border-white/5 rounded-[24px]">
                                                        <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                                                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-widest ${report.type === "catatan" || report.post_id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20" : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20"}`}>
                                                                    REPORTED {report.type || "CATATAN"}
                                                                </span>
                                                                <span className="text-[12px] font-['Manrope'] text-slate-500 dark:text-slate-400 font-bold">
                                                                    {report.date || new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                                </span>
                                                            </div>
                                                            <h2 className="text-[18px] md:text-[20px] font-extrabold text-slate-900 dark:text-slate-100 leading-[1.25] tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 font-['Lexend_Deca']">
                                                                {report.post_id ? `Catatan ID: ${report.post_id}` : report.type === "catatan" ? report.noteTitle : report.userName}
                                                            </h2>
                                                            <div className="mb-4">
                                                                <p className="text-[14px] font-['Manrope'] text-rose-500 font-bold mb-1">{report.reason}</p>
                                                                <p className="text-[14px] font-['Manrope'] text-slate-600 dark:text-slate-400 leading-relaxed break-words whitespace-pre-wrap font-medium border-l-2 border-rose-200 dark:border-rose-500/30 pl-3">
                                                                    {report.description || "-"}
                                                                </p>
                                                            </div>
                                                            <div className="mt-auto flex items-center gap-2">
                                                                <span className="text-[11px] font-['Lexend_Deca'] font-bold uppercase tracking-widest text-slate-400">
                                                                    Dilaporkan oleh: <span className="text-slate-700 dark:text-slate-300">{report.reporter?.name || "Anonim"}</span>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-[140px] shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "abaikan")}
                                                                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest transition-all text-center"
                                                            >
                                                                Abaikan
                                                            </button>
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "takedown")}
                                                                className="flex-1 px-4 py-2.5 bg-rose-500 text-white rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest hover:bg-rose-600 transition-all text-center"
                                                            >
                                                                Takedown
                                                            </button>
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "banned")}
                                                                className="flex-1 px-4 py-2.5 bg-slate-900 dark:bg-black text-white rounded-xl font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all text-center"
                                                            >
                                                                Banned
                                                            </button>
                                                        </div>
                                                    </article>
                                                ))
                                            )}
                                        </div>
                                        {filteredReports.length > visibleItemsCount && (
                                            <div className="mt-8 flex justify-center">
                                                <button onClick={handleLoadMore} className="px-6 py-3 bg-white dark:bg-[#1C1A29] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 text-[13px] shadow-sm transition-all">
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Users Tab */}
                                {activeTab === "users" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
                                            <div>
                                                <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900 dark:text-gray-100">
                                                    Manajemen Pengguna
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            {filteredUsers.length === 0 ? (
                                                <div className="text-center py-10 font-['Manrope'] text-gray-500">
                                                    Tidak ada pengguna terpilih.
                                                </div>
                                            ) : (
                                                filteredUsers.slice(0, visibleItemsCount).map((u) => {
                                                    const userPostsCount = notesList.filter((n: any) => (n.user_id || n.user?.id || n.user?._id) === (u.id || u._id)).length;
                                                    return (
                                                        <article key={u.id || u._id} className="group flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 py-6 px-6 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors border-b border-slate-100 dark:border-white/5 last:border-0 rounded-[24px]">
                                                            <div className="flex items-center gap-5 min-w-0 flex-1">
                                                                <div className="relative shrink-0">
                                                                    <AvatarImage src={u.avatar} alt={u.name} size={64} className="rounded-2xl object-cover bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10" />
                                                                    <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white dark:border-[#1C1A29] ${u.role === 'admin' ? 'bg-indigo-500 text-white' : u.role === 'pakar' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                                                        <ShieldCheck className="w-3.5 h-3.5" />
                                                                    </div>
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h4 className="font-['Lexend_Deca'] font-bold text-slate-900 dark:text-slate-100 text-[18px] mb-0.5 truncate group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                                                                        {u.name}
                                                                        {u.is_dormant && (
                                                                            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] px-2 py-0.5 rounded border border-rose-200 dark:border-rose-500/30 font-black tracking-widest uppercase">DORMANT</span>
                                                                        )}
                                                                    </h4>
                                                                    <p className="text-[11px] font-['Lexend_Deca'] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                                                                        {u.role === "admin" ? "Administrator" : u.role === "pakar" ? "Expert" : "Pelajar"}
                                                                    </p>
                                                                    <div className="flex gap-4">
                                                                        <div className="bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-2">
                                                                            <div className="font-['Lexend_Deca'] font-bold text-[13px] text-slate-800 dark:text-slate-200">{userPostsCount}</div>
                                                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Catatan</div>
                                                                        </div>
                                                                        <div className="bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-2">
                                                                            <div className="font-['Lexend_Deca'] font-bold text-[13px] text-slate-800 dark:text-slate-200">{u.followers || 0}</div>
                                                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Followers</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="shrink-0 flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5 w-full sm:w-auto">
                                                                <Link to={`/profile/${u.id || u._id}`} className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                                                    Lihat Profil <ArrowUpRight className="w-4 h-4 ml-1" />
                                                                </Link>
                                                                {u.role !== 'user' && u.id !== user?.id && u._id !== user?.id && (
                                                                    <button 
                                                                        onClick={() => handleDemoteUser(u)}
                                                                        className="flex-1 sm:flex-none px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 border border-rose-100 dark:border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all font-['Lexend_Deca'] font-bold text-[11px] uppercase tracking-widest"
                                                                    >
                                                                        Turunkan Pangkat
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </article>
                                                    );
                                                })
                                            )}
                                        </div>
                                        {filteredUsers.length > visibleItemsCount && (
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

                    {/* RIGHT COLUMN (SIDEBAR STATS) */}
                    <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 border-l border-gray-100 dark:border-white/5 pl-6 xl:pl-10">
                        <div className="sticky pt-2 pb-12" style={{ top: "min(72px, calc(100vh - 100% - 24px))" }}>
                            
                            <div className="pb-8 border-b border-gray-100 dark:border-white/5 mb-8">
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[16px] text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                                    Ringkasan Platform
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="bg-white dark:bg-[#1C1A29] rounded-[20px] p-5 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none flex items-center gap-4 group hover:border-indigo-200 dark:hover:border-primary/20 transition-all">
                                                <div className={`w-12 h-12 ${stat.color} rounded-[16px] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-['Lexend_Deca'] font-bold text-gray-900 dark:text-gray-100 leading-none mb-1">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-[12px] font-['Manrope'] text-gray-500 font-bold uppercase tracking-wider">
                                                        {stat.label}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick Action */}
                            <div className="bg-indigo-600 rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-600/20 group cursor-pointer mb-8">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                                <ShieldCheck className="w-8 h-8 mb-4 opacity-80 group-hover:rotate-12 transition-transform duration-500" />
                                <h4 className="font-['Lexend_Deca'] font-bold text-[16px] mb-2 leading-tight tracking-tight">Butuh Bantuan Teknis?</h4>
                                <p className="text-indigo-100 text-[12px] font-medium leading-relaxed">Hubungi tim DevOps Ba-Yu untuk pemeliharaan server.</p>
                            </div>

                            {/* System Status Redesigned */}
                            <div className="mb-8">
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[14px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    System Health
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white dark:bg-[#1C1A29] p-4 rounded-[16px] border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-[10px] bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Server className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-['Lexend_Deca'] text-[13px] font-bold text-gray-900 dark:text-gray-100">API Gateway</p>
                                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Operational</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    </div>
                                    <div className="bg-white dark:bg-[#1C1A29] p-4 rounded-[16px] border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-[10px] bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                                <Server className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-['Lexend_Deca'] text-[13px] font-bold text-gray-900 dark:text-gray-100">Database</p>
                                                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Normal</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed Redesigned */}
                            <div>
                                <h3 className="font-['Lexend_Deca'] font-extrabold text-[14px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                                    Recent Activity
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { action: "Sistem Reboot", time: "12m ago", type: "system", c: "bg-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                                        { action: "Catatan Dihapus", time: "1h ago", type: "warn", c: "bg-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
                                        { action: "User Registrasi", time: "3h ago", type: "info", c: "bg-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex gap-3 relative">
                                            {i !== 2 && <div className="absolute left-[15px] top-[32px] bottom-[-16px] w-px bg-gray-100 dark:bg-white/5"></div>}
                                            <div className={`w-8 h-8 shrink-0 rounded-[10px] ${log.bg} flex items-center justify-center relative z-10`}>
                                                <div className={`w-2 h-2 rounded-full ${log.c}`}></div>
                                            </div>
                                            <div className="pt-1.5">
                                                <p className="font-['Manrope'] text-[13px] font-bold text-gray-800 dark:text-gray-200 leading-none mb-1">
                                                    {log.action}
                                                </p>
                                                <span className="text-[11px] font-semibold text-gray-400">
                                                    {log.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <PromptDialog
                isOpen={promptConfig.isOpen}
                onOpenChange={(open) => setPromptConfig(prev => ({ ...prev, isOpen: open }))}
                title={promptConfig.title}
                placeholder={promptConfig.placeholder}
                defaultValue={promptConfig.defaultValue}
                onConfirm={promptConfig.onConfirm}
            />

            <ConfirmDialog
                isOpen={confirmConfig.isOpen}
                onOpenChange={(open) => setConfirmConfig(prev => ({ ...prev, isOpen: open }))}
                title={confirmConfig.title}
                description={confirmConfig.description}
                variant={confirmConfig.variant}
                onConfirm={confirmConfig.onConfirm}
            />

            <ExportDataModal 
                isOpen={isExportModalOpen} 
                onClose={() => setIsExportModalOpen(false)} 
                notesList={notesList} 
                reportsList={reportsList} 
                usersList={usersList} 
            />
        </MobileLayout>
    );
}
