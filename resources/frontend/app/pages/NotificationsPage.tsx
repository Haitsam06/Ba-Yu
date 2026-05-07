import { MobileLayout } from "../components/MobileLayout";
import {
    Bell,
    Check,
    Shield,
    AlertCircle,
    Loader2,
    CheckCheck,
    Inbox,
    Heart,
    MessageCircle,
    UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { cn } from "../lib/utils";

interface Notification {
    _id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    link?: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
    actor?: {
        _id: string;
        name: string;
        avatar: string;
    };
}

const getNotificationIcon = (type: string) => {
    switch (type) {
        case "sertifikasi":
            return <Shield className="w-5 h-5 text-indigo-500" />;
        case "report":
            return <AlertCircle className="w-5 h-5 text-rose-500" />;
        case "verifikasi":
            return <CheckCheck className="w-5 h-5 text-emerald-500" />;
        case "like":
            return <Heart className="w-5 h-5 text-pink-500" />;
        case "comment":
            return <MessageCircle className="w-5 h-5 text-blue-500" />;
        case "follow":
            return <UserPlus className="w-5 h-5 text-purple-500" />;
        default:
            return <Bell className="w-5 h-5 text-gray-500" />;
    }
};

const getNotificationBg = (type: string) => {
    switch (type) {
        case "sertifikasi":
            return "bg-indigo-50 border-indigo-100";
        case "report":
            return "bg-rose-50 border-rose-100";
        case "verifikasi":
            return "bg-emerald-50 border-emerald-100";
        case "like":
            return "bg-pink-50 border-pink-100";
        case "comment":
            return "bg-blue-50 border-blue-100";
        case "follow":
            return "bg-purple-50 border-purple-100";
        default:
            return "bg-gray-50 border-gray-100";
    }
};

function timeAgo(dateStr: string) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} jam lalu`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return "Kemarin";
    if (diffDay < 30) return `${diffDay} hari lalu`;
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function NotificationsPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/notifikasi", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(res.data.data || []);
        } catch (err: any) {
            console.error("Gagal fetch notifikasi:", err);
            setError("Gagal memuat notifikasi. Periksa koneksi Anda.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async (
        id: string,
        is_read: boolean,
        type: string,
        link?: string,
    ) => {
        if (!is_read) {
            try {
                const token =
                    localStorage.getItem("bayu-token") ||
                    sessionStorage.getItem("bayu-token");
                await axios.put(
                    `/api/v1/notifikasi/${id}/read`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setNotifications((prev) =>
                    prev.map((n) =>
                        n._id === id ? { ...n, is_read: true } : n,
                    ),
                );
            } catch (err) {
                console.error("Failed to mark as read", err);
            }
        }

        if (link) {
            navigate(link);
        } else if (type === "report") {
            if (user?.role === "admin")
                navigate("/admin", { state: { tab: "laporan" } });
        } else if (type === "sertifikasi") {
            if (user?.role === "admin")
                navigate("/admin", { state: { tab: "sertifikasi" } });
        }
    };

    const handleMarkAllAsRead = async () => {
        if (unreadCount === 0) return;
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            await axios.put(
                "/api/v1/notifikasi/read-all",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true })),
            );
        } catch (err) {
            console.error("Failed to mark all as read", err);
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    const displayedNotifications = notifications.filter((n) =>
        filter === "all" ? true : !n.is_read,
    );

    return (
        <MobileLayout>
            <div className="min-h-screen pb-4 bg-slate-50/50 dark:bg-[#13111C]">
                {/* Header Ribbon */}
                <div className="px-6 pt-12 pb-8 bg-white/80 dark:bg-[#13111C]/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 sticky top-0 z-30">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-800 dark:text-gray-100 font-['Lexend_Deca'] font-bold text-[32px] tracking-tight leading-none">
                            Notifikasi
                        </h1>
                        <p className="text-slate-500 font-['Manrope'] text-[15px] font-medium opacity-90">
                            {isLoading
                                ? "Sinkronisasi..."
                                : unreadCount > 0
                                  ? `Ada ${unreadCount} kabar baru yang menunggu.`
                                  : "Semua sudah teratasi. Kerja bagus!"}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-2.5 bg-indigo-50 dark:bg-primary/10 text-indigo-600 dark:text-primary text-[13px] font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-100 dark:hover:bg-primary/20 transition-all duration-300 shadow-sm dark:shadow-none active:scale-95"
                        >
                            <CheckCheck className="w-4.5 h-4.5" />
                            Tandai Dibaca
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="px-6 pt-8 pb-4">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-6 py-2.5 rounded-xl font-['Lexend_Deca'] font-bold text-[13px] transition-all duration-300 ${filter === "all" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-[#1C1A29] text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-800 dark:hover:text-gray-200 shadow-sm dark:shadow-none"}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={`px-6 py-2.5 rounded-xl font-['Lexend_Deca'] font-bold text-[13px] transition-all duration-300 flex items-center gap-2 ${filter === "unread" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" : "bg-white dark:bg-[#1C1A29] text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-800 dark:hover:text-gray-200 shadow-sm dark:shadow-none"}`}
                        >
                            Belum Dibaca
                            <span
                                className={`flex items-center justify-center rounded-lg text-[11px] px-1.5 py-0.5 font-bold ${filter === "unread" ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"}`}
                            >
                                {unreadCount}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="px-6 pt-2 pb-12">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse flex gap-4 sm:gap-5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-[#1C1A29]"
                                >
                                    <div className="w-[52px] h-[52px] shrink-0 rounded-2xl bg-slate-100"></div>
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
                                        <div className="h-3 w-full bg-slate-50 rounded-md"></div>
                                        <div className="h-3 w-1/2 bg-slate-50 rounded-md"></div>
                                    </div>
                                    <div className="h-3 w-12 bg-slate-50 rounded-md shrink-0 mt-1"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {!isLoading && error && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center shadow-sm border border-red-100">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-slate-600 font-['Manrope'] text-sm text-center max-w-sm">
                                {error}
                            </p>
                            <button
                                onClick={fetchNotifications}
                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                            >
                                Muat Ulang
                            </button>
                        </div>
                    )}

                    {/* Notification List */}
                    {!isLoading &&
                        !error &&
                        displayedNotifications.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {displayedNotifications.map((notif, index) => (
                                    <div
                                        key={notif._id}
                                        onClick={() =>
                                            handleMarkAsRead(
                                                notif._id,
                                                notif.is_read,
                                                notif.type,
                                                notif.link,
                                            )
                                        }
                                        className={cn(
                                            "group relative overflow-hidden rounded-[20px] p-4 sm:p-5 transition-all duration-300 cursor-pointer border",
                                            !notif.is_read
                                                ? "bg-white dark:bg-[#1C1A29] shadow-md dark:shadow-lg border-indigo-100 dark:border-primary/20 hover:shadow-lg hover:border-indigo-200 dark:hover:border-primary/30 hover:-translate-y-0.5"
                                                : "bg-white/60 dark:bg-[#1C1A29]/60 border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#1C1A29] hover:shadow-sm hover:border-slate-200 dark:hover:border-white/10"
                                        )}
                                        style={{
                                            animation: `fadeSlideIn 0.5s ease-out ${index * 0.05}s both`,
                                        }}
                                    >
                                        <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                                            {/* Actor Avatar with Type Badge */}
                                            <div className="relative shrink-0 mt-1">
                                                <div
                                                    className={cn(
                                                        "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 duration-300 border border-slate-100 overflow-hidden bg-slate-50",
                                                        !notif.is_read && "ring-2 ring-indigo-100 ring-offset-2"
                                                    )}
                                                >
                                                    {notif.actor ? (
                                                        <img 
                                                            src={notif.actor.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} 
                                                            alt={notif.actor.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className={cn(
                                                            "h-full w-full flex items-center justify-center",
                                                            getNotificationBg(notif.type)
                                                        )}>
                                                            {getNotificationIcon(notif.type)}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Mini Type Icon Badge */}
                                                {notif.actor && (
                                                    <div className={cn(
                                                        "absolute -right-2 -bottom-2 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white shadow-sm",
                                                        notif.type === "sertifikasi" ? "bg-indigo-500 text-white" :
                                                        notif.type === "report" ? "bg-rose-500 text-white" :
                                                        notif.type === "verifikasi" ? "bg-emerald-500 text-white" :
                                                        notif.type === "like" ? "bg-pink-500 text-white" :
                                                        notif.type === "comment" ? "bg-blue-500 text-white" :
                                                        notif.type === "follow" ? "bg-purple-500 text-white" : "bg-slate-500 text-white"
                                                    )}>
                                                        {(() => {
                                                            const icon = getNotificationIcon(notif.type);
                                                            return icon ? React.cloneElement(icon as React.ReactElement, { className: "w-3 h-3 text-white" }) : null;
                                                        })()}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 py-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            {!notif.is_read && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                                                                    <span className="bg-indigo-50 text-indigo-600 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                                                        Baru
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <span className="text-[11px] text-slate-400 font-['Manrope'] font-semibold whitespace-nowrap shrink-0">
                                                                {timeAgo(notif.created_at)}
                                                            </span>
                                                        </div>
                                                        <p className={cn(
                                                            "font-['Manrope'] leading-snug line-clamp-2 pr-4",
                                                            !notif.is_read ? "text-slate-800 dark:text-gray-100 font-bold text-[14px] sm:text-[15px]" : "text-slate-600 dark:text-gray-400 font-medium text-[14px] sm:text-[15px]"
                                                        )}>
                                                            {notif.message}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[11px] font-['Lexend_Deca'] font-bold text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                                                        Buka Detail
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    {/* Empty State */}
                    {!isLoading &&
                        !error &&
                        displayedNotifications.length === 0 && (
                            <div className="text-center py-20 px-8">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    {/* Decorative background blobs */}
                                    <div className="absolute inset-0 bg-indigo-50 rounded-full blur-2xl opacity-60"></div>
                                    <div className="absolute inset-4 bg-indigo-50/50 rounded-3xl rotate-12"></div>
                                    <div className="absolute inset-4 bg-slate-50 rounded-3xl -rotate-6 border border-slate-100"></div>
                                    {/* Main Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-sm">
                                        <Inbox
                                            className="w-12 h-12 text-indigo-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>

                                <h3 className="font-['Lexend_Deca'] font-bold text-slate-800 dark:text-gray-100 text-[20px] mb-2 tracking-tight">
                                    {filter === "unread"
                                        ? "Semua Pesan Terbaca!"
                                        : "Kotak Masuk Sepi"}
                                </h3>
                                <p className="font-['Manrope'] text-[14px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                                    {filter === "unread"
                                        ? "Syukurlah! Kamu sudah membaca semua notifikasi terbaru. Tidak ada hal mendesak saat ini."
                                        : "Belum ada sorotan atau aktivitas sistem yang perlu kamu perhatikan. Santai dulu! ☕"}
                                </p>
                            </div>
                        )}
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `,
                }}
            />
        </MobileLayout>
    );
}

