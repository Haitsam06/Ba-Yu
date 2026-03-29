import { MobileLayout } from '../components/MobileLayout';
import { Bell, Check, Shield, AlertCircle, Loader2, CheckCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Notification {
  _id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'sertifikasi':
      return <Shield className="w-5 h-5 text-primary" />;
    case 'report':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'verifikasi':
      return <CheckCheck className="w-5 h-5 text-emerald-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

const getNotificationBg = (type: string) => {
  switch (type) {
    case 'sertifikasi':
      return 'bg-primary/10';
    case 'report':
      return 'bg-red-50';
    case 'verifikasi':
      return 'bg-emerald-50';
    default:
      return 'bg-gray-100';
  }
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return 'Kemarin';
  if (diffDay < 30) return `${diffDay} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.get('/api/v1/notifikasi', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.data || []);
    } catch (err: any) {
      console.error('Gagal fetch notifikasi:', err);
      setError('Gagal memuat notifikasi. Periksa koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, is_read: boolean) => {
    if (is_read) return;
    try {
      const token = localStorage.getItem('bayu-token');
      await axios.put(`/api/v1/notifikasi/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state without fetching all again
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('bayu-token');
      await axios.put('/api/v1/notifikasi/read-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <MobileLayout>
      <div className="min-h-screen pb-4 bg-white">
        {/* Header */}
        <div className="px-6 pt-7 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 font-['Lexend_Deca'] font-bold text-2xl mb-1">
              Notifikasi
            </h1>
            <p className="text-gray-500 font-['Manrope'] text-sm">
              {isLoading ? 'Memuat...' : unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:bg-primary/5 px-3 py-1.5 rounded-xl transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Tandai semua
            </button>
          )}
        </div>

        <div className="px-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-gray-500 font-['Manrope'] text-sm">Memuat notifikasi...</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-gray-600 font-['Manrope'] text-sm text-center">{error}</p>
              <button
                onClick={fetchNotifications}
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Notification List */}
          {!isLoading && !error && notifications.length > 0 && (
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div
                  key={notif._id}
                  onClick={() => handleMarkAsRead(notif._id, notif.is_read)}
                  className={`rounded-2xl p-4 border transition-all duration-300 hover:shadow-sm cursor-pointer group ${
                    !notif.is_read
                      ? 'bg-primary/[0.03] border-primary/20 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${getNotificationBg(notif.type)} transition-colors group-hover:scale-105 duration-300`}>
                      {getNotificationIcon(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-['Lexend_Deca'] font-semibold text-gray-900 text-sm leading-snug">
                          {notif.title}
                        </h4>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-gray-400 font-['Manrope'] whitespace-nowrap">
                            {timeAgo(notif.created_at)}
                          </span>
                          {!notif.is_read && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shrink-0"></div>
                          )}
                        </div>
                      </div>
                      <p className="font-['Manrope'] text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>

                      {/* Type Badge */}
                      <div className="mt-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          notif.type === 'sertifikasi' ? 'bg-primary/10 text-primary' : 
                          notif.type === 'report' ? 'bg-red-100 text-red-600' :
                          notif.type === 'verifikasi' ? 'bg-emerald-100 text-emerald-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {notif.type === 'sertifikasi' && <Shield className="w-3 h-3" />}
                          {notif.type === 'report' && <AlertCircle className="w-3 h-3" />}
                          {notif.type === 'verifikasi' && <CheckCheck className="w-3 h-3" />}
                          {notif.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && notifications.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-5 border border-gray-100">
                <Bell className="w-9 h-9 text-gray-300" />
              </div>
              <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-lg mb-2">
                Kotak Masuk Kosong
              </h3>
              <p className="font-['Manrope'] text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                Belum ada notifikasi untuk kamu. Notifikasi akan muncul saat ada update tentang sertifikasi atau aktivitas lainnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}