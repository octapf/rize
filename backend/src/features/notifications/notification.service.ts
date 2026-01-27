import { Notification } from './notification.model';
import type { INotification } from './notification.model';

class NotificationService {
  /**
   * Crear una notificación
   */
  async createNotification(data: {
    userId: string;
    type: INotification['type'];
    title: string;
    body: string;
    data?: Record<string, any>;
    actionUrl?: string;
    expiresAt?: Date;
  }) {
    const notification = await Notification.create(data);
    
    // TODO: Enviar push notification si el usuario tiene push token
    // await this.sendPushNotification(notification);
    
    return notification;
  }

  /**
   * Obtener notificaciones del usuario
   */
  async getUserNotifications(
    userId: string,
    options: {
      read?: boolean;
      type?: INotification['type'];
      limit?: number;
      skip?: number;
    } = {}
  ) {
    const query: any = { userId };

    if (options.read !== undefined) {
      query.read = options.read;
    }

    if (options.type) {
      query.type = options.type;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(options.limit || 50)
      .skip(options.skip || 0);

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false,
    });

    return {
      notifications,
      unreadCount,
    };
  }

  /**
   * Marcar notificación como leída
   */
  async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead(userId: string) {
    await Notification.updateMany(
      { userId, read: false },
      { read: true, readAt: new Date() }
    );
  }

  /**
   * Eliminar notificación
   */
  async deleteNotification(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId,
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }

  /**
   * Eliminar todas las notificaciones del usuario
   */
  async deleteAllNotifications(userId: string) {
    await Notification.deleteMany({ userId });
  }

  /**
   * Notificación por nuevo achievement
   */
  async notifyAchievementUnlocked(userId: string, achievementName: string, achievementId: string) {
    await this.createNotification({
      userId,
      type: 'achievement',
      title: '🏆 ¡Logro Desbloqueado!',
      body: `Has conseguido: ${achievementName}`,
      actionUrl: `/achievements/${achievementId}`,
      data: { achievementId },
    });
  }

  /**
   * Notificación por nuevo record personal
   */
  async notifyPersonalRecord(userId: string, exerciseName: string, value: number, recordType: 'weight' | 'volume') {
    const metric = recordType === 'weight' ? `${value} kg` : `${value} kg`;
    
    await this.createNotification({
      userId,
      type: 'record',
      title: '💪 ¡Nuevo Record Personal!',
      body: `${exerciseName}: ${metric}`,
      actionUrl: '/records',
      data: { exerciseName, value, recordType },
    });
  }

  /**
   * Notificación por challenge recibido
   */
  async notifyChallengeReceived(userId: string, challengerName: string, challengeId: string) {
    await this.createNotification({
      userId,
      type: 'challenge',
      title: '⚔️ Nuevo Reto',
      body: `${challengerName} te ha retado`,
      actionUrl: `/challenges/${challengeId}`,
      data: { challengeId, challengerName },
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    });
  }

  /**
   * Notificación por seguidor nuevo
   */
  async notifyNewFollower(userId: string, followerName: string, followerId: string) {
    await this.createNotification({
      userId,
      type: 'social',
      title: '👥 Nuevo Seguidor',
      body: `${followerName} comenzó a seguirte`,
      actionUrl: `/profile/${followerId}`,
      data: { followerId, followerName },
    });
  }

  /**
   * Recordatorio de entrenamiento
   */
  async notifyWorkoutReminder(userId: string) {
    await this.createNotification({
      userId,
      type: 'reminder',
      title: '💪 Hora de Entrenar',
      body: '¿Listo para tu próximo entrenamiento?',
      actionUrl: '/workouts',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
    });
  }
}

export const notificationService = new NotificationService();
