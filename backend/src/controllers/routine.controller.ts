import { Request, Response } from 'express';
import { z } from 'zod';
import routineService from '../services/routine.service';
import { asyncHandler } from '../middleware/async';

const createRoutineSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  workouts: z.array(z.string()),
  schedule: z
    .array(
      z.object({
        day: z.number().min(0).max(6),
        workoutIndex: z.number().min(0),
      })
    )
    .optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  goals: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

const updateRoutineSchema = createRoutineSchema.partial();

export const createRoutine = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createRoutineSchema.parse(req.body);
  const routine = await routineService.createRoutine(req.user!._id.toString(), validatedData);

  res.status(201).json({
    success: true,
    data: routine,
  });
});

export const getUserRoutines = asyncHandler(async (req: Request, res: Response) => {
  const routines = await routineService.getUserRoutines(req.user!._id.toString());

  res.json({
    success: true,
    data: { routines },
  });
});

export const getCommunityRoutines = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = parseInt(req.query.skip as string) || 0;

  const routines = await routineService.getCommunityRoutines(limit, skip);

  res.json({
    success: true,
    data: { routines },
  });
});

export const getRoutineById = asyncHandler(async (req: Request, res: Response) => {
  const routine = await routineService.getRoutineById(
    req.params.id,
    req.user?._id.toString()
  );

  res.json({
    success: true,
    data: routine,
  });
});

export const updateRoutine = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateRoutineSchema.parse(req.body);
  const routine = await routineService.updateRoutine(
    req.params.id,
    req.user!._id.toString(),
    validatedData
  );

  res.json({
    success: true,
    data: routine,
  });
});

export const deleteRoutine = asyncHandler(async (req: Request, res: Response) => {
  const result = await routineService.deleteRoutine(req.params.id, req.user!._id.toString());

  res.json({
    success: true,
    data: result,
  });
});

export const duplicateRoutine = asyncHandler(async (req: Request, res: Response) => {
  const routine = await routineService.duplicateRoutine(
    req.params.id,
    req.user!._id.toString()
  );

  res.status(201).json({
    success: true,
    data: routine,
  });
});

export const searchRoutines = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const limit = parseInt(req.query.limit as string) || 20;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Query parameter is required',
    });
  }

  const routines = await routineService.searchRoutines(query, limit);

  res.json({
    success: true,
    data: { routines },
  });
});

export const getRoutinesByDifficulty = asyncHandler(async (req: Request, res: Response) => {
  const difficulty = req.params.difficulty as 'beginner' | 'intermediate' | 'advanced';
  const limit = parseInt(req.query.limit as string) || 20;

  const routines = await routineService.getRoutinesByDifficulty(difficulty, limit);

  res.json({
    success: true,
    data: { routines },
  });
});

export const getActiveRoutine = asyncHandler(async (req: Request, res: Response) => {
  const routine = await routineService.getActiveRoutine(req.user!._id.toString());

  res.json({
    success: true,
    data: routine,
  });
});

export const setActiveRoutine = asyncHandler(async (req: Request, res: Response) => {
  const routine = await routineService.setActiveRoutine(
    req.user!._id.toString(),
    req.params.id
  );

  res.json({
    success: true,
    data: routine,
  });
});

export const clearActiveRoutine = asyncHandler(async (req: Request, res: Response) => {
  const result = await routineService.clearActiveRoutine(req.user!._id.toString());

  res.json({
    success: true,
    data: result,
  });
});
