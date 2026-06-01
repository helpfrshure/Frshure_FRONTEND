/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BASE_URL = 'https://frshure-backend.onrender.com/api/v1';

export const API_ENDPOINTS = {
  // Auth Student
  STUDENT_SIGNUP: '/student/signup',
  STUDENT_LOGIN: '/student/login',
  STUDENT_LOGOUT: '/student/logout',
  STUDENT_PROFILE: '/student/profile',

  // Auth Employer
  EMPLOYER_SIGNUP: '/employer/signup',
  EMPLOYER_LOGIN: '/employer/login',
  EMPLOYER_PROFILE: '/employer/profile',

  // Jobs
  JOBS: '/jobs',
  JOB_DETAILS: (jobId: string) => `/jobs/${jobId}`,
  JOB_CREATE: '/jobs/create',
  JOB_UPDATE: (jobId: string) => `/jobs/update/${jobId}`,
  JOB_DELETE: (jobId: string) => `/jobs/delete/${jobId}`,
  JOB_APPLY: (jobId: string) => `/jobs/apply/${jobId}`,
  JOB_APPLICANTS: (jobId: string) => `/jobs/applicants/${jobId}`,

  // Applications
  STUDENT_APPLICATIONS: '/student/applications',
  APPLICATION_ACCEPT: (appId: string) => `/application/accept/${appId}`,
  APPLICATION_REJECT: (appId: string) => `/application/reject/${appId}`,

  // Saved Jobs
  SAVE_JOB: (jobId: string) => `/student/save-job/${jobId}`,
  UNSAVE_JOB: (jobId: string) => `/student/unsave-job/${jobId}`,
  SAVED_JOBS: '/student/saved-jobs',

  // Chat
  CHAT_LIST: '/chat/list',
  CHAT_MESSAGES: (chatId: string) => `/chat/messages/${chatId}`,
  CHAT_SEND: '/chat/send',

  // Notifications
  NOTIFICATIONS: '/notifications',

  // Payments
  CREATE_ORDER: '/payment/create-order',
  VERIFY_PAYMENT: '/payment/verify',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_EMPLOYERS: '/admin/employers',
  ADMIN_APPROVE_EMPLOYER: (id: string) => `/admin/approve/${id}`,
  ADMIN_ANALYTICS: '/admin/analytics'
};
