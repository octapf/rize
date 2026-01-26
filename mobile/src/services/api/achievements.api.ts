import { apiClient } from './client';

export interface Achievement {
  _id: string;
  key: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  icon: string;
  category: 'workout' | 'streak' | 'social' | 'exercise' | 'xp';
  requirement: number;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked?: boolean;
  unlockedAt?: string;
  progress?: number;
  percentage?: number;
}

export interface UserAchievements {
  achievements: Achievement[];
  totalUnlocked: number;
  totalAchievements: number;
}

export const achievementsApi = {
  getAll: async (): Promise<{ success: boolean; data: Achievement[] }> => {
    const response = await apiClient.get('/achievements/all');
    return response.data;
  },

  getUserAchievements: async (): Promise<{
    success: boolean;
    data: UserAchievements;
  }> => {
    const response = await apiClient.get('/achievements/user');
    return response.data;
  },

  checkAchievements: async (): Promise<{
    success: boolean;
    data: Achievement[];
  }> => {
    const response = await apiClient.post('/achievements/check', {});
    return response.data;
  },
};
