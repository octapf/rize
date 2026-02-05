import { User } from '@/models/User';
import { ConflictError, UnauthorizedError } from '@/utils/errors';
import { generateAccessToken, generateRefreshToken, verifyToken } from '@/utils/jwt';
import { logger } from '@/utils/logger';

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  emailOrUsername: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    xp: number;
    level: number;
  };
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  /**
   * Register a new user
   * @throws ConflictError if email or username already exists
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const { email, username, password } = data;

    logger.info(`Registration attempt for email: ${email}, username: ${username}`);

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictError('El email ya está registrado');
      }
      throw new ConflictError('El usuario ya está en uso');
    }

    // Create new user
    const user = await User.create({
      email,
      username,
      password, // Will be hashed by pre-save hook
    });

    logger.info(`New user registered: ${user.email}`);

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        avatar: user.avatar?.url,
        xp: user.xp,
        level: user.level,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login an existing user
   * @throws UnauthorizedError if credentials are invalid
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const { emailOrUsername, password } = data;

    logger.info(`Login attempt for: ${emailOrUsername}`);

    // Find user by email or username (need to select password explicitly)
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select('+password');

    if (!user) {
      logger.warn(`Login failed: User not found for ${emailOrUsername}`);
      throw new UnauthorizedError('Credenciales inválidas');
    }

    logger.info(`User found: ${user.email}, has password: ${!!user.password}`);

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    logger.info(`Password validation result: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for ${user.email}`);
      throw new UnauthorizedError('Credenciales inválidas');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        avatar: user.avatar?.url,
        xp: user.xp,
        level: user.level,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token using refresh token
   * @throws UnauthorizedError if refresh token is invalid
   */
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = verifyToken(refreshToken, 'refresh');
      const userId = payload.userId;

      // Verify user still exists
      const user = await User.findById(userId);
      if (!user) {
        throw new UnauthorizedError('Usuario no encontrado');
      }

      // Generate new access token
      const accessToken = generateAccessToken(userId);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedError('Token de refresco inválido');
    }
  }

  /**
   * Change user password
   * @throws UnauthorizedError if current password is incorrect
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Usuario no encontrado');
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Contraseña actual incorrecta');
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);
  }
}

export const authService = new AuthService();
