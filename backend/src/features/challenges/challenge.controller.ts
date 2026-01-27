import { Request, Response } from 'express';
import { challengeService } from './challenge.service';
import { asyncHandler } from '@/utils/asyncHandler';
import { z } from 'zod';

const createChallengeSchema = z.object({
  challengedId: z.string(),
  type: z.enum(['workout_count', 'volume', 'specific_exercise', 'streak']),
  targetValue: z.number().positive(),
  unit: z.string().optional(),
  exerciseId: z.string().optional(),
  duration: z.number().min(1).max(90),
});

export const createChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const data = createChallengeSchema.parse(req.body);

  const challenge = await challengeService.createChallenge({
    challengerId: userId,
    ...data,
  });

  res.status(201).json({
    success: true,
    data: challenge,
  });
});

export const acceptChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  const challenge = await challengeService.acceptChallenge(id, userId);

  res.json({
    success: true,
    data: challenge,
  });
});

export const rejectChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { id } = req.params;

  const challenge = await challengeService.rejectChallenge(id, userId);

  res.json({
    success: true,
    data: challenge,
  });
});

export const getUserChallenges = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { status } = req.query;

  const challenges = await challengeService.getUserChallenges(
    userId,
    status as any
  );

  res.json({
    success: true,
    data: challenges,
  });
});

export const getChallenge = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const challenge = await challengeService.getChallenge(id);

  res.json({
    success: true,
    data: challenge,
  });
});

export const updateChallengeProgress = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const challenge = await challengeService.updateChallengeProgress(id);

  res.json({
    success: true,
    data: challenge,
  });
});
