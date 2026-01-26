import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '@/middleware/auth';
import { validate } from '@/middleware/validator';
import {
  createWorkoutSchema,
  updateWorkoutSchema,
  getWorkoutsQuerySchema,
  deleteWorkoutSchema,
} from './workout.validation';
import {
  createWorkout,
  getWorkouts,
  getWorkoutStats,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from './workout.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /workouts/stats - Get workout statistics
router.get('/stats', getWorkoutStats);

// GET /workouts - Get all user workouts
router.get('/', validate(z.object({ query: getWorkoutsQuerySchema })), getWorkouts);

// POST /workouts - Create new workout
router.post('/', validate(z.object({ body: createWorkoutSchema })), createWorkout);

// GET /workouts/:id - Get workout by ID
router.get('/:id', validate(z.object({ params: deleteWorkoutSchema })), getWorkoutById);

// PATCH /workouts/:id - Update workout
router.patch(
  '/:id',
  validate(z.object({ params: deleteWorkoutSchema, body: updateWorkoutSchema })),
  updateWorkout
);

// DELETE /workouts/:id - Delete workout
router.delete('/:id', validate(z.object({ params: deleteWorkoutSchema })), deleteWorkout);

export default router;
