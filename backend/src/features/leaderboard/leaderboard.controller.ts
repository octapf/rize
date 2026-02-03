import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { leaderboardService } from './leaderboard.service';

export const getTopByXP = asyncHandler(async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const leaderboard = await leaderboardService.getTopByXP(limit);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

export const getTopByWorkouts = asyncHandler(async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const leaderboard = await leaderboardService.getTopByWorkouts(limit);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

export const getTopByVolume = asyncHandler(async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const leaderboard = await leaderboardService.getTopByVolume(limit);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

export const getTopByStreak = asyncHandler(async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const leaderboard = await leaderboardService.getTopByStreak(limit);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

export const getUserRanks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const ranks = await leaderboardService.getUserRanks(userId);

  res.status(200).json({
    success: true,
    data: ranks,
  });
});

export const getFriendsLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const type = (req.query.type as 'xp' | 'workouts' | 'volume') || 'xp';

  const leaderboard = await leaderboardService.getFriendsLeaderboard(userId, type);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});
