/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../api/ApiConstants';
import { SystemNotification } from '../types';

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not_01',
    title: 'Resume Under Review',
    description: 'Razorpay has moved your application for Frontend Developer Intern (React) to "Reviewed".',
    type: 'application_update',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 mins ago
  },
  {
    id: 'not_02',
    title: 'New Interview Chat Invitation',
    description: 'Deepak from Razorpay sent you a message: "Hi Rajdeep, we reviewed your React..."',
    type: 'chat',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 'not_03',
    title: 'Successful Payment Verification',
    description: 'Your employer activation payment of ₹99 has been approved. Job post is now live.',
    type: 'payment_success',
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

let notificationsInMemory = [...INITIAL_NOTIFICATIONS];

export const notificationService = {
  async getNotifications(): Promise<SystemNotification[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS);
      return res.data;
    } catch {
      return notificationsInMemory;
    }
  },

  async markAsRead(id: string): Promise<void> {
    const matched = notificationsInMemory.find(n => n.id === id);
    if (matched) {
      matched.read = true;
    }
  },

  async markAllAsRead(): Promise<void> {
    notificationsInMemory.forEach(n => n.read = true);
  },

  async getUnreadCount(): Promise<number> {
    return notificationsInMemory.filter(n => !n.read).length;
  },

  addLocalNotification(title: string, description: string, type: SystemNotification['type']): SystemNotification {
    const freshNot: SystemNotification = {
      id: `not_${Math.random().toString(36).substring(2, 9)}`,
      title,
      description,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    notificationsInMemory = [freshNot, ...notificationsInMemory];
    return freshNot;
  }
};
