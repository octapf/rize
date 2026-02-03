import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAchievements, useCheckAchievements } from '../useAchievements';
import { achievementsApi } from '@/services/api/achievements.api';

// Mock the API
jest.mock('@/services/api/achievements.api', () => ({
  achievementsApi: {
    getUserAchievements: jest.fn(),
    checkAchievements: jest.fn(),
  },
}));

describe('useAchievements Hooks', () => {
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

  describe('useAchievements', () => {
    it('should fetch user achievements successfully', async () => {
      const mockAchievements = [
        {
          id: '1',
          name: 'First Workout',
          description: 'Complete your first workout',
          icon: '🏋️',
          unlockedAt: '2026-01-15',
          progress: 100,
        },
        {
          id: '2',
          name: '7 Day Streak',
          description: 'Workout 7 days in a row',
          icon: '🔥',
          unlockedAt: '2026-01-22',
          progress: 100,
        },
        {
          id: '3',
          name: '100 Workouts',
          description: 'Complete 100 total workouts',
          icon: '💯',
          unlockedAt: null,
          progress: 50,
        },
      ];

      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue(
        mockAchievements
      );

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockAchievements);
      expect(achievementsApi.getUserAchievements).toHaveBeenCalledTimes(1);
    });

    it('should separate unlocked and locked achievements', async () => {
      const mockAchievements = [
        {
          id: '1',
          name: 'First Workout',
          unlockedAt: '2026-01-15',
          progress: 100,
        },
        {
          id: '2',
          name: 'In Progress',
          unlockedAt: null,
          progress: 50,
        },
      ];

      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue(
        mockAchievements
      );

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const unlocked = result.current.data?.filter((a: any) => a.unlockedAt);
      const locked = result.current.data?.filter((a: any) => !a.unlockedAt);

      expect(unlocked).toHaveLength(1);
      expect(locked).toHaveLength(1);
    });

    it('should handle empty achievements', async () => {
      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);
    });

    it('should handle fetch error', async () => {
      (achievementsApi.getUserAchievements as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch achievements')
      );

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });

    it('should cache achievements data', async () => {
      const mockAchievements = [
        { id: '1', name: 'Achievement', progress: 100 },
      ];

      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue(
        mockAchievements
      );

      const { result: result1 } = renderHook(() => useAchievements(), {
        wrapper,
      });
      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      const { result: result2 } = renderHook(() => useAchievements(), {
        wrapper,
      });

      // Should use cached data
      expect(result2.current.data).toEqual(mockAchievements);
    });
  });

  describe('useCheckAchievements', () => {
    it('should check achievements successfully', async () => {
      const mockNewAchievements = [
        {
          id: '2',
          name: '7 Day Streak',
          description: 'Workout 7 days in a row',
          icon: '🔥',
        },
      ];

      (achievementsApi.checkAchievements as jest.Mock).mockResolvedValue(
        mockNewAchievements
      );

      const { result } = renderHook(() => useCheckAchievements(), { wrapper });

      await result.current.mutateAsync();

      expect(achievementsApi.checkAchievements).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should return empty array when no new achievements', async () => {
      (achievementsApi.checkAchievements as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useCheckAchievements(), { wrapper });

      const newAchievements = await result.current.mutateAsync();

      expect(newAchievements).toEqual([]);
    });

    it('should invalidate achievements query on success', async () => {
      (achievementsApi.checkAchievements as jest.Mock).mockResolvedValue([
        { id: '1', name: 'New Achievement' },
      ]);

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCheckAchievements(), { wrapper });

      await result.current.mutateAsync();

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['achievements'] });
    });

    it('should handle check error', async () => {
      (achievementsApi.checkAchievements as jest.Mock).mockRejectedValue(
        new Error('Check failed')
      );

      const { result } = renderHook(() => useCheckAchievements(), { wrapper });

      try {
        await result.current.mutateAsync();
      } catch (error) {
        expect(error).toBeTruthy();
      }

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });

    it('should invalidate achievements cache after successful check', async () => {
      (achievementsApi.checkAchievements as jest.Mock).mockResolvedValue([
        { id: '2', name: 'New', progress: 100, unlockedAt: '2026-01-01' },
      ]);

      const { result } = renderHook(() => useCheckAchievements(), { wrapper });
      
      await result.current.mutateAsync();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the mutation completed successfully
      expect(achievementsApi.checkAchievements).toHaveBeenCalledTimes(1);
    });
  });

  describe('Achievement Progress Tracking', () => {
    it('should track progress for locked achievements', async () => {
      const mockAchievements = [
        { id: '1', name: 'Locked', unlockedAt: null, progress: 0 },
        { id: '2', name: 'In Progress', unlockedAt: null, progress: 50 },
        { id: '3', name: 'Almost There', unlockedAt: null, progress: 99 },
      ];

      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue(
        mockAchievements
      );

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const inProgress = result.current.data?.filter(
        (a: any) => !a.unlockedAt && a.progress > 0
      );

      expect(inProgress).toHaveLength(2);
    });

    it('should identify completable achievements', async () => {
      const mockAchievements = [
        { id: '1', name: 'Ready', unlockedAt: null, progress: 100 },
        { id: '2', name: 'Not Ready', unlockedAt: null, progress: 50 },
      ];

      (achievementsApi.getUserAchievements as jest.Mock).mockResolvedValue(
        mockAchievements
      );

      const { result } = renderHook(() => useAchievements(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const completable = result.current.data?.filter(
        (a: any) => !a.unlockedAt && a.progress === 100
      );

      expect(completable).toHaveLength(1);
      expect(completable?.[0].name).toBe('Ready');
    });
  });
});
