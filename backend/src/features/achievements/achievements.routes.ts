import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  getAllAchievements,
  getUserAchievements,
  checkAchievements,
} from './achievements.controller';

const router = Router();

// Public routes
router.get('/all', getAllAchievements);

// Protected routes
router.use(authMiddleware);

router.get('/user', getUserAchievements);
router.post('/check', checkAchievements);

export default router;
