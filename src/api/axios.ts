/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './ApiConstants';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT Auth Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('frshure_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Unified Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    // Handle Token Expiry (401 Unauthorized)
    if (error.response?.status === 401 && originalRequest) {
      console.warn('Unauthorized request detected. Removing token...');
      localStorage.removeItem('frshure_token');
      localStorage.removeItem('frshure_user');
      // In a real SPA, this would trigger a redirect or token refresh strategy.
    }
    return Promise.reject(error);
  }
);

export default apiClient;
