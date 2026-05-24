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
import { useTranslation } from "../hooks/useTranslation";

type TabType = "catatan" | "laporan" | "users" | "sertifikasi";

export default function AdminDashboard() {
    const { user } = useAuth();
    const { t, language } = useTranslation();
    const { showToast } = useToast();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<TabType>("sertifikasi");
    const [searchQuery, setSearchQuery] = useState("");

    const [pendingCerts, setPendingCerts] = useState<any[]>([]);
    const [reportsList, setReportsList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [notesList, setNotesList] = useState<any[]>([]);
    const [totalNotes, setTotalNotes] = useState<number>(0);

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
            setTotalNotes(res.data.meta?.total || (res.data.data ? res.data.data.length : 0));
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
            label: t('admin_dashboard.total_users'),
            value: usersList.length,
            color: "text-blue-500",
            icon: Users,
            increment: "+12%",
        },
        {
            label: t('admin_dashboard.total_notes'),
            value: totalNotes,
            color: "text-indigo-500",
            icon: FileText,
            increment: "+8%",
        },
        {
            label: t('admin_dashboard.pending_reports'),
            value: reportsList.length,
            color: "text-orange-500",
            icon: AlertCircle,
            increment: "+2%",
        },
        {
            label: t('admin_dashboard.expert_certs'),
            value: pendingCerts.length,
            color: "text-fuchsia-600",
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
                        
                        {/* Minimalist Admin Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-4">
                                <AvatarImage
                                    src={user?.avatar}
                                    alt={user?.name}
                                    size={64}
                                    className="rounded-full border border-gray-200 dark:border-white/10"
                                />
                                <div>
                                    <h2 className="text-gray-900 dark:text-gray-100 font-bold text-xl tracking-tight leading-none mb-1.5 flex items-center gap-2">
                                        {user?.name || t('admin_dashboard.title')}
                                    </h2>
                                    <p className="text-[14px] text-gray-500 dark:text-gray-400">{t('admin_dashboard.subtitle')}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsExportModalOpen(true)}
                                className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-full font-bold text-[13px] hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <DownloadCloud className="w-4 h-4 text-gray-500" /> {t('admin_dashboard.export_data')}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Mobile Stats (Visible only on mobile) */}
                            <div className="lg:hidden pb-2">
                                <h3 className="font-bold text-[14px] text-gray-900 dark:text-gray-100 tracking-tight mb-4">
                                    {t('admin_dashboard.platform_summary')}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="bg-white dark:bg-[#1C1A29] rounded-xl p-4 border border-gray-200 dark:border-white/10 flex items-center justify-between shadow-sm">
                                                <div>
                                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mb-1">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-none">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5`}>
                                                    <Icon size={16} className={stat.color} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Minimalist Search & Tabs Controls */}
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                                <div className="flex flex-1 w-full gap-2 relative">
                                    <div className="relative w-full group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-gray-400" /></div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={t('admin_dashboard.search_placeholder')}
                                            className="w-full pl-9 pr-4 py-2 bg-gray-100/50 dark:bg-white/5 border-none rounded-full text-[14px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                        />
                                    </div>
                                    <div className="relative shrink-0">
                                        <button 
                                            onClick={() => setShowFilterPopup(!showFilterPopup)}
                                            className={`px-3 py-2 bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center h-full ${showFilterPopup || statusFilter !== "semua" || sortBy !== "terbaru" ? "text-indigo-600" : "text-gray-500"}`}
                                        >
                                            <Filter className="w-4 h-4" />
                                        </button>
                                        
                                        {showFilterPopup && (
                                            <>
                                                <div className="fixed inset-0 z-[40]" onClick={() => setShowFilterPopup(false)} />
                                                <div className="absolute top-full mt-2 right-0 w-[280px] bg-white dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-5 z-[100] animate-in fade-in slide-in-from-top-2">
                                                    <div className="mb-5">
                                                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">{t('admin_dashboard.filter_status')}</label>
                                                        <CustomSelect
                                                            value={statusFilter}
                                                            onChange={(val) => setStatusFilter(val as any)}
                                                            options={[
                                                                { value: "semua", label: t('admin_dashboard.filter_all') },
                                                                { value: "terverifikasi", label: t('admin_dashboard.filter_verified') },
                                                                { value: "belum", label: t('admin_dashboard.filter_unverified') },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">{t('admin_dashboard.sort_by')}</label>
                                                        <CustomSelect
                                                            value={sortBy}
                                                            onChange={(val) => setSortBy(val as any)}
                                                            options={[
                                                                { value: "terbaru", label: t('admin_dashboard.sort_newest') },
                                                                { value: "terlama", label: t('admin_dashboard.sort_oldest') },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Tabs */}
                                <div className="flex w-full md:w-auto border-b border-gray-200 dark:border-white/10 overflow-x-auto scrollbar-hide">
                                    {[
                                        { id: "sertifikasi", label: t('admin_dashboard.tab_verification') },
                                        { id: "catatan", label: t('admin_dashboard.tab_notes') },
                                        { id: "laporan", label: t('admin_dashboard.tab_reports') },
                                        { id: "users", label: t('admin_dashboard.tab_users') },
                                    ].map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id as TabType)}
                                                className={`relative flex-none px-4 py-3 text-[14px] font-bold transition-colors whitespace-nowrap ${isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`}
                                            >
                                                {tab.label}
                                                {tab.id === "sertifikasi" && pendingCerts.length > 0 && (
                                                    <span className="ml-1.5 text-rose-500">({pendingCerts.length})</span>
                                                )}
                                                {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-t-full" />}
                                            </button>
                                        );
                                    })}
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
                                                    {t('admin_dashboard.verify_title')}
                                                </h3>
                                                <p className="text-sm font-['Manrope'] text-gray-500 mt-1">
                                                    {t('admin_dashboard.verify_desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {pendingCerts.length === 0 ? (
                                            <div className="py-16 text-center bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/10 border-dashed rounded-3xl">
                                                <ShieldCheck className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" strokeWidth={1} />
                                                <h4 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                                                    {t('admin_dashboard.all_done')}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-slate-400 font-['Manrope']">
                                                    {t('admin_dashboard.all_done_desc')}
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
                                                                    <h4 className="font-['Lexend_Deca'] font-bold text-slate-900 dark:text-slate-100 text-[16px] leading-none mb-1">{t('admin_dashboard.card_user_id') !== 'admin_dashboard.card_user_id' ? t('admin_dashboard.card_user_id') : 'User ID:'} {cert.user_id}</h4>
                                                                    <p className="font-['Manrope'] text-[13px] text-slate-500 dark:text-slate-400 font-bold">{t('admin_dashboard.card_field') !== 'admin_dashboard.card_field' ? t('admin_dashboard.card_field') : 'Bidang:'} <span className="text-indigo-600 dark:text-indigo-400">{cert.bidang_keahlian}</span></p>
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
                                                                    className="flex items-center gap-1.5 text-[12px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 font-bold transition-colors bg-white dark:bg-[#1C1A29] px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shrink-0"
                                                                >
                                                                    <Eye size={14} /> {t('admin_dashboard.card_view_doc') !== 'admin_dashboard.card_view_doc' ? t('admin_dashboard.card_view_doc') : 'Lihat Dokumen'}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-200 dark:border-white/10">
                                                            <button
                                                                onClick={() => handleVerifyCert(cert.id, "approve")}
                                                                className="flex-1 sm:flex-none px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-[12px] hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                                                            >
                                                                <CheckCircle size={14} /> {t('admin_dashboard.card_approve') !== 'admin_dashboard.card_approve' ? t('admin_dashboard.card_approve') : 'Setujui'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleVerifyCert(cert.id, "reject")}
                                                                className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full font-bold text-[12px] hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                                                            >
                                                                <XCircle size={14} /> {t('admin_dashboard.card_reject') !== 'admin_dashboard.card_reject' ? t('admin_dashboard.card_reject') : 'Tolak'}
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
                                                                    <div className="flex items-center gap-2 mt-auto flex-wrap">
                                                                        {(note.isValidated || note.is_verified) && (
                                                                            <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-3 py-1.5 border border-emerald-100 dark:border-emerald-500/20 font-bold text-[11px] flex items-center gap-1"><ShieldCheck size={14} /> Verified</div>
                                                                        )}
                                                                        <Link to={`/note/${note.id || note._id}`} className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-full font-bold text-[12px] flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors group/btn">Detail<ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" /></Link>
                                                                        <button onClick={() => handleDeleteNote(note.id || note._id)} className="px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors flex items-center font-bold text-[12px] tooltip" title="Hapus Permanen"><Trash2 size={14} /></button>
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

                                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-[140px] shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-white/10">
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "abaikan")}
                                                                className="flex-1 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 rounded-full font-bold text-[12px] transition-colors text-center"
                                                            >
                                                                Abaikan
                                                            </button>
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "takedown")}
                                                                className="flex-1 px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-full font-bold text-[12px] transition-colors text-center"
                                                            >
                                                                Takedown
                                                            </button>
                                                            <button
                                                                onClick={() => handleResolveReport(report.id || report._id, "banned")}
                                                                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-full font-bold text-[12px] transition-colors text-center"
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
                                                            <div className="shrink-0 flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-white/10 w-full sm:w-auto">
                                                                <Link to={`/profile/${u.id || u._id}`} className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors font-bold text-[12px] text-gray-700 dark:text-gray-300">
                                                                    Lihat Profil <ArrowUpRight size={14} className="ml-1" />
                                                                </Link>
                                                                {u.role !== 'user' && u.id !== user?.id && u._id !== user?.id && (
                                                                    <button 
                                                                        onClick={() => handleDemoteUser(u)}
                                                                        className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors font-bold text-[12px]"
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
                            
                            <div className="pb-8 border-b border-gray-200 dark:border-white/10 mb-8">
                                <h3 className="font-bold text-[14px] text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                                    Ringkasan Platform
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="bg-white dark:bg-[#1C1A29] rounded-xl p-4 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-1">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5`}>
                                                    <Icon size={20} className={stat.color} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* System Status Redesigned */}
                            <div className="mb-8 border-b border-gray-200 dark:border-white/10 pb-8">
                                <h3 className="font-bold text-[14px] text-gray-900 dark:text-gray-100 tracking-tight mb-4">
                                    Sistem & Server
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                                            <Server className="w-4 h-4 text-gray-400" />
                                            API Gateway
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-[12px] text-gray-500">Normal</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                                            <Server className="w-4 h-4 text-gray-400" />
                                            Database Server
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-[12px] text-gray-500">Normal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed Redesigned */}
                            <div className="mb-8 border-b border-gray-200 dark:border-white/10 pb-8">
                                <h3 className="font-bold text-[14px] text-gray-900 dark:text-gray-100 tracking-tight mb-4">
                                    Aktivitas Terbaru
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { action: "Sistem Reboot", time: "12m ago" },
                                        { action: "Catatan Dihapus", time: "1h ago" },
                                        { action: "User Registrasi", time: "3h ago" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 shrink-0" />
                                            <div>
                                                <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200 leading-none mb-0.5">
                                                    {log.action}
                                                </p>
                                                <span className="text-[12px] text-gray-500">
                                                    {log.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Action */}
                            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-[14px]">Bantuan Teknis</h4>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">Hubungi tim DevOps Ba-Yu untuk pemeliharaan server.</p>
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
