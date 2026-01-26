import type { Request, Response } from 'express';
import { exerciseService } from './exercise.service';
import { asyncHandler } from '@/utils/asyncHandler';
import type { GetExercisesQuery, CreateExerciseInput, UpdateExerciseInput } from './exercise.validation';

export const getExercises = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as GetExercisesQuery;
  const userId = req.user?.id;
  const result = await exerciseService.getExercises(query, userId);

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
    const userId = req.user?.id;
    const exercises = await exerciseService.getExercisesByCategory(category, userId);

    res.json({
      success: true,
      data: exercises,
    });
  }
);

export const createCustomExercise = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const data = req.body as CreateExerciseInput;

  const exercise = await exerciseService.createCustomExercise(userId, data);

  res.status(201).json({
    success: true,
    data: exercise,
  });
});

export const updateCustomExercise = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const data = req.body as UpdateExerciseInput;

  const exercise = await exerciseService.updateCustomExercise(id, userId, data);

  if (!exercise) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'EXERCISE_NOT_FOUND',
        message: 'Ejercicio no encontrado o no tienes permiso para editarlo',
      },
    });
  }

  return res.json({
    success: true,
    data: exercise,
  });
});

export const deleteCustomExercise = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const deleted = await exerciseService.deleteCustomExercise(id, userId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'EXERCISE_NOT_FOUND',
        message: 'Ejercicio no encontrado o no tienes permiso para eliminarlo',
      },
    });
  }

  return res.json({
    success: true,
    data: { deleted: true },
  });
});

export const getUserCustomExercises = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const exercises = await exerciseService.getUserCustomExercises(userId);

  res.json({
    success: true,
    data: exercises,
  });
});
