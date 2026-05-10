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
            <div className="min-h-screen pb-10 bg-slate-50/50 dark:bg-[#13111C]">
                {/* Header Ribbon */}
                <div className="px-6 pt-12 pb-6 bg-slate-50/80 dark:bg-[#13111C]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 sticky top-0 z-30">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-slate-900 dark:text-gray-100 font-['Lexend_Deca'] font-extrabold text-[32px] tracking-tight leading-none">
                            Notifikasi
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-['Manrope'] text-[15px] font-medium">
                            {isLoading
                                ? "Memuat pembaruan..."
                                : unreadCount > 0
                                  ? `Anda memiliki ${unreadCount} kabar baru.`
                                  : "Semua sudah dibaca. Anda update!"}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-2 bg-white dark:bg-[#1C1A29] text-slate-700 dark:text-slate-300 text-[13px] font-bold px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none active:scale-95"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Tandai Semua Dibaca
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="px-6 pt-6 pb-2">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-6 py-2.5 rounded-full font-['Lexend_Deca'] font-bold text-[13px] transition-all duration-300 border ${filter === "all" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md shadow-slate-900/10 dark:shadow-none" : "bg-white dark:bg-[#1C1A29] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={`px-6 py-2.5 rounded-full font-['Lexend_Deca'] font-bold text-[13px] transition-all duration-300 flex items-center gap-2 border ${filter === "unread" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md shadow-slate-900/10 dark:shadow-none" : "bg-white dark:bg-[#1C1A29] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-none"}`}
                        >
                            Belum Dibaca
                            {unreadCount > 0 && (
                                <span
                                    className={`flex items-center justify-center rounded-full text-[10px] px-2 py-0.5 font-bold ${filter === "unread" ? "bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
                                >
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="px-6 pt-4 pb-12 max-w-3xl">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse flex gap-5 p-5 rounded-[24px] border border-slate-100 dark:border-white/5 bg-white dark:bg-[#1C1A29]"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-[20px] bg-slate-100 dark:bg-white/5"></div>
                                    <div className="flex-1 space-y-3 py-1.5">
                                        <div className="h-4 w-2/3 bg-slate-100 dark:bg-white/5 rounded-md"></div>
                                        <div className="h-3 w-full bg-slate-50 dark:bg-white/5 rounded-md"></div>
                                        <div className="h-3 w-1/2 bg-slate-50 dark:bg-white/5 rounded-md"></div>
                                    </div>
                                    <div className="h-3 w-12 bg-slate-50 dark:bg-white/5 rounded-md shrink-0 mt-2"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {!isLoading && error && (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-[20px] flex items-center justify-center shadow-sm border border-red-100 dark:border-red-500/20">
                                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 font-['Manrope'] text-sm text-center max-w-sm">
                                {error}
                            </p>
                            <button
                                onClick={fetchNotifications}
                                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full text-[13px] font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all mt-2"
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
                                            "group relative overflow-hidden rounded-[24px] p-5 transition-all duration-300 cursor-pointer border",
                                            !notif.is_read
                                                ? "bg-white dark:bg-[#1C1A29] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-none border-slate-200/80 dark:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)]"
                                                : "bg-transparent dark:bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-[#1C1A29]/60 hover:border-slate-100 dark:hover:border-white/5"
                                        )}
                                        style={{
                                            animation: `fadeSlideIn 0.5s ease-out ${index * 0.05}s both`,
                                        }}
                                    >
                                        <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                                            {/* Actor Avatar with Type Badge */}
                                            <div className="relative shrink-0">
                                                <div
                                                    className={cn(
                                                        "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all group-hover:scale-105 duration-500 overflow-hidden",
                                                        notif.actor ? "bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10" : getNotificationBg(notif.type)
                                                    )}
                                                >
                                                    {notif.actor ? (
                                                        <img 
                                                            src={notif.actor.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} 
                                                            alt={notif.actor.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        getNotificationIcon(notif.type)
                                                    )}
                                                </div>
                                                
                                                {/* Mini Type Icon Badge */}
                                                {notif.actor && (
                                                    <div className={cn(
                                                        "absolute -right-2 -bottom-2 w-7 h-7 rounded-xl flex items-center justify-center border-[3px] border-white dark:border-[#1C1A29] shadow-sm",
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
                                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 pt-0.5">
                                                <div className="flex items-center justify-between gap-3 mb-0.5">
                                                    <div className="flex items-center gap-2">
                                                        {!notif.is_read && (
                                                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                                                        )}
                                                        <span className={cn(
                                                            "text-[12px] font-['Lexend_Deca'] font-bold tracking-tight",
                                                            !notif.is_read ? "text-primary" : "text-slate-400 dark:text-slate-500"
                                                        )}>
                                                            {timeAgo(notif.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col gap-1 pr-4">
                                                    {notif.title && (
                                                        <h4 className={cn(
                                                            "font-['Lexend_Deca'] text-[15px] leading-tight",
                                                            !notif.is_read ? "font-bold text-slate-900 dark:text-gray-100" : "font-semibold text-slate-700 dark:text-slate-300"
                                                        )}>
                                                            {notif.title}
                                                        </h4>
                                                    )}
                                                    <p className={cn(
                                                        "font-['Manrope'] leading-relaxed line-clamp-2",
                                                        !notif.is_read ? "text-slate-600 dark:text-slate-300 font-medium text-[14px]" : "text-slate-500 dark:text-slate-400 text-[14px]"
                                                    )}>
                                                        {notif.message}
                                                    </p>
                                                </div>

                                                {notif.link && (
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <span className="text-[11px] font-['Lexend_Deca'] font-bold text-indigo-600 dark:text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                                                            Buka Detail
                                                        </span>
                                                    </div>
                                                )}
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
                            <div className="text-center py-24 px-8 border border-dashed border-slate-200 dark:border-white/10 rounded-[32px] mt-4 bg-slate-50/50 dark:bg-white/5">
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-slate-200/50 dark:bg-white/5 rounded-full blur-2xl opacity-60"></div>
                                    <div className="absolute inset-4 bg-slate-100 dark:bg-white/10 rounded-[28px] rotate-12 transition-transform hover:rotate-45 duration-700"></div>
                                    <div className="absolute inset-4 bg-white dark:bg-[#1C1A29] rounded-[28px] -rotate-6 border border-slate-100 dark:border-white/5 shadow-sm"></div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-[#1C1A29]/80 backdrop-blur-sm rounded-[28px] border border-white dark:border-white/5 shadow-sm">
                                        <Inbox
                                            className="w-10 h-10 text-slate-300 dark:text-slate-600"
                                            strokeWidth={2}
                                        />
                                    </div>
                                </div>

                                <h3 className="font-['Lexend_Deca'] font-bold text-slate-900 dark:text-gray-100 text-[20px] mb-3 tracking-tight">
                                    {filter === "unread"
                                        ? "Semua Pesan Terbaca!"
                                        : "Kotak Masuk Kosong"}
                                </h3>
                                <p className="font-['Manrope'] text-[15px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                                    {filter === "unread"
                                        ? "Hebat! Kamu sudah membaca semua notifikasi terbaru. Tidak ada hal mendesak saat ini."
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

