import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { loginWithEmail, logout, createAdminUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Create admin user if it doesn't exist
    createAdminUser().catch(console.error);

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout, isLoading }}>
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