import { renderHook } from '@testing-library/react';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useErrorHandler } from './useErrorHandler';

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('useErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should handle Error object', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new Error('Test error message');

    result.current.handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Test error message');
  });

  it('should handle Error object with default message', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new Error('');

    result.current.handleError(error, 'Default error message');

    expect(toast.error).toHaveBeenCalledWith('Default error message');
  });

  it('should handle generic object with message property', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = { message: 'Object error message' };

    result.current.handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Object error message');
  });

  it('should handle generic object without message property', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = { code: 'ERROR_CODE' };

    result.current.handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Ocorreu um erro inesperado');
  });

  it('should handle string error', () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = 'String error message';

    result.current.handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Ocorreu um erro inesperado');
  });

  it('should handle null error with default message', () => {
    const { result } = renderHook(() => useErrorHandler());

    result.current.handleError(null, 'Custom default message');

    expect(toast.error).toHaveBeenCalledWith('Custom default message');
  });

  it('should handle undefined error with default message', () => {
    const { result } = renderHook(() => useErrorHandler());

    result.current.handleError(undefined, 'Custom default message');

    expect(toast.error).toHaveBeenCalledWith('Custom default message');
  });

  describe('handleApiError', () => {
    it('should handle AxiosError with response data message', () => {
      const { result } = renderHook(() => useErrorHandler());
      const mockError = {
        response: {
          data: {
            message: 'API error message',
          },
        },
        message: 'Network error',
      } as unknown as AxiosError<{ message?: string }>;

      result.current.handleApiError(mockError);

      expect(toast.error).toHaveBeenCalledWith('API error message');
    });

    it('should handle AxiosError without response data message', () => {
      const { result } = renderHook(() => useErrorHandler());
      const mockError = {
        response: {
          data: {},
        },
        message: 'Network error',
      } as unknown as AxiosError<{ message?: string }>;

      result.current.handleApiError(mockError);

      expect(toast.error).toHaveBeenCalledWith('Network error');
    });

    it('should handle AxiosError without response', () => {
      const { result } = renderHook(() => useErrorHandler());
      const mockError = {
        message: 'Network error',
      } as unknown as AxiosError<{ message?: string }>;

      result.current.handleApiError(mockError);

      expect(toast.error).toHaveBeenCalledWith('Network error');
    });

    it('should handle AxiosError without message', () => {
      const { result } = renderHook(() => useErrorHandler());
      const mockError = {} as unknown as AxiosError<{ message?: string }>;

      result.current.handleApiError(mockError);

      expect(toast.error).toHaveBeenCalledWith('Erro ao comunicar com o servidor');
    });
  });
});
