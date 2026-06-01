/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { UserRole } from '../types';

interface AuthContextType {
  user: any | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginStudent: (email: string, password: string) => Promise<void>;
  signupStudent: (details: any) => Promise<void>;
  loginEmployer: (email: string, password: string) => Promise<void>;
  signupEmployer: (details: any) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (details: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt session restoration on mount
    const token = localStorage.getItem('frshure_token');
    const storedRole = localStorage.getItem('frshure_role') as UserRole | null;
    const storedUser = localStorage.getItem('frshure_user');

    if (token && storedRole && storedUser) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  const saveSession = (token: string, userData: any, userRole: UserRole) => {
    localStorage.setItem('frshure_token', token);
    localStorage.setItem('frshure_role', userRole);
    localStorage.setItem('frshure_user', JSON.stringify(userData));
    setUser(userData);
    setRole(userRole);
  };

  const loginStudent = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.studentLogin(email, password);
      saveSession(res.token, res.user, res.role);
    } finally {
      setIsLoading(false);
    }
  };

  const signupStudent = async (details: any) => {
    setIsLoading(true);
    try {
      const res = await authService.studentSignup(details);
      saveSession(res.token, res.user, res.role);
    } finally {
      setIsLoading(false);
    }
  };

  const loginEmployer = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.employerLogin(email, password);
      saveSession(res.token, res.user, res.role);
    } finally {
      setIsLoading(false);
    }
  };

  const signupEmployer = async (details: any) => {
    setIsLoading(true);
    try {
      const res = await authService.employerSignup(details);
      saveSession(res.token, res.user, res.role);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.adminLogin(email, password);
      saveSession(res.token, res.user, res.role);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('frshure_token');
    localStorage.removeItem('frshure_role');
    localStorage.removeItem('frshure_user');
    setUser(null);
    setRole(null);
  };

  const updateProfile = async (details: any) => {
    if (!role) return;
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(role, details);
      localStorage.setItem('frshure_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        loginStudent,
        signupStudent,
        loginEmployer,
        signupEmployer,
        loginAdmin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
