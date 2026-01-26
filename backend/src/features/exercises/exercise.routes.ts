import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/middleware/validator';
import { authenticate } from '@/middleware/auth';
import { getExercisesQuerySchema, createExerciseSchema, updateExerciseSchema } from './exercise.validation';
import {
  getExercises,
  getExerciseById,
  getExercisesByCategory,
  createCustomExercise,
  updateCustomExercise,
  deleteCustomExercise,
  getUserCustomExercises,
} from './exercise.controller';

const router = Router();

// Rutas públicas - no requieren autenticación (pero pasamos el user si está disponible)
router.get('/', validate(z.object({ query: getExercisesQuerySchema })), getExercises);
router.get('/category/:category', getExercisesByCategory);
router.get('/:id', getExerciseById);

// Rutas protegidas - requieren autenticación
router.post(
  '/custom',
  authenticate,
  validate(z.object({ body: createExerciseSchema })),
  createCustomExercise
);

router.get('/custom/my', authenticate, getUserCustomExercises);

router.patch(
  '/custom/:id',
  authenticate,
  validate(z.object({ body: updateExerciseSchema })),
  updateCustomExercise
);

router.delete('/custom/:id', authenticate, deleteCustomExercise);

export default router;
