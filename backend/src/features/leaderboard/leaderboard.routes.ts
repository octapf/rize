import { Router } from 'express';
import { authenticate } from '@/middleware/auth';
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
router.use(authenticate);

// Global leaderboards
router.get('/xp', getTopByXP);
router.get('/workouts', getTopByWorkouts);
router.get('/volume', getTopByVolume);
router.get('/streak', getTopByStreak);

// User-specific
router.get('/me/ranks', getUserRanks);
router.get('/friends', getFriendsLeaderboard);

export default router;
