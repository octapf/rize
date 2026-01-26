import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';
import { authApi, AuthResponse, UserResponse } from '@/services/api/auth.api';

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  xp: number;
  level: number;
  stats?: {
    totalWorkouts: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    weeklyWorkouts: number;
    monthlyWorkouts: number;
  };
  isPremium?: boolean;
  preferences?: {
    units: 'metric' | 'imperial';
    language: 'es' | 'en';
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      workoutReminders: boolean;
      achievements: boolean;
      social: boolean;
    };
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (data: AuthResponse) => void;
  setUser: (user: UserResponse) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (data: AuthResponse) => {
    await storage.set('accessToken', data.accessToken);
    await storage.set('refreshToken', data.refreshToken);
    await storage.set('user', JSON.stringify(data.user));
    
    set({
      user: data.user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser: async (userData: UserResponse) => {
    await storage.set('user', JSON.stringify(userData));
    set({ user: userData });
  },

  logout: async () => {
    await storage.delete('accessToken');
    await storage.delete('refreshToken');
    await storage.delete('user');
    
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initAuth: async () => {
    const userStr = await storage.getString('user');
    const accessToken = await storage.getString('accessToken');

    if (userStr && accessToken) {
      try {
        const user = JSON.parse(userStr) as User;
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
