import type { Request, Response } from 'express';
import { achievementsService } from './achievements.service';
import { asyncHandler } from '@/utils/asyncHandler';

export const getAllAchievements = asyncHandler(async (req: Request, res: Response) => {
  const achievements = await achievementsService.getAllAchievements();

  res.json({
    success: true,
    data: achievements,
  });
});

export const getUserAchievements = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const data = await achievementsService.getUserAchievements(userId);

  res.json({
    success: true,
    data,
  });
});

export const checkAchievements = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const newlyUnlocked = await achievementsService.checkAchievements(userId);

  res.json({
    success: true,
    data: newlyUnlocked,
  });
});
