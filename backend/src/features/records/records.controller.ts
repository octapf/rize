import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { recordsService } from './records.service';

export const getUserRecords = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const records = await recordsService.getUserRecords(userId);

  res.status(200).json({
    success: true,
    data: records,
  });
});

export const getExerciseRecords = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { exerciseId } = req.params;

  const records = await recordsService.getExerciseRecords(exerciseId, userId);

  res.status(200).json({
    success: true,
    data: records,
  });
});

export const getRecentRecords = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const days = Number(req.query.days) || 30;

  const records = await recordsService.getRecentRecords(userId, days);

  res.status(200).json({
    success: true,
    data: records,
  });
});
