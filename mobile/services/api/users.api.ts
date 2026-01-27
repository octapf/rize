import { api } from './index';

export interface UserProfile {
  user: {
    _id: string;
    username: string;
    email: string;
    xp: number;
    streak: number;
    level: number;
    createdAt: string;
  };
  stats: {
    workoutCount: number;
    achievementCount: number;
    recordsCount: number;
    totalVolume: number;
  };
  recentWorkouts: Array<{
    _id: string;
    name: string;
    completedAt: string;
    exercises: Array<{
      exercise: {
        _id: string;
        name: string;
        category: string;
      };
      sets: Array<any>;
    }>;
    notes?: string;
  }>;
}

export interface UserStats {
  user: {
    xp: number;
    level: number;
    streak: number;
  };
  workouts: {
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  volume: {
    total: number;
    totalSets: number;
    totalReps: number;
  };
  time: {
    total: number;
  };
  records: {
    thisMonth: number;
    total: number;
  };
  achievements: {
    total: number;
  };
}

export interface UserSearchResult {
  _id: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  workoutCount: number;
  achievementCount: number;
  createdAt: string;
}

export interface Activity {
  type: 'workout' | 'achievement' | 'record';
  date: string;
  data: any;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
}

class UsersApi {
  /**
   * Get public profile for a user
   */
  async getUserProfile(userId: string) {
    return api.get<UserProfile>(`/users/${userId}/profile`);
  }

  /**
   * Get current user's stats
   */
  async getMyStats() {
    return api.get<UserStats>('/users/me/stats');
  }

  /**
   * Search users by username
   */
  async searchUsers(query: string, limit?: number) {
    return api.get<{ users: UserSearchResult[] }>('/users/search', {
      params: { q: query, limit },
    });
  }

  /**
   * Update current user's profile
   */
  async updateMyProfile(data: UpdateProfileData) {
    return api.put<{ user: any }>('/users/me/profile', data);
  }

  /**
   * Get current user's activity feed
   */
  async getMyActivity(limit?: number) {
    return api.get<{ activities: Activity[] }>('/users/me/activity', {
      params: { limit },
    });
  }

  /**
   * Get user's public activity feed
   */
  async getUserActivity(userId: string, limit?: number) {
    return api.get<{ activities: Activity[] }>(`/users/${userId}/activity`, {
      params: { limit },
    });
  }
}

export const usersApi = new UsersApi();
