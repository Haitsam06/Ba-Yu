import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

export type UserRole = 'user' | 'pakar' | 'admin';

export interface User {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  role: UserRole;
  jenjang_pendidikan?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>; // Returns error string if failed, null if success
  register: (name: string, email: string, password: string, jenjang: string) => Promise<string | null>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Setup Axios defaults
  // Dihapus hardcode baseURL agar Axios otomatis mengikuti port tempat aplikasi berjalan (misal: 8001)
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.withCredentials = true;

  const loadUser = async () => {
    const token = localStorage.getItem('bayu-token');
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axios.get('/api/user');
        setUser({
          ...response.data,
          jenjang_pendidikan: response.data.jenjang_pendidikan || 'SMP',
          avatar: response.data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
        });
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('bayu-token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const response = await axios.post('/api/v1/login', { email, password });
      
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('bayu-token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser({
        ...userData,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
      });
      return null;
    } catch (error: any) {
      console.error('Login failed', error);
      return error.response?.data?.message || 'Login gagal. Periksa kembali email dan password.';
    }
  };

  const register = async (name: string, email: string, password: string, jenjang: string): Promise<string | null> => {
    try {
      const response = await axios.post('/api/v1/register', { 
        name, 
        email, 
        password,
        jenjang_pendidikan: jenjang 
      });
      
      const { access_token, data: userData } = response.data;
      
      localStorage.setItem('bayu-token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setUser({
        ...userData,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
      });
      return null;
    } catch (error: any) {
      console.error('Registration failed', error);
      // Backend sent validation errors
      if (error.response?.data && typeof error.response.data === 'object' && !error.response.data.message) {
          const firstErrorKey = Object.keys(error.response.data)[0];
          return error.response.data[firstErrorKey][0];
      }
      return error.response?.data?.message || 'Registrasi gagal. Coba gunakan email lain.';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bayu-token');
    delete axios.defaults.headers.common['Authorization'];
    // Let the App Router handle the redirect to '/' when `user` becomes null inside a ProtectedRoute
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}