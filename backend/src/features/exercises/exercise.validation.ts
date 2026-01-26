import { z } from 'zod';

export const getExercisesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  category: z.enum(['push', 'pull', 'legs', 'core', 'skills', 'cardio', 'flexibility']).optional(),
  difficulty: z.coerce.number().min(0.5).max(10).optional(),
  search: z.string().max(100).optional(),
  type: z.enum(['reps', 'time', 'distance']).optional(),
});

export type GetExercisesQuery = z.infer<typeof getExercisesQuerySchema>;

export const createExerciseSchema = z.object({
  name: z.object({
    es: z.string().min(2).max(100),
    en: z.string().min(2).max(100),
  }),
  category: z.enum(['push', 'pull', 'legs', 'core', 'skills', 'cardio', 'flexibility']),
  difficulty: z.number().min(0.5).max(10),
  type: z.enum(['reps', 'time', 'distance']).default('reps'),
  unit: z.enum(['seconds', 'minutes', 'meters', 'kilometers', 'miles']).optional(),
  description: z.object({
    es: z.string().max(500),
    en: z.string().max(500),
  }).optional(),
}).refine(
  (data) => {
    if (data.type === 'time' && !data.unit) return false;
    if (data.type === 'distance' && !data.unit) return false;
    if (data.type === 'time' && data.unit && !['seconds', 'minutes'].includes(data.unit)) return false;
    if (data.type === 'distance' && data.unit && !['meters', 'kilometers', 'miles'].includes(data.unit)) return false;
    return true;
  },
  {
    message: 'Unit is required for time and distance exercises and must match the type',
  }
);

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;

export const updateExerciseSchema = createExerciseSchema.partial();

export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;

