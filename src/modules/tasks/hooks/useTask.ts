import { useQuery } from '@tanstack/react-query';
import { getTask } from '@/api/tasks';
import type { components } from '@/api';

type Task = components['schemas']['models.Task'];

/**
 * Hook to fetch a single task by ID
 */
export const useTask = (id: number) => {
  return useQuery<Task, Error>({
    queryKey: ['tasks', id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
};
