import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { validate } from '@/middleware/validator';
import {
  createRoutineSchema,
  updateRoutineSchema,
  getRoutinesQuerySchema,
} from './routine.validation';
import {
  getRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getActiveRoutine,
  getTodaysWorkout,
} from './routine.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get today's workout from active routine
router.get('/today', getTodaysWorkout);

// Get active routine
router.get('/active', getActiveRoutine);

// Get all routines
router.get('/', validate(getRoutinesQuerySchema), getRoutines);

// Get routine by ID
router.get('/:id', getRoutineById);

// Create routine
router.post('/', validate(createRoutineSchema), createRoutine);

// Update routine
router.patch('/:id', validate(updateRoutineSchema), updateRoutine);

// Delete routine
router.delete('/:id', deleteRoutine);

export default router;
