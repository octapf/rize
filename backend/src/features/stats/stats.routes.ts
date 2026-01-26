import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  getDashboard,
  getExerciseProgress,
  getStreak,
  getLeaderboard,
} from './stats.controller';

const router = Router();

// Public routes
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.use(authMiddleware);

router.get('/dashboard', getDashboard);
router.get('/exercise/:exerciseId', getExerciseProgress);
router.get('/streak', getStreak);

export default router;
