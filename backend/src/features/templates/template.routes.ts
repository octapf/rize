import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/middleware/validator';
import { authenticate } from '@/middleware/auth';
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
router.get('/', authenticate, validate(z.object({ query: getTemplatesQuerySchema.shape.query })), getTemplates);
router.get('/:id', authenticate, getTemplateById);
router.post('/', authenticate, validate(createTemplateSchema), createTemplate);
router.post('/from-workout/:workoutId', authenticate, validate(createFromWorkoutSchema), createFromWorkout);
router.patch('/:id', authenticate, validate(updateTemplateSchema), updateTemplate);
router.delete('/:id', authenticate, deleteTemplate);

export default router;
