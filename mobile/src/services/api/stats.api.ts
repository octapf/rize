import { apiClient } from './client';

export interface DashboardStats {
  overall: {
    totalWorkouts: number;
    totalXP: number;
    totalDuration: number;
    avgDuration: number;
    totalSets: number;
  };
  weekly: {
    workouts: number;
    xpEarned: number;
    duration: number;
  };
  chart: Array<{
    date: string;
    count: number;
    xp: number;
    duration: number;
  }>;
  user: {
    xp: number;
    level: number;
    stats: any;
  };
}

export interface ExerciseProgress {
  history: Array<{
    date: string;
    sets: number;
    reps: number;
    avgWeight: number;
    maxWeight: number;
    volume: number;
  }>;
  personalRecords: {
    maxWeight: number;
    maxVolume: number;
    maxSets: number;
    maxReps: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  xp: number;
  level: number;
  totalWorkouts: number;
}

export const statsApi = {
  getDashboard: async (): Promise<{ success: boolean; data: DashboardStats }> => {
    const response = await apiClient.get('/stats/dashboard');
    return response.data;
  },

  getExerciseProgress: async (
    exerciseId: string
  ): Promise<{ success: boolean; data: ExerciseProgress }> => {
    const response = await apiClient.get(`/stats/exercise/${exerciseId}`);
    return response.data;
  },

  getStreak: async (): Promise<{ success: boolean; data: { streak: number } }> => {
    const response = await apiClient.get('/stats/streak');
    return response.data;
  },

  getLeaderboard: async (
    limit = 100
  ): Promise<{ success: boolean; data: LeaderboardEntry[] }> => {
    const response = await apiClient.get(`/stats/leaderboard?limit=${limit}`);
    return response.data;
  },
};
