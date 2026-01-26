import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const ACCESS_SECRET = env.JWT_SECRET;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'access' },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string): { userId: string } => {
  return jwt.verify(token, ACCESS_SECRET) as { userId: string };
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  return jwt.verify(token, REFRESH_SECRET) as { userId: string };
};

// Alias for compatibility
export const verifyToken = (token: string, type: 'access' | 'refresh'): { userId: string } => {
  const secret = type === 'access' ? ACCESS_SECRET : REFRESH_SECRET;
  return jwt.verify(token, secret) as { userId: string };
};
