import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { asyncHandler } from '@/utils/asyncHandler';
import { z } from 'zod';

// Validation schemas
const updateProfileSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
});

const searchUsersSchema = z.object({
  q: z.string().min(1),
  limit: z.string().optional(),
});

class UserController {
  /**
   * @route   GET /api/v1/users/:userId/profile
   * @desc    Get public profile for a user
   * @access  Private
   */
  getPublicProfile = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profile = await userService.getPublicProfile(userId);
    res.json({ success: true, data: profile });
  });

  /**
   * @route   GET /api/v1/users/me/stats
   * @desc    Get current user's stats
   * @access  Private
   */
  getMyStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await userService.getUserStats(req.user!.id);
    res.json({ success: true, data: stats });
  });

  /**
   * @route   GET /api/v1/users/search
   * @desc    Search users by username
   * @access  Private
   */
  searchUsers = asyncHandler(async (req: Request, res: Response) => {
    const { q, limit } = searchUsersSchema.parse(req.query);
    const users = await userService.searchUsers(
      q,
      req.user!.id,
      limit ? parseInt(limit) : 20
    );
    res.json({ success: true, data: { users } });
  });

  /**
   * @route   PUT /api/v1/users/me/profile
   * @desc    Update current user's profile
   * @access  Private
   */
  updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const updates = updateProfileSchema.parse(req.body);
    const user = await userService.updateProfile(req.user!.id, updates);
    res.json({ success: true, data: { user } });
  });

  /**
   * @route   GET /api/v1/users/me/activity
   * @desc    Get current user's activity feed
   * @access  Private
   */
  getMyActivity = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const activities = await userService.getUserActivityFeed(
      req.user!.id,
      limit
    );
    res.json({ success: true, data: { activities } });
  });

  /**
   * @route   GET /api/v1/users/:userId/activity
   * @desc    Get user's public activity feed
   * @access  Private
   */
  getUserActivity = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const activities = await userService.getUserActivityFeed(userId, limit);
    res.json({ success: true, data: { activities } });
  });
}

export const userController = new UserController();
