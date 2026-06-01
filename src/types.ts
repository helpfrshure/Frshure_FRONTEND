/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  STUDENT = 'STUDENT',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  university?: string;
  course?: string;
  yearOfStudy?: number;
  skills: string[];
  bio?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  savedJobs: string[]; // Job IDs
}

export interface EmployerProfile {
  id: string;
  companyName: string;
  email: string;
  companyLogo?: string;
  website?: string;
  industry?: string;
  location?: string;
  description?: string;
  verified: boolean;
  contactEmail?: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  employerId: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: string; // e.g. "₹15,000 - ₹25,000/month"
  location: string;
  remoteType: 'Remote' | 'Hybrid' | 'On-site';
  verified: boolean;
  category: string;
  skillsNeeded: string[];
  expiresAt?: string;
  createdAt: string;
  status: 'pending_payment' | 'active' | 'closed';
  applicantCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  studentEmail: string;
  resumeUrl?: string;
  status: 'applied' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  matchScore?: number; // Calculated dynamic recommendation score (e.g. 92%)
}

export interface ChatThread {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar?: string;
  partnerRole: UserRole;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  online: boolean;
  typing?: boolean;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  type: 'application_update' | 'new_job' | 'chat' | 'payment_success' | 'alert';
  read: boolean;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  successRate: number; // percentage
  viewsCount: number;
  monthlyRevenue?: number; // for Admin
}
