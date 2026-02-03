import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useExercises, useExercisesByCategory } from '../useExercises';
import { exercisesApi } from '@/services/api/exercises.api';

// Mock the API
jest.mock('@/services/api/exercises.api', () => ({
  exercisesApi: {
    getExercises: jest.fn(),
    getExercisesByCategory: jest.fn(),
  },
}));

describe('useExercises Hooks', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('useExercises', () => {
    it('should fetch exercises successfully', async () => {
      const mockExercises = [
        {
          id: '1',
          name: 'Pull Up',
          category: 'pull',
          muscleGroups: ['back', 'biceps'],
          difficulty: 'intermediate',
        },
        {
          id: '2',
          name: 'Push Up',
          category: 'push',
          muscleGroups: ['chest', 'triceps'],
          difficulty: 'beginner',
        },
      ];

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockExercises);
      expect(exercisesApi.getExercises).toHaveBeenCalledWith(undefined);
    });

    it('should fetch exercises with query params', async () => {
      const mockExercises = [
        { id: '1', name: 'Pull Up', category: 'pull', difficulty: 'intermediate' },
      ];
      const query = { category: 'pull', difficulty: 'intermediate' };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockExercises);
      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
    });

    it('should handle fetch error', async () => {
      (exercisesApi.getExercises as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => useExercises(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });

    it('should fetch exercises by muscle group', async () => {
      const mockExercises = [
        { id: '1', name: 'Pull Up', muscleGroups: ['back'], category: 'pull' },
        { id: '2', name: 'Row', muscleGroups: ['back'], category: 'pull' },
      ];
      const query = { muscleGroup: 'back' };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
      expect(result.current.data).toEqual(mockExercises);
    });

    it('should fetch exercises by difficulty', async () => {
      const mockExercises = [
        { id: '1', name: 'Push Up', difficulty: 'beginner', category: 'push' },
      ];
      const query = { difficulty: 'beginner' };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
    });

    it('should fetch exercises by equipment', async () => {
      const mockExercises = [
        { id: '1', name: 'Pull Up', equipment: 'bar', category: 'pull' },
      ];
      const query = { equipment: 'bar' };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
    });

    it('should handle search query', async () => {
      const mockExercises = [
        { id: '1', name: 'Diamond Push Up', category: 'push' },
      ];
      const query = { search: 'diamond' };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
    });

    it('should handle multiple query params', async () => {
      const mockExercises = [{ id: '1', name: 'Pull Up' }];
      const query = {
        category: 'pull',
        difficulty: 'intermediate',
        muscleGroup: 'back',
        equipment: 'bar',
      };

      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result } = renderHook(() => useExercises(query), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(exercisesApi.getExercises).toHaveBeenCalledWith(query);
    });
  });

  describe('useExercisesByCategory', () => {
    it('should fetch exercises by category', async () => {
      const mockExercises = [
        { id: '1', name: 'Pull Up', category: 'pull' },
        { id: '2', name: 'Row', category: 'pull' },
      ];

      (exercisesApi.getExercisesByCategory as jest.Mock).mockResolvedValue(
        mockExercises
      );

      const { result } = renderHook(() => useExercisesByCategory('pull'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockExercises);
      expect(exercisesApi.getExercisesByCategory).toHaveBeenCalledWith('pull');
    });

    it('should not fetch when category is empty', () => {
      const { result } = renderHook(() => useExercisesByCategory(''), {
        wrapper,
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(exercisesApi.getExercisesByCategory).not.toHaveBeenCalled();
    });

    it('should handle different categories', async () => {
      const categories = ['pull', 'push', 'legs', 'core'];

      for (const category of categories) {
        const mockExercises = [{ id: '1', name: 'Test', category }];
        (exercisesApi.getExercisesByCategory as jest.Mock).mockResolvedValue(
          mockExercises
        );

        const { result } = renderHook(() => useExercisesByCategory(category), {
          wrapper,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(exercisesApi.getExercisesByCategory).toHaveBeenCalledWith(category);
      }
    });

    it('should handle fetch error', async () => {
      (exercisesApi.getExercisesByCategory as jest.Mock).mockRejectedValue(
        new Error('Category not found')
      );

      const { result } = renderHook(() => useExercisesByCategory('invalid'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });

    it('should return empty array for category with no exercises', async () => {
      (exercisesApi.getExercisesByCategory as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useExercisesByCategory('core'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);
    });
  });

  describe('Query Caching', () => {
    it('should cache exercises query', async () => {
      const mockExercises = [{ id: '1', name: 'Pull Up', category: 'pull' }];
      (exercisesApi.getExercises as jest.Mock).mockResolvedValue(mockExercises);

      const { result: result1 } = renderHook(() => useExercises(), { wrapper });
      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      const { result: result2 } = renderHook(() => useExercises(), { wrapper });
      
      // Should use cached data immediately
      expect(result2.current.data).toEqual(mockExercises);
    });

    it('should use different cache keys for different queries', async () => {
      const mockPullExercises = [{ id: '1', category: 'pull' }];
      const mockPushExercises = [{ id: '2', category: 'push' }];

      (exercisesApi.getExercises as jest.Mock)
        .mockResolvedValueOnce(mockPullExercises)
        .mockResolvedValueOnce(mockPushExercises);

      const { result: result1 } = renderHook(
        () => useExercises({ category: 'pull' }),
        { wrapper }
      );
      const { result: result2 } = renderHook(
        () => useExercises({ category: 'push' }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
        expect(result2.current.isSuccess).toBe(true);
      });

      expect(result1.current.data).not.toEqual(result2.current.data);
    });
  });
});
