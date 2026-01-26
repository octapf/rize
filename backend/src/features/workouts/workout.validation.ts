import { z } from 'zod';

/**
 * Validation schemas for Workout feature
 */

export const createWorkoutSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    date: z.string().datetime().optional(),
    duration: z.number().int().positive().optional(),
    exercises: z.array(
      z.object({
        exerciseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid exercise ID'),
        sets: z.array(
          z.object({
            reps: z.number().int().positive().optional(),
            weight: z.number().positive().optional(),
            duration: z.number().int().positive().optional(),
            distance: z.number().positive().optional(),
            completed: z.boolean().default(false),
          })
        ).min(1, 'At least one set required'),
        notes: z.string().max(500).optional(),
      })
    ).min(1, 'At least one exercise required'),
    notes: z.string().max(1000).optional(),
    visibility: z.enum(['private', 'friends', 'public']).default('private'),
  }),
});

export const updateWorkoutSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid workout ID'),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    duration: z.number().int().positive().optional(),
    exercises: z.array(
      z.object({
        exerciseId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        sets: z.array(
          z.object({
            reps: z.number().int().positive().optional(),
            weight: z.number().positive().optional(),
            duration: z.number().int().positive().optional(),
            distance: z.number().positive().optional(),
            completed: z.boolean().optional(),
          })
        ),
        notes: z.string().max(500).optional(),
      })
    ).optional(),
    notes: z.string().max(1000).optional(),
    visibility: z.enum(['private', 'friends', 'public']).optional(),
  }),
});

export const getWorkoutsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    exerciseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  }),
});

export const deleteWorkoutSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid workout ID'),
  }),
});

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>['body'];
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>['body'];
export type GetWorkoutsQuery = z.infer<typeof getWorkoutsQuerySchema>['query'];
