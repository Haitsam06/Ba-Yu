import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { ArrowLeft, Camera, User, BookOpen, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function EditProfilePage() {
  const { user, updateUserSession } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local state for the form, pre-filled with actual active user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    jenjang_pendidikan: user?.jenjang_pendidikan || 'SMP',
    school: user?.school || '',
    phone: user?.phone || ''
  });

  const handleSave = async () => {
    if (!formData.name.trim()) {
       setErrorMsg('Nama lengkap tidak boleh kosong');
       return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      const token = localStorage.getItem('bayu-token');
      
      // Update data via API
      const response = await axios.put('/api/v1/users/me', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update global context so changes reflect immediately everywhere
      if (response.data && response.data.data) {
         updateUserSession(response.data.data);
      } else {
         // Fallback manual update if response format is unexpected
         updateUserSession(formData);
      }

      alert('Profil berhasil diperbarui!');
      navigate('/profile');
    } catch (error: any) {
      console.error('Failed to update profile', error);
      setErrorMsg(error.response?.data?.message || 'Gagal menyimpan perubahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen pb-10 bg-[#FAFAFA]">
        {/* Header - Transparent & Refined */}
        <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md z-20 px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100 mb-6">
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-colors shadow-sm disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900 font-['Lexend_Deca'] font-bold text-lg">
            Edit Profil
          </h1>
          <div className="w-10"></div> {/* Spacer for perfect centering */}
        </div>

        <div className="max-w-xl mx-auto px-5">
          
          {errorMsg && (
             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 font-['Manrope'] text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
             </div>
          )}

          {/* Avatar Section - Clean White Background */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                alt={user?.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-50 shadow-sm"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="font-['Manrope'] text-sm font-semibold text-primary cursor-pointer hover:underline">
              Ganti Foto
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {/* Section 1: Informasi Dasar */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <User className="w-4 h-4 text-primary" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Informasi Pribadi</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Nama Lengkap <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Masukkan nama lengkap"
                   disabled={loading}
                 />
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Bio Singkat
                 </label>
                 <textarea
                   value={formData.bio}
                   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                   rows={3}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                   placeholder="Ceritakan minat belajarmu atau tujuanmu..."
                   disabled={loading}
                 />
                 <p className="font-['Manrope'] text-xs text-gray-400 mt-2 text-right">
                   {formData.bio.length}/255 karakter
                 </p>
               </div>
            </div>

            {/* Section 2: Data Pendidikan */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <BookOpen className="w-4 h-4 text-emerald-500" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Detail Akademik</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Jenjang Pendidikan Terkini
                 </label>
                 <div className="relative">
                   <select
                     value={formData.jenjang_pendidikan}
                     onChange={(e) => setFormData({ ...formData, jenjang_pendidikan: e.target.value })}
                     className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                     disabled={loading}
                   >
                     <option value="SD">Sekolah Dasar (SD)</option>
                     <option value="SMP">Menengah Pertama (SMP)</option>
                     <option value="SMA">Menengah Atas (SMA/SMK)</option>
                     <option value="Kuliah">Perguruan Tinggi (Kuliah)</option>
                   </select>
                   <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      ▼
                   </div>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Asal Sekolah / Universitas
                 </label>
                 <input
                   type="text"
                   value={formData.school}
                   onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Misal: SMAN 1 Jakarta"
                   disabled={loading}
                 />
               </div>
            </div>

            {/* Section 3: Kontak (Locked Email) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <Phone className="w-4 h-4 text-purple-500" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Kontak</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Alamat Email
                 </label>
                 <input
                   type="email"
                   value={user?.email || ''}
                   readOnly
                   className="w-full px-4 py-3.5 bg-gray-100/70 border border-transparent text-gray-500 rounded-2xl font-['Manrope'] text-[15px] cursor-not-allowed"
                 />
                 <p className="font-['Manrope'] text-xs text-gray-400 mt-2">
                   Email utama tidak dapat diubah dari panel ini.
                 </p>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Nomor Handphone (Opsional)
                 </label>
                 <input
                   type="tel"
                   value={formData.phone}
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Contoh: 0812xxxx"
                   disabled={loading}
                 />
               </div>
            </div>
          </div>

          {/* Fixed Action Button */}
          <div className="sticky bottom-6 mt-8 z-30">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-xl shadow-gray-200 hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                </>
              ) : (
                'Simpan Perubahan Profil'
              )}
            </button>
          </div>

        </div>
      </div>
    </MobileLayout>
  );
}
