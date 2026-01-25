import { useQuery } from '@tanstack/react-query';
import type { components } from '@/api';
import { getAssignedTasks } from '@/api/tasks';

type PaginatedTasksResponse = components['schemas']['services.PaginatedTasksResponse'];

/**
 * Query parameters for fetching assigned tasks
 */
export type AssignedTasksQueryParams = {
  page?: number;
  limit?: number;
  type?: 'casa' | 'trabalho' | 'lazer' | 'saude';
  completed?: boolean;
  search?: string;
  due_date_from?: string;
  due_date_to?: string;
  period?: 'overdue' | 'today' | 'this_week' | 'this_month';
  sort_by?: 'created_at' | 'due_date' | 'title';
  order?: 'asc' | 'desc';
};

/**
 * Hook for managing tasks assigned by the authenticated user to other users
 * Provides query for fetching tasks that were created/assigned by the user
 */
export const useAssignedTasks = (params?: AssignedTasksQueryParams) => {
  // Query to get paginated assigned tasks
  const tasksQuery = useQuery<PaginatedTasksResponse, Error>({
    queryKey: ['tasks', 'assigned', params],
    queryFn: () => getAssignedTasks(params),
  });

  return {
    // Queries
    tasks: tasksQuery.data?.tasks ?? [],
    pagination: tasksQuery.data
      ? {
          page: tasksQuery.data.page,
          limit: tasksQuery.data.limit,
          total: tasksQuery.data.total,
          totalPages: tasksQuery.data.total_pages,
        }
      : undefined,
    isLoadingTasks: tasksQuery.isLoading,
    tasksError: tasksQuery.error,
  };
};
