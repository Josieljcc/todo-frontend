import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@/test/utils';
import { UserMenu } from './UserMenu';

// Mock dependencies
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserMenu', () => {
  const mockLogout = vi.fn();
  const mockOnOpenChange = vi.fn();
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render user menu with user information', () => {
    render(
      <UserMenu
        user={mockUser}
        onLogout={mockLogout}
        isLoggingOut={false}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should call logout when logout button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <UserMenu
        user={mockUser}
        onLogout={mockLogout}
        isLoggingOut={false}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const logoutButton = screen.getByRole('menuitem', { name: /sair/i });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it('should navigate to settings when settings item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <UserMenu
        user={mockUser}
        onLogout={mockLogout}
        isLoggingOut={false}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const settingsItem = screen.getByRole('menuitem', { name: /configurações/i });
    await user.click(settingsItem);

    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });

  it('should show loading state when logging out', () => {
    render(
      <UserMenu
        user={mockUser}
        onLogout={mockLogout}
        isLoggingOut={true}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.getByText('Saindo...')).toBeInTheDocument();
    const logoutButton = screen.getByRole('menuitem', { name: /saindo/i });
    expect(logoutButton).toHaveAttribute('aria-disabled', 'true');
    expect(logoutButton).toHaveAttribute('data-disabled');
  });

  it('should call onOpenChange when backdrop is clicked', async () => {
    render(
      <UserMenu
        user={mockUser}
        onLogout={mockLogout}
        isLoggingOut={false}
        isOpen={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    }
  });
});
