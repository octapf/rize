import { apiClient } from './client';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name?: string;
  username: string;
  avatar?: string;
  xp?: number;
  level?: number;
  streak?: number;
  workoutCount?: number;
  totalVolume?: number;
  isCurrentUser?: boolean;
}

export interface UserRanks {
  xpRank: number;
  streakRank: number;
  workoutsRank: number;
  totalUsers: number;
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardEntry[];
}

export interface UserRanksResponse {
  success: boolean;
  data: UserRanks;
}

export const leaderboardApi = {
  async getTopByXP(limit: number = 50): Promise<LeaderboardResponse> {
    const response = await apiClient.get(`/leaderboard/xp?limit=${limit}`);
    return response.data;
  },

  async getTopByWorkouts(limit: number = 50): Promise<LeaderboardResponse> {
    const response = await apiClient.get(`/leaderboard/workouts?limit=${limit}`);
    return response.data;
  },

  async getTopByVolume(limit: number = 50): Promise<LeaderboardResponse> {
    const response = await apiClient.get(`/leaderboard/volume?limit=${limit}`);
    return response.data;
  },

  async getTopByStreak(limit: number = 50): Promise<LeaderboardResponse> {
    const response = await apiClient.get(`/leaderboard/streak?limit=${limit}`);
    return response.data;
  },

  async getUserRanks(): Promise<UserRanksResponse> {
    const response = await apiClient.get('/leaderboard/me/ranks');
    return response.data;
  },

  async getFriendsLeaderboard(
    type: 'xp' | 'workouts' | 'volume' = 'xp'
  ): Promise<LeaderboardResponse> {
    const response = await apiClient.get(`/leaderboard/friends?type=${type}`);
    return response.data;
  },
};
