"use client";

import * as React from "react";
import {
    Bell,
    Shield,
    AlertCircle,
    CheckCheck,
    Heart,
    MessageCircle,
    UserPlus,
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { AvatarImage } from "./DefaultImages";

interface NotificationItem {
    _id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    link?: string;
    is_read: boolean;
    created_at: string;
    actor?: {
        _id: string;
        name: string;
        avatar: string;
    };
}

export default function AvatarNotifications() {
    const [notifications, setNotifications] = React.useState<
        NotificationItem[]
    >([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const fetchNotifications = async () => {
        try {
            const token =
                localStorage.getItem("bayu-token") ||
                sessionStorage.getItem("bayu-token");
            const res = await axios.get("/api/v1/notifikasi", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(res.data.data || []);
        } catch (err) {
            console.error("Gagal fetch notifikasi:", err);
        }
    };

    React.useEffect(() => {
        if (user && open) {
            fetchNotifications();
        } else if (user && !open && notifications.length === 0) {
            // Fetch once initially even if closed to show the badge
            fetchNotifications();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, open]);

    const clearAll = async () => {
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
        setOpen(false);
        if (link) {
            navigate(link);
        } else if (type === "report" && user?.role === "admin") {
            navigate("/admin", { state: { tab: "laporan" } });
        } else if (type === "sertifikasi" && user?.role === "admin") {
            navigate("/admin", { state: { tab: "sertifikasi" } });
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;
    const hasNotifications = unreadCount > 0;

    function timeAgo(dateStr: string) {
        const diffMin = Math.floor(
            (new Date().getTime() - new Date(dateStr).getTime()) / 60000,
        );
        if (diffMin < 1) return "Baru saja";
        if (diffMin < 60) return `${diffMin}m`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr}j`;
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
    }

    const getIcon = (type: string) => {
        if (type === "sertifikasi")
            return <Shield className="w-4 h-4 text-indigo-500" />;
        if (type === "report")
            return <AlertCircle className="w-4 h-4 text-rose-500" />;
        if (type === "verifikasi")
            return <CheckCheck className="w-4 h-4 text-emerald-500" />;
        if (type === "like") return <Heart className="w-4 h-4 text-pink-500" />;
        if (type === "comment")
            return <MessageCircle className="w-4 h-4 text-blue-500" />;
        if (type === "follow")
            return <UserPlus className="w-4 h-4 text-purple-500" />;
        return <Bell className="w-4 h-4 text-gray-500" />;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="relative inline-flex items-center justify-center rounded-full p-[6px] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors focus:outline-none">
                    <Bell
                        className="h-[22px] w-[22px] text-gray-700 dark:text-gray-300"
                        strokeWidth={1.5}
                    />
                    <span
                        className={cn(
                            "absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#13111C]",
                            hasNotifications
                                ? "bg-red-500 animate-pulse"
                                : "hidden",
                        )}
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0 rounded-2xl shadow-xl dark:shadow-none overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1C1A29]"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="max-h-[350px] overflow-y-auto scrollbar-hide bg-white dark:bg-[#1C1A29]">
                    <div className="flex justify-between items-center px-5 py-4 bg-white dark:bg-[#1C1A29] sticky top-0 z-10 border-b border-gray-50 dark:border-white/5">
                        <div className="flex items-center gap-2">
                            <h2 className="text-[16px] font-bold font-['Lexend_Deca'] text-gray-900 dark:text-gray-100 tracking-tight">
                                Notifikasi
                            </h2>
                            {hasNotifications && (
                                <span className="bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        {hasNotifications && (
                            <button
                                onClick={clearAll}
                                className="text-[12px] font-bold text-primary hover:text-indigo-800 dark:hover:text-primary/80 transition-colors font-['Manrope']"
                            >
                                Tandai dibaca
                            </button>
                        )}
                    </div>
                    
                    {notifications.length === 0 ? (
                        <div className="py-12 px-6 text-sm text-gray-400 dark:text-gray-500 text-center font-['Manrope'] flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center">
                                <Bell className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                            </div>
                            <p className="font-medium">Belum ada kabar terbaru</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.slice(0, 8).map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() =>
                                        handleMarkAsRead(
                                            item._id,
                                            item.is_read,
                                            item.type,
                                            item.link,
                                        )
                                    }
                                    className={cn(
                                        "group relative flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-all duration-200 border-b border-gray-50 dark:border-white/5 last:border-0",
                                        !item.is_read && "bg-primary/[0.03] dark:bg-primary/[0.08]"
                                    )}
                                >
                                    
                                    <div className="relative shrink-0">
                                        <div
                                            className={cn(
                                                "h-11 w-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden bg-gray-50 dark:bg-white/5",
                                                !item.is_read && "ring-2 ring-primary ring-offset-1 dark:ring-offset-[#1C1A29]"
                                            )}
                                        >
                                            {item.actor ? (
                                                <AvatarImage 
                                                    src={item.actor.avatar} 
                                                    alt={item.actor.name}
                                                    size={44}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className={cn(
                                                    "h-full w-full flex items-center justify-center",
                                                    item.type === "sertifikasi" ? "bg-indigo-50 dark:bg-indigo-500/10" :
                                                    item.type === "report" ? "bg-rose-50 dark:bg-rose-500/10" :
                                                    item.type === "verifikasi" ? "bg-emerald-50 dark:bg-emerald-500/10" :
                                                    item.type === "like" ? "bg-pink-50 dark:bg-pink-500/10" :
                                                    item.type === "comment" ? "bg-blue-50 dark:bg-blue-500/10" :
                                                    item.type === "follow" ? "bg-purple-50 dark:bg-purple-500/10" : "bg-gray-50 dark:bg-white/5"
                                                )}>
                                                    {getIcon(item.type)}
                                                </div>
                                            )}
                                        </div>
                                        {/* Mini Type Icon Badge */}
                                        {item.actor && (
                                            <div className={cn(
                                                "absolute -right-0.5 -bottom-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1C1A29] shadow-sm scale-90",
                                                item.type === "sertifikasi" ? "bg-indigo-500 text-white" :
                                                item.type === "report" ? "bg-rose-500 text-white" :
                                                item.type === "verifikasi" ? "bg-emerald-500 text-white" :
                                                item.type === "like" ? "bg-pink-500 text-white" :
                                                item.type === "comment" ? "bg-blue-500 text-white" :
                                                item.type === "follow" ? "bg-purple-500 text-white" : "bg-gray-500 text-white"
                                            )}>
                                                {React.cloneElement(getIcon(item.type) as React.ReactElement, { className: "w-2.5 h-2.5 text-white" })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                {!item.is_read && (
                                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></div>
                                                )}
                                                <p className={cn(
                                                    "text-[13px] leading-snug line-clamp-2",
                                                    !item.is_read ? "text-gray-900 dark:text-gray-100 font-bold" : "text-gray-600 dark:text-gray-400 font-medium"
                                                )}>
                                                    {item.message}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                                            {timeAgo(item.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-3 bg-gray-50/50 dark:bg-white/5 border-t border-gray-50 dark:border-white/5">
                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/notifications");
                        }}
                        className="w-full py-2.5 text-[12px] font-bold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-white/10 hover:shadow-sm rounded-xl transition-all duration-200 font-['Lexend_Deca'] border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                    >
                        Lihat Semua Aktivitas
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
