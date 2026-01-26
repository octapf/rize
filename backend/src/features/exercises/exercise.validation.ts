import { z } from 'zod';

export const getExercisesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  category: z.enum(['push', 'pull', 'legs', 'core', 'skills']).optional(),
  difficulty: z.coerce.number().min(0.5).max(10).optional(),
  search: z.string().max(100).optional(),
});

export type GetExercisesQuery = z.infer<typeof getExercisesQuerySchema>;
