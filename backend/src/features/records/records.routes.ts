import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  getUserRecords,
  getExerciseRecords,
  getRecentRecords,
} from './records.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get all user records (grouped by exercise)
router.get('/', getUserRecords);

// Get recent records (last N days)
router.get('/recent', getRecentRecords);

// Get records for specific exercise
router.get('/exercise/:exerciseId', getExerciseRecords);

export default router;
