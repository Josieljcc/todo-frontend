import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '@/api';
import { createTestQueryClient } from '@/test/utils';
import { useAuth } from './useAuth';

vi.mock('@/api', () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn(),
  getStoredUser: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleApiError: vi.fn(),
  }),
}));

describe('useAuth', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  describe('user query', () => {
    it('should load user from storage when authenticated', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };

      vi.mocked(api.isAuthenticated).mockReturnValue(true);
      vi.mocked(api.getStoredUser).mockReturnValue(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      expect(result.current.isLoadingUser).toBe(false);
      expect(api.getStoredUser).toHaveBeenCalled();
    });

    it('should not load user when not authenticated', async () => {
      vi.mocked(api.isAuthenticated).mockReturnValue(false);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toBeUndefined();
      });

      expect(result.current.isLoadingUser).toBe(false);
      expect(api.getStoredUser).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockAuthResponse = {
        token: 'mock-token',
        user: { id: 1, username: 'testuser', email: 'test@example.com' },
      };

      vi.mocked(api.isAuthenticated).mockReturnValue(false);
      vi.mocked(api.login).mockResolvedValue(mockAuthResponse as any);

      const { result } = renderHook(() => useAuth(), { wrapper });

      const credentials = { username: 'testuser', password: 'password123' };
      result.current.login(credentials as any);

      await waitFor(() => {
        expect(result.current.isLoggingIn).toBe(false);
      });

      expect(api.login).toHaveBeenCalledWith(credentials);
    });

    it('should handle login error', async () => {
      const mockError = new Error('Invalid credentials');
      vi.mocked(api.isAuthenticated).mockReturnValue(false);
      vi.mocked(api.login).mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth(), { wrapper });

      result.current.login({ username: 'testuser', password: 'wrong' } as any);

      await waitFor(() => {
        expect(result.current.isLoggingIn).toBe(false);
      });

      expect(result.current.loginError).toBeDefined();
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const mockAuthResponse = {
        token: 'mock-token',
        user: { id: 1, username: 'newuser', email: 'newuser@example.com' },
      };

      vi.mocked(api.isAuthenticated).mockReturnValue(false);
      vi.mocked(api.register).mockResolvedValue(mockAuthResponse as any);

      const { result } = renderHook(() => useAuth(), { wrapper });

      const payload = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
      result.current.register(payload as any);

      await waitFor(() => {
        expect(result.current.isRegistering).toBe(false);
      });

      expect(api.register).toHaveBeenCalledWith(payload);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      vi.mocked(api.isAuthenticated).mockReturnValue(true);
      vi.mocked(api.logout).mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      result.current.logout();

      await waitFor(() => {
        expect(result.current.isLoggingOut).toBe(false);
      });

      expect(api.logout).toHaveBeenCalled();
    });
  });
});

