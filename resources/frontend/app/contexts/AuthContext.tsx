import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'user' | 'pakar' | 'admin';

interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with roles
const mockUsers: Record<string, User> = {
  'user@gmail.com': {
    email: 'user@gmail.com',
    name: 'Budi Santoso',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
  },
  'pakar@gmail.com': {
    email: 'pakar@gmail.com',
    name: 'Dr. Sarah Wijaya, M.Pd',
    role: 'pakar',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
  },
  'admin@gmail.com': {
    email: 'admin@gmail.com',
    name: 'Admin Ba-Yu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('bayu-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    const foundUser = mockUsers[email.toLowerCase()];
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('bayu-user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bayu-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
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