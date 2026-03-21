import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, FileText, AlertCircle, CheckCircle, XCircle, Eye, 
  Search, Filter, Trash2, Flag, BarChart3 
} from 'lucide-react';
import { mockNotes, mockUsers, getUserById, mataPelajaran } from '../data/mockData';
import { Link } from 'react-router';

type TabType = 'catatan' | 'laporan' | 'users';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('catatan');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock reports
  const mockReports = [
    {
      id: '1',
      type: 'catatan',
      noteId: mockNotes[0].id,
      noteTitle: mockNotes[0].title,
      reportedBy: mockUsers[1],
      reason: 'Konten tidak sesuai',
      status: 'pending',
      date: '2024-03-08'
    },
    {
      id: '2',
      type: 'user',
      userId: mockUsers[2].id,
      userName: mockUsers[2].name,
      reportedBy: mockUsers[3],
      reason: 'Spam berlebihan',
      status: 'pending',
      date: '2024-03-07'
    }
  ];

  const stats = [
    { label: 'Total User', value: mockUsers.length, color: 'bg-blue-500', icon: Users },
    { label: 'Total Catatan', value: mockNotes.length, color: 'bg-primary', icon: FileText },
    { label: 'Laporan', value: mockReports.length, color: 'bg-orange-500', icon: AlertCircle },
    { label: 'Terverifikasi', value: mockNotes.filter(n => n.isValidated).length, color: 'bg-green-500', icon: CheckCircle },
  ];

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
      alert('Catatan berhasil dihapus!');
    }
  };

  const handleResolveReport = (reportId: string, action: 'approve' | 'reject') => {
    alert(`Laporan ${action === 'approve' ? 'disetujui' : 'ditolak'}!`);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-white pb-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 px-6 pt-7 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />
            <div className="flex-1">
              <p className="text-white/80 font-['Manrope'] text-sm">Selamat Datang,</p>
              <h2 className="text-white font-['Lexend_Deca'] font-bold text-lg">
                {user?.name}
              </h2>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-['Manrope'] font-semibold rounded-full border border-white/30">
                👑 Administrator
              </span>
            </div>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <BarChart3 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-2xl font-['Lexend_Deca'] font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[11px] font-['Manrope'] text-white/90 font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 -mt-4">
          {/* Search & Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'catatan', label: 'Catatan', icon: FileText },
                { id: 'laporan', label: 'Laporan', icon: Flag },
                { id: 'users', label: 'Users', icon: Users },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-['Manrope'] font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Catatan Tab */}
          {activeTab === 'catatan' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Lexend_Deca'] font-semibold text-lg text-foreground">
                  Manajemen Catatan
                </h3>
                <span className="text-sm font-['Manrope'] text-muted-foreground">
                  {mockNotes.length} catatan
                </span>
              </div>

              <div className="space-y-3">
                {mockNotes.slice(0, 10).map((note) => {
                  const author = getUserById(note.authorId);
                  const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                  return (
                    <div
                      key={note.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${subject?.color}20` }}
                        >
                          <span className="text-xl">{subject?.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1 line-clamp-1">
                            {note.title}
                          </h4>
                          <p className="text-xs font-['Manrope'] text-muted-foreground mb-2">
                            {note.mataPelajaran} • Kelas {note.kelas}
                          </p>
                          <div className="flex items-center gap-2">
                            <img
                              src={author?.avatar}
                              alt={author?.name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-xs font-['Manrope'] text-muted-foreground">
                              {author?.name}
                            </span>
                            {note.isValidated && (
                              <span className="ml-auto bg-green-100 px-2 py-0.5 rounded-full text-green-700 text-[10px] font-['Manrope'] font-semibold">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/note/${note.id}`}
                          className="flex-1 py-2 bg-gray-100 text-foreground rounded-xl font-['Manrope'] font-medium text-sm text-center hover:bg-gray-200 transition-colors"
                        >
                          Lihat
                        </Link>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Laporan Tab */}
          {activeTab === 'laporan' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Lexend_Deca'] font-semibold text-lg text-foreground">
                  Laporan User
                </h3>
                <span className="text-sm font-['Manrope'] text-muted-foreground">
                  {mockReports.length} laporan
                </span>
              </div>

              <div className="space-y-3">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-2xl shadow-sm border border-orange-200 p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Flag className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1">
                          {report.type === 'catatan' ? report.noteTitle : `User: ${report.userName}`}
                        </h4>
                        <p className="text-xs font-['Manrope'] text-muted-foreground mb-2">
                          Alasan: {report.reason}
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={report.reportedBy.avatar}
                            alt={report.reportedBy.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs font-['Manrope'] text-muted-foreground">
                            Dilaporkan oleh {report.reportedBy.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolveReport(report.id, 'reject')}
                        className="flex-1 py-2 bg-gray-100 text-foreground rounded-xl font-['Manrope'] font-medium text-sm hover:bg-gray-200 transition-colors"
                      >
                        Tolak
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, 'approve')}
                        className="flex-1 py-2 bg-red-500 text-white rounded-xl font-['Manrope'] font-medium text-sm hover:bg-red-600 transition-colors"
                      >
                        Hapus Konten
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Lexend_Deca'] font-semibold text-lg text-foreground">
                  Manajemen User
                </h3>
                <span className="text-sm font-['Manrope'] text-muted-foreground">
                  {mockUsers.length} user
                </span>
              </div>

              <div className="space-y-3">
                {mockUsers.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-0.5">
                          {u.name}
                        </h4>
                        <p className="text-xs font-['Manrope'] text-muted-foreground">
                          {u.bio}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-['Manrope'] text-muted-foreground">
                            {mockNotes.filter(n => n.authorId === u.id).length} catatan
                          </span>
                          <span className="text-[10px] font-['Manrope'] text-muted-foreground">
                            {u.followers} followers
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-gray-100 text-foreground rounded-lg font-['Manrope'] font-medium text-xs hover:bg-gray-200 transition-colors">
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
