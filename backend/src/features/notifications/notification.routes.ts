import { Router } from 'express';
import { authenticate } from '@/middleware/auth';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  getUnreadCount,
} from './notification.controller';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// GET /api/v1/notifications - Obtener notificaciones
router.get('/', getNotifications);

// GET /api/v1/notifications/unread-count - Contar no leídas
router.get('/unread-count', getUnreadCount);

// PUT /api/v1/notifications/:id/read - Marcar como leída
router.put('/:id/read', markAsRead);

// PUT /api/v1/notifications/read-all - Marcar todas como leídas
router.put('/read-all', markAllAsRead);

// DELETE /api/v1/notifications/:id - Eliminar notificación
router.delete('/:id', deleteNotification);

// DELETE /api/v1/notifications - Eliminar todas
router.delete('/', deleteAllNotifications);

export default router;
