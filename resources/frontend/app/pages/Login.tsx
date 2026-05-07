import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileLayout } from "../components/MobileLayout";
import { Mail, Lock, User, GraduationCap, Eye, EyeOff, Sparkles, ChevronRight, CheckCircle, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "pelajar",
        jenjang: "SMA",
    });
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            if (isLogin) {
                const errorMessage = await login(
                    formData.email,
                    formData.password,
                    rememberMe
                );

                if (errorMessage) {
                    setError(errorMessage);
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
                const errorMessage = await register(
                    formData.name,
                    formData.email,
                    formData.password,
                    formData.jenjang
                );

                if (errorMessage) {
                    setError(errorMessage);
                    return;
                }

                navigate("/home");
            }
        } catch (err) {
            setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MobileLayout showBottomNav={false}>
            <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-white relative overflow-hidden">
                {/* Clean Background Decoration */}
                <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-70"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 opacity-70"></div>

                {/* Logo & Title - Premium Minimalist */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl mb-5 shadow-sm border border-gray-800">
                        <span className="text-xl font-black text-white tracking-tighter">
                            BY
                        </span>
                    </div>
                    <h1 className="font-['Lexend_Deca'] text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                        {isLogin ? "Selamat Datang" : "Mulai Perjalananmu"}
                    </h1>
                    <p className="font-['Manrope'] text-[15px] text-gray-500 font-medium">
                        {isLogin 
                            ? "Masuk untuk melanjutkan ke Ba-Yu." 
                            : "Daftar dan bagikan catatan pertamamu."}
                    </p>
                </div>

                {/* Tab Switcher - Clean Pill */}
                <div className="flex bg-gray-50/80 p-1.5 mb-8 rounded-2xl border border-gray-100/50 backdrop-blur-sm">
                    <button
                        onClick={() => {setIsLogin(true); setError("");}}
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            isLogin
                                ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Masuk
                    </button>
                    <button
                        onClick={() => {setIsLogin(false); setError("");}}
                        className={`flex-1 py-2.5 rounded-xl font-['Lexend_Deca'] text-[14px] font-bold transition-all duration-300 outline-none ${
                            !isLogin
                                ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
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
                                <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-gray-700 pl-1">
                                    Nama Lengkap
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 transition-colors" strokeWidth={2.5} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-900 placeholder:text-gray-400"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-gray-700 pl-1">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 transition-colors" strokeWidth={2.5} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-900 placeholder:text-gray-400"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-gray-700 pl-1">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 transition-colors" strokeWidth={2.5} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-900 placeholder:text-gray-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
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
                            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                <label className="block text-[13px] font-['Lexend_Deca'] font-bold text-gray-700 pl-1">
                                    Jenjang Pendidikan
                                </label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 transition-colors pointer-events-none" strokeWidth={2.5} />
                                    <select
                                        value={formData.jenjang}
                                        onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                                        className="w-full pl-11 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-['Manrope'] font-bold text-[15px] text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-900 appearance-none cursor-pointer"
                                    >
                                        <option value="SD">Sekolah Dasar (SD)</option>
                                        <option value="SMP">Menengah Pertama (SMP)</option>
                                        <option value="SMA">Menengah Atas (SMA/SMK)</option>
                                        <option value="Kuliah">Perguruan Tinggi (Kuliah)</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 pointer-events-none transform rotate-90" />
                                </div>
                            </div>
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
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-gray-900 peer-checked:border-gray-900 transition-colors flex items-center justify-center">
                                        <CheckCircle className={`w-3 h-3 text-white transition-transform duration-200 ${rememberMe ? 'scale-100' : 'scale-0'}`} strokeWidth={4} />
                                    </div>
                                </div>
                                <span className="ml-2.5 text-[14px] text-gray-600 font-['Manrope'] font-medium group-hover:text-gray-900 transition-colors">
                                    Ingat saya
                                </span>
                            </label>

                            <button
                                type="button"
                                className="text-[13px] text-gray-900 font-['Lexend_Deca'] font-bold hover:underline underline-offset-4"
                            >
                                Lupa Password?
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in zoom-in-95 duration-200">
                            <p className="text-[14px] font-['Manrope'] font-bold text-red-600 flex items-center justify-center gap-2">
                                <X className="w-4 h-4" /> {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gray-900 hover:bg-black text-white py-4 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all active:scale-[0.98] ${isLogin ? 'mt-8' : 'mt-8'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-4 bg-white text-gray-400 font-['Lexend_Deca'] font-semibold">
                                atau lanjutkan dengan
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3.5">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2.5 py-3.5 bg-white border border-gray-200 rounded-2xl font-['Lexend_Deca'] font-bold text-[14px] text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                        >
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-[18px] h-[18px]"
                            />
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2.5 py-3.5 bg-white border border-gray-200 rounded-2xl font-['Lexend_Deca'] font-bold text-[14px] text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                        >
                            <img
                                src="https://www.apple.com/favicon.ico"
                                alt="Apple"
                                className="w-[18px] h-[18px]"
                            />
                            Apple
                        </button>
                    </div>
                </form>
            </div>
        </MobileLayout>
    );
}