import { apiClient } from './client';

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

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  xp: number;
  level: number;
  stats: {
    totalWorkouts: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    weeklyWorkouts: number;
    monthlyWorkouts: number;
  };
  isPremium: boolean;
  preferences: {
    units: 'metric' | 'imperial';
    language: 'es' | 'en';
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      workoutReminders: boolean;
      achievements: boolean;
      social: boolean;
    };
  };
  createdAt: string;
}

export const authApi = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      '/auth/login',
      data
    );
    return response.data.data;
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get<{ success: boolean; data: UserResponse }>('/auth/me');
    return response.data.data;
  },

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },
};
