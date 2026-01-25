import { apiClient } from './apiClient';
import type { components, paths } from './types';

/**
 * Users API Service
 * Handles user-related API calls
 */

// Type definitions
type UpdateNotificationsEnabledRequest =
  components['schemas']['handlers.UpdateNotificationsEnabledRequest'];
type UpdateTelegramChatIDRequest = components['schemas']['handlers.UpdateTelegramChatIDRequest'];
type SuccessResponse = components['schemas']['handlers.SuccessResponse'];
type PaginatedUsersResponse = components['schemas']['handlers.PaginatedUsersResponse'];

/**
 * Update notifications enabled setting for the authenticated user
 * @param data - Notifications enabled status
 * @returns Success response
 */
export const updateNotificationsEnabled = async (
  data: UpdateNotificationsEnabledRequest
): Promise<SuccessResponse> => {
  const response = await apiClient.put<
    paths['/users/notifications-enabled']['put']['responses']['200']['content']['application/json']
  >('/users/notifications-enabled', data);

  return response.data;
};

/**
 * Update Telegram chat ID for the authenticated user
 * @param data - Telegram chat ID
 * @returns Success response
 */
export const updateTelegramChatID = async (
  data: UpdateTelegramChatIDRequest
): Promise<SuccessResponse> => {
  const response = await apiClient.put<
    paths['/users/telegram-chat-id']['put']['responses']['200']['content']['application/json']
  >('/users/telegram-chat-id', data);

  return response.data;
};

/**
 * Get all users with pagination
 * @param params - Query parameters
 * @returns Paginated users response
 */
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedUsersResponse> => {
  const response = await apiClient.get<
    paths['/users']['get']['responses']['200']['content']['application/json']
  >('/users', { params });

  return response.data;
};
