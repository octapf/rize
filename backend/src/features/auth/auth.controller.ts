import { Request, Response } from 'express';
import { authService } from './auth.service';
import { asyncHandler } from '@/utils/asyncHandler';
import {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
  ChangePasswordInput,
} from './auth.validation';

export class AuthController {
  /**
   * POST /api/v1/auth/register
   * Register a new user
   */
  register = asyncHandler(async (req: Request, res: Response) => {
    const data: RegisterInput = req.body;
    const result = await authService.register(data);

    res.status(201).json({
      success: true,
      data: result,
    });
  });

  /**
   * POST /api/v1/auth/login
   * Login an existing user
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const data: LoginInput = req.body;
    const result = await authService.login(data);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  /**
   * POST /api/v1/auth/refresh
   * Refresh access token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken }: RefreshTokenInput = req.body;
    const result = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  /**
   * POST /api/v1/auth/change-password
   * Change user password (requires authentication)
   */
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword }: ChangePasswordInput = req.body;
    const userId = req.user!._id.toString(); // Set by auth middleware

    await authService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Contraseña actualizada correctamente',
    });
  });

  /**
   * GET /api/v1/auth/me
   * Get current user (requires authentication)
   */
  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!; // Set by auth middleware

    res.status(200).json({
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        xp: user.xp,
        level: user.level,
        stats: user.stats,
        isPremium: user.isPremium,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  });
}

export const authController = new AuthController();
