import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/middleware/validator';
import { authMiddleware } from '@/middleware/auth';
import {
  createTemplateSchema,
  updateTemplateSchema,
  getTemplatesQuerySchema,
  createFromWorkoutSchema,
} from './template.validation';
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  createFromWorkout,
  updateTemplate,
  deleteTemplate,
  getPublicTemplates,
} from './template.controller';

const router = Router();

// Public routes
router.get('/public', validate(z.object({ query: getTemplatesQuerySchema.shape.query })), getPublicTemplates);

// Protected routes
router.get('/', authMiddleware, validate(z.object({ query: getTemplatesQuerySchema.shape.query })), getTemplates);
router.get('/:id', authMiddleware, getTemplateById);
router.post('/', authMiddleware, validate(createTemplateSchema), createTemplate);
router.post('/from-workout/:workoutId', authMiddleware, validate(createFromWorkoutSchema), createFromWorkout);
router.patch('/:id', authMiddleware, validate(updateTemplateSchema), updateTemplate);
router.delete('/:id', authMiddleware, deleteTemplate);

export default router;
