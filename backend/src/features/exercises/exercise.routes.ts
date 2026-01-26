import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/middleware/validator';
import { getExercisesQuerySchema } from './exercise.validation';
import {
  getExercises,
  getExerciseById,
  getExercisesByCategory,
} from './exercise.controller';

const router = Router();

// Rutas públicas - no requieren autenticación
router.get('/', validate(z.object({ query: getExercisesQuerySchema })), getExercises);
router.get('/category/:category', getExercisesByCategory);
router.get('/:id', getExerciseById);

export default router;
