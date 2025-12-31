import { apiClient } from './apiClient';
import type { components, paths } from './types';

/**
 * Tags API Service
 * Handles tag-related API calls
 */

// Type definitions
type Tag = components['schemas']['models.Tag'];
type CreateTagRequest = components['schemas']['handlers.CreateTagRequest'];
type UpdateTagRequest = components['schemas']['handlers.UpdateTagRequest'];

/**
 * Get all tags for the authenticated user
 * @returns Array of tags
 */
export const getTags = async (): Promise<Tag[]> => {
  const response =
    await apiClient.get<
      paths['/tags']['get']['responses']['200']['content']['application/json']
    >('/tags');

  return response.data;
};

/**
 * Get a tag by ID
 * @param id - Tag ID
 * @returns Tag data
 */
export const getTag = async (id: number): Promise<Tag> => {
  const response = await apiClient.get<
    paths['/tags/{id}']['get']['responses']['200']['content']['application/json']
  >(`/tags/${id}`);

  return response.data;
};

/**
 * Create a new tag
 * @param tagData - Tag creation data
 * @returns Created tag
 */
export const createTag = async (tagData: CreateTagRequest): Promise<Tag> => {
  const response = await apiClient.post<
    paths['/tags']['post']['responses']['201']['content']['application/json']
  >('/tags', tagData);

  return response.data;
};

/**
 * Update a tag
 * @param id - Tag ID
 * @param tagData - Tag update data
 * @returns Updated tag
 */
export const updateTag = async (
  id: number,
  tagData: UpdateTagRequest,
): Promise<Tag> => {
  const response = await apiClient.put<
    paths['/tags/{id}']['put']['responses']['200']['content']['application/json']
  >(`/tags/${id}`, tagData);

  return response.data;
};

/**
 * Delete a tag
 * @param id - Tag ID
 * @returns Success response
 */
export const deleteTag = async (id: number): Promise<void> => {
  await apiClient.delete(`/tags/${id}`);
};
