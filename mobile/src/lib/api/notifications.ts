import { apiClient } from './client';

export interface Notification {
  _id: string;
  userId: string;
  type: 'friend_request' | 'workout_like' | 'comment' | 'achievement' | 'challenge' | 'message';
  title: string;
  body: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

export const notificationsApi = {
  // Get notifications
  getNotifications: (page = 1, limit = 20) =>
    apiClient.get<{ notifications: Notification[]; total: number; unread: number }>(
      `/notifications?page=${page}&limit=${limit}`
    ),

  // Mark as read
  markAsRead: (id: string) =>
    apiClient.patch(`/notifications/${id}/read`),

  // Mark all as read
  markAllAsRead: () =>
    apiClient.post('/notifications/read-all'),

  // Delete notification
  deleteNotification: (id: string) =>
    apiClient.delete(`/notifications/${id}`),

  // Register push token
  registerPushToken: (token: string, platform: 'ios' | 'android') =>
    apiClient.post('/notifications/push-token', { token, platform }),

  // Unregister push token
  unregisterPushToken: (token: string) =>
    apiClient.delete(`/notifications/push-token/${token}`),
};
