import { apiClient } from './client';

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  age?: number;
  weight?: number;
  height?: number;
  targetWeight?: number;
  goal?: 'lose' | 'gain' | 'maintain';
  experience?: 'beginner' | 'intermediate' | 'advanced';
  isOnline?: boolean;
  lastSeen?: string;
  stats?: {
    totalWorkouts: number;
    totalVolume: number;
    streak: number;
    level: number;
    xp: number;
  };
  privacy?: {
    profilePublic: boolean;
    workoutsPublic: boolean;
    statsPublic: boolean;
  };
}

export interface UpdateUserDto {
  name?: string;
  username?: string;
  bio?: string;
  age?: number;
  weight?: number;
  height?: number;
  targetWeight?: number;
  goal?: 'lose' | 'gain' | 'maintain';
  experience?: 'beginner' | 'intermediate' | 'advanced';
  privacy?: {
    profilePublic?: boolean;
    workoutsPublic?: boolean;
    statsPublic?: boolean;
  };
}

export const usersApi = {
  // Get current user
  getMe: () =>
    apiClient.get<User>('/users/me'),

  // Update profile
  updateProfile: (data: UpdateUserDto) =>
    apiClient.put<User>('/users/me', data),

  // Upload avatar
  uploadAvatar: (file: any, onProgress?: (progress: number) => void) =>
    apiClient.uploadFile<{ url: string }>('/users/me/avatar', file, onProgress),

  // Get user by ID
  getUser: (id: string) =>
    apiClient.get<User>(`/users/${id}`),

  // Search users
  searchUsers: (query: string) =>
    apiClient.get<User[]>(`/users/search?q=${encodeURIComponent(query)}`),

  // Get user stats
  getUserStats: (userId: string) =>
    apiClient.get<{
      totalWorkouts: number;
      totalVolume: number;
      totalDuration: number;
      streak: number;
      achievements: number;
      level: number;
      xp: number;
    }>(`/users/${userId}/stats`),

  // Get user workouts
  getUserWorkouts: (userId: string, page = 1) =>
    apiClient.get<{ workouts: any[]; total: number }>(`/users/${userId}/workouts?page=${page}`),
};
