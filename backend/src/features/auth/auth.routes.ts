import { Router } from 'express';
import { z } from 'zod';
import { authController } from './auth.controller';
import { validate } from '@/middleware/validator';
import { authMiddleware } from '@/middleware/auth';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
} from './auth.validation';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validate(z.object({ body: registerSchema })), authController.register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validate(z.object({ body: loginSchema })), authController.login);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', validate(z.object({ body: refreshTokenSchema })), authController.refreshToken);

/**
 * @route   POST /api/v1/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post(
  '/change-password',
  authMiddleware,
  validate(z.object({ body: changePasswordSchema })),
  authController.changePassword
);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;
