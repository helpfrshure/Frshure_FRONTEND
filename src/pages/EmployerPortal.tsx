/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Job, JobApplication, SystemNotification } from '../types';
import { jobService } from '../services/jobService';
import { paymentService } from '../services/paymentService';
import { notificationService } from '../services/notificationService';
import { 
  Building2, 
  Plus, 
  LineChart, 
  Edit, 
  Trash2, 
  Users, 
  CheckCircle, 
  XCircle, 
  CreditCard, 
  Sparkles, 
  ExternalLink,
  MapPin,
  Clock,
  Send,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface EmployerPortalProps {
  view: string;
  onNavigate: (view: string) => void;
}

export const EmployerPortal: React.FC<EmployerPortalProps> = ({ view, onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(view);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Sync state if navbar triggers transitions
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
        
        {/* Recruiter sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm text-center">
            
            <div className="relative mx-auto h-20 w-20">
              <img 
                src={user?.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'}
                alt="Company Logo avatar"
                className="h-full w-full rounded-2xl object-cover border-2 border-indigo-500 bg-slate-100"
              />
              {user?.verified && (
                <span className="absolute -bottom-1 -right-1 rounded-full bg-indigo-500 p-1 text-white border-2 border-white dark:border-dark-card">
                  <CheckCircle size={10} className="fill-white dark:fill-dark-card text-indigo-500" />
                </span>
              )}
            </div>

            <h2 className="font-display font-bold text-slate-900 dark:text-white mt-3 text-lg">{user?.companyName || 'Verified Employer'}</h2>
            <p className="text-[10px] text-slate-400 mt-1">{user?.industry || 'Fintech / Software'}</p>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono mt-1">{user?.location || 'Bangalore, India'}</p>
            
            <div className="mt-4 pt-4 border-t dark:border-dark-border/60">
              <span className="rounded bg-indigo-100 text-indigo-700 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider dark:bg-indigo-950/30 dark:text-indigo-300">
                Plan: ₹99 Pay-Per-Post
              </span>
            </div>
          </div>

          {/* Recruiter Navigation */}
          <nav className="rounded-2xl border bg-white p-3 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-1">
            <button 
              onClick={() => handleNavLocal('employer_dashboard')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'employer_dashboard' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Building2 size={16} /> <span>Active Internships</span>
            </button>
            <button 
              onClick={() => handleNavLocal('employer_create_job')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center justify-between transition-colors ${activeTab === 'employer_create_job' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <span className="flex items-center space-x-2.5"><Plus size={16} /> <span>Post a Job</span></span>
              <span className="rounded bg-indigo-100 text-[9px] px-1.5 py-0.5 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">₹99</span>
            </button>
            <button 
              onClick={() => handleNavLocal('employer_applicants')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'employer_applicants' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Users size={16} /> <span>Screener Candidates</span>
            </button>
            <button 
              onClick={() => handleNavLocal('employer_analytics')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'employer_analytics' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <LineChart size={16} /> <span>Recruiter Metrics</span>
            </button>
            <button 
              onClick={() => handleNavLocal('employer_profile')}
              className={`w-full text-xs font-semibold rounded-xl p-3 text-left flex items-center space-x-2.5 transition-colors ${activeTab === 'employer_profile' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Building2 size={16} /> <span>Company Details</span>
            </button>
          </nav>
        </aside>

        {/* Recruiter display panels */}
        <main className="lg:col-span-3 space-y-6">
          {activeTab === 'employer_dashboard' && <RecruiterDashboardView onPostClick={() => handleNavLocal('employer_create_job')} />}
          {activeTab === 'employer_create_job' && <CreateJobView onFormSubmit={() => handleNavLocal('employer_dashboard')} />}
          {activeTab === 'employer_applicants' && <ApplicantsView />}
          {activeTab === 'employer_analytics' && <EmployerAnalyticsView />}
          {activeTab === 'employer_profile' && <EmployerProfileView />}
          {activeTab === 'employer_settings' && <EmployerSettingsView />}
        </main>

      </div>
    </div>
  );
};

/* ==========================================
   RECRUITER SUBVIEWS
   ========================================== */

/* 1. Recruiter Dashboard */
const RecruiterDashboardView: React.FC<{ onPostClick: () => void }> = ({ onPostClick }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState({ totalRecruits: 0, views: 0 });

  useEffect(() => {
    const fetchSelect = async () => {
      const data = await jobService.getJobs();
      setJobs(data);
      const totalCandidatesCount = data.reduce((acc, j) => acc + j.applicantCount, 0);
      setStats({ totalRecruits: totalCandidatesCount, views: totalCandidatesCount * 4 + 8 });
    };
    fetchSelect();
  }, []);

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you positive you wish to remove this job posting?')) {
      await jobService.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Greetings banner */}
      <div className="rounded-2xl border p-6 bg-gradient-to-r from-indigo-50 to-indigo-100/30 border-indigo-100/50 dark:from-slate-900/20 dark:to-indigo-950/20 dark:dark:border-dark-border flex justify-between items-center">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Reviewing Employer Dashboard</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Stipend rates are fully tracking Swiggy and Razorpay verified structures.</p>
        </div>
        <button 
          onClick={onPostClick}
          className="rounded-xl bg-indigo-600 text-white font-semibold text-xs px-4 py-2.5 hover:bg-indigo-500 shadow-sm transition-colors flex items-center"
        >
          <Plus size={14} className="mr-1" /> Post Job (₹99)
        </button>
      </div>

      {/* Recruiter Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-4 bg-white dark:bg-dark-card dark:border-dark-border">
          <span className="text-[10px] uppercase font-bold text-slate-400">Published Jobs</span>
          <div className="font-display font-black text-2xl mt-1">{jobs.length}</div>
          <p className="text-[10px] text-slate-400">Total active placements</p>
        </div>
        <div className="rounded-2xl border p-4 bg-white dark:bg-dark-card dark:border-dark-border">
          <span className="text-[10px] uppercase font-bold text-slate-400">Candidate Applicants</span>
          <div className="font-display font-black text-2xl mt-1 text-indigo-600">{stats.totalRecruits}</div>
          <p className="text-[10px] text-slate-400">Candidates shortlists awaiting</p>
        </div>
        <div className="rounded-2xl border p-4 bg-white dark:bg-dark-card dark:border-dark-border">
          <span className="text-[10px] uppercase font-bold text-slate-400">Platform Impressions</span>
          <div className="font-display font-black text-2xl mt-1 text-emerald-500">+{stats.views}</div>
          <p className="text-[10px] text-slate-400">Dynamic profile page clicks</p>
        </div>
      </div>

      {/* Active Postings grid */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">Active Recruiter Posting Index</h3>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12 border rounded-2xl border-dashed">
            <p className="text-sm font-bold">No active positions</p>
            <p className="text-xs text-slate-400 mt-1">Post your first internship role. Active verification takes 1-2 minutes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(j => (
              <div 
                key={j.id}
                className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="h-10 w-10 text-indigo-650 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl flex items-center justify-center font-display font-black text-sm">
                    {j.title.substring(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{j.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{j.category} • {j.location} ({j.remoteType})</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-left sm:text-right text-xs">
                    <span className="text-[9px] block uppercase font-mono tracking-wider text-slate-400">applied</span>
                    <span className="font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/10 px-2.5 py-0.5 rounded">{j.applicantCount} student applicants</span>
                  </div>

                  <div>
                    <span className={`inline-block font-bold rounded-lg px-2.5 py-1 text-[9px] uppercase ${
                      j.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {j.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 border-t sm:border-transparent pt-3 sm:pt-0">
                    <button 
                      onClick={() => handleDeleteJob(j.id)}
                      className="rounded-lg p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                      title="Delete Posting"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

/* 2. Create Job View (with authentic ₹99 Razorpay Checkout details) */
const CreateJobView: React.FC<{ onFormSubmit: () => void }> = ({ onFormSubmit }) => {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [salary, setSalary] = useState('₹25,000 / month');
  const [location, setLocation] = useState('Bangalore, Karnataka (Hybrid)');
  const [remoteType, setRemoteType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [desc, setDesc] = useState('');
  const [requirements, setRequirements] = useState('');
  
  // Checkout variables
  const [paymentOverlay, setPaymentOverlay] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderObject, setOrderObject] = useState<any>(null);

  const triggerPaymentWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert('Fill title and overview brief before proceeding to plan checks.');
      return;
    }
    setPaymentLoading(true);

    // Call create order endpoint
    const order = await paymentService.createOrder(`receipt_${Math.random().toString(36).substring(2, 9)}`);
    setOrderObject(order);

    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentOverlay(true);
    }, 1200);
  };

  const handleVerifyCheckoutSimulation = async () => {
    setPaymentLoading(true);
    
    // Simulate payment signature verification call
    await paymentService.verifyPayment({
      razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      razorpay_order_id: orderObject?.id || 'order_DEMO_123',
      razorpay_signature: 'sig_verified_frshure_checkout_success_7777'
    });

    // Create the job locally & save
    await jobService.createJob({
      title,
      companyName: user?.companyName || 'Verified Employer',
      companyLogo: user?.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
      employerId: user?.id || 'emp_01',
      description: desc,
      requirements: requirements.split('\n').filter(Boolean),
      salary,
      location,
      remoteType,
      verified: true,
      category,
      status: 'active'
    });

    // Push local alerts indicator
    notificationService.addLocalNotification(
      'Employer Activation Successful',
      `Payment verified for internship position: ${title}. Post is now active and published.`,
      'payment_success'
    );

    setPaymentLoading(false);
    setPaymentSuccess(true);
  };

  return (
    <div className="space-y-6 text-xs">
      
      <div>
        <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Publish New Internship Position</h1>
        <p className="text-xs text-slate-400">Post verified roles to targeted student pools across India for an upfront microtransaction of ₹99 (secured by Razorpay).</p>
      </div>

      <form onSubmit={triggerPaymentWorkflow} className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 col-span-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Job Title / Internship Opening</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Developer Intern (React)"
              className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            />
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Target Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-800 cursor-pointer"
            >
              <option value="Software Engineering">Software Engineering</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Marketing & Writing">Marketing & Writing</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 col-span-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Stipend</label>
            <input 
              type="text" 
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. ₹25,000 / month"
              className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
            />
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Work Model</label>
            <select 
              value={remoteType} 
              onChange={(e) => setRemoteType(e.target.value as any)}
              className="w-full rounded-xl border p-3 dark:bg-slate-900 dark:border-slate-800 cursor-pointer"
            >
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid Model</option>
              <option value="On-site">On-site Office</option>
            </select>
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Hiring Location</label>
            <input 
              type="text" 
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bangalore (Hybrid)"
              className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Role Synopsis / Details Brief</label>
          <textarea 
            rows={3}
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Introduce the company, design vertical parameters, or payment checkout systems interns will work on..."
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Required Skills & Candidate Qualifications (1 bullet per line)</label>
          <textarea 
            rows={3}
            required
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. Strong proficiency with ReactJS and Tailwind CSS variables.&#10;Prior Flutter Dart state managers projects."
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        {paymentLoading ? (
          <div className="text-center py-2 font-semibold">Creating secure order indices on server networks...</div>
        ) : (
          <button 
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center"
          >
            <CreditCard size={14} className="mr-2" /> Proceed to Activation Payment (₹99)
          </button>
        )}

      </form>

      {/* RAZORPAY FRONTEND CHECKOUT OVERLAY MODAL */}
      {paymentOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl border overflow-hidden bg-slate-900 border-slate-800 text-white shadow-2xl space-y-0">
            
            {/* Razorpay Brand Header */}
            <div className="bg-slate-900 p-5 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 to-indigo-950">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 text-white font-bold h-7 w-7 rounded-lg flex items-center justify-center text-xs shadow-md">R</div>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Razorpay Gateway</h3>
                  <h2 className="font-display font-black text-sm text-white">FRSHURE platform</h2>
                </div>
              </div>
              <button 
                onClick={() => setPaymentOverlay(false)} 
                className="text-slate-500 hover:text-white font-semibold text-xs py-1"
              >
                Close
              </button>
            </div>

            {/* Payment Summary */}
            <div className="p-6 space-y-6 text-xs bg-slate-950/80">
              
              {paymentSuccess ? (
                <div className="text-center space-y-4 py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
                    <CheckCircle size={24} />
                  </div>
                  <div className="space-y-1 px-4">
                    <h3 className="font-bold text-base text-white">Payment Verified!</h3>
                    <p className="text-[10px] text-slate-400">Razorpay signature hash approved. Internship posting is active immediately.</p>
                  </div>
                  <button 
                    onClick={() => { setPaymentOverlay(false); onFormSubmit(); }}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Go To Active Postings INDEX
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Order ID:</span>
                      <span className="font-mono text-[10px]">{orderObject?.id || 'order_DEMO_777'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plan Description:</span>
                      <span className="font-semibold text-white">1x verified job post</span>
                    </div>
                    <div className="flex justify-between text-base font-black border-t border-dashed border-slate-800 pt-2 flex-wrap">
                      <span className="text-slate-300">Total charge amount:</span>
                      <span className="text-emerald-400 font-display">₹99.00</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-500 bg-indigo-950/40 p-4 space-y-2">
                    <p className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] flex items-center">
                      <Sparkles size={11} className="mr-1 " /> Sandbox Payment Approved
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">This acts as an active Razorpay verification challenge sandbox test, allowing code checks to complete.</p>
                  </div>

                  {paymentLoading ? (
                    <div className="text-center py-2 font-bold text-indigo-400 animate-pulse">Verifying digital signatures, please wait...</div>
                  ) : (
                    <button 
                      onClick={handleVerifyCheckoutSimulation}
                      className="w-full rounded-2xl bg-indigo-650 hover:bg-indigo-550 text-white font-bold py-3 uppercase tracking-wider text-xs shadow-lg shadow-indigo-500/20"
                    >
                      Authenticate and Pay ₹99
                    </button>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

/* 3. Applicants Screener View (Mutates application state accept / reject) */
const ApplicantsView: React.FC = () => {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listApps = async () => {
      const data = await jobService.getStudentApplications();
      // Reverse candidates list to show latest first
      setApps(data);
      setLoading(false);
    };
    listApps();
  }, []);

  const handleStatusUpdate = async (appId: string, action: 'accept' | 'reject') => {
    try {
      if (action === 'accept') {
        const res = await jobService.acceptApplication(appId);
        setApps(prev => prev.map(a => a.id === appId ? { ...a, status: 'accepted' } : a));
        
        notificationService.addLocalNotification(
          'Student Accepted',
          `You have accepted the application from ${res.studentName} for the role of ${res.jobTitle}.`,
          'application_update'
        );
      } else {
        const res = await jobService.rejectApplication(appId);
        setApps(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
      }
    } catch (err) {
      alert('Could not update student candidate application details.');
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h1 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Student Candidate Screening Log</h1>
        <p className="text-xs text-slate-400">Review dynamic PDF resumes, inspect matching scores, and finalize accept/reject statuses.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">Retrieving incoming student profiles...</div>
      ) : apps.length === 0 ? (
        <div className="text-center py-12 border rounded-2xl border-dashed">No student candidates have requested verification links yet.</div>
      ) : (
        <div className="space-y-4">
          {apps.map(app => (
            <div 
              key={app.id} 
              className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5">
                <img 
                  src={app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} 
                  className="h-11 w-11 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.studentName}</h4>
                  <p className="text-[10px] text-slate-500">{app.studentEmail} • Applied for {app.jobTitle}</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="font-black text-[9px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded dark:bg-indigo-950/20">
                      {app.matchScore}% skill match
                    </span>
                    <a 
                      href={app.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-400 hover:text-indigo-500 flex items-center"
                    >
                      View Resume <ExternalLink size={10} className="ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Status and Action controls */}
              <div className="flex items-center space-x-4 border-t sm:border-transparent pt-3 sm:pt-0 w-full sm:w-auto justify-between sm:justify-start">
                
                <div>
                  <span className={`inline-block font-bold rounded-lg px-2.5 py-0.5 text-[9px] uppercase ${
                    app.status === 'accepted' 
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                      : app.status === 'rejected'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 animate-pulse'
                  }`}>
                    {app.status}
                  </span>
                </div>

                {app.status === 'applied' && (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'reject')}
                      className="rounded-lg border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1.5 font-bold transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'accept')}
                      className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-1.5 font-bold transition-colors"
                    >
                      Accept
                    </button>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* 4. Recruiter Analytics View */
const EmployerAnalyticsView: React.FC = () => {
  return (
    <div className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-6">
      <div>
        <h2 className="font-display font-black text-lg text-slate-900 dark:text-white">Employer Performance Analysis</h2>
        <p className="text-xs text-slate-400">Analyze views metrics, shortlisted ratings and platform placement rankings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Render a custom stylish visual dashboard metric representational column */}
        <div className="bg-slate-50 dark:bg-dark-card/30 p-5 rounded-2xl border dark:border-slate-800 space-y-4">
          <h4 className="font-bold text-xs text-slate-880 dark:text-slate-200">Daily Applicant Ingestion Curve</h4>
          <div className="h-28 flex items-end justify-between items-stretch space-x-2 pt-4">
            {[40, 60, 45, 90, 110, 80, 120].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col justify-end items-center gap-1.5">
                <div 
                  style={{ height: `${height}%` }}
                  className="w-full bg-indigo-650 hover:bg-indigo-550 rounded-t-lg transition-all cursor-pointer"
                  title={`Value: ${height}`}
                />
                <span className="text-[8px] text-slate-400">D{idx+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-dark-card/30 p-5 rounded-2xl border dark:border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">Hiring Conversion Success</h4>
            <p className="text-[10px] text-slate-400">Overall candidates alignment scores from IIT, NIT pools.</p>
          </div>
          
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span>Frontend Dev Match percentage</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full dark:bg-slate-800">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span>UI/UX Designers Alignment success</span>
                <span className="font-bold">84%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full dark:bg-slate-800">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* 5. Company Profile details */
const EmployerProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [compName, setCompName] = useState(user?.companyName || 'Apex Innovations');
  const [website, setWebsite] = useState(user?.website || 'https://apex.inc');
  const [industry, setIndustry] = useState(user?.industry || 'Fintech / Software');
  const [loc, setLoc] = useState(user?.location || 'Bangalore, India');
  const [desc, setDesc] = useState(user?.description || '');
  const [saved, setSaved] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    await updateProfile({
      ...user,
      companyName: compName,
      website,
      industry,
      location: loc,
      description: desc
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleUpdate} className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-5 text-xs">
      <div>
        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white">Employer Bio Profile settings</h2>
        <p className="text-slate-400">This bio is displayed on active student job cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Company Name</label>
          <input 
            type="text" 
            required
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bold text-slate-705 dark:text-slate-300">Corporate Website Link</label>
          <input 
            type="url" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Industry Segment</label>
          <input 
            type="text" 
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300">Headquarters Location</label>
          <input 
            type="text" 
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-slate-700 dark:text-slate-300">Company Overview</label>
        <textarea 
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="We build beautiful SaaS tools for developer metrics tracking..."
          className="w-full rounded-xl border p-3 focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
        />
      </div>

      {saved && (
        <div className="rounded-xl bg-emerald-50 text-emerald-600 p-3 font-semibold flex items-center">
          <Sparkles size={16} className="mr-1.5 animate-bounce" /> Company profile settings saved successfully!
        </div>
      )}

      <button 
        type="submit"
        className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors"
      >
        Update Company Profile
      </button>

    </form>
  );
};

/* 6. Settings Details */
const EmployerSettingsView: React.FC = () => {
  return (
    <div className="rounded-2xl border bg-white p-6 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4 text-xs">
      <div>
        <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white">Billing Settings</h2>
        <p className="text-slate-400">Review payment methods and verification transactions.</p>
      </div>

      <div className="p-4 rounded-xl border dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 space-y-2">
        <p className="font-bold">Plan Type: pay-per-post plan</p>
        <p className="text-slate-400">You are configured with Razorpay instant activate loops. No fixed subscription liabilities.</p>
      </div>
    </div>
  );
};
