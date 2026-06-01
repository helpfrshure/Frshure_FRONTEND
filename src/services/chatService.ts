/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../api/ApiConstants';
import { ChatThread, ChatMessage, UserRole } from '../types';

const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'chat_01',
    partnerId: 'emp_rzp',
    partnerName: 'Deepak (Razorpay HR)',
    partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    partnerRole: UserRole.EMPLOYER,
    lastMessage: 'Hi Rajdeep, we reviewed your React portfolios. Can you hop on a Call tomorrow morning?',
    lastMessageTime: '09:42 AM',
    unreadCount: 1,
    online: true,
    typing: false
  },
  {
    id: 'chat_02',
    partnerId: 'emp_swg',
    partnerName: 'Neha Sen (Swiggy Design)',
    partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    partnerRole: UserRole.EMPLOYER,
    lastMessage: 'Awesome. Thanks for sharing your updated Figma design system files.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    online: false,
    typing: false
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'chat_01': [
    {
      id: 'msg_01',
      chatId: 'chat_01',
      senderId: 'std_01',
      text: 'Hi Deepak, thank you for checking out my profile! I am extremely excited about the Frontend Intern opening.',
      timestamp: 'Yesterday, 06:15 PM'
    },
    {
      id: 'msg_02',
      chatId: 'chat_01',
      senderId: 'emp_rzp',
      text: 'Hello Rajdeep, our team was highly impressed by your portfolio projects, especially the fluid component layout system.',
      timestamp: 'Yesterday, 07:30 PM'
    },
    {
      id: 'msg_03',
      chatId: 'chat_01',
      senderId: 'std_01',
      text: 'That means a lot coming from Razorpay! I built that with React 19, custom design tokens, and highly optimized viewport checks. I would love to talk further.',
      timestamp: 'Today, 09:10 AM'
    },
    {
      id: 'msg_04',
      chatId: 'chat_01',
      senderId: 'emp_rzp',
      text: 'Hi Rajdeep, we reviewed your React portfolios. Can you hop on a Call tomorrow morning?',
      timestamp: 'Today, 09:42 AM'
    }
  ],
  'chat_02': [
    {
      id: 'msg_201',
      chatId: 'chat_02',
      senderId: 'emp_swg',
      text: 'Hello Rajdeep! Could you please share the editable link to your Figma Case Study?',
      timestamp: 'May 30, 02:22 PM'
    },
    {
      id: 'msg_202',
      chatId: 'chat_02',
      senderId: 'std_01',
      text: 'Sure Neha! Here is the link. I have enabled viewer permissions for you: figma.com/file/frshure-ux-design-challenge',
      timestamp: 'May 30, 03:00 PM'
    },
    {
      id: 'msg_203',
      chatId: 'chat_02',
      senderId: 'emp_swg',
      text: 'Awesome. Thanks for sharing your updated Figma design system files.',
      timestamp: 'May 30, 04:15 PM'
    }
  ]
};

let threadsInMemory = [...INITIAL_THREADS];
let messagesInMemory = { ...INITIAL_MESSAGES };

export const chatService = {
  async getChatThreads(): Promise<ChatThread[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.CHAT_LIST);
      return res.data;
    } catch {
      return threadsInMemory;
    }
  },

  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    try {
      const res = await apiClient.get(API_ENDPOINTS.CHAT_MESSAGES(chatId));
      return res.data;
    } catch {
      return messagesInMemory[chatId] || [];
    }
  },

  async sendMessage(chatId: string, text: string, senderId: string): Promise<ChatMessage> {
    try {
      const res = await apiClient.post(API_ENDPOINTS.CHAT_SEND, { chatId, text, senderId });
      return res.data;
    } catch {
      const newMsg: ChatMessage = {
        id: `msg_${Math.random().toString(36).substring(2, 9)}`,
        chatId,
        senderId,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (!messagesInMemory[chatId]) {
        messagesInMemory[chatId] = [];
      }
      messagesInMemory[chatId].push(newMsg);

      // Update thread last message
      const threadIndex = threadsInMemory.findIndex(t => t.id === chatId);
      if (threadIndex !== -1) {
        threadsInMemory[threadIndex].lastMessage = text;
        threadsInMemory[threadIndex].lastMessageTime = 'Just Now';
        threadsInMemory[threadIndex].unreadCount = 0;
      }

      return newMsg;
    }
  },

  // Helper to trigger rapid recruiter auto-replies for beautiful app responsiveness
  async triggerSimulatedReply(chatId: string, studentName: string): Promise<ChatMessage> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const replyTexts = [
          `Great response! I will share this directly with our core engineering directors and get back to you shortly.`,
          `Are you available for a 15-minute quick meet call this Wednesday around 4:00 PM?`,
          `Could you detail your experience building responsive cards using standard CSS grids and Tailwind?`,
          `Excellent. I have updated your application status. Stay tuned for an official offer notification!`
        ];
        const randomReply = replyTexts[Math.floor(Math.random() * replyTexts.length)];
        
        const newReply: ChatMessage = {
          id: `msg_reply_${Math.random().toString(36).substring(2, 9)}`,
          chatId,
          senderId: chatId === 'chat_01' ? 'emp_rzp' : 'emp_swg',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (!messagesInMemory[chatId]) {
          messagesInMemory[chatId] = [];
        }
        messagesInMemory[chatId].push(newReply);

        const threadIndex = threadsInMemory.findIndex(t => t.id === chatId);
        if (threadIndex !== -1) {
          threadsInMemory[threadIndex].lastMessage = randomReply;
          threadsInMemory[threadIndex].lastMessageTime = 'Just Now';
          threadsInMemory[threadIndex].unreadCount = 1;
        }

        resolve(newReply);
      }, 3500);
    });
  }
};
