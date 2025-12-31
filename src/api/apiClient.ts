import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

/**
 * API Client configuration
 * Base URL is loaded from environment variables
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://api-todo.infoos.shop/api/v1';

// Log for debugging (remove in production)
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

/**
 * Storage keys for authentication
 */
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
} as const;

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Get stored user data
 */
export const getStoredUser = (): unknown | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

/**
 * Set user data in localStorage
 */
export const setStoredUser = (user: unknown): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

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
    },
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
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        // Could show a toast notification here
        console.error('Access forbidden');
      }

      return Promise.reject(error);
    },
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
