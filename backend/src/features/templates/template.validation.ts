import { z } from 'zod';

export const createTemplateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    description: z.string().max(500).optional(),
    category: z.enum(['push', 'pull', 'legs', 'core', 'upper', 'lower', 'full-body', 'custom']).optional(),
    exercises: z.array(
      z.object({
        exerciseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid exercise ID'),
        sets: z.array(
          z.object({
            reps: z.number().int().positive().optional(),
            weight: z.number().positive().optional(),
            duration: z.number().int().positive().optional(),
            distance: z.number().positive().optional(),
          })
        ).min(1, 'At least one set required'),
        notes: z.string().max(500).optional(),
      })
    ).min(1, 'At least one exercise required'),
    isPublic: z.boolean().default(false),
  }),
});

export const updateTemplateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid template ID'),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
    category: z.enum(['push', 'pull', 'legs', 'core', 'upper', 'lower', 'full-body', 'custom']).optional(),
    exercises: z.array(
      z.object({
        exerciseId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        sets: z.array(
          z.object({
            reps: z.number().int().positive().optional(),
            weight: z.number().positive().optional(),
            duration: z.number().int().positive().optional(),
            distance: z.number().positive().optional(),
          })
        ),
        notes: z.string().max(500).optional(),
      })
    ).optional(),
    isPublic: z.boolean().optional(),
  }),
});

export const getTemplatesQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    category: z.enum(['push', 'pull', 'legs', 'core', 'upper', 'lower', 'full-body', 'custom']).optional(),
    isPublic: z.string().transform(val => val === 'true').optional(),
  }),
});

export const createFromWorkoutSchema = z.object({
  params: z.object({
    workoutId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid workout ID'),
  }),
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    category: z.enum(['push', 'pull', 'legs', 'core', 'upper', 'lower', 'full-body', 'custom']).optional(),
    isPublic: z.boolean().default(false),
  }),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>['body'];
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>['body'];
export type GetTemplatesQuery = z.infer<typeof getTemplatesQuerySchema>['query'];
export type CreateFromWorkoutInput = z.infer<typeof createFromWorkoutSchema>['body'];
