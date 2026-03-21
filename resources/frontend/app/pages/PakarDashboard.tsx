import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Eye, Clock, Search, Filter } from 'lucide-react';
import { mockNotes, getUserById, mataPelajaran } from '../data/mockData';
import { Link } from 'react-router';

type VerificationStatus = 'pending' | 'approved' | 'rejected';

export default function PakarDashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | VerificationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock pending notes for verification
  const pendingNotes = mockNotes.filter(note => !note.isValidated).slice(0, 5);
  const verifiedNotes = mockNotes.filter(note => note.isValidated).slice(0, 3);

  const handleVerify = (noteId: string, status: 'approve' | 'reject') => {
    // Mock verification action
    alert(`Catatan ${status === 'approve' ? 'disetujui' : 'ditolak'}!`);
  };

  const filteredNotes = filter === 'all' 
    ? [...pendingNotes, ...verifiedNotes]
    : filter === 'pending' 
    ? pendingNotes 
    : filter === 'approved'
    ? verifiedNotes
    : [];

  const stats = [
    { label: 'Perlu Verifikasi', value: pendingNotes.length, color: 'bg-orange-500', icon: Clock },
    { label: 'Disetujui', value: verifiedNotes.length, color: 'bg-green-500', icon: CheckCircle },
    { label: 'Total Catatan', value: mockNotes.length, color: 'bg-primary', icon: Eye },
  ];

  return (
    <MobileLayout>
      <div className="min-h-screen bg-white pb-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-secondary px-6 pt-7 pb-8">
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
                ✨ Pakar
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30"
                >
                  <div className={`w-8 h-8 ${stat.color} rounded-xl flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-['Lexend_Deca'] font-bold text-white mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-['Manrope'] text-white/80 leading-tight">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 -mt-4">
          {/* Search & Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari catatan..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'pending', label: 'Pending' },
                { id: 'approved', label: 'Disetujui' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl font-['Manrope'] font-medium text-sm whitespace-nowrap transition-all ${
                    filter === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pending Verification */}
          {(filter === 'all' || filter === 'pending') && pendingNotes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-['Lexend_Deca'] font-semibold text-lg text-foreground">
                  Perlu Verifikasi
                </h3>
                <div className="bg-orange-100 px-2 py-0.5 rounded-full">
                  <span className="text-orange-600 font-['Manrope'] font-bold text-xs">
                    {pendingNotes.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {pendingNotes.map((note) => {
                  const author = getUserById(note.authorId);
                  const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                  return (
                    <div
                      key={note.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${subject?.color}20` }}
                        >
                          <span className="text-2xl">{subject?.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-1 line-clamp-2">
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
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/note/${note.id}`}
                          className="flex-1 py-2.5 bg-gray-100 text-foreground rounded-xl font-['Manrope'] font-medium text-sm text-center hover:bg-gray-200 transition-colors"
                        >
                          Lihat Detail
                        </Link>
                        <button
                          onClick={() => handleVerify(note.id, 'approve')}
                          className="px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleVerify(note.id, 'reject')}
                          className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Verified Notes */}
          {(filter === 'all' || filter === 'approved') && verifiedNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-['Lexend_Deca'] font-semibold text-lg text-foreground">
                  Sudah Diverifikasi
                </h3>
                <div className="bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="text-green-600 font-['Manrope'] font-bold text-xs">
                    {verifiedNotes.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {verifiedNotes.map((note) => {
                  const author = getUserById(note.authorId);
                  const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                  return (
                    <Link
                      key={note.id}
                      to={`/note/${note.id}`}
                      className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${subject?.color}20` }}
                        >
                          <span className="text-2xl">{subject?.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm line-clamp-1 flex-1">
                              {note.title}
                            </h4>
                            <div className="bg-green-100 px-2 py-0.5 rounded-lg ml-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          </div>
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
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
