import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockUsers } from '../data/mockData';

export default function EditProfilePage() {
  const currentUser = mockUsers[0];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio || '',
    jenjang: currentUser.jenjang,
    email: currentUser.email,
    phone: '',
    school: ''
  });

  const handleSave = () => {
    // Mock save
    navigate('/profile');
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen pb-4 bg-white">
        {/* Header with Back Button */}
        <div className="px-6 pt-7 pb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-foreground font-['Lexend_Deca'] font-bold text-2xl">
              Edit Profil
            </h1>
          </div>
        </div>

        <div className="px-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-gray-100 shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-2xl shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <button className="font-['Manrope'] text-sm font-semibold text-primary">
              Ubah Foto Profil
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5 mb-8">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Ceritakan tentang dirimu..."
              />
              <p className="font-['Manrope'] text-xs text-muted-foreground mt-1">
                {formData.bio.length}/150 karakter
              </p>
            </div>

            {/* Jenjang Pendidikan */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Jenjang Pendidikan
              </label>
              <select
                value={formData.jenjang}
                onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="Kuliah">Kuliah</option>
              </select>
            </div>

            {/* Sekolah/Universitas */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Sekolah/Universitas
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Masukkan nama sekolah/universitas"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none cursor-not-allowed"
                placeholder="email@example.com"
                disabled
              />
              <p className="font-['Manrope'] text-xs text-muted-foreground mt-1">
                Email tidak bisa diubah
              </p>
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="block text-sm font-['Manrope'] font-semibold text-foreground mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="08xx-xxxx-xxxx"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-100 text-foreground py-4 rounded-full font-['Lexend_Deca'] font-semibold hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-['Lexend_Deca'] font-semibold shadow-lg shadow-primary/30 hover:shadow-xl transition-all"
            >
              Simpan
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="font-['Manrope'] text-sm text-blue-900 leading-relaxed">
              💡 <span className="font-semibold">Tips:</span> Lengkapi profilmu agar lebih mudah ditemukan oleh teman-teman yang ingin belajar bersama!
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
