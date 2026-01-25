import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { navigateTo } from '@/lib/navigation';
import {
  getAuthToken,
  getStoredUser,
  removeAuthToken,
  setAuthToken,
  setStoredUser,
} from './storage';

/**
 * API Client configuration
 * Base URL is loaded from environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-todo.infoos.shop/api/v1';

// Re-export storage functions from storage module
export { getAuthToken, getStoredUser, removeAuthToken, setAuthToken, setStoredUser };

/**
 * Create Axios instance with base configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
  });

  // Request interceptor: Add authentication token to headers
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor: Handle errors globally
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Handle 401 Unauthorized - redirect to login
      if (error.response?.status === 401) {
        removeAuthToken();
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          navigateTo('/login');
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        // Toast will be handled by the component using the error
        // This prevents showing toast in interceptors where we don't have React context
      }

      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Default API client instance
 * Use this for all API requests
 */
export const apiClient = createApiClient();

/**
 * Export the API base URL for reference
 */
export { API_BASE_URL };
