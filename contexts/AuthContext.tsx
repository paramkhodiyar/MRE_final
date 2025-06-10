'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'visitor';

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo user credentials
const DEMO_USERS = {
  'admin@mayarealestate.com': {
    password: 'admin123',
    role: 'admin' as UserRole,
    displayName: 'Admin User'
  },
  'visitor@mayarealestate.com': {
    password: 'visitor123',
    role: 'visitor' as UserRole,
    displayName: 'Visitor User'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthState = () => {
      const token = localStorage.getItem('authToken');
      const userRole = localStorage.getItem('userRole');
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');
      
      if (token && userRole && userEmail) {
        setUser({
          uid: token,
          email: userEmail,
          role: userRole as UserRole,
          displayName: userName || undefined
        });
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Check demo credentials
      const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];
      
      if (!demoUser || demoUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Create user data
      const userData: UserData = {
        uid: `demo-${Date.now()}`,
        email: email,
        role: demoUser.role,
        displayName: demoUser.displayName
      };

      // Store in localStorage
      localStorage.setItem('authToken', userData.uid);
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.displayName || '');

      setUser(userData);

      // Dispatch custom event for navbar to listen
      window.dispatchEvent(new Event('userLoggedIn'));

      // Redirect based on role
      if (userData.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }

    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');

      setUser(null);
      
      // Dispatch custom event for navbar to listen
      window.dispatchEvent(new Event('userLoggedOut'));
      
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};