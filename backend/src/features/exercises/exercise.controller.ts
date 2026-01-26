import type { Request, Response } from 'express';
import { exerciseService } from './exercise.service';
import { asyncHandler } from '@/utils/asyncHandler';
import type { GetExercisesQuery } from './exercise.validation';

export const getExercises = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as GetExercisesQuery;
  const result = await exerciseService.getExercises(query);

  res.json({
    success: true,
    data: result.exercises,
    pagination: {
      total: result.total,
      page: result.page,
      pages: result.pages,
    },
  });
});

export const getExerciseById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const exercise = await exerciseService.getExerciseById(id);

  if (!exercise) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'EXERCISE_NOT_FOUND',
        message: 'Ejercicio no encontrado',
      },
    });
  }

  return res.json({
    success: true,
    data: exercise,
  });
});

export const getExercisesByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.params;
    const exercises = await exerciseService.getExercisesByCategory(category);

    res.json({
      success: true,
      data: exercises,
    });
  }
);
