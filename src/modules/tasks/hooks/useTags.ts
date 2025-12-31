import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { components } from '@/api';
import { createTag, deleteTag, getTags, updateTag } from '@/api/tags';

type Tag = components['schemas']['models.Tag'];
type CreateTagRequest = components['schemas']['handlers.CreateTagRequest'];
type UpdateTagRequest = components['schemas']['handlers.UpdateTagRequest'];

/**
 * Hook for managing tags
 */
export const useTags = () => {
  const queryClient = useQueryClient();

  // Query to get all tags
  const tagsQuery = useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  // Create tag mutation
  const createTagMutation = useMutation<Tag, Error, CreateTagRequest>({
    mutationFn: (tagData) => createTag(tagData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Update tag mutation
  const updateTagMutation = useMutation<
    Tag,
    Error,
    { id: number; data: UpdateTagRequest }
  >({
    mutationFn: ({ id, data }) => updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Delete tag mutation
  const deleteTagMutation = useMutation<void, Error, number>({
    mutationFn: (id) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    // Query
    tags: tagsQuery.data ?? [],
    isLoadingTags: tagsQuery.isLoading,
    tagsError: tagsQuery.error,

    // Mutations
    createTag: createTagMutation.mutate,
    createTagAsync: createTagMutation.mutateAsync,
    isCreatingTag: createTagMutation.isPending,
    createTagError: createTagMutation.error,

    updateTag: updateTagMutation.mutate,
    updateTagAsync: updateTagMutation.mutateAsync,
    isUpdatingTag: updateTagMutation.isPending,
    updateTagError: updateTagMutation.error,

    deleteTag: deleteTagMutation.mutate,
    deleteTagAsync: deleteTagMutation.mutateAsync,
    isDeletingTag: deleteTagMutation.isPending,
    deleteTagError: deleteTagMutation.error,
  };
};
