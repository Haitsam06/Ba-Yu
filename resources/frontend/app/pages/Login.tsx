import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { Mail, Lock, User, GraduationCap, Eye, EyeOff, Sparkles, ChevronRight, CheckCircle, X, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import { CustomSelect } from "../components/ui/CustomSelect";
import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

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
    const { t, language } = useTranslation();

    // Forgot Password States
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [isForgotLoading, setIsForgotLoading] = useState(false);

    // Handle OAuth callback token from URL
    useEffect(() => {
        const handleOAuth = async () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');
            const isNew = searchParams.get('new');

            if (error) {
                showToast('Login dengan sosial media gagal. Silakan coba lagi.', 'error');
                navigate('/login', { replace: true });
                return;
            }

            if (token) {
                setIsSubmitting(true);
                await socialLogin(token);
                if (isNew === 'true') {
                    navigate('/complete-profile', { replace: true });
                } else {
                    navigate('/home', { replace: true });
                }
            }
        };
        handleOAuth();
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

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotPasswordEmail) return;

        setIsForgotLoading(true);
        try {
            const response = await axios.post("/api/forgot-password", {
                email: forgotPasswordEmail,
                lang: language || 'id',
            });

            showToast(t('forgot_password.success_toast') || 'Link reset password telah dikirim ke email Anda!', 'success');
            setIsForgotPasswordOpen(false);
            setForgotPasswordEmail("");
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Terjadi kesalahan. Pastikan email terdaftar.', 'error');
        } finally {
            setIsForgotLoading(false);
        }
    };

    if (searchParams.get('token')) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#13111C]">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 dark:text-slate-400 font-medium font-['Manrope'] animate-pulse">
                    Memproses otentikasi...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex bg-white dark:bg-[#13111C] relative overflow-hidden">
            {/* Close / Back Button */}
            <Link to="/" className="absolute top-6 left-6 p-2.5 rounded-full bg-slate-100/80 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all hover:bg-slate-200 dark:hover:bg-white/10 z-30 shadow-sm">
                <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* Left Side: Form Container */}
            <div className="w-full lg:w-[55%] xl:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 relative z-10 overflow-y-auto scrollbar-hide">
                {/* Clean Background Decoration (Mobile only, hidden on LG) */}
                <div className="lg:hidden absolute top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
                <div className="lg:hidden absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-50 dark:bg-fuchsia-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>

                <div className="w-full max-w-md mx-auto">

                {/* Logo & Title - Premium Minimalist */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 dark:bg-indigo-600 rounded-2xl mb-5 shadow-sm border border-slate-800 dark:border-indigo-500/50">
                        <span className="text-xl font-black text-white tracking-tighter">
                            BY
                        </span>
                    </div>
                    <h1 className="font-['Lexend_Deca'] text-[28px] sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 leading-tight tracking-tight">
                        {isLogin ? (t('auth.welcome') || "Selamat Datang") : (t('auth.start_journey') || "Mulai Perjalananmu")}
                    </h1>
                    <p className="font-['Manrope'] text-[15px] text-gray-500 font-medium">
                        {isLogin 
                            ? (t('auth.welcome_desc') || "Masuk untuk melanjutkan ke Ba-Yu.") 
                            : (t('auth.start_journey_desc') || "Daftar dan bagikan catatan pertamamu.")}
                    </p>
                </div>

                {/* Tab Switcher - Clean Pill */}
                <div className="flex bg-gray-50/80 dark:bg-[#1C1A29]/80 p-1.5 mb-8 rounded-2xl border border-gray-100/50 dark:border-white/5 backdrop-blur-sm">
                    <button
                        onClick={() => {setIsLogin(true);}}
                        type="button"
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            isLogin
                                ? "bg-white dark:bg-[#252336] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200/50 dark:border-white/10"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {t('auth.login_tab') || "Masuk"}
                    </button>
                    <button
                        onClick={() => {setIsLogin(false);}}
                        type="button"
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            !isLogin
                                ? "bg-white dark:bg-[#252336] text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200/50 dark:border-white/10"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {t('auth.register_tab') || "Daftar Baru"}
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
                                    {t('auth.remember_me') || "Ingat saya"}
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() => {
                                    setForgotPasswordEmail(formData.email);
                                    setIsForgotPasswordOpen(true);
                                }}
                                className="text-[13px] text-gray-900 dark:text-gray-100 font-['Lexend_Deca'] font-bold hover:underline underline-offset-4"
                            >
                                {t('forgot_password.modal_title')}?
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
                                <span>{t('auth.processing') || "Memproses..."}</span>
                            </div>
                        ) : (
                            isLogin ? (t('auth.login_btn') || "Masuk ke Akun") : (t('auth.register_btn') || "Daftar Sekarang")
                        )}
                    </button>

                    {/* Social Login Separator */}
                    <div className="relative mt-8 mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-4 bg-white dark:bg-[#13111C] text-gray-400 dark:text-gray-500 font-['Lexend_Deca'] font-semibold">
                                {t('auth.or_continue') || "atau lanjutkan dengan"}
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-1 gap-3.5">
                        <button
                            type="button"
                            onClick={() => { window.location.href = '/api/auth/google/redirect'; }}
                            className="flex items-center justify-center gap-2.5 py-3.5 bg-white dark:bg-[#1C1A29] border border-gray-200 dark:border-white/10 rounded-2xl font-['Lexend_Deca'] font-bold text-[14px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all active:scale-95 w-full"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Lanjutkan dengan Google
                        </button>
                    </div>
                </form>
            </div>

            {/* Forgot Password Modal */}
            {isForgotPasswordOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1C1A29] rounded-2xl w-full max-w-sm p-6 shadow-xl border border-gray-100 dark:border-white/5 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold font-['Lexend_Deca'] text-gray-900 dark:text-white">{t('forgot_password.modal_title')}</h3>
                            <button 
                                onClick={() => setIsForgotPasswordOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-['Manrope'] mb-6">
                            {t('forgot_password.modal_description')}
                        </p>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="space-y-1.5 mb-6">
                                <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-slate-700 dark:text-slate-300 pl-1">
                                    {t('forgot_password.email_label')}
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-500 dark:text-slate-400 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-colors" strokeWidth={2.5} />
                                    <input
                                        type="email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#13111C] border border-gray-200 dark:border-white/10 rounded-xl font-['Manrope'] text-[14px] text-gray-900 dark:text-gray-100 transition-all focus:bg-white dark:focus:bg-[#252336] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                                        placeholder={t('forgot_password.email_placeholder')}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isForgotLoading}
                                className={`w-full bg-primary hover:bg-indigo-700 text-white py-3 rounded-xl font-['Lexend_Deca'] font-bold text-[14px] shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 ${isForgotLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isForgotLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t('forgot_password.submit_loading')}</span>
                                    </>
                                ) : (
                                    <span>{t('forgot_password.submit_button')}</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            </div>

            {/* Right Side: Visual Panel (Premium) */}
            <div className="hidden lg:flex w-[45%] xl:w-1/2 bg-[#1C1A29] relative items-center justify-center overflow-hidden border-l border-white/5">
                 {/* Deep purple/indigo gradients */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#4338CA] via-[#5D5CE6] to-[#8B5CF6] opacity-90"></div>
                 
                 {/* Abstract geometric shapes / Orbs */}
                 <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#FFD166]/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                 <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#FF6B6B]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                 <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] mix-blend-overlay pointer-events-none"></div>

                 {/* Glassmorphism content */}
                 <div className="relative z-10 px-12 lg:px-16 xl:px-20 max-w-[600px] text-left">
                     <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-8 shadow-xl border border-white/20">
                         <Sparkles className="w-8 h-8 text-white" />
                     </div>
                     <h2 className="text-[36px] xl:text-[44px] font-extrabold text-white mb-6 font-['Lexend_Deca'] leading-[1.1] drop-shadow-md">
                         {t('auth.panel_title') || "Memberdayakan Pendidikan."}
                     </h2>
                     <p className="text-[17px] xl:text-[19px] text-white/80 font-['Manrope'] font-medium drop-shadow-sm leading-relaxed max-w-md">
                         {t('auth.panel_desc') || "Bergabunglah dengan ribuan pelajar dan pakar untuk berbagi, belajar, dan tumbuh bersama."}
                     </p>
                     
                     {/* Decorative Elements */}
                     <div className="mt-12 flex items-center gap-4">
                         <div className="flex -space-x-3">
                             <div className="w-10 h-10 rounded-full border-2 border-[#5D5CE6] bg-indigo-200"></div>
                             <div className="w-10 h-10 rounded-full border-2 border-[#5D5CE6] bg-purple-200"></div>
                             <div className="w-10 h-10 rounded-full border-2 border-[#5D5CE6] bg-fuchsia-200"></div>
                             <div className="w-10 h-10 rounded-full border-2 border-[#5D5CE6] bg-white flex items-center justify-center text-xs font-bold text-[#4338CA]">10k+</div>
                         </div>
                         <div className="text-sm font-['Manrope'] font-semibold text-white/80">
                             Pengguna Aktif
                         </div>
                     </div>
                 </div>
            </div>

        </div>
    );
}