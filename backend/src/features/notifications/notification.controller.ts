import { Request, Response } from 'express';
import { notificationService } from './notification.service';
import { asyncHandler } from '@/utils/asyncHandler';

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { read, type, limit, skip } = req.query;

  const result = await notificationService.getUserNotifications(userId, {
    read: read !== undefined ? read === 'true' : undefined,
    type: type as any,
    limit: limit ? parseInt(limit as string) : undefined,
    skip: skip ? parseInt(skip as string) : undefined,
  });

  res.json({
    success: true,
    data: result.notifications,
    meta: {
      unreadCount: result.unreadCount,
      total: result.notifications.length,
    },
  });
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  const notification = await notificationService.markAsRead(id, userId);

  res.json({
    success: true,
    data: notification,
  });
});

export const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  await notificationService.markAllAsRead(userId);

  res.json({
    success: true,
    message: 'All notifications marked as read',
  });
});

export const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  await notificationService.deleteNotification(id, userId);

  res.json({
    success: true,
    message: 'Notification deleted',
  });
});

export const deleteAllNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  await notificationService.deleteAllNotifications(userId);

  res.json({
    success: true,
    message: 'All notifications deleted',
  });
});

export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const result = await notificationService.getUserNotifications(userId, {
    read: false,
    limit: 0,
  });

  res.json({
    success: true,
    data: {
      count: result.unreadCount,
    },
  });
});
