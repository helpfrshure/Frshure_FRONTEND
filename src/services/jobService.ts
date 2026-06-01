/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../api/ApiConstants';
import { Job, JobApplication } from '../types';

// Standard high-quality initial jobs list matching Indian & global context for student recruitment
const INITIAL_JOBS: Job[] = [
  {
    id: 'job_01',
    title: 'Frontend Developer Intern (React)',
    companyName: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
    employerId: 'emp_rzp',
    description: 'Join the Razorpay Design Systems and Payment Checkout team as a developer intern. You will craft next-generation responsive checkouts used by millions of global merchants.',
    requirements: [
      'Strong proficiency in ReactJS and TypeScript.',
      'Familiarity with Tailwind CSS or CSS variables styled modules.',
      'Excellent understanding of responsive web design (mobile-first approach).',
      'Bonus: Experience with Framer Motion or canvas animation tools.'
    ],
    responsibilities: [
      'Implement modular, pixel-consistent web interface components.',
      'Collaborate closely with Product Designers and Engineering Leads.',
      'Analyze and optimize viewport render times for low-bandwidth environments.'
    ],
    salary: '₹35,000 / month',
    location: 'Bangalore, Karnataka (Hybrid)',
    remoteType: 'Hybrid',
    verified: true,
    category: 'Software Engineering',
    skillsNeeded: ['React', 'TypeScript', 'TailwindCSS', 'CSS Grid'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    applicantCount: 18
  },
  {
    id: 'job_02',
    title: 'Product Design Intern',
    companyName: 'Swiggy',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    employerId: 'emp_swg',
    description: 'We are seeking a Product Design Intern to help conceptualize, wireframe, and test next-generation consumer marketplace delivery systems. If you have an eye for micro-interactions, apply today.',
    requirements: [
      'Highly capable with Figma, custom component design, and typography pairing.',
      'Strong portfolio displaying mobile UX and interaction workflows.',
      'Basic understanding of frontend frameworks (React/iOS constraints) is a plus.'
    ],
    responsibilities: [
      'Design user flows, mockups, and low-fidelity prototypes for fresh groceries vertical.',
      'Conduct user interviews with college students to optimize micro-delivery structures.',
      'Maintain consistency with the Swiggy design system (Orange Accents).'
    ],
    salary: '₹25,000 / month',
    location: 'Mumbai, Maharashtra',
    remoteType: 'On-site',
    verified: true,
    category: 'UI/UX Design',
    skillsNeeded: ['Figma', 'Prototyping', 'User Research', 'Typography'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    applicantCount: 9
  },
  {
    id: 'job_03',
    title: 'Mobile App Developer (Flutter)',
    companyName: 'Dunzo',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=200',
    employerId: 'emp_dnz',
    description: 'Looking for a skilled Flutter developer to build swift logistics tools for local merchant on-boarding. You will own client-side modules end-to-end.',
    requirements: [
      'Prior projects in Flutter, DartState Management (Bloc/Provider).',
      'Integration of RESTful APIs and real-time location services.',
      'Experience with offline capability cache patterns.'
    ],
    responsibilities: [
      'Build native-performing cross-platform user flows for local service providers.',
      'Reduce application bundle sizes and launch delays.',
      'Write optimized logic for background GPS tracking and notifications.'
    ],
    salary: '₹40,000 / month',
    location: 'Remote (India)',
    remoteType: 'Remote',
    verified: true,
    category: 'Mobile Development',
    skillsNeeded: ['Flutter', 'Dart', 'REST APIs', 'Google Maps API'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    applicantCount: 22
  },
  {
    id: 'job_04',
    title: 'Content Creator & Social Media Intern',
    companyName: 'Aesthetic Reads',
    companyLogo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=200',
    employerId: 'emp_aes',
    description: 'Write, curate, and optimize high-engagement graphic lists, reels, and newsletter writeups focusing on student literature and active career development.',
    requirements: [
      'Strong creative writing skills and quick editorial execution.',
      'Intuitive usage of CapCut, Canva, and social platform trends.',
      'Passionate about building online campus communities.'
    ],
    responsibilities: [
      'Create 3 high-quality organic reels per week focusing on student resume tips.',
      'Draft Weekly Frshure Career Insights newsletter.',
      'Monitor and reply to platform feedback channels in real time.'
    ],
    salary: '₹12,000 / month',
    location: 'NCR, New Delhi (Hybrid)',
    remoteType: 'Hybrid',
    verified: false,
    category: 'Marketing & Writing',
    skillsNeeded: ['Social Media', 'Copywriting', 'Video Editing', 'Canva'],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    applicantCount: 5
  }
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_01',
    jobId: 'job_01',
    jobTitle: 'Frontend Developer Intern (React)',
    companyName: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
    studentId: 'std_01',
    studentName: 'Rajdeep Nayek',
    studentEmail: 'rajdeepnayek2905@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    resumeUrl: 'https://example.com/resume.pdf',
    status: 'applied',
    appliedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    matchScore: 92
  }
];

// Memory state to keep changes functional online and offline in the playground
let jobsInMemory = [...INITIAL_JOBS];
let applicationsInMemory = [...INITIAL_APPLICATIONS];
let savedJobIdsInMemory: string[] = ['job_01'];

export const jobService = {
  async getJobs(): Promise<Job[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.JOBS);
      return res.data;
    } catch {
      return jobsInMemory;
    }
  },

  async getJobById(jobId: string): Promise<Job> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.JOB_DETAILS(jobId));
      return res.data;
    } catch {
      const matched = jobsInMemory.find(j => j.id === jobId);
      if (!matched) throw new Error('Job not found.');
      return matched;
    }
  },

  async createJob(details: Partial<Job>): Promise<Job> {
    try {
      const res = await apiClient.post(API_ENDPOINTS.JOB_CREATE, details);
      return res.data;
    } catch {
      const newJob: Job = {
        id: `job_${Math.random().toString(36).substring(2, 9)}`,
        title: details.title || 'Untitled Internship',
        companyName: details.companyName || 'Verified Employer',
        companyLogo: details.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200',
        employerId: details.employerId || 'emp_01',
        description: details.description || 'Job details to be specified.',
        requirements: details.requirements || [],
        responsibilities: details.responsibilities || [],
        salary: details.salary || 'Competitive Stipend',
        location: details.location || 'Flexible',
        remoteType: details.remoteType || 'Remote',
        verified: details.verified || false,
        category: details.category || 'Tech',
        skillsNeeded: details.skillsNeeded || [],
        createdAt: new Date().toISOString(),
        status: details.status || 'pending_payment',
        applicantCount: 0
      };
      
      jobsInMemory = [newJob, ...jobsInMemory];
      return newJob;
    }
  },

  async updateJob(jobId: string, details: Partial<Job>): Promise<Job> {
    try {
      const res = await apiClient.put(API_ENDPOINTS.JOB_UPDATE(jobId), details);
      return res.data;
    } catch {
      const index = jobsInMemory.findIndex(j => j.id === jobId);
      if (index === -1) throw new Error('Job not found to update.');
      jobsInMemory[index] = { ...jobsInMemory[index], ...details };
      return jobsInMemory[index];
    }
  },

  async deleteJob(jobId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.JOB_DELETE(jobId));
    } catch {
      jobsInMemory = jobsInMemory.filter(j => j.id !== jobId);
    }
  },

  async applyForJob(jobId: string, customDetails: { studentId: string; studentName: string; studentEmail: string; resumeUrl?: string }): Promise<JobApplication> {
    try {
      const res = await apiClient.post(API_ENDPOINTS.JOB_APPLY(jobId), customDetails);
      return res.data;
    } catch {
      const matchedJob = jobsInMemory.find(j => j.id === jobId);
      if (matchedJob) {
        matchedJob.applicantCount += 1;
      }
      
      const newApp: JobApplication = {
        id: `app_${Math.random().toString(36).substring(2, 9)}`,
        jobId,
        jobTitle: matchedJob?.title || 'Intern',
        companyName: matchedJob?.companyName || 'Brand',
        companyLogo: matchedJob?.companyLogo,
        studentId: customDetails.studentId,
        studentName: customDetails.studentName,
        studentEmail: customDetails.studentEmail,
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        resumeUrl: customDetails.resumeUrl || 'https://example.com/demo.pdf',
        status: 'applied',
        appliedAt: new Date().toISOString(),
        matchScore: Math.floor(Math.random() * 25) + 75 // Random elegant match percentage (75 - 100%)
      };

      // Ensure no duplicates
      const isExist = applicationsInMemory.some(a => a.jobId === jobId && a.studentId === customDetails.studentId);
      if (!isExist) {
        applicationsInMemory = [newApp, ...applicationsInMemory];
      }
      return newApp;
    }
  },

  async getApplicantsForJob(jobId: string): Promise<JobApplication[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.JOB_APPLICANTS(jobId));
      return res.data;
    } catch {
      return applicationsInMemory.filter(app => app.jobId === jobId);
    }
  },

  // Student specific applications fetching
  async getStudentApplications(): Promise<JobApplication[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.STUDENT_APPLICATIONS);
      return res.data;
    } catch {
      return applicationsInMemory;
    }
  },

  // State Updates for applications
  async acceptApplication(appId: string): Promise<JobApplication> {
    try {
      const res = await apiClient.put(API_ENDPOINTS.APPLICATION_ACCEPT(appId));
      return res.data;
    } catch {
      const index = applicationsInMemory.findIndex(a => a.id === appId);
      if (index !== -1) {
        applicationsInMemory[index].status = 'accepted';
        return applicationsInMemory[index];
      }
      throw new Error('Application not found.');
    }
  },

  async rejectApplication(appId: string): Promise<JobApplication> {
    try {
      const res = await apiClient.put(API_ENDPOINTS.APPLICATION_REJECT(appId));
      return res.data;
    } catch {
      const index = applicationsInMemory.findIndex(a => a.id === appId);
      if (index !== -1) {
        applicationsInMemory[index].status = 'rejected';
        return applicationsInMemory[index];
      }
      throw new Error('Application not found.');
    }
  },

  // Saved Jobs
  async getSavedJobs(): Promise<Job[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.SAVED_JOBS);
      return res.data;
    } catch {
      return jobsInMemory.filter(j => savedJobIdsInMemory.includes(j.id));
    }
  },

  async saveJob(jobId: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.SAVE_JOB(jobId));
    } catch {
      if (!savedJobIdsInMemory.includes(jobId)) {
        savedJobIdsInMemory.push(jobId);
      }
    }
  },

  async unsaveJob(jobId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.UNSAVE_JOB(jobId));
    } catch {
      savedJobIdsInMemory = savedJobIdsInMemory.filter(id => id !== jobId);
    }
  },

  // Local helper checks
  isJobSavedLocal(jobId: string): boolean {
    return savedJobIdsInMemory.includes(jobId);
  }
};
