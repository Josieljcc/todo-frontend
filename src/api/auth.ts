import type { components, paths } from "./types";
import { apiClient, removeAuthToken, setAuthToken, setStoredUser } from "./apiClient";

/**
 * Auth API Service
 * Handles authentication-related API calls
 */

// Type definitions for auth requests and responses
type LoginRequest = components["schemas"]["handlers.LoginRequest"];
type RegisterRequest = components["schemas"]["handlers.RegisterRequest"];
type AuthResponse = components["schemas"]["handlers.AuthResponse"];
type ErrorResponse = components["schemas"]["handlers.ErrorResponse"];

/**
 * Login user
 * @param credentials - Username/email and password
 * @returns Auth response with token and user data
 */
export const login = async (
  credentials: LoginRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<
    paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"]
  >("/auth/login", credentials);

  const data = response.data;
  
  // Store token and user data
  if (data.token) {
    setAuthToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
};

/**
 * Register a new user
 * @param userData - User registration data
 * @returns Auth response with token and user data
 */
export const register = async (
  userData: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<
    paths["/auth/register"]["post"]["responses"]["201"]["content"]["application/json"]
  >("/auth/register", userData);

  const data = response.data;
  
  // Store token and user data
  if (data.token) {
    setAuthToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
};

/**
 * Logout user
 * Removes authentication token and user data from storage
 */
export const logout = (): void => {
  removeAuthToken();
};

/**
 * Check if user is authenticated
 * @returns true if token exists in storage
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("auth_token");
};
