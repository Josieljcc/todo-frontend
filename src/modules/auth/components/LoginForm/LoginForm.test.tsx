import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { render, screen, waitFor } from '@/test/utils';
import { LoginForm } from './LoginForm';

// Mock dependencies
vi.mock('@/modules/auth/hooks/useAuth');

describe('LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      isLoggingIn: false,
      loginError: null,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      loginAsync: vi.fn(),
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });
  });

  it('should render login form', () => {
    render(<LoginForm />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username or email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('should show loading state when logging in', () => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      isLoggingIn: true,
      loginError: null,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      loginAsync: vi.fn(),
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(<LoginForm />);

    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });

  it('should show error message when login fails', () => {
    const mockError = new Error('Invalid credentials');
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      isLoggingIn: false,
      loginError: mockError,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      loginAsync: vi.fn(),
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(<LoginForm />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should disable form fields when logging in', () => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      isLoggingIn: true,
      loginError: null,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      loginAsync: vi.fn(),
      register: vi.fn(),
      registerAsync: vi.fn(),
      isRegistering: false,
      registerError: null,
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it('should accept email as username', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
