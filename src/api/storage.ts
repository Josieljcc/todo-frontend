import { z } from 'zod';
import type { components } from './types';

type User = components['schemas']['models.User'];

/**
 * Schema for validating stored user data
 */
const storedUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

/**
 * Storage keys for authentication
 */
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
} as const;

/**
 * Get stored user data with validation
 * @returns Validated user data or null if invalid/not found
 */
export const getStoredUser = (): User | null => {
  try {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userJson) {
      return null;
    }

    const parsed = JSON.parse(userJson);
    const validated = storedUserSchema.parse(parsed);
    return validated as User;
  } catch (error) {
    // Invalid data in localStorage, clear it
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    return null;
  }
};

/**
 * Set user data in localStorage
 */
export const setStoredUser = (user: User): void => {
  try {
    // Validate before storing
    storedUserSchema.parse(user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Invalid user data format');
    }
    throw error;
  }
};

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
 * Remove authentication token and user data from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};
