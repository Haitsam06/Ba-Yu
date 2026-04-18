import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordPage() {
    const pathname = window.location.pathname;
    const token = pathname.substring(pathname.lastIndexOf('/') + 1); 

    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get('email'); 

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/reset-password', {
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });

            alert('✅ SUKSES: Password berhasil diubah! Silakan login.');
            window.location.href = '/app';
            
        } catch (error: any) {
            alert('❌ GAGAL: ' + (error.response?.data?.message || 'Link kadaluarsa atau terjadi kesalahan.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Manrope']">
            <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Buat Password Baru 🔐</h2>
                <p className="text-gray-500 text-sm text-center mb-6">
                    Akun: <span className="font-semibold text-blue-600">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Minimal 8 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ketik ulang password baru"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                    </button>
                </form>
            </div>
        </div>
    );
}