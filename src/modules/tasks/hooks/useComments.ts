import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { components } from '@/api';
import {
  createComment,
  deleteComment,
  getTaskComments,
  updateComment,
} from '@/api/comments';

type Comment = components['schemas']['models.Comment'];
type CreateCommentRequest =
  components['schemas']['handlers.CreateCommentRequest'];
type UpdateCommentRequest =
  components['schemas']['handlers.UpdateCommentRequest'];

/**
 * Hook for managing comments on a task
 */
export const useComments = (taskId: number) => {
  const queryClient = useQueryClient();

  // Query to get comments for a task
  const commentsQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', taskId],
    queryFn: () => getTaskComments(taskId),
    enabled: !!taskId,
  });

  // Create comment mutation
  const createCommentMutation = useMutation<
    Comment,
    Error,
    CreateCommentRequest
  >({
    mutationFn: (commentData) => createComment(commentData),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
  });

  // Update comment mutation
  const updateCommentMutation = useMutation<
    Comment,
    Error,
    { id: number; data: UpdateCommentRequest }
  >({
    mutationFn: ({ id, data }) => updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation<void, Error, number>({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
    },
  });

  return {
    // Query
    comments: commentsQuery.data ?? [],
    isLoadingComments: commentsQuery.isLoading,
    commentsError: commentsQuery.error,

    // Mutations
    createComment: createCommentMutation.mutate,
    createCommentAsync: createCommentMutation.mutateAsync,
    isCreatingComment: createCommentMutation.isPending,
    createCommentError: createCommentMutation.error,

    updateComment: updateCommentMutation.mutate,
    updateCommentAsync: updateCommentMutation.mutateAsync,
    isUpdatingComment: updateCommentMutation.isPending,
    updateCommentError: updateCommentMutation.error,

    deleteComment: deleteCommentMutation.mutate,
    deleteCommentAsync: deleteCommentMutation.mutateAsync,
    isDeletingComment: deleteCommentMutation.isPending,
    deleteCommentError: deleteCommentMutation.error,
  };
};
