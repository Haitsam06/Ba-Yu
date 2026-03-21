import { MobileLayout } from '../components/MobileLayout';
import { Bell, Check, Heart, MessageCircle, UserPlus, Shield } from 'lucide-react';

interface Notification {
  id: string;
  type: 'validation' | 'comment' | 'follower' | 'report';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'validation',
    title: 'Catatan Divalidasi',
    message: 'Catatanmu "Rumus Trigonometri Lengkap" telah divalidasi oleh Dr. Ahmad Hidayat dengan rating 5 bintang!',
    time: '2 jam yang lalu',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Komentar Baru',
    message: 'Dewi Lestari mengomentari catatan "Peta Konsep Sistem Pencernaan Manusia"',
    time: '5 jam yang lalu',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    type: 'follower',
    title: 'Pengikut Baru',
    message: 'Budi Santoso mulai mengikuti kamu',
    time: '1 hari yang lalu',
    isRead: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    type: 'comment',
    title: 'Komentar Baru',
    message: 'Ahmad Fauzi mengomentari catatan "Algoritma Sorting - Bubble Sort & Quick Sort"',
    time: '1 hari yang lalu',
    isRead: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    type: 'validation',
    title: 'Catatan Sedang Direview',
    message: 'Catatanmu "Sistem Persamaan Linear" sedang dalam proses validasi oleh pakar',
    time: '2 hari yang lalu',
    isRead: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'validation':
      return <Check className="w-5 h-5 text-green-600" />;
    case 'comment':
      return <MessageCircle className="w-5 h-5 text-blue-600" />;
    case 'follower':
      return <UserPlus className="w-5 h-5 text-purple-600" />;
    case 'report':
      return <Shield className="w-5 h-5 text-red-600" />;
    default:
      return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case 'validation':
      return 'bg-green-100';
    case 'comment':
      return 'bg-blue-100';
    case 'follower':
      return 'bg-purple-100';
    case 'report':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const groupedNotifications = {
    today: mockNotifications.filter(n => n.time.includes('jam')),
    yesterday: mockNotifications.filter(n => n.time.includes('1 hari')),
    older: mockNotifications.filter(n => n.time.includes('2 hari'))
  };

  return (
    <MobileLayout>
      <div className="min-h-screen pb-4 bg-white">
        {/* Header - Consistent with HomePage */}
        <div className="px-6 pt-7 pb-6">
          <h1 className="text-foreground font-['Lexend_Deca'] font-bold text-2xl mb-1">
            Notifikasi
          </h1>
          <p className="text-muted-foreground font-['Manrope'] text-sm">
            {unreadCount} notifikasi belum dibaca
          </p>
        </div>

        <div className="px-6">
          {/* Today */}
          {groupedNotifications.today.length > 0 && (
            <div className="mb-6">
              <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3">
                Hari Ini
              </h3>
              <div className="space-y-3">
                {groupedNotifications.today.map((notif) => (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      !notif.isRead
                        ? 'border-primary/30 shadow-sm'
                        : 'border-gray-100'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon or Avatar */}
                      {notif.avatar ? (
                        <img
                          src={notif.avatar}
                          alt="Avatar"
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notif.type)}`}>
                          {getNotificationIcon(notif.type)}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm">
                            {notif.title}
                          </h4>
                          {!notif.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="font-['Manrope'] text-sm text-foreground mb-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <p className="font-['Manrope'] text-xs text-muted-foreground">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {groupedNotifications.yesterday.length > 0 && (
            <div className="mb-6">
              <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3">
                Kemarin
              </h3>
              <div className="space-y-3">
                {groupedNotifications.yesterday.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100"
                  >
                    <div className="flex gap-3">
                      {notif.avatar ? (
                        <img
                          src={notif.avatar}
                          alt="Avatar"
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notif.type)}`}>
                          {getNotificationIcon(notif.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1">
                          {notif.title}
                        </h4>
                        <p className="font-['Manrope'] text-sm text-foreground mb-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <p className="font-['Manrope'] text-xs text-muted-foreground">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Older */}
          {groupedNotifications.older.length > 0 && (
            <div className="mb-6">
              <h3 className="font-['Lexend_Deca'] font-semibold text-sm text-muted-foreground mb-3">
                Lebih Lama
              </h3>
              <div className="space-y-3">
                {groupedNotifications.older.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white rounded-2xl p-4 border border-gray-100"
                  >
                    <div className="flex gap-3">
                      {notif.avatar ? (
                        <img
                          src={notif.avatar}
                          alt="Avatar"
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notif.type)}`}>
                          {getNotificationIcon(notif.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1">
                          {notif.title}
                        </h4>
                        <p className="font-['Manrope'] text-sm text-foreground mb-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <p className="font-['Manrope'] text-xs text-muted-foreground">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {mockNotifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-['Lexend_Deca'] font-semibold text-foreground mb-2">
                Belum Ada Notifikasi
              </h3>
              <p className="font-['Manrope'] text-sm text-muted-foreground">
                Notifikasi akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}