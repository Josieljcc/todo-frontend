import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as tasksApi from '@/api/tasks';
import { createTestQueryClient } from '@/test/utils';
import { useTasks } from './useTasks';

vi.mock('@/api/tasks', () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('useTasks', () => {
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

  it('should fetch tasks successfully', async () => {
    const mockResponse = {
      tasks: [
        {
          id: 1,
          title: 'Test Task 1',
          description: 'Description 1',
          type: 'casa',
          priority: 'medium',
          completed: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
      page: 1,
      limit: 10,
      total: 1,
      total_pages: 1,
    };

    vi.mocked(tasksApi.getTasks).mockResolvedValue(mockResponse as any);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoadingTasks).toBe(false);
    });

    expect(result.current.tasks).toEqual(mockResponse.tasks);
    expect(result.current.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });

  it('should create task successfully', async () => {
    vi.mocked(tasksApi.getTasks).mockResolvedValue({
      tasks: [],
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 0,
    } as any);

    vi.mocked(tasksApi.createTask).mockResolvedValue({
      id: 1,
      title: 'New Task',
      type: 'casa',
      priority: 'medium',
      completed: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    } as any);

    const { result } = renderHook(() => useTasks(), { wrapper });

    result.current.createTask({ title: 'New Task', type: 'casa' } as any);

    await waitFor(() => {
      expect(result.current.isCreatingTask).toBe(false);
    });

    expect(tasksApi.createTask).toHaveBeenCalled();
  });
});

