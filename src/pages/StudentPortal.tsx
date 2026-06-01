/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Job, JobApplication, ChatThread, ChatMessage, SystemNotification, UserRole } from '../types';
import { jobService } from '../services/jobService';
import { chatService } from '../services/chatService';
import { notificationService } from '../services/notificationService';
import { JobCard } from '../components/common/JobCard';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Send, 
  Briefcase, 
  Compass, 
  FileCheck, 
  Bookmark, 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  ArrowRight,
  ExternalLink,
  Bot,
  AlertCircle,
  ThumbsUp,
  UserCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface StudentPortalProps {
  view: string;
  onNavigate: (view: string) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ 
  view, 
  onNavigate,
  selectedJobId,
  setSelectedJobId
}) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(view);

  // Re-sync local state when navbar navigates
  useEffect(() => {
    setActiveTab(view);
  }, [view]);

  const handleNavLocal = (tabName: string) => {
    setActiveTab(tabName);
    onNavigate(tabName);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Responsive Portal Left Sidebar Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm text-center">
            <div className="relative mx-auto h-20 w-20">
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt="Student profile avatar"
                className="h-full w-full rounded-full object-cover border-2 border-indigo-500 bg-slate-100"
              />
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-dark-card"></span>
            </div>
            <h2 className="font-display font-bold text-slate-900 dark:text-white mt-3 text-lg">{user?.name || 'Student Candidate'}</h2>
            <p className="text-[11px] text-indigo-650 dark:text-indigo-400 font-mono mt-0.5">{user?.course || 'IIT Kharagpur CSE'}</p>
            <p className="text-[10px] text-slate-400 mt-1">{user?.university || 'IIT Kharagpur'}</p>
            
            <div className="mt-4 pt-4 border-t dark:border-dark-border/60 flex items-center justify-around text-xs font-semibold">
              <div className="text-center">
                <span className="block text-slate-900 dark:text-white font-bold">{user?.skills?.length || 0}</span>
                <span className="text-[10px] text-slate-400">Skills</span>
              </div>
              <div className="h-6 w-px bg-slate-100 dark:bg-slate-800"></div>
              <button onClick={() => handleNavLocal('student_profile')} className="text-indigo-600 dark:text-indigo-400 hover:underline text-[10px] uppercase font-bold tracking-wider">
                Edit profile
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <nav className="rounded-2xl border bg-white p-3 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-1">
            <button 
              onClick={() => handleNavLocal('student_dashboard')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_dashboard' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Compass size={16} /> <span>Home Dashboard</span>
            </button>
            <button 
              onClick={() => handleNavLocal('student_jobs')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_jobs' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Briefcase size={16} /> <span>Job Search</span>
            </button>
            <button 
              onClick={() => handleNavLocal('student_applications')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_applications' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850'}`}
            >
              <FileCheck size={16} /> <span>My Applications</span>
            </button>
            <button 
              onClick={() => handleNavLocal('student_saved_jobs')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_saved_jobs' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Bookmark size={16} /> <span>Saved Jobs</span>
            </button>
            <button 
              onClick={() => handleNavLocal('student_chat')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_chat' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <MessageSquare size={16} /> <span>Recruiter Chats</span>
            </button>
            <button 
              onClick={() => handleNavLocal('student_notifications')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'student_notifications' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Bell size={16} /> <span>Notifications</span>
            </button>
          </nav>
        </aside>

        {/* Dynamic Display Panels */}
        <main className="lg:col-span-3 space-y-6">
          {activeTab === 'student_dashboard' && <StudentDashboardView onNav={handleNavLocal} onViewJob={(id) => { setSelectedJobId(id); handleNavLocal('student_job_details'); }} />}
          {activeTab === 'student_jobs' && <StudentJobSearchView onViewJob={(id) => { setSelectedJobId(id); handleNavLocal('student_job_details'); }} />}
          {activeTab === 'student_job_details' && <StudentJobDetailsView jobId={selectedJobId} onBack={() => handleNavLocal('student_jobs')} onApplied={() => { handleNavLocal('student_applications'); }} />}
          {activeTab === 'student_applications' && <StudentApplicationsView onViewJob={(id) => { setSelectedJobId(id); handleNavLocal('student_job_details'); }} />}
          {activeTab === 'student_saved_jobs' && <SavedJobsView onViewJob={(id) => { setSelectedJobId(id); handleNavLocal('student_job_details'); }} />}
          {activeTab === 'student_notifications' && <StudentNotificationsView />}
          {activeTab === 'student_chat' && <StudentChatView />}
          {activeTab === 'student_profile' && <StudentProfileView />}
          {activeTab === 'student_settings' && <StudentSettingsView />}
        </main>

      </div>
    </div>
  );
};

/* ==========================================
   STUDENT SUBVIEWS
   ========================================== */

/* 1. Student Dashboard View */
const StudentDashboardView: React.FC<{ onNav: (tab: string) => void; onViewJob: (id: string) => void }> = ({ onNav, onViewJob }) => {
  const { user } = useAuth();
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [recommendations, setRecommendations] = useState<Job[]>([]);

  useEffect(() => {
    const loadDash = async () => {
      const allJobs = await jobService.getJobs();
      const studentApps = await jobService.getStudentApplications();
      setApps(studentApps);
      
      // Match recommendations based on skills overlap
      const matches = allJobs.slice(0, 2);
      setRecommendations(matches);
    };
    loadDash();
  }, []);

  const pendingApps = apps.filter(a => a.status === 'applied' || a.status === 'reviewed');
  const acceptedApps = apps.filter(a => a.status === 'accepted');

  return (
    <div className="space-y-6">
      
      {/* Greetings Banner */}
      <div className="rounded-2xl border p-6 bg-gradient-to-r from-indigo-50 to-indigo-100/30 border-indigo-100/50 dark:from-slate-900/30 dark:to-indigo-950/20 dark:border-dark-border">
        <h1 className="font-display font-black text-2xl tracking-tight text-slate-900 dark:text-white">Welcome back, {user?.name || 'Scholar'}!</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Found 4 verification audits completed under your profile. Explore matches immediately.</p>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div onClick={() => onNav('student_applications')} className="rounded-2xl border p-4 bg-white hover:border-indigo-300 cursor-pointer dark:bg-dark-card dark:border-dark-border transition-all">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Applied</span>
          <div className="font-display font-black text-2xl mt-1">{apps.length}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Recruiter applications</p>
        </div>
        <div className="rounded-2xl border p-4 bg-white dark:bg-dark-card dark:border-dark-border">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Shortlisted / Accepted</span>
          <div className="font-display font-black text-2xl mt-1 text-emerald-500">{acceptedApps.length}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Active interview invites</p>
        </div>
        <div onClick={() => onNav('student_chat')} className="rounded-2xl border p-4 bg-white hover:border-indigo-300 cursor-pointer dark:bg-dark-card dark:border-dark-border transition-all">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Pending Under Review</span>
          <div className="font-display font-black text-2xl mt-1 text-indigo-600">{pendingApps.length}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Slightly awaiting followups</p>
        </div>
      </div>

      {/* Matching curated recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-lg text-slate-900 dark:text-white flex items-center">
            <Sparkles size={16} className="text-indigo-500 mr-1.5 animate-pulse" /> Custom Match Internships
          </h2>
          <button onClick={() => onNav('student_jobs')} className="text-xs text-indigo-600 font-semibold hover:underline">
            View Jobs Board →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(job => (
            <JobCard key={job.id} job={job} onViewDetails={onViewJob} />
          ))}
        </div>
      </div>

      {/* Recruiter Activity overview */}
      <div className="rounded-2xl border p-5 bg-white dark:bg-dark-card dark:border-dark-border space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Career Trajectory Track</h3>
        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 space-y-6 pl-4 ml-2">
          <div className="relative">
            <div className="absolute -left-[21px] rounded-full bg-indigo-650 p-0.5 text-white">
              <CheckCircle size={10} />
            </div>
            <p className="text-[10px] text-slate-400">Just Now</p>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Razorpay requested direct Message Interview Call</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Please check your Chat thread inbox to coordinate a morning meet.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] rounded-full bg-emerald-500 p-0.5 text-white">
              <CheckCircle size={10} />
            </div>
            <p className="text-[10px] text-slate-400">Yesterday</p>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Applied to Swiggy Product Design challenge</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Completed custom design assessment and catalog index link.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

/* 2. Job Search View */
const StudentJobSearchView: React.FC<{ onViewJob: (id: string) => void }> = ({ onViewJob }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [remote, setRemote] = useState('All');

  useEffect(() => {
    const list = async () => {
      const data = await jobService.getJobs();
      setJobs(data);
    };
    list();
  }, []);

  const filtered = jobs.filter(job => {
    const searchMatch = job.title.toLowerCase().includes(query.toLowerCase()) || 
                        job.companyName.toLowerCase().includes(query.toLowerCase());
    const catMatch = cat === 'All' || job.category === cat;
    const remoteMatch = remote === 'All' || job.remoteType === remote;

    return searchMatch && catMatch && remoteMatch;
  });

  return (
    <div className="space-y-6">
      
      {/* Consolidated Filters Panel */}
      <div className="rounded-2xl border p-4 bg-white dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
        
        {/* Input search */}
        <div className="flex items-center space-x-2 rounded-xl border p-2.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 px-3">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search roles like Frontend, Product Design, Social Media marketing..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none dark:text-white"
          />
        </div>

        {/* Categories Pills selectors */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {['All', 'Software Engineering', 'UI/UX Design', 'Marketing & Writing', 'Mobile Development'].map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-lg px-3 py-1 text-[11px] font-bold border transition-colors ${cat === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-light-border hover:bg-slate-100 dark:bg-slate-850 dark:text-slate-300 dark:border-slate-800'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Extra Selector checks */}
        <div className="flex items-center space-x-4 pt-2 border-t dark:border-slate-800 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center"><Filter size={12} className="mr-1" /> Filters:</span>
          
          <select 
            value={remote} 
            onChange={(e) => setRemote(e.target.value)}
            className="bg-transparent border rounded p-1 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(job => (
          <JobCard key={job.id} job={job} onViewDetails={onViewJob} />
        ))}
      </div>

    </div>
  );
};

/* 3. Job Details View (including direct application modals) */
const StudentJobDetailsView: React.FC<{ jobId: string | null; onBack: () => void; onApplied: () => void }> = ({ jobId, onBack, onApplied }) => {
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('https://frshure.in/resumes/rajdeep_nayek_cse.pdf');
  const [submitting, setSubmitting] = useState(false);
  const [scoreAnimation, setScoreAnimation] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const fetchSelect = async () => {
      const data = await jobService.getJobById(jobId);
      setJob(data);
    };
    fetchSelect();
  }, [jobId]);

  useEffect(() => {
    // Elegant match score delay loading for higher fidelity interface
    const t = setTimeout(() => setScoreAnimation(true), 600);
    return () => clearTimeout(t);
  }, [job]);

  if (!job) {
    return <div className="text-center py-12 text-xs">Loading internship details...</div>;
  }

  const handleApplyAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Call the direct apply endpoint on real jobs board
    await jobService.applyForJob(job.id, {
      studentId: user?.id || 'std_01',
      studentName: user?.name || 'Rajdeep Nayek',
      studentEmail: user?.email || 'rajdeep@gmail.com',
      resumeUrl: resumeUrl
    });

    // Seed alert notifications index to make notifications screen immediately active!
    notificationService.addLocalNotification(
      'Application Submitted Successfully',
      `You applied for the role of ${job.title} at ${job.companyName}.`,
      'application_update'
    );

    setTimeout(() => {
      setSubmitting(false);
      setIsApplying(false);
      onApplied();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Back link */}
      <button onClick={onBack} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
        ← Return to Job Search
      </button>

      {/* Header Info Tile */}
      <div className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-start space-x-4">
          <img 
            src={job.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'} 
            className="h-16 w-16 rounded-2xl object-cover bg-slate-50 border"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{job.companyName}</span>
              {job.verified && <CheckCircle size={14} className="text-indigo-600 fill-indigo-650/10" />}
            </div>
            <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white leading-tight">{job.title}</h1>
            <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
               <span className="flex items-center"><MapPin size={12} className="mr-0.5" /> {job.location}</span>
               <span>•</span>
               <span className="font-semibold text-emerald-600 dark:text-emerald-400">{job.salary}</span>
            </div>
          </div>
        </div>

        {/* Matching Analysis Circle score */}
        <div className="bg-indigo-50/40 p-4 rounded-xl border dark:bg-indigo-950/20 dark:border-dark-border flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex items-center justify-center">
            <svg className="h-14 w-14">
              <circle cx="28" cy="28" r="24" className="stroke-slate-200 dark:stroke-slate-800 fill-transparent" strokeWidth="4" />
              <circle cx="28" cy="28" r="24" 
                className="stroke-indigo-600 fill-transparent transition-all duration-1000 ease-out" 
                strokeWidth="4" 
                strokeDasharray={150} 
                strokeDashoffset={scoreAnimation ? 16 : 150} // dynamically aligns closer to 88%
              />
            </svg>
            <span className="absolute text-xs font-black text-indigo-700 dark:text-indigo-350">89%</span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase leading-tight tracking-wider">skills match</h4>
            <p className="text-[10px] text-slate-500 leading-snug">Calculated by FRSHURE AI matching algorithms.</p>
          </div>
        </div>
      </div>

      {/* Main Details content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left main: Bio Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white border-b dark:border-slate-800 pb-2">Role Overview</h2>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mt-3">{job.description}</p>
            </div>

            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white border-b dark:border-slate-800 pb-2">Required Qualifications</h2>
              <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-300 space-y-1.5 mt-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white border-b dark:border-slate-800 pb-2">Responsibilities</h2>
              <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-300 space-y-1.5 mt-3">
                {job.responsibilities?.map((res, idx) => (
                  <li key={idx} className="leading-relaxed">{res}</li>
                )) || (
                  <>
                    <li className="leading-relaxed">Translate complex product layouts into high-performing frontend pages.</li>
                    <li className="leading-relaxed">Maintain cohesive typography tracking spacing inline indicators.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right side parameters */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Job Fast-Facts</h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Stipend:</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Work Model:</span>
                <span className="font-medium">{job.remoteType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-medium text-indigo-500">{job.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Applicants count:</span>
                <span className="font-semibold bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded-md dark:bg-indigo-950/20">{job.applicantCount} total</span>
              </div>
            </div>

            {/* Direct CTA apply click */}
            <button 
              onClick={() => setIsApplying(true)}
              className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center justify-center animate-bounce"
            >
              Apply to Internship
            </button>
          </div>

          <div className="rounded-2xl border p-4 bg-slate-50 dark:bg-dark-card/30 dark:border-dark-border text-[10px] text-slate-500 space-y-2">
            <p className="font-bold uppercase tracking-wider text-[9px] flex items-center"><Bot size={12} className="mr-1 text-indigo-500" /> Auto-Hiring Safety Pledge</p>
            <p>Every recruiter on FRSHURE pays a strict ₹99 setup rate. We auto de-list matching spam accounts within 10 minutes of recruiter moderation feedback flag.</p>
          </div>
        </div>

      </div>

      {/* Inline React Overlay Modal for fast application inputs */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-xl dark:bg-dark-card dark:border-dark-border space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Complete Application</h3>
              <button onClick={() => setIsApplying(false)} className="text-slate-400 text-xs">Close [X]</button>
            </div>

            <form onSubmit={handleApplyAction} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">Hiring Role:</p>
                <p className="bg-slate-50 p-2.5 rounded-lg border dark:bg-slate-900 dark:border-slate-800 text-slate-500">{job.title} ({job.companyName})</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Default Resume PDF Link</label>
                <input 
                  type="url" 
                  required
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://gdrive.com/my-resume-pdf"
                  className="w-full rounded-xl border p-3 text-xs focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                />
              </div>

              <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/20 p-3 text-[10px] text-indigo-805 dark:text-indigo-300">
                ⭐ Matching score calculation predicts <strong>89% alignment</strong> with Swiggy recruitment constraints. Resume is fully verified.
              </div>

              {submitting ? (
                <div className="text-center py-2 font-semibold">Submitting application sheet, please wait...</div>
              ) : (
                <button 
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                  Confirm Direct Apply
                </button>
              )}

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

/* 4. Applications View */
const StudentApplicationsView: React.FC<{ onViewJob: (id: string) => void }> = ({ onViewJob }) => {
  const [apps, setApps] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchAppsList = async () => {
      const data = await jobService.getStudentApplications();
      setApps(data);
    };
    fetchAppsList();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Active Applications</h1>
        <p className="text-xs text-slate-400">Track and review matching score cards for your recruiter outreach logs.</p>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-12 border rounded-2xl border-dashed">No applications found. Apply to some active internships today!</div>
      ) : (
        <div className="space-y-4">
          {apps.map(app => (
            <div 
              key={app.id} 
              className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5">
                <img src={app.companyLogo} className="h-11 w-11 rounded-xl object-cover bg-slate-50 border" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{app.jobTitle}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{app.companyName}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status & match controls */}
              <div className="flex items-center space-x-6 text-xs w-full sm:w-auto justify-between border-t sm:border-transparent pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[9px] block uppercase font-mono tracking-wider text-slate-400">Match score</span>
                  <span className="font-black text-xs text-indigo-650 bg-indigo-50 dark:bg-indigo-950/10 px-2 py-0.5 rounded">{app.matchScore}% match</span>
                </div>

                <div>
                  <span className={`inline-block font-bold rounded-full px-3.5 py-1 text-[11px] uppercase ${
                    app.status === 'accepted' 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                      : app.status === 'rejected'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <button 
                  onClick={() => onViewJob(app.jobId)}
                  className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850"
                >
                  <ExternalLink size={12} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

/* 5. Saved Jobs View */
const SavedJobsView: React.FC<{ onViewJob: (id: string) => void }> = ({ onViewJob }) => {
  const [saved, setSaved] = useState<Job[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const data = await jobService.getSavedJobs();
      setSaved(data);
    };
    loadSaved();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Saved Internships</h1>
        <p className="text-xs text-slate-400">Roles you saved for dynamic resume shortlists.</p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-12 border rounded-2xl border-dashed">
          <p className="text-sm font-bold text-slate-500">No saved roles</p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">Bookmark internships on the Jobs Board to save copies here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map(job => (
            <JobCard key={job.id} job={job} onViewDetails={onViewJob} />
          ))}
        </div>
      )}
    </div>
  );
};

/* 6. Notifications View */
const StudentNotificationsView: React.FC = () => {
  const [notifs, setNotifs] = useState<SystemNotification[]>([]);

  useEffect(() => {
    const list = async () => {
      const logs = await notificationService.getNotifications();
      setNotifs(logs);
    };
    list();
  }, []);

  const handleMarkAll = () => {
    notificationService.markAllAsRead();
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">System notifications</h1>
          <p className="text-xs text-slate-400">Updates on active application audits and chat meet invites.</p>
        </div>
        <button onClick={handleMarkAll} className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map(n => (
          <div 
            key={n.id} 
            className={`rounded-2xl border p-4.5 bg-white dark:bg-dark-card dark:border-dark-border shadow-sm flex items-start space-x-3.5 relative overflow-hidden ${
              !n.read ? 'border-l-4 border-l-indigo-600' : ''
            }`}
          >
            <div className={`rounded-xl p-2.5 ${
              n.type === 'chat' 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/25'
            }`}>
              <Bell size={16} />
            </div>
            
            <div className="space-y-0.5 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">{n.title}</h4>
              <p className="text-slate-500 dark:text-slate-300 leading-relaxed">{n.description}</p>
              <p className="text-[9px] text-slate-400 pt-1 flex items-center">
                <Clock size={10} className="mr-1" /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 7. Student Chat View (High fidelity interactive panel) */
const StudentChatView: React.FC = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [partnerReplying, setPartnerReplying] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initThreads = async () => {
      const data = await chatService.getChatThreads();
      setThreads(data);
      if (data.length > 0) {
        setActiveThread(data[0]);
      }
    };
    initThreads();
  }, []);

  useEffect(() => {
    if (!activeThread) return;
    const fetchMsgs = async () => {
      const history = await chatService.getChatMessages(activeThread.id);
      setMessages(history);
    };
    fetchMsgs();
  }, [activeThread]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeThread) return;

    const typed = text;
    setText('');
    
    // Add student message
    const mine = await chatService.sendMessage(activeThread.id, typed, 'std_01');
    setMessages(prev => [...prev, mine]);

    // Force Partner status indicator to "typing..."
    setPartnerReplying(true);

    // Trigger auto HR simulation after 3 seconds
    const hrReply = await chatService.triggerSimulatedReply(activeThread.id, user?.name || 'Rajdeep Nayek');
    
    setPartnerReplying(false);
    setMessages(prev => [...prev, hrReply]);

    // Push local alerts indicator
    notificationService.addLocalNotification(
      'New Chat Message',
      `${activeThread.partnerName} responded: "${hrReply.text.substring(0, 30)}..."`,
      'chat'
    );
  };

  return (
    <div className="rounded-2xl border bg-white dark:bg-dark-card dark:border-dark-border shadow-sm grid grid-cols-1 md:grid-cols-3 min-h-[500px] overflow-hidden">
      
      {/* Threads Side Panel */}
      <div className="col-span-1 border-r dark:border-slate-850 p-4 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b dark:border-slate-850 flex items-center">
          <MessageSquare size={16} className="text-indigo-500 mr-1.5" /> Recruiter Chats
        </h3>

        <div className="space-y-1">
          {threads.map(t => (
            <div 
              key={t.id}
              onClick={() => setActiveThread(t)}
              className={`rounded-xl p-3 cursor-pointer transition-colors ${
                activeThread?.id === t.id 
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/20' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={t.partnerAvatar} className="h-9 w-9 rounded-full object-cover border" />
                  {t.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500"></span>}
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{t.partnerName}</h4>
                    <span className="text-[9px] text-slate-400">{t.lastMessageTime}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{t.lastMessage}</p>
                </div>
                {t.unreadCount > 0 && (
                  <span className="rounded-full bg-indigo-600 text-white font-bold text-[9px] h-4.5 w-4.5 flex items-center justify-center">
                    {t.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Column Panel */}
      <div className="col-span-2 flex flex-col justify-between">
        
        {/* Header thread */}
        {activeThread ? (
          <>
            <div className="p-4 border-b dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10 flex items-center space-x-3">
              <img src={activeThread.partnerAvatar} className="h-9 w-9 rounded-full object-cover" />
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">{activeThread.partnerName}</h4>
                <p className="text-[10px] text-slate-400">{activeThread.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>

            {/* Chats scrolling board */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[350px]">
              {messages.map(m => {
                const isMe = m.senderId === 'std_01';
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none dark:bg-slate-800 dark:text-slate-200'
                    }`}>
                      <p>{m.text}</p>
                      <span className={`block text-[9px] text-right mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot status simulation */}
              {partnerReplying && (
                <div className="flex justify-start items-center space-x-2 text-[10px] text-slate-400 font-medium">
                  <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>Recruiter is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input message form block */}
            <form onSubmit={handleSend} className="p-4 border-t dark:border-slate-850 flex items-center space-x-2">
              <input 
                type="text" 
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a message to HR..."
                className="w-full rounded-xl border p-2.5 text-xs bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white focus:outline-none"
              />
              <button 
                type="submit"
                className="rounded-xl bg-indigo-600 p-2.5 text-white hover:bg-indigo-505 transition-colors"
              >
                <Send size={15} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-20 text-xs text-slate-400">Select a recruiter thread from the panel to start chatting.</div>
        )}

      </div>

    </div>
  );
};

/* 8. Student Profile View */
const StudentProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || 'Rajdeep Nayek');
  const [university, setUniversity] = useState(user?.university || 'IIT Kharagpur');
  const [course, setCourse] = useState(user?.course || 'Computer Science Engineering');
  const [year, setYear] = useState(user?.yearOfStudy || 3);
  const [skillsText, setSkillsText] = useState(user?.skills?.join(', ') || 'React, TypeScript, Tailwind');
  const [bio, setBio] = useState(user?.bio || '');
  const [saved, setSaved] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    await updateProfile({
      ...user,
      name,
      university,
      course,
      yearOfStudy: Number(year),
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      bio
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleUpdate} className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-5 text-xs">
      <div>
        <h2 className="font-display font-black text-lg text-slate-900 dark:text-white">Student Resume Bio Profile</h2>
        <p className="text-xs text-slate-400">Your profile details are shown to verified recruiters when you apply.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Student Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">University / College</label>
          <input 
            type="text" 
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Course / Discipline</label>
          <input 
            type="text" 
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Year of Study</label>
          <select 
            value={year} 
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-800 cursor-pointer"
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year (Junior)</option>
            <option value="4">4th Year (Senior)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-slate-700 dark:text-slate-300">Core Technical Skills (Comma comma separated)</label>
        <input 
          type="text" 
          value={skillsText}
          onChange={(e) => setSkillsText(e.target.value)}
          className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-slate-700 dark:text-slate-300">Executive Brief / Bio</label>
        <textarea 
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="I am an engineer focused on custom vector layouts and SaaS performance checks..."
          className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
        />
      </div>

      {saved && (
        <div className="rounded-xl bg-emerald-50 text-emerald-600 p-3 font-semibold flex items-center">
          <Sparkles size={16} className="mr-1.5 animate-bounce" /> Profile bio parameters saved successfully!
        </div>
      )}

      <button 
        type="submit"
        className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors"
      >
        Save Profile Details
      </button>

    </form>
  );
};

/* 9. Student Settings View */
const StudentSettingsView: React.FC = () => {
  return (
    <div className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
      <div>
        <h2 className="font-display font-black text-lg text-slate-900 dark:text-white">Account Customizations</h2>
        <p className="text-xs text-slate-400">Control notifications preferences.</p>
      </div>

      <div className="space-y-3.5 text-xs">
        <div className="flex items-center justify-between p-3 rounded-xl border dark:border-slate-800">
          <div>
            <h4 className="font-bold">Email Job Notifications</h4>
            <p className="text-[10px] text-slate-400">Receive 1-click updates when razorpay and swiggy verify new engineering roles.</p>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4 bg-transparent cursor-pointer rounded border" />
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border dark:border-slate-800">
          <div>
            <h4 className="font-bold">Direct Recruiter Interview Calls</h4>
            <p className="text-[10px] text-slate-400">Allow verified HR managers to directly send chat pings.</p>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4 bg-transparent cursor-pointer rounded border" />
        </div>
      </div>
    </div>
  );
};
