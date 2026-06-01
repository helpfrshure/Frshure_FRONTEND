/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../api/ApiConstants';

export interface AdminEmployer {
  id: string;
  companyName: string;
  email: string;
  website: string;
  location: string;
  verified: boolean;
  registeredDate: string;
}

export interface AdminAnalytics {
  activeStudents: number;
  totalEmployers: number;
  pendingApprovalsCount: number;
  grossRevenue: number;
  jobsDistribution: { category: string; count: number }[];
  weeklyApplications: { week: string; count: number }[];
}

const INITIAL_EMPLOYERS: AdminEmployer[] = [
  {
    id: 'emp_01',
    companyName: 'Apex Innovations',
    email: 'employer@frshure.in',
    website: 'https://apex.inc',
    location: 'Bangalore, India',
    verified: true,
    registeredDate: '2026-05-15'
  },
  {
    id: 'emp_pending_01',
    companyName: 'SuperFast Delivery',
    email: 'contact@superfast.io',
    website: 'https://superfast.io',
    location: 'Chennai, India',
    verified: false,
    registeredDate: '2026-05-29'
  },
  {
    id: 'emp_pending_02',
    companyName: 'Creative Pixel Labs',
    email: 'talent@creativepixels.com',
    website: 'https://creativepixels.com',
    location: 'Remote',
    verified: false,
    registeredDate: '2026-05-31'
  }
];

const INITIAL_ANALYTICS: AdminAnalytics = {
  activeStudents: 1420,
  totalEmployers: 84,
  pendingApprovalsCount: 2,
  grossRevenue: 15840, // ₹99 * 160 job posts
  jobsDistribution: [
    { category: 'Software Engineering', count: 45 },
    { category: 'UI/UX Design', count: 28 },
    { category: 'Marketing & Writing', count: 22 },
    { category: 'Mobile Development', count: 15 },
    { category: 'Data Analysis', count: 12 }
  ],
  weeklyApplications: [
    { week: 'Week 1', count: 140 },
    { week: 'Week 2', count: 210 },
    { week: 'Week 3', count: 320 },
    { week: 'Week 4', count: 480 }
  ]
};

let employersInMemory = [...INITIAL_EMPLOYERS];
let analyticsInMemory = { ...INITIAL_ANALYTICS };

export const adminService = {
  async getDashboardSummary(): Promise<any> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_DASHBOARD);
      return response.data;
    } catch {
      return {
        studentsCount: analyticsInMemory.activeStudents,
        employersCount: employersInMemory.length,
        pendingApprovals: employersInMemory.filter(e => !e.verified).length,
        totalJobsCount: 122,
        grossEarnings: analyticsInMemory.grossRevenue
      };
    }
  },

  async getAdminEmployers(): Promise<AdminEmployer[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_EMPLOYERS);
      return response.data;
    } catch {
      return employersInMemory;
    }
  },

  async approveEmployer(employerId: string): Promise<void> {
    try {
      await apiClient.put(API_ENDPOINTS.ADMIN_APPROVE_EMPLOYER(employerId));
    } catch {
      const matched = employersInMemory.find(e => e.id === employerId);
      if (matched) {
        matched.verified = true;
        analyticsInMemory.pendingApprovalsCount = Math.max(0, analyticsInMemory.pendingApprovalsCount - 1);
      }
    }
  },

  async getAnalytics(): Promise<AdminAnalytics> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_ANALYTICS);
      return response.data;
    } catch {
      return analyticsInMemory;
    }
  },

  async getModerationReports(): Promise<any[]> {
    return [
      { id: 'rep_01', type: 'Spam Job Flag', description: 'Immediate double application spam detected on Apex design lead job.', status: 'resolved', date: '2026-05-28' },
      { id: 'rep_02', type: 'Review Account Request', description: 'Employer "Creative Pixel Labs" requests fast activation approval support.', status: 'pending', date: '2026-05-31' }
    ];
  }
};
