import { apiClient } from './apiClient';
import type { components, paths } from './types';

/**
 * Comments API Service
 * Handles comment-related API calls
 */

// Type definitions
type Comment = components['schemas']['models.Comment'];
type CreateCommentRequest =
  components['schemas']['handlers.CreateCommentRequest'];
type UpdateCommentRequest =
  components['schemas']['handlers.UpdateCommentRequest'];

/**
 * Get comments for a specific task
 * @param taskId - Task ID
 * @returns Array of comments
 */
export const getTaskComments = async (taskId: number): Promise<Comment[]> => {
  const response = await apiClient.get<
    paths['/tasks/{id}/comments']['get']['responses']['200']['content']['application/json']
  >(`/tasks/${taskId}/comments`);

  return response.data;
};

/**
 * Create a new comment on a task
 * @param commentData - Comment creation data
 * @returns Created comment
 */
export const createComment = async (
  commentData: CreateCommentRequest,
): Promise<Comment> => {
  const response = await apiClient.post<
    paths['/comments']['post']['responses']['201']['content']['application/json']
  >('/comments', commentData);

  return response.data;
};

/**
 * Update a comment
 * @param id - Comment ID
 * @param commentData - Comment update data
 * @returns Updated comment
 */
export const updateComment = async (
  id: number,
  commentData: UpdateCommentRequest,
): Promise<Comment> => {
  const response = await apiClient.put<
    paths['/comments/{id}']['put']['responses']['200']['content']['application/json']
  >(`/comments/${id}`, commentData);

  return response.data;
};

/**
 * Delete a comment
 * @param id - Comment ID
 * @returns Success response
 */
export const deleteComment = async (id: number): Promise<void> => {
  await apiClient.delete(`/comments/${id}`);
};
