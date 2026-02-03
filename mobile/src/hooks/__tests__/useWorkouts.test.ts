import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useWorkouts,
  useWorkout,
  useCreateWorkout,
  useUpdateWorkout,
  useDeleteWorkout,
  useWorkoutStats,
} from '../useWorkouts';
import { workoutsApi } from '@/services/api/workouts.api';

// Mock the API
jest.mock('@/services/api/workouts.api', () => ({
  workoutsApi: {
    getWorkouts: jest.fn(),
    getWorkoutById: jest.fn(),
    createWorkout: jest.fn(),
    updateWorkout: jest.fn(),
    deleteWorkout: jest.fn(),
    getStats: jest.fn(),
  },
}));

describe('useWorkouts Hooks', () => {
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

  describe('useWorkouts', () => {
    it('should fetch workouts successfully', async () => {
      const mockWorkouts = [
        { id: '1', exercises: [], duration: 3600, createdAt: new Date() },
        { id: '2', exercises: [], duration: 1800, createdAt: new Date() },
      ];

      (workoutsApi.getWorkouts as jest.Mock).mockResolvedValue(mockWorkouts);

      const { result } = renderHook(() => useWorkouts(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockWorkouts);
      expect(workoutsApi.getWorkouts).toHaveBeenCalledWith(undefined);
    });

    it('should fetch workouts with query params', async () => {
      const mockWorkouts = [{ id: '1', exercises: [], duration: 3600 }];
      const query = { limit: 10, skip: 0 };

      (workoutsApi.getWorkouts as jest.Mock).mockResolvedValue(mockWorkouts);

      const { result } = renderHook(() => useWorkouts(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(workoutsApi.getWorkouts).toHaveBeenCalledWith(query);
    });

    it('should handle fetch error', async () => {
      (workoutsApi.getWorkouts as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => useWorkouts(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('useWorkout', () => {
    it('should fetch single workout by id', async () => {
      const mockWorkout = {
        id: '123',
        exercises: [{ exerciseId: '1', sets: [] }],
        duration: 3600,
      };

      (workoutsApi.getWorkoutById as jest.Mock).mockResolvedValue(mockWorkout);

      const { result } = renderHook(() => useWorkout('123'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockWorkout);
      expect(workoutsApi.getWorkoutById).toHaveBeenCalledWith('123');
    });

    it('should not fetch when id is empty', () => {
      const { result } = renderHook(() => useWorkout(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(workoutsApi.getWorkoutById).not.toHaveBeenCalled();
    });
  });

  describe('useCreateWorkout', () => {
    it('should create workout successfully', async () => {
      const mockWorkoutData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
        notes: 'Great workout',
      };
      const mockCreatedWorkout = { id: 'new-id', ...mockWorkoutData };

      (workoutsApi.createWorkout as jest.Mock).mockResolvedValue(mockCreatedWorkout);

      const { result } = renderHook(() => useCreateWorkout(), { wrapper });

      await result.current.mutateAsync(mockWorkoutData);

      expect(workoutsApi.createWorkout).toHaveBeenCalledWith(mockWorkoutData);
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should invalidate queries on success', async () => {
      const mockWorkoutData = { exercises: [], duration: 3600 };
      (workoutsApi.createWorkout as jest.Mock).mockResolvedValue({
        id: '1',
        ...mockWorkoutData,
      });

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCreateWorkout(), { wrapper });

      await result.current.mutateAsync(mockWorkoutData);

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['workouts'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['stats'] });
    });

    it('should handle create error', async () => {
      (workoutsApi.createWorkout as jest.Mock).mockRejectedValue(
        new Error('Create failed')
      );

      const { result } = renderHook(() => useCreateWorkout(), { wrapper });

      try {
        await result.current.mutateAsync({ exercises: [], duration: 3600 });
      } catch (error) {
        expect(error).toBeTruthy();
      }

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useUpdateWorkout', () => {
    it('should update workout successfully', async () => {
      const updateData = { notes: 'Updated notes' };
      const mockUpdatedWorkout = {
        id: '123',
        exercises: [],
        duration: 3600,
        ...updateData,
      };

      (workoutsApi.updateWorkout as jest.Mock).mockResolvedValue(mockUpdatedWorkout);

      const { result } = renderHook(() => useUpdateWorkout(), { wrapper });

      await result.current.mutateAsync({ id: '123', data: updateData });

      expect(workoutsApi.updateWorkout).toHaveBeenCalledWith('123', updateData);
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should invalidate specific workout query on success', async () => {
      (workoutsApi.updateWorkout as jest.Mock).mockResolvedValue({
        id: '123',
        exercises: [],
      });

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useUpdateWorkout(), { wrapper });

      await result.current.mutateAsync({ id: '123', data: { notes: 'test' } });

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['workouts'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['workout', '123'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['stats'] });
    });
  });

  describe('useDeleteWorkout', () => {
    it('should delete workout successfully', async () => {
      (workoutsApi.deleteWorkout as jest.Mock).mockResolvedValue({ success: true });

      const { result } = renderHook(() => useDeleteWorkout(), { wrapper });

      await result.current.mutateAsync('123');

      expect(workoutsApi.deleteWorkout).toHaveBeenCalledWith('123');
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });

    it('should invalidate queries on delete success', async () => {
      (workoutsApi.deleteWorkout as jest.Mock).mockResolvedValue({ success: true });

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useDeleteWorkout(), { wrapper });

      await result.current.mutateAsync('123');

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['workouts'] });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['stats'] });
    });

    it('should handle delete error', async () => {
      (workoutsApi.deleteWorkout as jest.Mock).mockRejectedValue(
        new Error('Delete failed')
      );

      const { result } = renderHook(() => useDeleteWorkout(), { wrapper });

      try {
        await result.current.mutateAsync('123');
      } catch (error) {
        expect(error).toBeTruthy();
      }

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('useWorkoutStats', () => {
    it('should fetch workout stats with default days', async () => {
      const mockStats = {
        totalWorkouts: 10,
        totalDuration: 36000,
        averageDuration: 3600,
      };

      (workoutsApi.getStats as jest.Mock).mockResolvedValue(mockStats);

      const { result } = renderHook(() => useWorkoutStats(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockStats);
      expect(workoutsApi.getStats).toHaveBeenCalledWith(30);
    });

    it('should fetch workout stats with custom days', async () => {
      const mockStats = { totalWorkouts: 5 };

      (workoutsApi.getStats as jest.Mock).mockResolvedValue(mockStats);

      const { result } = renderHook(() => useWorkoutStats(7), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(workoutsApi.getStats).toHaveBeenCalledWith(7);
    });
  });
});
