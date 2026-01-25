import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { render, screen, waitFor } from '@/test/utils';
import { RegisterForm } from './RegisterForm';

// Mock dependencies
vi.mock('@/modules/auth/hooks/useAuth');

describe('RegisterForm', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      isRegistering: false,
      registerError: null,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      registerAsync: vi.fn(),
      logout: vi.fn(),
      isLoggingOut: false,
    });
  });

  it('should render register form', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please confirm your password/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate username minimum length', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    await user.type(usernameInput, 'ab');

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate password minimum length', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345');
    await user.type(confirmPasswordInput, '12345');

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate password confirmation match', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'differentpassword');

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /create account/i });

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show loading state when registering', () => {
    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      isRegistering: true,
      registerError: null,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      registerAsync: vi.fn(),
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(<RegisterForm />);

    expect(screen.getByRole('button', { name: /creating account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });

  it('should show error message when registration fails', () => {
    const mockError = new Error('User already exists');
    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      isRegistering: false,
      registerError: mockError,
      user: null,
      isLoadingUser: false,
      isAuthenticated: false,
      login: vi.fn(),
      loginAsync: vi.fn(),
      isLoggingIn: false,
      loginError: null,
      registerAsync: vi.fn(),
      logout: vi.fn(),
      isLoggingOut: false,
    });

    render(<RegisterForm />);

    expect(screen.getByText('User already exists')).toBeInTheDocument();
  });
});
