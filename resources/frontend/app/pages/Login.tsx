import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MobileLayout } from "../components/MobileLayout";
import { Mail, Lock, User, GraduationCap, Eye, EyeOff, Sparkles, ChevronRight, CheckCircle, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { CustomSelect } from "../components/ui/CustomSelect";
import { useEffect } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "pelajar",
        jenjang: "SMA",
        profesi: "Pelajar",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login, register, socialLogin } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    // Handle OAuth callback token from URL
    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');
        const isNew = searchParams.get('new');

        if (error) {
            showToast('Login dengan sosial media gagal. Silakan coba lagi.', 'error');
            return;
        }

        if (token) {
            socialLogin(token);
            if (isNew === 'true') {
                navigate('/complete-profile', { replace: true });
            } else {
                navigate('/home', { replace: true });
            }
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isLogin) {
                const errorMessage = await login(
                    formData.email,
                    formData.password,
                    rememberMe
                );

                if (errorMessage) {
                    showToast(errorMessage, "error");
                    return;
                }

                // Redirect based on role/email
                const email = formData.email.toLowerCase();
                if (email === "admin@gmail.com") {
                    navigate("/admin");
                } else if (email === "pakar@gmail.com") {
                    navigate("/pakar");
                } else {
                    navigate("/home");
                }
            } else {
                // Generate a temporary unique username based on the name
                const tempUsername = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 10000);
                
                const errorMessage = await register(
                    formData.name,
                    tempUsername,
                    formData.email,
                    formData.password,
                    formData.jenjang,
                    formData.profesi
                );

                if (errorMessage) {
                    showToast(errorMessage, "error");
                    return;
                }

                navigate("/home");
            }
        } catch (err) {
            showToast("Terjadi kesalahan koneksi. Silakan coba lagi.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MobileLayout showBottomNav={false}>
            <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-white dark:bg-[#13111C] relative overflow-hidden">
                {/* Clean Background Decoration */}
                <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-50 dark:bg-fuchsia-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>

                {/* Logo & Title - Premium Minimalist */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 dark:bg-indigo-600 rounded-2xl mb-5 shadow-sm border border-slate-800 dark:border-indigo-500/50">
                        <span className="text-xl font-black text-white tracking-tighter">
                            BY
                        </span>
                    </div>
                    <h1 className="font-['Lexend_Deca'] text-[28px] sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 leading-tight tracking-tight">
                        {isLogin ? "Selamat Datang" : "Mulai Perjalananmu"}
                    </h1>
                    <p className="font-['Manrope'] text-[15px] text-gray-500 font-medium">
                        {isLogin 
                            ? "Masuk untuk melanjutkan ke Ba-Yu." 
                            : "Daftar dan bagikan catatan pertamamu."}
                    </p>
                </div>

                {/* Tab Switcher - Clean Pill */}
                <div className="flex bg-gray-50/80 dark:bg-[#1C1A29]/80 p-1.5 mb-8 rounded-2xl border border-gray-100/50 dark:border-white/5 backdrop-blur-sm">
                    <button
                        onClick={() => {setIsLogin(true);}}
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            isLogin
                                ? "bg-white dark:bg-[#252336] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200/50 dark:border-white/10"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Masuk
                    </button>
                    <button
                        onClick={() => {setIsLogin(false);}}
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            !isLogin
                                ? "bg-white dark:bg-[#252336] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200/50 dark:border-white/10"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Daftar Baru
                    </button>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md mx-auto">
                    <div className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                    Nama Lengkap
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-white/10 focus:border-gray-900 dark:focus:border-white/20 placeholder:text-gray-400"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-white/10 focus:border-gray-900 dark:focus:border-white/20 placeholder:text-gray-400"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-white/10 focus:border-gray-900 dark:focus:border-white/20 placeholder:text-gray-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    ) : (
                                        <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <>
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                        Profesi / Peran
                                    </label>
                                    <div className="relative group">
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
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                        Jenjang Pendidikan
                                    </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <GraduationCap className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors pointer-events-none" strokeWidth={2.5} />
                                    </div>
                                    <CustomSelect
                                        value={formData.jenjang}
                                        onChange={(val) => setFormData({ ...formData, jenjang: val as string })}
                                        className="pl-8"
                                        options={[
                                            { value: "SD", label: "Sekolah Dasar (SD)" },
                                            { value: "SMP", label: "Menengah Pertama (SMP)" },
                                            { value: "SMA", label: "Menengah Atas (SMA/SMK)" },
                                            { value: "Kuliah", label: "Perguruan Tinggi (Kuliah)" },
                                        ]}
                                    />
                                </div>
                            </div>
                            </>
                        )}
                    </div>

                    {isLogin && (
                        <div className="flex items-center justify-between mt-5 mb-6">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border-2 border-slate-300 dark:border-white/10 rounded-md peer-checked:bg-slate-900 dark:peer-checked:bg-indigo-600 peer-checked:border-slate-900 dark:peer-checked:border-indigo-600 transition-colors flex items-center justify-center">
                                        <CheckCircle className={`w-3 h-3 text-white transition-transform duration-200 ${rememberMe ? 'scale-100' : 'scale-0'}`} strokeWidth={4} />
                                    </div>
                                </div>
                                <span className="ml-2.5 text-[14px] text-gray-600 dark:text-gray-400 font-['Manrope'] font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                    Ingat saya
                                </span>
                            </label>

                            <button
                                type="button"
                                className="text-[13px] text-gray-900 dark:text-gray-100 font-['Lexend_Deca'] font-bold hover:underline underline-offset-4"
                            >
                                Lupa Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 text-white py-4 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-lg shadow-slate-900/20 dark:shadow-indigo-600/20 hover:shadow-xl hover:shadow-slate-900/30 dark:hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all active:scale-[0.98] ${isLogin ? 'mt-8' : 'mt-8'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Memproses...</span>
                            </div>
                        ) : (
                            isLogin ? "Masuk ke Akun" : "Daftar Sekarang"
                        )}
                    </button>

                    {/* Social Login Separator */}
                    <div className="relative mt-8 mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-4 bg-white dark:bg-[#13111C] text-gray-400 dark:text-gray-500 font-['Lexend_Deca'] font-semibold">
                                atau lanjutkan dengan
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3.5">
                        <button
                            type="button"
                            onClick={() => { window.location.href = '/api/auth/google/redirect'; }}
                            className="flex items-center justify-center gap-2.5 py-3.5 bg-white dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Lexend_Deca'] font-bold text-[14px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all active:scale-95"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => { window.location.href = '/api/auth/facebook/redirect'; }}
                            className="flex items-center justify-center gap-2.5 py-3.5 bg-white dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Lexend_Deca'] font-bold text-[14px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all active:scale-95"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            Facebook
                        </button>
                    </div>
                </form>
            </div>
        </MobileLayout>
    );
}