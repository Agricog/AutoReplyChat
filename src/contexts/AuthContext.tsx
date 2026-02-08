import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  customerId: number;
  email: string;
  name: string;
  role: string;
  botLimit: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, businessEmail?: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isPartner: boolean;
  requiresPayment: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('arc_token'));
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('arc_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.get('/api/auth/session');
        if (data.authenticated && data.user) {
          setUser(data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem('arc_token');
          setToken(null);
        }
      } catch {
        localStorage.removeItem('arc_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.post('/api/auth/login', { email, password }, false);
    localStorage.setItem('arc_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string, businessEmail?: string) => {
    const data = await api.post('/api/auth/signup', { 
      name, email, password, businessEmail: businessEmail || email 
    }, false);
    localStorage.setItem('arc_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('arc_token');
    setToken(null);
    setUser(null);
    // Also kill server session
    api.post('/api/auth/logout', {}).catch(() => {});
  };

  const isAdmin = user?.role === 'admin';
  const isPartner = user?.role === 'partner';
  const requiresPayment = user?.role === 'customer';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin, isPartner, requiresPayment }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
