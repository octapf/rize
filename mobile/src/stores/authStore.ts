import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';
import { authApi, AuthResponse, UserResponse } from '@/services/api/auth.api';
import { apiClient } from '@/services/api/client';

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
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (data: { email: string; username: string; password: string; name?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (emailOrUsername, password) => {
    set({ isLoading: true });
    try {
      const data = await authApi.login({ emailOrUsername, password });
      await get().setAuth(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (registerData) => {
    set({ isLoading: true });
    try {
      const { name, ...apiData } = registerData;
      const data = await authApi.register(apiData);
      await get().setAuth(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setAuth: async (data: AuthResponse) => {
    await storage.set('accessToken', data.accessToken);
    await storage.set('refreshToken', data.refreshToken);
    await storage.set('user', JSON.stringify(data.user));
    
    // Set token immediately in API client to avoid race conditions
    apiClient.setAuthToken(data.accessToken);

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
        
        // Restore token in API client to avoid 401 errors on reload
        apiClient.setAuthToken(accessToken);
        
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
