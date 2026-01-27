import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const dayScheduleSchema = z.object({
  monday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  tuesday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  wednesday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  thursday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  friday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  saturday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
  sunday: z.string().regex(objectIdRegex, 'Invalid template ID').optional(),
});

export const createRoutineSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Routine name must be at least 2 characters')
      .max(100, 'Routine name must be less than 100 characters'),
    description: z
      .string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    schedule: dayScheduleSchema,
    isActive: z.boolean().optional(),
  }),
});

export const updateRoutineSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Routine name must be at least 2 characters')
      .max(100, 'Routine name must be less than 100 characters')
      .optional(),
    description: z
      .string()
      .max(500, 'Description must be less than 500 characters')
      .optional(),
    schedule: dayScheduleSchema.optional(),
    isActive: z.boolean().optional(),
  }),
});

export const getRoutinesQuerySchema = z.object({
  query: z.object({
    isActive: z
      .string()
      .optional()
      .transform((val) => (val === 'true' ? true : val === 'false' ? false : undefined)),
  }),
});

export type CreateRoutineInput = z.infer<typeof createRoutineSchema>['body'];
export type UpdateRoutineInput = z.infer<typeof updateRoutineSchema>['body'];
export type GetRoutinesQuery = z.infer<typeof getRoutinesQuerySchema>['query'];
