import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  getTopByXP,
  getTopByWorkouts,
  getTopByVolume,
  getTopByStreak,
  getUserRanks,
  getFriendsLeaderboard,
} from './leaderboard.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Global leaderboards
router.get('/xp', getTopByXP);
router.get('/workouts', getTopByWorkouts);
router.get('/volume', getTopByVolume);
router.get('/streak', getTopByStreak);

// User-specific
router.get('/me/ranks', getUserRanks);
router.get('/friends', getFriendsLeaderboard);

export default router;
