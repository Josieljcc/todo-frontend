import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@/api';
import { createTask, updateTask } from '@/api/tasks';

type Task = components['schemas']['models.Task'];
type CreateTaskRequest = components['schemas']['handlers.CreateTaskRequest'];
type UpdateTaskRequest = components['schemas']['handlers.UpdateTaskRequest'];

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation<Task, Error, CreateTaskRequest>({
    mutationFn: (taskData) => createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskMutation = useMutation<Task, Error, { id: number; data: UpdateTaskRequest }>({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['tasks', data.id], data);
    },
  });

  return {
    createTask: createTaskMutation.mutate,
    createTaskAsync: createTaskMutation.mutateAsync,
    isCreatingTask: createTaskMutation.isPending,
    createTaskError: createTaskMutation.error,

    updateTask: updateTaskMutation.mutate,
    updateTaskAsync: updateTaskMutation.mutateAsync,
    isUpdatingTask: updateTaskMutation.isPending,
    updateTaskError: updateTaskMutation.error,
  };
};
