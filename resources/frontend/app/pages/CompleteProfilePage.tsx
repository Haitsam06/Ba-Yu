import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../components/MobileLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { User, Building, GraduationCap, ArrowRight } from 'lucide-react';
import { CustomSelect } from '../components/ui/CustomSelect';
import axios from 'axios';

export default function CompleteProfilePage() {
    const { user, updateUserSession } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        jenjang_pendidikan: user?.jenjang_pendidikan || 'SMA',
        profesi: user?.profesi || 'Pelajar',
        school: user?.school || '',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If profile is already completed, redirect to home
    useEffect(() => {
        if (user && user.profile_completed) {
            navigate('/home', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.username.match(/^[a-zA-Z0-9_]+$/)) {
            showToast("Username hanya boleh mengandung huruf, angka, dan underscore (_)", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.put('/api/v1/users/me', formData);
            
            // Update context
            updateUserSession({
                ...response.data.user,
                profile_completed: true
            });
            
            showToast("Profil berhasil dilengkapi! Selamat datang di Ba-Yu", "success");
            navigate('/home', { replace: true });
        } catch (error: any) {
            console.error("Gagal update profil:", error);
            const msg = error.response?.data?.message || "Terjadi kesalahan saat menyimpan profil";
            showToast(msg, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MobileLayout showBottomNav={false}>
            <div className="min-h-screen bg-white dark:bg-[#13111C] px-6 py-12 flex flex-col justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-50 dark:bg-fuchsia-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>

                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-5 shadow-sm border border-indigo-200 dark:border-indigo-500/30">
                            <User className="w-7 h-7" strokeWidth={2.5} />
                        </div>
                        <h1 className="font-['Lexend_Deca'] text-[28px] sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 leading-tight tracking-tight">
                            Lengkapi Profilmu
                        </h1>
                        <p className="font-['Manrope'] text-[15px] text-gray-500 dark:text-gray-400 font-medium">
                            Satu langkah lagi untuk mulai membagikan catatan belajarmu.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Nama Lengkap
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 focus:border-indigo-500 placeholder:text-gray-400"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Username <span className="text-gray-400 font-normal">(Tanpa spasi)</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors">@</span>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                                    className="w-full pl-9 pr-4 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 focus:border-indigo-500 placeholder:text-gray-400"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Jenjang Pendidikan
                            </label>
                            <div className="relative group z-20">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                    <GraduationCap className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors pointer-events-none" strokeWidth={2.5} />
                                </div>
                                <CustomSelect
                                    value={formData.jenjang_pendidikan}
                                    onChange={(val) => setFormData({ ...formData, jenjang_pendidikan: val as string })}
                                    className="pl-8"
                                    options={[
                                        { value: "SD", label: "Sekolah Dasar (SD)" },
                                        { value: "SMP", label: "Menengah Pertama (SMP)" },
                                        { value: "SMA", label: "Menengah Atas (SMA/SMK)" },
                                        { value: "Kuliah", label: "Perguruan Tinggi (Kuliah)" },
                                        { value: "Umum", label: "Umum" },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Profesi / Peran
                            </label>
                            <div className="relative group z-10">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                    <User className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors pointer-events-none" strokeWidth={2.5} />
                                </div>
                                <CustomSelect
                                    value={formData.profesi}
                                    onChange={(val) => setFormData({ ...formData, profesi: val as string })}
                                    className="pl-8"
                                    options={[
                                        { value: "Pelajar", label: "Pelajar" },
                                        { value: "Mahasiswa", label: "Mahasiswa" },
                                        { value: "Pengajar", label: "Pengajar (Guru/Dosen)" },
                                        { value: "Umum", label: "Umum / Profesional" },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Instansi / Sekolah
                            </label>
                            <div className="relative group z-10">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                <input
                                    type="text"
                                    value={formData.school}
                                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/10 focus:border-indigo-500 placeholder:text-gray-400"
                                    placeholder="Contoh: SMAN 1 Jakarta"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-slate-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 text-white py-4 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-lg shadow-slate-900/20 dark:shadow-indigo-600/20 hover:shadow-xl hover:shadow-slate-900/30 dark:hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all active:scale-[0.98] mt-8 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Simpan & Lanjutkan</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </MobileLayout>
    );
}
