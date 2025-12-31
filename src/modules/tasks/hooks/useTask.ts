import { useQuery } from '@tanstack/react-query';
import type { components } from '@/api';
import { getTask } from '@/api/tasks';

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
