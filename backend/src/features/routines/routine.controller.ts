import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { routineService } from './routine.service';
import { CreateRoutineInput, UpdateRoutineInput, GetRoutinesQuery } from './routine.validation';

export const getRoutines = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const query = req.query as unknown as GetRoutinesQuery;

  const routines = await routineService.getRoutines(userId, query);

  res.status(200).json({
    success: true,
    data: routines,
  });
});

export const getRoutineById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  const routine = await routineService.getRoutineById(id, userId);

  res.status(200).json({
    success: true,
    data: routine,
  });
});

export const createRoutine = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const data = req.body as CreateRoutineInput;

  const routine = await routineService.createRoutine(userId, data);

  res.status(201).json({
    success: true,
    data: routine,
  });
});

export const updateRoutine = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;
  const data = req.body as UpdateRoutineInput;

  const routine = await routineService.updateRoutine(id, userId, data);

  res.status(200).json({
    success: true,
    data: routine,
  });
});

export const deleteRoutine = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  await routineService.deleteRoutine(id, userId);

  res.status(200).json({
    success: true,
    message: 'Routine deleted successfully',
  });
});

export const getActiveRoutine = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const routine = await routineService.getActiveRoutine(userId);

  res.status(200).json({
    success: true,
    data: routine,
  });
});

export const getTodaysWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const workout = await routineService.getTodaysWorkout(userId);

  res.status(200).json({
    success: true,
    data: workout,
  });
});
