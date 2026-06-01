/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  Briefcase, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert, 
  ChevronDown,
  Building2,
  Users,
  LineChart
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  darkMode, 
  onToggleDarkMode 
}) => {
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleNav('landing');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-200 border-light-border bg-white/90 dark:border-dark-border dark:bg-dark-bg/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex cursor-pointer items-center space-x-2"
            onClick={() => handleNav('landing')}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-display font-black text-lg shadow-sm hover:scale-105 transition-transform shadow-indigo-500/10">
              F
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white">
              FR<span className="text-indigo-600 dark:text-indigo-400">SHURE</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              // Public Navigation
              <>
                <button 
                  onClick={() => handleNav('landing')}
                  className={`text-sm font-medium transition-colors ${currentView === 'landing' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                >
                  Jobs Board
                </button>
                <button 
                  onClick={() => handleNav('about')}
                  className={`text-sm font-medium transition-colors ${currentView === 'about' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleNav('pricing')}
                  className={`text-sm font-medium transition-colors ${currentView === 'pricing' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNav('faq')}
                  className={`text-sm font-medium transition-colors ${currentView === 'faq' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                >
                  FAQ
                </button>
                <button 
                  onClick={() => handleNav('contact')}
                  className={`text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
                >
                  Contact
                </button>
              </>
            ) : role === UserRole.STUDENT ? (
              // Student Navigation
              <>
                <button 
                  onClick={() => handleNav('student_dashboard')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'student_dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <Briefcase size={16} />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={() => handleNav('student_jobs')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'student_jobs' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <Briefcase size={16} />
                  <span>Job Search</span>
                </button>
                <button 
                  onClick={() => handleNav('student_applications')}
                  className={`text-sm font-medium transition-colors ${currentView === 'student_applications' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  My Applications
                </button>
                <button 
                  onClick={() => handleNav('student_saved_jobs')}
                  className={`text-sm font-medium transition-colors ${currentView === 'student_saved_jobs' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Saved Jobs
                </button>
              </>
            ) : role === UserRole.EMPLOYER ? (
              // Employer Navigation
              <>
                <button 
                  onClick={() => handleNav('employer_dashboard')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'employer_dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <Building2 size={16} />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={() => handleNav('employer_create_job')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'employer_create_job' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <PlusLabel />
                </button>
                <button 
                  onClick={() => handleNav('employer_analytics')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'employer_analytics' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <LineChart size={16} />
                  <span>Analytics</span>
                </button>
              </>
            ) : (
              // Admin Navigation
              <>
                <button 
                  onClick={() => handleNav('admin_dashboard')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${currentView === 'admin_dashboard' ? 'text-indigo-600 animate-pulse font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <ShieldAlert size={16} className="text-red-500" />
                  <span className="text-red-500 font-bold">Admin Center</span>
                </button>
                <button 
                  onClick={() => handleNav('admin_approvals')}
                  className={`text-sm font-medium transition-colors ${currentView === 'admin_approvals' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Approvals
                </button>
                <button 
                  onClick={() => handleNav('admin_analytics')}
                  className={`text-sm font-medium transition-colors ${currentView === 'admin_analytics' ? 'text-indigo-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Global Stats
                </button>
              </>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Dark Mode toggle button */}
            <button
              onClick={onToggleDarkMode}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notification Bell */}
                <button
                  onClick={() => handleNav(role === UserRole.STUDENT ? 'student_notifications' : 'employer_settings')}
                  className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                  </span>
                </button>

                {/* Chat Bubble shortcut */}
                <button
                  onClick={() => handleNav(role === UserRole.STUDENT ? 'student_chat' : 'employer_chat')}
                  className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <MessageSquare size={20} />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </button>

                {/* Profile Controls */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <img 
                      src={user.avatar || user.companyLogo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                      alt="User Profile" 
                      className="h-8 w-8 rounded-full border border-indigo-600 bg-slate-200 object-cover"
                    />
                    <ChevronDown size={14} className="text-slate-500 hidden sm:inline" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white py-1 shadow-lg dark:bg-dark-card dark:border-dark-border dark:text-slate-200">
                      <div className="px-4 py-2 border-b dark:border-dark-border">
                        <p className="truncate font-semibold text-xs text-slate-900 dark:text-white">{user.name || user.companyName}</p>
                        <p className="truncate text-[10px] text-slate-500 dark:text-slate-400 capitalize">{role?.toLowerCase()} Account</p>
                      </div>
                      
                      <button
                        onClick={() => handleNav(role === UserRole.STUDENT ? 'student_profile' : 'employer_profile')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <User size={14} className="mr-2" />
                        My Profile
                      </button>

                      <button
                        onClick={() => handleNav(role === UserRole.STUDENT ? 'student_settings' : 'employer_settings')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Settings size={14} className="mr-2" />
                        Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 border-t text-left text-sm text-red-500 dark:border-dark-border hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <LogOut size={14} className="mr-2" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Login/Signup public buttons
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => handleNav('student_login')}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('student_signup')}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95 duration-100"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b py-2 px-4 space-y-1 bg-white border-light-border dark:border-dark-border dark:bg-dark-bg">
          {!user ? (
            <>
              <button onClick={() => handleNav('landing')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Jobs Board</button>
              <button onClick={() => handleNav('about')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">About Us</button>
              <button onClick={() => handleNav('pricing')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Pricing</button>
              <button onClick={() => handleNav('faq')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">FAQ</button>
              <button onClick={() => handleNav('contact')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Contact</button>
              
              <div className="flex items-center space-x-2 pt-4 border-t dark:border-dark-border">
                <button onClick={() => handleNav('student_login')} className="flex-1 rounded-xl border px-3 py-2 text-center text-sm font-semibold dark:border-dark-border dark:text-white">Log In</button>
                <button onClick={() => handleNav('student_signup')} className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white">Sign Up</button>
              </div>
            </>
          ) : role === UserRole.STUDENT ? (
            <>
              <button onClick={() => handleNav('student_dashboard')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Student Dashboard</button>
              <button onClick={() => handleNav('student_jobs')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Search Jobs</button>
              <button onClick={() => handleNav('student_applications')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">My Applications</button>
              <button onClick={() => handleNav('student_saved_jobs')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Saved Jobs</button>
              <button onClick={() => handleNav('student_profile')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">My Profile</button>
              <button onClick={handleLogout} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">Log Out</button>
            </>
          ) : role === UserRole.EMPLOYER ? (
            <>
              <button onClick={() => handleNav('employer_dashboard')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Employer Dashboard</button>
              <button onClick={() => handleNav('employer_create_job')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Post a Job (₹99)</button>
              <button onClick={() => handleNav('employer_analytics')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Recruiter Analytics</button>
              <button onClick={() => handleNav('employer_profile')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Company Bio</button>
              <button onClick={handleLogout} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">Log Out</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('admin_dashboard')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">Admin Dashboard</button>
              <button onClick={() => handleNav('admin_approvals')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Employer Verification</button>
              <button onClick={() => handleNav('admin_analytics')} className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Platform Reports</button>
              <button onClick={handleLogout} className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">Log Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const PlusLabel: React.FC = () => {
  return (
    <span className="flex items-center space-x-1 font-semibold text-indigo-600 dark:text-indigo-400">
      <span className="text-sm">Post Job</span>
      <span className="rounded bg-indigo-100 dark:bg-indigo-950/40 text-[9px] px-1.5 py-0.5 text-indigo-800 dark:text-indigo-300">₹99</span>
    </span>
  );
};
