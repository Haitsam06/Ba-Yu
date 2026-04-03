import { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, FileText, AlertCircle, CheckCircle, XCircle, Eye, 
  Search, Filter, Trash2, Flag, BarChart3, ShieldCheck, DownloadCloud, Server, Activity, ArrowUpRight, Check
} from 'lucide-react';
import { mockNotes, mockUsers, getUserById, mataPelajaran } from '../data/mockData';
import { Link, useLocation } from 'react-router';
import axios from 'axios';

type TabType = 'catatan' | 'laporan' | 'users' | 'sertifikasi';

export default function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('sertifikasi');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [pendingCerts, setPendingCerts] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [notesList, setNotesList] = useState<any[]>([]);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab as TabType);
    }
  }, [location.state]);

  useEffect(() => {
    // Tarik semua data di awal biar kotak statistiknya langsung akurat!
    fetchPendingCertifications();
    fetchReports();
    fetchUsers();
    fetchNotes(); 
  }, []);

  const fetchReports = async () => {
    if (user?.role !== 'admin') return;
    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.get('/api/v1/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReportsList(res.data.data || []);
    } catch (e) {
      console.error("Failed to fetch reports", e);
    }
  };

  const fetchNotes = async () => {
    try {
      // Kita nembak API posts yang kemaren lu bikin di Backend!
      const res = await axios.get('/api/v1/posts');
      setNotesList(res.data.data || []);
    } catch (e) {
      console.error("Failed to fetch notes", e);
    }
  };

  const fetchUsers = async () => {
    if (user?.role !== 'admin') return;
    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.get('/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsersList(res.data.data || []);
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  };

  const fetchPendingCertifications = async () => {
    if (user?.role !== 'admin') return;
    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.get('/api/v1/sertifikasi/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingCerts(res.data.data);
    } catch (e) {
      console.error("Failed to fetch pending requests", e);
    }
  };

  // Remove mock reports as requested
  const mockReports: any[] = [];

  const stats = [
    { label: 'Total User', value: usersList.length, color: 'bg-blue-500', icon: Users, increment: '+12%' },
    { label: 'Total Catatan', value: notesList.length, color: 'bg-indigo-500', icon: FileText, increment: '+8%' },
    { label: 'Pending Laporan', value: reportsList.length, color: 'bg-orange-500', icon: AlertCircle, increment: '+2%' },
    { label: 'Sertifikasi Pakar', value: pendingCerts.length, color: 'bg-fuchsia-600', icon: ShieldCheck, increment: 'Baru' }
  ];

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
      alert('Catatan berhasil dihapus!');
    }
  };

  const handleResolveReport = async (reportId: string, actionType: 'abaikan' | 'takedown' | 'banned') => {
    let adminNote = '';
    if (actionType === 'abaikan') {
       const reason = window.prompt('Alasan laporan diabaikan (opsional, untuk diinfokan ke pelapor):', 'Sesuai dengan panduan komunitas');
       if (reason === null) return; // cancelled
       adminNote = reason;
    }

    try {
      const token = localStorage.getItem('bayu-token');
      const res = await axios.put(`/api/v1/reports/${reportId}`, 
        { action: actionType, admin_note: adminNote }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || 'Berhasil diproses!');
      setReportsList(prev => prev.filter(r => r.id !== reportId && r._id !== reportId));
    } catch (e: any) {
      alert(e.response?.data?.message || 'Gagal memproses laporan');
    }
  };

  const handleVerifyCert = async (id: string, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem('bayu-token');
      await axios.put(`/api/v1/sertifikasi/${id}/verifikasi`, { status: action === 'approve' ? 'approved' : 'rejected' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPendingCerts(prev => prev.filter(c => c.id !== id));
      alert(`Pengajuan Pakar ${action === 'approve' ? 'diterima' : 'ditolak'}.`);
    } catch (e: any) {
      alert(e.response?.data?.message || 'Gagal mengubah status verifikasi');
    }
  };

  return (
    <MobileLayout>
      <div className="pb-8 bg-gray-50/50 min-h-screen">
        {/* Widescreen Header & Stats Ribbon */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 px-6 md:px-10 pt-8 pb-16 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg bg-white/10"
                  />
                  <div>
                    <p className="text-white/70 font-['Manrope'] text-sm tracking-wide uppercase">Workspace Admin</p>
                    <h2 className="text-white font-['Lexend_Deca'] font-bold text-2xl mt-0.5">
                      {user?.name || 'Administrator'}
                    </h2>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-['Lexend_Deca'] font-semibold text-sm transition-all flex items-center justify-center gap-2">
                    <DownloadCloud className="w-4 h-4" /> Ekspor Data Laporan
                  </button>
                </div>
             </div>

             {/* Stats Grid - 4 Columns on Desktop */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               {stats.map((stat, index) => {
                 const Icon = stat.icon;
                 return (
                   <div
                     key={index}
                     className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-lg hover:bg-white/15 transition-all group"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                         <Icon className="w-5 h-5 text-white" />
                       </div>
                       <span className="text-[11px] font-['Lexend_Deca'] font-bold text-white/90 bg-white/10 px-2 py-1 rounded-md border border-white/5">
                         {stat.increment}
                       </span>
                     </div>
                     <div>
                       <p className="text-3xl font-['Lexend_Deca'] font-bold text-white mb-1">
                         {stat.value}
                       </p>
                       <p className="text-sm font-['Manrope'] text-white/80 font-medium tracking-wide">
                         {stat.label}
                       </p>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Main Dashboard Workspace */}
        <div className="px-6 md:px-10 -mt-8 relative z-20">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
             
             {/* Left Column (Main Data Area) */}
             <div className="xl:col-span-3 space-y-6">
                {/* Search & Tabs Controls */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 md:p-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari user, catatan, atau ID laporan..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent hover:border-gray-200 rounded-2xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide py-1">
                      {[
                        { id: 'sertifikasi', label: 'Verifikasi Pakar', icon: ShieldCheck },
                        { id: 'catatan', label: 'Catatan', icon: FileText },
                        { id: 'laporan', label: 'Laporan', icon: Flag },
                        { id: 'users', label: 'Users', icon: Users },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-['Lexend_Deca'] font-semibold text-sm whitespace-nowrap transition-all ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                : 'bg-transparent text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                            {tab.label}
                            {tab.id === 'sertifikasi' && pendingCerts.length > 0 && (
                              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
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
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
                  
                  {/* Sertifikasi Tab */}
                  {activeTab === 'sertifikasi' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                        <div>
                          <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900">
                            Verifikasi Sertifikat Pakar
                          </h3>
                          <p className="text-sm font-['Manrope'] text-gray-500 mt-1">
                            Tinjau dan proses portofolio kandidat pakar pendidikan.
                          </p>
                        </div>
                      </div>

                      {pendingCerts.length === 0 ? (
                        <div className="py-16 text-center bg-gray-50 border border-gray-100 border-dashed rounded-3xl">
                           <ShieldCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                           <h4 className="font-['Lexend_Deca'] font-bold text-lg text-gray-900 mb-1">Semua Pengajuan Selesai</h4>
                           <p className="text-sm text-gray-500 font-['Manrope']">Saat ini antrean verifikasi pakar sedang kosong.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {pendingCerts.map((cert) => (
                            <div
                              key={cert.id}
                              className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-indigo-100 p-6 relative overflow-hidden group"
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                              
                              <div className="flex items-start justify-between mb-5 relative z-10">
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100/50">
                                         <FileText className="w-6 h-6" />
                                      </div>
                                      <div>
                                          <h4 className="font-['Lexend_Deca'] font-bold text-gray-900">
                                              User ID: {cert.user_id}
                                          </h4>
                                          <p className="font-['Manrope'] text-sm text-gray-500">
                                              Bidang: {cert.bidang_keahlian}
                                          </p>
                                      </div>
                                  </div>
                                  <span className="text-[10px] font-['Lexend_Deca'] font-bold bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg border border-yellow-200 uppercase">
                                      {cert.status}
                                  </span>
                              </div>
                              
                              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-5 relative z-10">
                                 <div className="text-[11px] font-['Lexend_Deca'] font-bold text-gray-400 tracking-wider mb-2">DOKUMEN LAMPIRAN</div>
                                 <a href={`http://localhost:8000/storage/${cert.file_sertifikat}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-semibold transition-colors bg-white px-3 py-2 rounded-xl border border-indigo-50 shadow-sm truncate">
                                    <Eye className="w-4 h-4 text-indigo-400 shrink-0" /> Dokumen Bukti
                                 </a>
                              </div>
                              
                              <div className="flex items-center gap-3 relative z-10">
                                <button
                                  onClick={() => handleVerifyCert(cert.id, 'reject')}
                                  className="flex-1 py-3 bg-white hover:bg-red-50 text-red-600 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-colors border border-gray-200 hover:border-red-200 flex items-center justify-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" /> Tolak
                                </button>
                                <button
                                  onClick={() => handleVerifyCert(cert.id, 'approve')}
                                  className="flex-[1.5] py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-['Lexend_Deca'] font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-indigo-200" /> Setujui Pakar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Catatan Tab */}
                  {activeTab === 'catatan' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                        <div>
                          <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900">Database Catatan</h3>
                          <p className="text-sm font-['Manrope'] text-gray-500 mt-1">Kelola direktori konten edukasi publik.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {mockNotes.slice(0, 10).map((note) => {
                          const author = getUserById(note.authorId);
                          const subject = mataPelajaran.find(m => m.name === note.mataPelajaran);
                          return (
                            <div key={note.id} className="bg-white rounded-3xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between group">
                              <div>
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${subject?.color}15` }}>
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{subject?.icon}</span>
                                  </div>
                                  <div className="flex-1 min-w-0 pt-0.5">
                                    <h4 className="font-['Lexend_Deca'] font-bold text-gray-900 text-sm mb-1.5 line-clamp-1">{note.title}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-[10px] font-['Lexend_Deca'] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200">{note.mataPelajaran}</span>
                                      <span className="text-[10px] font-['Lexend_Deca'] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200">Kelas {note.kelas}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img src={author?.avatar} alt={author?.name} className="w-5 h-5 rounded-full object-cover" />
                                      <span className="text-xs font-['Manrope'] font-medium text-gray-500 truncate">{author?.name}</span>
                                      {note.isValidated && (
                                        <div className="ml-auto w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white p-0.5" title="Verified">
                                          <Check className="w-full h-full" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4 border-t border-gray-50">
                                <Link to={`/note/${note.id}`} className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-xl font-['Lexend_Deca'] font-semibold text-xs text-center hover:bg-gray-100 transition-colors border border-gray-200">
                                  Lihat Catatan
                                </Link>
                                <button onClick={() => handleDeleteNote(note.id)} className="px-4 py-2.5 bg-white text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors border border-gray-200 flex items-center justify-center tooltip" title="Hapus Permanen">
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
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                        <div>
                          <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900">Resolusi Laporan</h3>
                          <p className="text-sm font-['Manrope'] text-gray-500 mt-1">Tindak lanjuti user toxic atau konten ilegal.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {reportsList.length === 0 ? (
                            <div className="text-center py-10">
                               <p className="font-['Manrope'] text-gray-500">Tidak ada laporan masuk yang perlu diperiksa.</p>
                            </div>
                        ) : reportsList.map((report) => (
                          <div key={report.id || report._id} className="bg-white rounded-3xl border border-orange-200 p-5 lg:p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 border border-orange-200">
                                <Flag className="w-6 h-6 text-orange-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider ${report.type === 'catatan' || report.post_id ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-purple-50 text-purple-600 border-purple-200'}`}>
                                        REPORTED {report.type || 'CATATAN'}
                                    </span>
                                    <span className="text-xs font-['Manrope'] text-gray-400">{report.date || new Date(report.created_at).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-['Lexend_Deca'] font-bold text-gray-900 text-lg mb-1 leading-tight">
                                  {report.post_id ? `Catatan ID: ${report.post_id}` : (report.type === 'catatan' ? report.noteTitle : report.userName)}
                                </h4>
                                <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 mt-2">
                                   <p className="text-sm font-['Manrope'] text-gray-700 font-medium mb-1">Kategori Laporan: <span className="text-red-500">{report.reason}</span></p>
                                   <p className="text-[13px] font-['Manrope'] text-gray-600 border-l-2 border-red-300 pl-3 leading-relaxed break-words whitespace-pre-wrap">{report.description || '-'}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                                  <span className="text-xs font-['Manrope'] font-medium text-gray-500">Dilaporkan oleh: {report.reporter?.name || 'Anonim'}</span>
                                </div>
                              </div>
                              
                              <div className="flex md:flex-col lg:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                                <button onClick={() => handleResolveReport(report.id || report._id, 'abaikan')} className="flex-1 md:flex-none px-6 py-3 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-['Lexend_Deca'] font-semibold text-sm transition-all text-center">
                                  Abaikan
                                </button>
                                <button onClick={() => handleResolveReport(report.id || report._id, 'takedown')} className="flex-1 md:flex-none px-6 py-3 bg-red-500 text-white rounded-xl font-['Lexend_Deca'] font-semibold text-sm hover:bg-red-600 hover:shadow-md transition-all text-center">
                                  Takedown
                                </button>
                                <button onClick={() => handleResolveReport(report.id || report._id, 'banned')} className="flex-1 md:flex-none px-6 py-3 bg-black text-white rounded-xl font-['Lexend_Deca'] font-semibold text-sm hover:bg-gray-800 hover:shadow-md transition-all text-center">
                                  Banned
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeTab === 'users' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                        <div>
                          <h3 className="font-['Lexend_Deca'] font-bold text-xl text-gray-900">Manajemen Pengguna</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(usersList.length > 0 ? usersList : mockUsers).map((u) => (
                          <div key={u.id || u._id} className="bg-white rounded-3xl border border-gray-100 p-5 hover:border-indigo-100 hover:shadow-md transition-all flex items-center gap-4">
                            <img src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'} alt={u.name} className="w-14 h-14 rounded-2xl object-cover bg-gray-50 border border-gray-100" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-['Lexend_Deca'] font-bold text-gray-900 text-sm mb-0.5 truncate">{u.name}</h4>
                              <p className="text-[11px] font-['Lexend_Deca'] font-bold text-indigo-600 uppercase tracking-wider mb-2">{u.role === 'admin' ? 'Administrator' : u.role === 'pakar' ? 'Expert' : 'Pelajar'}</p>
                              <div className="flex gap-4">
                                <div>
                                   <div className="font-['Lexend_Deca'] font-bold text-sm text-gray-800 leading-none">{mockNotes.filter(n => n.authorId === (u.id || u._id)).length}</div>
                                   <div className="text-[10px] font-['Manrope'] text-gray-400">Catatan</div>
                                </div>
                                <div className="w-px bg-gray-200"></div>
                                <div>
                                   <div className="font-['Lexend_Deca'] font-bold text-sm text-gray-800 leading-none">{u.followers || 0}</div>
                                   <div className="text-[10px] font-['Manrope'] text-gray-400">Followers</div>
                                </div>
                              </div>
                            </div>
                            <button className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                               <ArrowUpRight className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
             </div>

             {/* Right Column (Sidebar Log) */}
             <div className="xl:col-span-1 space-y-6">
                
                {/* System Status */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                          <Server className="w-5 h-5 text-emerald-600" />
                       </div>
                       <h3 className="font-['Lexend_Deca'] font-bold text-gray-900">System Status</h3>
                    </div>
                    
                    <div className="space-y-4">
                       <div>
                          <div className="flex justify-between text-xs font-['Manrope'] font-semibold text-gray-500 mb-1.5">
                              <span>Server Payload (API)</span>
                              <span className="text-emerald-500">Operational</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div className="bg-emerald-400 h-2 rounded-full w-[24%]"></div>
                          </div>
                       </div>
                       <div>
                          <div className="flex justify-between text-xs font-['Manrope'] font-semibold text-gray-500 mb-1.5">
                              <span>Storage (MongoDB)</span>
                              <span className="text-indigo-500">Normal</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div className="bg-indigo-400 h-2 rounded-full w-[45%]"></div>
                          </div>
                       </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                       <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 flex items-center gap-2">
                         <Activity className="w-4 h-4 text-blue-500" /> Recent Logs
                       </h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 scrollbar-hide">
                        {[
                          { action: 'Sistem Reboot', time: '12 min ago', user: 'Auto', type: 'system' },
                          { action: 'Catatan Dihapus', time: '1 hour ago', user: 'Admin', type: 'warn' },
                          { action: 'User baru registrasi', time: '3 hours ago', user: 'System', type: 'info' },
                          { action: 'Database backup selesai', time: 'Yesterday', user: 'Cron', type: 'success' },
                        ].map((log, i) => (
                          <div key={i} className="flex gap-4 relative">
                             {i !== 3 && <div className="absolute left-[7px] top-6 bottom-[-24px] w-px bg-gray-200"></div>}
                             <div className={`w-4 h-4 rounded-full mt-1 border-2 border-white shadow-sm z-10 ${log.type === 'system' ? 'bg-blue-400' : log.type === 'warn' ? 'bg-red-400' : log.type === 'success' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                             <div>
                                <p className="font-['Manrope'] text-sm font-semibold text-gray-800">{log.action}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                   <span className="text-[10px] font-bold text-gray-400 uppercase">{log.user}</span>
                                   <span className="text-[10px] text-gray-400">•</span>
                                   <span className="text-[10px] text-gray-400">{log.time}</span>
                                </div>
                             </div>
                          </div>
                        ))}
                    </div>
                </div>

             </div>
             
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
