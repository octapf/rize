import type { Request, Response } from 'express';
import { workoutService } from './workout.service';
import { asyncHandler } from '@/utils/asyncHandler';
import type { CreateWorkoutInput, UpdateWorkoutInput, GetWorkoutsQuery, CompleteSetInput, FinishWorkoutInput } from './workout.validation';

/**
 * @route   POST /api/v1/workouts
 * @desc    Create new workout
 * @access  Private
 */
export const createWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const data = req.body as CreateWorkoutInput;

  const workout = await workoutService.createWorkout(userId, data);

  res.status(201).json({
    success: true,
    data: workout,
  });
});

/**
 * @route   POST /api/v1/workouts/from-template/:templateId
 * @desc    Create workout from template
 * @access  Private
 */
export const createFromTemplate = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { templateId } = req.params;
  const { name } = req.body;

  const workout = await workoutService.createFromTemplate(userId, templateId, name);

  res.status(201).json({
    success: true,
    data: workout,
  });
});

/**
 * @route   GET /api/v1/workouts
 * @desc    Get user workouts with filters
 * @access  Private
 */
export const getWorkouts = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const query = req.query as unknown as GetWorkoutsQuery;

  const result = await workoutService.getUserWorkouts(userId, query);

  res.json({
    success: true,
    data: result.workouts,
    pagination: {
      total: result.total,
      page: result.page,
      pages: result.pages,
    },
  });
});

/**
 * @route   GET /api/v1/workouts/stats
 * @desc    Get workout statistics
 * @access  Private
 */
export const getWorkoutStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const days = req.query.days ? parseInt(req.query.days as string) : 30;

  const stats = await workoutService.getWorkoutStats(userId, days);

  res.json({
    success: true,
    data: stats,
  });
});

/**
 * @route   GET /api/v1/workouts/:id
 * @desc    Get workout by ID
 * @access  Private
 */
export const getWorkoutById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;

  const workout = await workoutService.getWorkoutById(workoutId, userId);

  res.json({
    success: true,
    data: workout,
  });
});

/**
 * @route   PATCH /api/v1/workouts/:id
 * @desc    Update workout
 * @access  Private
 */
export const updateWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;
  const data = req.body as UpdateWorkoutInput;

  const workout = await workoutService.updateWorkout(workoutId, userId, data);

  res.json({
    success: true,
    data: workout,
  });
});

/**
 * @route   DELETE /api/v1/workouts/:id
 * @desc    Delete workout (soft delete)
 * @access  Private
 */
export const deleteWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;

  await workoutService.deleteWorkout(workoutId, userId);

  res.json({
    success: true,
    message: 'Workout deleted successfully',
  });
});

/**
 * @route   POST /api/v1/workouts/:id/start
 * @desc    Start workout tracking
 * @access  Private
 */
export const startWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;

  const workout = await workoutService.startWorkout(workoutId, userId);

  res.json({
    success: true,
    data: workout,
  });
});

/**
 * @route   PATCH /api/v1/workouts/:id/set
 * @desc    Complete/uncomplete a set
 * @access  Private
 */
export const completeSet = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;
  const data = req.body as CompleteSetInput;

  const workout = await workoutService.completeSet(workoutId, userId, data);

  res.json({
    success: true,
    data: workout,
  });
});

/**
 * @route   POST /api/v1/workouts/:id/finish
 * @desc    Finish workout
 * @access  Private
 */
export const finishWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const workoutId = req.params.id;
  const data = req.body as FinishWorkoutInput;

  const result = await workoutService.finishWorkout(workoutId, userId, data);

  res.json({
    success: true,
    data: result.workout,
    newRecords: result.newRecords,
  });
});
