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

interface NotificationItem {
    _id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    link?: string;
    is_read: boolean;
    created_at: string;
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
        if (diffMin < 60) return `${diffMin} menit`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr} jam`;
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
                <button className="relative inline-flex items-center justify-center rounded-full p-[6px] hover:bg-gray-100 transition-colors focus:outline-none">
                    <Bell
                        className="h-[22px] w-[22px] text-gray-700"
                        strokeWidth={1.5}
                    />
                    <span
                        className={cn(
                            "absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white",
                            hasNotifications
                                ? "bg-red-500 animate-pulse"
                                : "hidden",
                        )}
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0 rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-50/90 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
                        <div>
                            <h2 className="text-sm font-bold font-['Lexend_Deca'] text-gray-900">
                                Notifikasi
                            </h2>
                            <p className="text-[11px] text-gray-500 font-['Manrope']">
                                {hasNotifications
                                    ? `${unreadCount} belum dibaca`
                                    : "Semua sudah dibaca"}
                            </p>
                        </div>
                        {hasNotifications && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={clearAll}
                                className="h-7 w-7 rounded-full text-gray-500 hover:text-gray-900 bg-white shadow-sm border border-gray-200"
                                title="Tandai semua dibaca"
                            >
                                <CheckCheck className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>
                    {notifications.length === 0 ? (
                        <div className="p-8 text-sm text-gray-400 text-center font-['Manrope'] flex flex-col items-center gap-2">
                            <Bell className="w-8 h-8 text-gray-200" />
                            Tidak ada notifikasi
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-50">
                            {notifications.map((item) => (
                                <li
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
                                        "flex items-start gap-3 p-4 transition-colors cursor-pointer",
                                        !item.is_read
                                            ? "bg-primary/[0.03] hover:bg-primary/[0.05]"
                                            : "hover:bg-gray-50/50",
                                    )}
                                >
                                    <Avatar
                                        className={cn(
                                            "h-9 w-9 mt-0.5 border border-gray-100 shadow-sm",
                                            item.type === "sertifikasi"
                                                ? "bg-indigo-50"
                                                : item.type === "report"
                                                  ? "bg-rose-50"
                                                  : item.type === "verifikasi"
                                                    ? "bg-emerald-50"
                                                    : item.type === "like"
                                                      ? "bg-pink-50"
                                                      : item.type === "comment"
                                                        ? "bg-blue-50"
                                                        : item.type === "follow"
                                                          ? "bg-purple-50"
                                                          : "bg-gray-50",
                                        )}
                                    >
                                        <AvatarFallback className="bg-transparent">
                                            {getIcon(item.type)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <span
                                                className={cn(
                                                    "font-semibold text-[13px] font-['Lexend_Deca'] line-clamp-1",
                                                    !item.is_read
                                                        ? "text-gray-900"
                                                        : "text-gray-700",
                                                )}
                                            >
                                                {item.title}
                                            </span>
                                            <span className="ml-2 text-[10px] text-gray-400 font-['Manrope'] whitespace-nowrap shrink-0 mt-0.5">
                                                {timeAgo(item.created_at)}
                                            </span>
                                        </div>
                                        <span className="text-gray-500 font-['Manrope'] text-[11px] line-clamp-2 leading-relaxed">
                                            {item.message}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="p-2 border-t border-gray-100 bg-white">
                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/notifications");
                        }}
                        className="w-full py-2.5 text-[13px] font-semibold text-primary hover:bg-primary/5 hover:text-primary/90 rounded-xl transition-colors font-['Lexend_Deca']"
                    >
                        Lihat Semua
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
