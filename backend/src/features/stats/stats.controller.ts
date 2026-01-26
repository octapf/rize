import type { Request, Response } from 'express';
import { statsService } from './stats.service';
import { asyncHandler } from '@/utils/asyncHandler';

/**
 * @route   GET /api/v1/stats/dashboard
 * @desc    Get comprehensive dashboard statistics
 * @access  Private
 */
export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const stats = await statsService.getDashboardStats(userId);

  res.json({
    success: true,
    data: stats,
  });
});

/**
 * @route   GET /api/v1/stats/exercise/:exerciseId
 * @desc    Get exercise-specific progress
 * @access  Private
 */
export const getExerciseProgress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const exerciseId = req.params.exerciseId;

  const progress = await statsService.getExerciseProgress(userId, exerciseId);

  res.json({
    success: true,
    data: progress,
  });
});

/**
 * @route   GET /api/v1/stats/streak
 * @desc    Get current workout streak
 * @access  Private
 */
export const getStreak = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const streak = await statsService.getCurrentStreak(userId);

  res.json({
    success: true,
    data: { streak },
  });
});

/**
 * @route   GET /api/v1/stats/leaderboard
 * @desc    Get leaderboard
 * @access  Public
 */
export const getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

  const leaderboard = await statsService.getLeaderboard(limit);

  res.json({
    success: true,
    data: leaderboard,
  });
});
