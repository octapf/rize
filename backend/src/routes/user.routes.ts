import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get current user's stats
router.get('/me/stats', userController.getMyStats);

// Get current user's activity feed
router.get('/me/activity', userController.getMyActivity);

// Update current user's profile
router.put('/me/profile', userController.updateMyProfile);

// Search users
router.get('/search', userController.searchUsers);

// Get public profile for a user
router.get('/:userId/profile', userController.getPublicProfile);

// Get user's activity feed
router.get('/:userId/activity', userController.getUserActivity);

export default router;
