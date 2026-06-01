/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Building2, Eye, EyeOff, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialMode: 'student_login' | 'student_signup' | 'employer_login' | 'employer_signup' | 'forgot_password';
  onNavigate: (view: string) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ initialMode, onNavigate }) => {
  const { loginStudent, signupStudent, loginEmployer, signupEmployer, loginAdmin } = useAuth();
  
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [skills, setSkills] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to pre-populate seed credentials for fast testing
  const handleLoadSeedCredentials = (roleType: 'student' | 'employer' | 'admin') => {
    setErrorText('');
    setSuccessText('');
    if (roleType === 'student') {
      setEmail('student@frshure.in');
      setPassword('password');
      setName('Rajdeep Nayek');
    } else if (roleType === 'employer') {
      setEmail('employer@frshure.in');
      setPassword('password');
      setCompanyName('Apex Innovations');
    } else {
      setEmail('admin@frshure.in');
      setPassword('password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    setSuccessText('');
    setLoading(true);

    try {
      if (mode === 'student_login') {
        // Double check admin login shortcut
        if (email === 'admin@frshure.in') {
          await loginAdmin(email, password);
          onNavigate('admin_dashboard');
          return;
        }
        await loginStudent(email, password);
        onNavigate('student_dashboard');
      } else if (mode === 'student_signup') {
        const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
        await signupStudent({ name, email, password, skills: skillsArray });
        onNavigate('student_dashboard');
      } else if (mode === 'employer_login') {
        await loginEmployer(email, password);
        onNavigate('employer_dashboard');
      } else if (mode === 'employer_signup') {
        await signupEmployer({ companyName, email, password });
        onNavigate('employer_dashboard');
      } else if (mode === 'forgot_password') {
        // Simulated link dispatch
        setSuccessText(`Password reset email dispatched to ${email}. Check spam folder!`);
        setEmail('');
      }
    } catch (err: any) {
      setErrorText(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 dark:text-slate-100">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-display font-black text-white text-base">
            F
          </div>
          <h1 className="font-display font-black text-2xl tracking-tight">
            {mode === 'student_login' && 'Student Portal Log In'}
            {mode === 'student_signup' && 'Student Signup'}
            {mode === 'employer_login' && 'Recruiter Log In'}
            {mode === 'employer_signup' && 'Register Recruiter Account'}
            {mode === 'forgot_password' && 'Password Recovery'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode.includes('login') ? 'Access active jobs, chats, and resumes instantly.' : 'Get started in under 30 seconds.'}
          </p>
        </div>

        {/* Real Form Panel */}
        <div className="border rounded-3xl p-6 sm:p-8 bg-white dark:bg-dark-card border-light-border dark:border-dark-border shadow-md space-y-5">
          
          {/* Quick Demo Assist Button banner */}
          <div className="text-center bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-950/30 space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase flex items-center justify-center">
              <Sparkles size={12} className="mr-1" /> Quick Testing Credentials Fill
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button 
                onClick={() => { setMode('student_login'); handleLoadSeedCredentials('student'); }}
                className="text-[10px] border px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600"
              >
                Student Demo
              </button>
              <button 
                onClick={() => { setMode('employer_login'); handleLoadSeedCredentials('employer'); }}
                className="text-[10px] border px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600"
              >
                Recruiter Demo
              </button>
              <button 
                onClick={() => { setMode('student_login'); handleLoadSeedCredentials('admin'); }}
                className="text-[10px] border px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-500"
              >
                Admin (Iffy Shortcut)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name parameters */}
            {mode === 'student_signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
                <div className="relative rounded-xl border dark:border-slate-800">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User size={15} />
                  </span>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rajdeep Nayek"
                    className="w-full rounded-xl py-2.5 pl-10 pr-4 text-xs bg-transparent focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            )}

            {mode === 'employer_signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company Legal Name</label>
                <div className="relative rounded-xl border dark:border-slate-800">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Building2 size={15} />
                  </span>
                  <input 
                    type="text" 
                    required 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Apex Innovations Ltd"
                    className="w-full rounded-xl py-2.5 pl-10 pr-4 text-xs bg-transparent focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">Email Address</label>
              <div className="relative rounded-xl border dark:border-slate-800">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={15} />
                </span>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl py-2.5 pl-10 pr-4 text-xs bg-transparent focus:outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Skills selection (For student signup) */}
            {mode === 'student_signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Skills (Comma comma separated)</label>
                <input 
                  type="text" 
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, TypeScript, Redux, Node.js"
                  className="w-full rounded-xl border p-2.5 text-xs bg-transparent focus:outline-none dark:border-slate-800 dark:text-white"
                />
              </div>
            )}

            {/* Password (if not recovery mode) */}
            {mode !== 'forgot_password' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
                  {mode.includes('login') && (
                    <button 
                      type="button" 
                      onClick={() => setMode('forgot_password')}
                      className="text-[10px] text-indigo-500 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative rounded-xl border dark:border-slate-800">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock size={15} />
                  </span>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter absolute password"
                    className="w-full rounded-xl py-2.5 pl-10 pr-10 text-xs bg-transparent focus:outline-none dark:text-white"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Success / Error indications */}
            {errorText && (
              <div className="rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-3 text-xs flex items-center font-semibold">
                <AlertCircle size={15} className="mr-1.5 flex-shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {successText && (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 text-xs flex items-center font-semibold animate-pulse">
                <AlertCircle size={15} className="mr-1.5 flex-shrink-0" />
                <span>{successText}</span>
              </div>
            )}

            {/* Dispatch submit button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center justify-center disabled:opacity-50 font-sans"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span className="mr-1.5 uppercase tracking-wider">
                    {mode === 'student_login' || mode === 'employer_login' ? 'Let\'s Sign In' : mode === 'forgot_password' ? 'Send Link' : 'Register Account'}
                  </span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

          </form>

          {/* Toggle modes options */}
          <div className="border-t dark:border-dark-border/40 pt-4 text-center text-xs space-y-2 text-slate-500 dark:text-slate-400 font-sans">
            {mode === 'student_login' && (
              <p>Don't have a student profile? <button onClick={() => setMode('student_signup')} className="text-indigo-500 hover:underline">Create Student Account</button></p>
            )}
            {mode === 'student_signup' && (
              <p>Already registered? <button onClick={() => setMode('student_login')} className="text-indigo-500 hover:underline">Student Log In</button></p>
            )}
            {mode === 'employer_login' && (
              <p>Need employer credentials? <button onClick={() => setMode('employer_signup')} className="text-indigo-500 hover:underline">Register Company</button></p>
            )}
            {mode === 'employer_signup' && (
              <p>Recruiter already registered? <button onClick={() => setMode('employer_login')} className="text-indigo-500 hover:underline">Recruiter Log In</button></p>
            )}
            {mode === 'forgot_password' && (
              <p>Remembered? <button onClick={() => setMode('student_login')} className="text-indigo-500 hover:underline">Return to Log In</button></p>
            )}

            {/* Pivot between Student and Recruiter structures */}
            <div className="pt-2 border-t dark:border-dark-border/10 flex items-center justify-center space-x-3 text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {mode.startsWith('student') ? (
                <button onClick={() => setMode('employer_login')} className="hover:text-indigo-500">
                  Switch to recruiter view →
                </button>
              ) : (
                <button onClick={() => setMode('student_login')} className="hover:text-indigo-500">
                  ← Switch to student view
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
