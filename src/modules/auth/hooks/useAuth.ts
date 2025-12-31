import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { login, register, logout, isAuthenticated } from '@/api';
import type { components } from '@/api/types';
import { getStoredUser, removeAuthToken } from '@/api/apiClient';

type LoginRequest = components['schemas']['handlers.LoginRequest'];
type RegisterRequest = components['schemas']['handlers.RegisterRequest'];
type AuthResponse = components['schemas']['handlers.AuthResponse'];
type User = components['schemas']['models.User'];

/**
 * Hook for user authentication
 * Provides login, register, logout mutations and user query
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Query to get current authenticated user
  const { data: user, isLoading: isLoadingUser } = useQuery<User | null>({
    queryKey: ['auth', 'user'],
    queryFn: () => {
      const storedUser = getStoredUser() as User | null;
      return storedUser;
    },
    enabled: isAuthenticated(),
    staleTime: Infinity, // User data doesn't change often
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (data) => {
      // Update user query cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      // Navigate to home page
      navigate('/tasks');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => register(userData),
    onSuccess: (data) => {
      // Update user query cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      // Navigate to home page
      navigate('/tasks');
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Remove user from cache
      queryClient.removeQueries({ queryKey: ['auth', 'user'] });
      // Navigate to login
      navigate('/login');
    },
  });

  return {
    user,
    isLoadingUser,
    isAuthenticated: isAuthenticated(),
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: ['auth', 'isAuthenticated'],
    queryFn: () => isAuthenticated(),
    staleTime: Infinity,
  });
};
