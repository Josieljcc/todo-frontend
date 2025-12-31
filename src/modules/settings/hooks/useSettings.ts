import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '@/api';
import { updateNotificationsEnabled, updateTelegramChatID } from '@/api/users';

type UpdateNotificationsRequest =
  components['schemas']['handlers.UpdateNotificationsEnabledRequest'];
type UpdateTelegramRequest =
  components['schemas']['handlers.UpdateTelegramChatIDRequest'];
type SuccessResponse = components['schemas']['handlers.SuccessResponse'];

/**
 * Hook for managing user settings
 */
export const useSettings = () => {
  const queryClient = useQueryClient();

  // Update notifications mutation
  const updateNotificationsMutation = useMutation<
    SuccessResponse,
    Error,
    UpdateNotificationsRequest
  >({
    mutationFn: (data) => updateNotificationsEnabled(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });

  // Update Telegram chat ID mutation
  const updateTelegramMutation = useMutation<
    SuccessResponse,
    Error,
    UpdateTelegramRequest
  >({
    mutationFn: (data) => updateTelegramChatID(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });

  return {
    // Notifications
    updateNotifications: updateNotificationsMutation.mutate,
    updateNotificationsAsync: updateNotificationsMutation.mutateAsync,
    isUpdatingNotifications: updateNotificationsMutation.isPending,
    updateNotificationsError: updateNotificationsMutation.error,

    // Telegram
    updateTelegramChatId: (data: { telegram_chat_id: string }) =>
      updateTelegramMutation.mutate({
        telegram_chat_id: data.telegram_chat_id,
      }),
    updateTelegramChatIdAsync: (data: { telegram_chat_id: string }) =>
      updateTelegramMutation.mutateAsync({
        telegram_chat_id: data.telegram_chat_id,
      }),
    isUpdatingTelegram: updateTelegramMutation.isPending,
    updateTelegramError: updateTelegramMutation.error,
  };
};
