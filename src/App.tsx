/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public pages
import { 
  LandingPage, 
  AboutPage, 
  PricingPage, 
  ContactPage, 
  FAQPage, 
  PrivacyPage, 
  TermsPage 
} from './pages/PublicPages';

// Auth pages
import { AuthPages } from './pages/AuthPages';

// Portals
import { StudentPortal } from './pages/StudentPortal';
import { EmployerPortal } from './pages/EmployerPortal';
import { AdminPortal } from './pages/AdminPortal';

import { Sparkles, Shield, User, Building, Compass } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, role, logout, loginStudent, loginEmployer, loginAdmin } = useAuth();
  
  const [currentView, setCurrentView] = useState('landing');
  const [selectedJobId, setSelectedJobId] = useState<string | null>('job_01');
  const [darkMode, setDarkMode] = useState(true); // Default to a gorgeous immersive dark mode

  // Coordinate Dark mode tailwind variables
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Handler to force administrative logins for simulation tests
  const handleSimulateRoleSwitch = async (targetRole: 'public' | 'student' | 'employer' | 'admin') => {
    logout();
    if (targetRole === 'public') {
      setCurrentView('landing');
    } else if (targetRole === 'student') {
      await loginStudent('student@frshure.in', 'password');
      setCurrentView('student_dashboard');
    } else if (targetRole === 'employer') {
      await loginEmployer('employer@frshure.in', 'password');
      setCurrentView('employer_dashboard');
    } else {
      await loginAdmin('admin@frshure.in', 'password');
      setCurrentView('admin_dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 bg-[#F8FAFC] dark:bg-[#0B0F19]">
      
      {/* 🚀 HIGH-FIDELITY SIMULATOR COMMAND CONTROL DOCK */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-1.5 px-4 flex flex-col md:flex-row items-center justify-between gap-2.5 z-50">
        <div className="flex items-center space-x-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">FRSHURE Interactive Sandbox Simulator</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] text-slate-400 mr-1.5">Switch view instantly:</span>
          
          <button 
            onClick={() => handleSimulateRoleSwitch('public')}
            className={`rounded px-2.5 py-1 text-[9px] font-extrabold uppercase transition-all flex items-center gap-1 border border-slate-800 hover:border-slate-700 ${!user ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'}`}
          >
            <Compass size={10} /> Public
          </button>

          <button 
            onClick={() => handleSimulateRoleSwitch('student')}
            className={`rounded px-2.5 py-1 text-[9px] font-extrabold uppercase transition-all flex items-center gap-1 border border-slate-800 hover:border-slate-700 ${role === UserRole.STUDENT ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-950 text-slate-400'}`}
          >
            <User size={10} /> Student Portal
          </button>

          <button 
            onClick={() => handleSimulateRoleSwitch('employer')}
            className={`rounded px-2.5 py-1 text-[9px] font-extrabold uppercase transition-all flex items-center gap-1 border border-slate-800 hover:border-slate-700 ${role === UserRole.EMPLOYER ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-950 text-slate-400'}`}
          >
            <Building size={10} /> Recruiter Portal
          </button>

          <button 
            onClick={() => handleSimulateRoleSwitch('admin')}
            className={`rounded px-2.5 py-1 text-[9px] font-extrabold uppercase transition-all flex items-center gap-1 border border-slate-800 hover:border-slate-700 ${role === UserRole.ADMIN ? 'bg-red-600 text-white' : 'bg-slate-950 text-red-400'}`}
          >
            <Shield size={10} /> Admin Portal
          </button>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <Navbar 
        currentView={currentView}
        onNavigate={setCurrentView}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main viewport Container with transitions support */}
      <div className="flex-1 w-full">
        
        {/* PUBLIC VIEWS */}
        {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} onViewJob={(id) => { setSelectedJobId(id); setCurrentView('student_job_details'); }} />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'pricing' && <PricingPage onNavigate={setCurrentView} />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'faq' && <FAQPage />}
        {currentView === 'privacy' && <PrivacyPage />}
        {currentView === 'terms' && <TermsPage />}

        {/* AUTH PATHS */}
        {currentView === 'student_login' && <AuthPages initialMode="student_login" onNavigate={setCurrentView} />}
        {currentView === 'student_signup' && <AuthPages initialMode="student_signup" onNavigate={setCurrentView} />}
        {currentView === 'employer_login' && <AuthPages initialMode="employer_login" onNavigate={setCurrentView} />}
        {currentView === 'employer_signup' && <AuthPages initialMode="employer_signup" onNavigate={setCurrentView} />}

        {/* STUDENT VIEWS MODULES */}
        {currentView.startsWith('student_') && (
          <StudentPortal 
            view={currentView} 
            onNavigate={setCurrentView}
            selectedJobId={selectedJobId}
            setSelectedJobId={setSelectedJobId}
          />
        )}

        {/* EMPLOYER VIEWS MODULES */}
        {currentView.startsWith('employer_') && (
          <EmployerPortal 
            view={currentView} 
            onNavigate={setCurrentView}
          />
        )}

        {/* ADMIN VIEWS MODULE */}
        {currentView.startsWith('admin_') && (
          <AdminPortal />
        )}

      </div>

      {/* Standard common Footer block */}
      <Footer onNavigate={setCurrentView} />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
