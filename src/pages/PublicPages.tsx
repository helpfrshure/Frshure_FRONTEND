/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Job, UserRole } from '../types';
import { jobService } from '../services/jobService';
import { JobCard } from '../components/common/JobCard';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  Send,
  HelpCircle,
  Clock,
  Briefcase,
  Lock,
  DollarSign
} from 'lucide-react';

/* ==========================================
   LANDING PAGE (Home Board)
   ========================================== */
interface LandingPageProps {
  onNavigate: (view: string) => void;
  onViewJob: (jobId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onViewJob }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobService.getJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const locations = ['All', 'Bangalore', 'Mumbai', 'Remote', 'Delhi'];
  const jobTypes = ['All', 'Software Engineering', 'UI/UX Design', 'Marketing & Writing', 'Mobile Development'];

  const filteredJobs = jobs.filter(job => {
    const matchSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skillsNeeded.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchLoc = selectedLocation === 'All' || 
      (selectedLocation === 'Remote' && job.remoteType === 'Remote') ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchType = selectedType === 'All' || job.category === selectedType;

    return matchSearch && matchLoc && matchType;
  });

  return (
    <div className="space-y-16 pb-16 dark:text-slate-100">
      
      {/* Hero Search Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-slate-900/40 dark:via-dark-bg dark:to-transparent py-20 px-4">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Sparkles size={14} className="animate-spin" />
            <span>Connecting Students with Prime Startup Jobs</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 dark:text-white leading-tight">
            Curated Internships.<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">FRSHURE Results.</span>
          </h1>

          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Skip the generic job-board clutter. FRSHURE matches talented college developers & designers directly with verified companies hiring in double-quick time.
          </p>

          {/* Large Consolidated Search Input Bar */}
          <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-2.5 shadow-xl shadow-slate-100 dark:bg-dark-card dark:border-dark-border dark:shadow-none flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center space-x-2 px-3">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search React, Flutter, Figma, Content Creation..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none dark:text-slate-200"
              />
            </div>

            <div className="h-px md:h-8 w-full md:w-px bg-slate-100 dark:bg-slate-800"></div>

            <div className="flex items-center space-x-2 px-3">
              <MapPin size={18} className="text-indigo-500" />
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent text-sm focus:outline-none dark:text-white cursor-pointer pr-4"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc} className="dark:bg-dark-card">{loc}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {}}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3 transition-all"
            >
              Find Openings
            </button>
          </div>

          <div className="flex-wrap justify-center items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 flex">
            <span>Popular Categories:</span>
            {jobTypes.slice(1, 4).map(type => (
              <button 
                key={type} 
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:text-indigo-500 rounded-lg border dark:border-dark-border transition-colors ${selectedType === type ? 'border-indigo-500 text-indigo-650 font-semibold' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Direct Quick Portal Gateways banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Are you an Employer needing elite college hires?</h2>
            <p className="text-sm text-indigo-100">Post an internship for just ₹99. Target IIT, NIT, and top tier engineering applicants immediately with instant verify protection.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('employer_signup')}
              className="rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-sm px-6 py-3 transition-colors flex items-center"
            >
              Post Internship Logo <ArrowRight size={16} className="ml-2" />
            </button>
            <button 
              onClick={() => onNavigate('pricing')} 
              className="rounded-xl border border-indigo-400 bg-transparent text-white hover:bg-indigo-550/20 font-semibold text-sm px-6 py-3 transition-colors"
            >
              Review Plan
            </button>
          </div>
        </div>
      </section>

      {/* Main Jobs Listing section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">Active Opportunities</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Handpicked jobs connecting students with verified startup leads.</p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {jobTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white border-light-border text-slate-600 dark:bg-dark-card dark:border-dark-border dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic List Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="h-44 rounded-2xl bg-slate-100 animate-pulse dark:bg-slate-800/60 shimmer-element"></div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 border rounded-3xl border-dashed border-slate-200 dark:border-dark-border space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Search size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white">No jobs matched</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Try resetting your filter parameters or search queries to find other internships.</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedLocation('All'); setSelectedType('All'); }}
              className="rounded-lg bg-indigo-50 text-indigo-600 px-4 py-2 text-xs font-semibold dark:bg-indigo-950/20 dark:text-indigo-400"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onViewDetails={onViewJob} 
                isStudent={false} // don't show bookmarked state unless logged in as student
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

/* ==========================================
   ABOUT PAGE
   ========================================== */
export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-12 dark:text-slate-100">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display font-black text-4xl tracking-tight text-slate-900 dark:text-white">About FRSHURE</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Empowering the next generation of builders by removing recruiting friction from college ecosystems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="space-y-4">
          <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Our Origin Play</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Finding first-year, second-year, or final-year college internships in India has turned into a painful spam marathon where students send hundreds of resume sheets to unmonitored portals, feeling completely unheard.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            FRSHURE cuts this absolute chaos out. We establish a verified, micro-transaction model (₹99) which forces absolute quality on the side of recruiters and ensures active, high-intent applications from students. No clutter, no automated filters, just elite matchmaking.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-dark-card rounded-2xl p-6 border dark:border-dark-border space-y-4 flex flex-col justify-center">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/30">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-sm">100% Verified Employers</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/30">
              <DollarSign size={18} />
            </div>
            <h3 className="font-bold text-sm">High Stipend Rates</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/30">
              <Clock size={18} />
            </div>
            <h3 className="font-bold text-sm">Double-Quick HR Turnarounds</h3>
          </div>
        </div>
      </div>

      <div className="border-t dark:border-dark-border pt-12 text-center space-y-4">
        <h3 className="font-display font-bold text-lg">Have custom partnership inquiries?</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Our operations team actively supports universities across India. Drop a mail to schedule.</p>
        <a href="mailto:helpfrshure@gmail.com" className="inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white">
          helpfrshure@gmail.com
        </a>
      </div>
    </div>
  );
};

/* ==========================================
   PRICING PAGE
   ========================================== */
export const PricingPage: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-12 dark:text-slate-100">
      <div className="text-center space-y-4">
        <h1 className="font-display font-black text-4xl tracking-tight text-slate-900 dark:text-white">Fair, Micro Pricing</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">One flat, tiny rate. No bulky recruiting retainers. Activate premium roles in an instant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-6">
        
        {/* Student Option */}
        <div className="border rounded-3xl p-8 bg-white dark:bg-dark-card border-light-border dark:border-dark-border flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-indigo-500 uppercase font-mono tracking-wider">student plan</span>
            <h2 className="font-display font-black text-3xl">Free Forever</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Search 100+ active tech, design, marketing, and media roles, apply directly, and chat with founders with zero subscription limits.</p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-4">
              <li className="flex items-center">✓ Access elite verified startup roles</li>
              <li className="flex items-center">✓ AI Resume matchmaking analytics</li>
              <li className="flex items-center">✓ Direct interactive recruiter message threads</li>
            </ul>
          </div>
          <button 
            onClick={() => onNavigate('student_signup')}
            className="w-full mt-8 rounded-xl border border-indigo-500 px-4 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors"
          >
            Create Free Account
          </button>
        </div>

        {/* Recruiter Option */}
        <div className="border-2 rounded-3xl p-8 bg-slate-900 text-white border-indigo-500 relative flex flex-col justify-between shadow-xl">
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest leading-relaxed">Most Popular</div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono tracking-wider">verified recruiter</span>
            <div className="flex items-baseline space-x-1.5 flex-wrap">
              <span className="font-display font-black text-4xl text-white">₹99</span>
              <span className="text-xs text-slate-300">/ per job activation</span>
            </div>
            <p className="text-xs text-slate-300">Publish your job and access matching student pools across India immediately. Payments verified securely over premium Razorpay networks.</p>
            <ul className="space-y-2 text-xs text-slate-300 pt-4">
              <li className="flex items-center">✓ Immediate placement on FRSHURE app feeds</li>
              <li className="flex items-center">✓ Unlimited developer/designer applicant views</li>
              <li className="flex items-center">✓ Rich interactive chat log interface</li>
              <li className="flex items-center">✓ 1-click Applicant accept/reject statuses</li>
            </ul>
          </div>
          <button 
            onClick={() => onNavigate('employer_signup')}
            className="w-full mt-8 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Post Dynamic Position
          </button>
        </div>

      </div>
    </div>
  );
};

/* ==========================================
   CONTACT PAGE
   ========================================== */
export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMsg('');
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 space-y-12 dark:text-slate-100">
      <div className="text-center space-y-4">
        <h1 className="font-display font-black text-4xl tracking-tight text-slate-900 dark:text-white font-sans">Contact Support</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Need quick guidance with your student or recruiter account? Send us an inquiry.</p>
      </div>

      <form onSubmit={handleSubmit} className="border rounded-3xl p-6 sm:p-8 bg-white dark:bg-dark-card border-light-border dark:border-dark-border space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rajdeep Nayek"
            className="w-full rounded-xl border p-3 text-xs focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Active Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rajdeepnayek2905@gmail.com"
            className="w-full rounded-xl border p-3 text-xs focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message / Issue Details</label>
          <textarea 
            rows={4}
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Describe your student profile setup, or employer payment inquiry..."
            className="w-full rounded-xl border p-3 text-xs focus:ring-1 focus:ring-indigo-500 dark:bg-slate-900 dark:border-slate-800"
          />
        </div>

        {sent ? (
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3.5 text-xs font-semibold flex items-center">
            <Sparkles size={16} className="mr-2 animate-bounce" /> Custom support request dispatched! We will reply within 3-4 hours.
          </div>
        ) : (
          <button 
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center justify-center"
          >
            <Send size={14} className="mr-2" /> Send Message
          </button>
        )}
      </form>
    </div>
  );
};

/* ==========================================
   FAQ PAGE
   ========================================== */
export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does FRSHURE verify jobs?',
      a: 'Every single recruiter must complete a ₹99 microtransaction through Razorpay and go through our administrative validation audit. We review their verified company domains and active website links before granting active feed displays.'
    },
    {
      q: 'Do students pay anything for registering or applying?',
      a: 'Never. FRSHURE remains completely free for college and university students to register, build dynamic resume sheets, receive automatic recruiter interview matches, and chat in real-time.'
    },
    {
      q: 'What is the dynamic Match Score?',
      a: 'We evaluate the alignment between a student\'s registered skills (e.g., React, Flutter) and selected job requirements to provide high-fidelity score predictions (e.g., 94%) right within their applications feed.'
    },
    {
      q: 'How fast can I hire a developer?',
      a: 'Because our student portal focuses strictly on high-intent candidates, founders regularly get matching applicants within 60 minutes and complete technical shortlists in under 48 hours.'
    }
  ];

  return (
    <div className="mx-auto max-w-xl px-4 py-16 space-y-12 dark:text-slate-100">
      <div className="text-center space-y-4">
        <h1 className="font-display font-black text-4xl tracking-tight text-slate-900 dark:text-white">Frequently Asked</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Everything you need to know about FRSHURE student recruitment loops.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className="border rounded-2xl p-4 bg-white dark:bg-dark-card border-light-border dark:border-dark-border cursor-pointer transition-all duration-200"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center">
                <HelpCircle size={14} className="mr-2 text-indigo-500" /> {faq.q}
              </span>
              <span className="text-slate-400 text-xs">{openIdx === idx ? '▲' : '▼'}</span>
            </div>
            {openIdx === idx && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t dark:border-dark-border/40 pt-2">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================
   LEGAL: PRIVACY POLICY
   ========================================== */
export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 space-y-6 dark:text-slate-100">
      <h1 className="font-display font-black text-3xl">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: June 1, 2026</p>
      
      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
        <p>At FRSHURE, we respect the privacy of our student applicants and verified recruiters. We persist only standard registration profile metrics including emails, student names, phone logs, and uploaded PDF document urls.</p>
        <p>Your resume data is only shown to verified recruiters whose job postings you have actively selected or applied for. We do not transmit user files to third-party marketing companies.</p>
        <p>Session data can be updated or deleted by visiting your student settings panel or sending a written inquiry to our support email at helpfrshure@gmail.com.</p>
      </div>
    </div>
  );
};

/* ==========================================
   LEGAL: TERMS & CONDITIONS
   ========================================== */
export const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 space-y-6 dark:text-slate-100">
      <h1 className="font-display font-black text-3xl">Terms and Conditions</h1>
      <p className="text-xs text-slate-400">Last updated: June 1, 2026</p>
      
      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
        <p>By registering on the FRSHURE portal or downloading our Android application, you covenant to conform to standard marketplace transparency. Backdoor fee negotiations are strictly restricted.</p>
        <p>Recruiters agree that each job activation requires a non-refundable upfront verification charge of ₹99. Job roles containing inappropriate content or misleading stipend amounts are deactivated immediately without refund.</p>
        <p>FRSHURE coordinates payments securely via Razorpay systems but is not responsible for local tax calculations or direct employment wages which must be resolved between student recruits and verified recruiters.</p>
      </div>
    </div>
  );
};
