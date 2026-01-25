import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';

/**
 * Create a test QueryClient with default options for testing
 */
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

/**
 * Wrapper component for React Query Provider
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

/**
 * Custom render function that includes all providers
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

/**
 * Helper to clear localStorage
 */
export const clearLocalStorage = () => {
  localStorage.clear();
};

/**
 * Helper to set localStorage item
 */
export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * Helper to get localStorage item
 */
export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

/**
 * Helper to remove localStorage item
 */
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * Mock navigation function for testing
 */
export const mockNavigate = vi.fn();

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render };
