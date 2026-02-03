import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useDashboardStats,
  useExerciseProgress,
  useStreak,
  useLeaderboard,
} from '../useStats';
import { statsApi } from '@/services/api/stats.api';

// Mock the API
jest.mock('@/services/api/stats.api', () => ({
  statsApi: {
    getDashboard: jest.fn(),
    getExerciseProgress: jest.fn(),
    getStreak: jest.fn(),
    getLeaderboard: jest.fn(),
  },
}));

describe('useStats Hooks', () => {
  let queryClient: QueryClient;
  let wrapper: any;

  const createWrapper = (client: QueryClient) => {
    const Wrapper = ({ children }: any) =>
      React.createElement(QueryClientProvider, { client }, children);
    return Wrapper;
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    wrapper = createWrapper(queryClient);
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('useDashboardStats', () => {
    it('should fetch dashboard stats successfully', async () => {
      const mockStats = {
        totalWorkouts: 50,
        totalDuration: 180000,
        currentStreak: 7,
        longestStreak: 14,
        totalExercises: 120,
        favoriteExercise: 'Pull Up',
        weeklyWorkouts: [1, 2, 1, 3, 2, 1, 2],
      };

      (statsApi.getDashboard as jest.Mock).mockResolvedValue(mockStats);

      const { result } = renderHook(() => useDashboardStats(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockStats);
      expect(statsApi.getDashboard).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error', async () => {
      (statsApi.getDashboard as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch stats')
      );

      const { result } = renderHook(() => useDashboardStats(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });

    it('should cache dashboard stats', async () => {
      const mockStats = { totalWorkouts: 10 };
      (statsApi.getDashboard as jest.Mock).mockResolvedValue(mockStats);

      const { result: result1 } = renderHook(() => useDashboardStats(), {
        wrapper,
      });
      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      const { result: result2 } = renderHook(() => useDashboardStats(), {
        wrapper,
      });

      // Should use cached data
      expect(result2.current.data).toEqual(mockStats);
    });
  });

  describe('useExerciseProgress', () => {
    it('should fetch exercise progress successfully', async () => {
      const mockProgress = {
        exerciseId: 'exercise123',
        exerciseName: 'Pull Up',
        history: [
          { date: '2026-01-01', maxWeight: 0, maxReps: 8 },
          { date: '2026-01-15', maxWeight: 5, maxReps: 10 },
          { date: '2026-02-01', maxWeight: 10, maxReps: 12 },
        ],
        personalBest: { weight: 10, reps: 12, date: '2026-02-01' },
        improvement: 50,
      };

      (statsApi.getExerciseProgress as jest.Mock).mockResolvedValue(mockProgress);

      const { result } = renderHook(() => useExerciseProgress('exercise123'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProgress);
      expect(statsApi.getExerciseProgress).toHaveBeenCalledWith('exercise123');
    });

    it('should not fetch when exerciseId is empty', () => {
      const { result } = renderHook(() => useExerciseProgress(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(statsApi.getExerciseProgress).not.toHaveBeenCalled();
    });

    it('should handle different exercise IDs separately', async () => {
      const mockProgress1 = { exerciseId: 'ex1', history: [] };
      const mockProgress2 = { exerciseId: 'ex2', history: [] };

      (statsApi.getExerciseProgress as jest.Mock)
        .mockResolvedValueOnce(mockProgress1)
        .mockResolvedValueOnce(mockProgress2);

      const { result: result1 } = renderHook(
        () => useExerciseProgress('ex1'),
        { wrapper }
      );
      const { result: result2 } = renderHook(
        () => useExerciseProgress('ex2'),
        { wrapper }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
        expect(result2.current.isSuccess).toBe(true);
      });

      expect(result1.current.data).toEqual(mockProgress1);
      expect(result2.current.data).toEqual(mockProgress2);
    });
  });

  describe('useStreak', () => {
    it('should fetch current streak successfully', async () => {
      const mockStreak = {
        currentStreak: 14,
        longestStreak: 21,
        lastWorkoutDate: '2026-02-03',
        streakActive: true,
      };

      (statsApi.getStreak as jest.Mock).mockResolvedValue(mockStreak);

      const { result } = renderHook(() => useStreak(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockStreak);
      expect(statsApi.getStreak).toHaveBeenCalledTimes(1);
    });

    it('should handle zero streak', async () => {
      const mockStreak = {
        currentStreak: 0,
        longestStreak: 5,
        lastWorkoutDate: '2026-01-01',
        streakActive: false,
      };

      (statsApi.getStreak as jest.Mock).mockResolvedValue(mockStreak);

      const { result } = renderHook(() => useStreak(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.currentStreak).toBe(0);
      expect(result.current.data?.streakActive).toBe(false);
    });

    it('should handle fetch error', async () => {
      (statsApi.getStreak as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch streak')
      );

      const { result } = renderHook(() => useStreak(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  describe('useLeaderboard', () => {
    it('should fetch leaderboard with default limit', async () => {
      const mockLeaderboard = [
        { rank: 1, userId: 'user1', username: 'TopUser', xp: 10000, level: 50 },
        { rank: 2, userId: 'user2', username: 'SecondPlace', xp: 9000, level: 45 },
        { rank: 3, userId: 'user3', username: 'ThirdPlace', xp: 8000, level: 40 },
      ];

      (statsApi.getLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboard);

      const { result } = renderHook(() => useLeaderboard(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockLeaderboard);
      expect(statsApi.getLeaderboard).toHaveBeenCalledWith(100);
    });

    it('should fetch leaderboard with custom limit', async () => {
      const mockLeaderboard = [
        { rank: 1, userId: 'user1', username: 'Top', xp: 10000, level: 50 },
      ];

      (statsApi.getLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboard);

      const { result } = renderHook(() => useLeaderboard(10), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(statsApi.getLeaderboard).toHaveBeenCalledWith(10);
      expect(result.current.data).toHaveLength(1);
    });

    it('should handle empty leaderboard', async () => {
      (statsApi.getLeaderboard as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useLeaderboard(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);
    });

    it('should handle fetch error', async () => {
      (statsApi.getLeaderboard as jest.Mock).mockRejectedValue(
        new Error('Leaderboard unavailable')
      );

      const { result } = renderHook(() => useLeaderboard(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  describe('Query Caching', () => {
    it('should use separate cache keys for different queries', async () => {
      const mockDashboard = { totalWorkouts: 10 };
      const mockStreak = { currentStreak: 5 };

      (statsApi.getDashboard as jest.Mock).mockResolvedValue(mockDashboard);
      (statsApi.getStreak as jest.Mock).mockResolvedValue(mockStreak);

      const { result: dashResult } = renderHook(() => useDashboardStats(), {
        wrapper,
      });
      const { result: streakResult } = renderHook(() => useStreak(), { wrapper });

      await waitFor(() => {
        expect(dashResult.current.isSuccess).toBe(true);
        expect(streakResult.current.isSuccess).toBe(true);
      });

      expect(dashResult.current.data).not.toEqual(streakResult.current.data);
    });

    it('should cache leaderboard with different limits separately', async () => {
      (statsApi.getLeaderboard as jest.Mock)
        .mockResolvedValueOnce([{ rank: 1 }, { rank: 2 }])
        .mockResolvedValueOnce([{ rank: 1 }]);

      const { result: result100 } = renderHook(() => useLeaderboard(100), {
        wrapper,
      });
      const { result: result10 } = renderHook(() => useLeaderboard(10), {
        wrapper,
      });

      await waitFor(() => {
        expect(result100.current.isSuccess).toBe(true);
        expect(result10.current.isSuccess).toBe(true);
      });

      expect(statsApi.getLeaderboard).toHaveBeenCalledTimes(2);
    });
  });
});
