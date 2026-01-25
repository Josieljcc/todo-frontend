import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { render, screen } from '@/test/utils';
import { ProtectedRoute } from './ProtectedRoute';

// Mock dependencies
vi.mock('@/modules/auth/hooks/useAuth');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate">Navigate to {to}</div>,
  };
});

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoadingUser: false,
      user: { id: 1, username: 'test', email: 'test@test.com' },
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('should redirect to login when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoadingUser: false,
      user: null,
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText('Navigate to /login')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('should show loading when checking authentication', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoadingUser: true,
      user: null,
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    // Should show loading component
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });
});
