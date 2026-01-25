import type { AxiosError } from 'axios';
import { toast } from 'sonner';

/**
 * Hook for centralized error handling
 * Provides consistent error handling with toast notifications
 */
export const useErrorHandler = () => {
  const handleError = (error: unknown, defaultMessage?: string) => {
    let message = defaultMessage || 'Ocorreu um erro inesperado';

    if (error instanceof Error) {
      message = error.message || message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      message = String(error.message);
    }

    toast.error(message);

    // Log to console only in development
    if (import.meta.env.DEV) {
      console.error('Error:', error);
    }
  };

  const handleApiError = (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || 'Erro ao comunicar com o servidor';

    toast.error(message);

    // Log to console only in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }
  };

  return {
    handleError,
    handleApiError,
  };
};
