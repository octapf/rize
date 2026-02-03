import { apiClient } from './client';

export interface Notification {
  _id: string;
  userId: string;
  type: 'achievement' | 'record' | 'challenge' | 'social' | 'reminder' | 'system';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: string;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  meta: {
    unreadCount: number;
    total: number;
  };
}

export interface UnreadCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

export const notificationsApi = {
  /**
   * Obtener notificaciones
   */
  async getNotifications(params?: {
    read?: boolean;
    type?: Notification['type'];
    limit?: number;
    skip?: number;
  }): Promise<NotificationsResponse> {
    const { data } = await apiClient.get('/notifications', { params });
    return data;
  },

  /**
   * Obtener contador de no leídas
   */
  async getUnreadCount(): Promise<UnreadCountResponse> {
    const { data } = await apiClient.get('/notifications/unread-count');
    return data;
  },

  /**
   * Marcar notificación como leída
   */
  async markAsRead(id: string): Promise<{ success: boolean; data: Notification }> {
    const { data } = await apiClient.put(`/notifications/${id}/read`);
    return data;
  },

  /**
   * Marcar todas como leídas
   */
  async markAllAsRead(): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.put('/notifications/read-all');
    return data;
  },

  /**
   * Eliminar notificación
   */
  async deleteNotification(id: string): Promise<{ success: boolean; message: string }> {
    const { data} = await apiClient.delete(`/notifications/${id}`);
    return data;
  },

  /**
   * Eliminar todas las notificaciones
   */
  async deleteAllNotifications(): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.delete('/notifications');
    return data;
  },
};
