import { renderHook, act } from '@testing-library/react-native';
import { useSyncStore } from '../syncStore';
import { storage } from '@/services/storage/mmkv';
import { workoutsApi } from '@/services/api/workouts.api';

// Mock the dependencies
jest.mock('@/services/storage/mmkv', () => ({
  storage: {
    getString: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock('@/services/api/workouts.api', () => ({
  workoutsApi: {
    createWorkout: jest.fn(),
  },
}));

describe('SyncStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset store state
    const { result } = renderHook(() => useSyncStore());
    act(() => {
      result.current.queue.forEach((item) => result.current.removeFromQueue(item.id));
      result.current.clearError();
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useSyncStore());
      
      expect(result.current.queue).toEqual([]);
      expect(result.current.isFlushing).toBe(false);
      expect(result.current.lastError).toBeNull();
    });
  });

  describe('loadQueue', () => {
    it('should load queue from storage', async () => {
      const mockQueue = [
        {
          type: 'CREATE_WORKOUT' as const,
          id: 'pending_123',
          payload: {
            exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
            duration: 3600,
            notes: 'Test workout',
          },
          createdAt: Date.now(),
        },
      ];

      (storage.getString as jest.Mock).mockResolvedValue(JSON.stringify(mockQueue));

      const { result } = renderHook(() => useSyncStore());

      await act(async () => {
        await result.current.loadQueue();
      });

      expect(storage.getString).toHaveBeenCalledWith('rize_sync_queue');
      expect(result.current.queue).toHaveLength(1);
      expect(result.current.queue[0].type).toBe('CREATE_WORKOUT');
    });

    it('should handle empty storage', async () => {
      (storage.getString as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useSyncStore());

      await act(async () => {
        await result.current.loadQueue();
      });

      expect(result.current.queue).toEqual([]);
    });

    it('should handle corrupted storage data', async () => {
      (storage.getString as jest.Mock).mockResolvedValue('invalid-json{');

      const { result } = renderHook(() => useSyncStore());

      await act(async () => {
        await result.current.loadQueue();
      });

      expect(result.current.queue).toEqual([]);
    });
  });

  describe('addCreateWorkout', () => {
    it('should add workout to queue', async () => {
      const { result } = renderHook(() => useSyncStore());

      const mockWorkoutData = {
        exercises: [
          { exerciseId: '1', sets: [{ weight: 100, reps: 10 }] },
        ],
        duration: 3600,
        notes: 'Test workout',
      };

      let pendingId: string;
      await act(async () => {
        pendingId = result.current.addCreateWorkout(mockWorkoutData);
      });

      expect(result.current.queue).toHaveLength(1);
      expect(result.current.queue[0].type).toBe('CREATE_WORKOUT');
      expect(result.current.queue[0].payload).toEqual(mockWorkoutData);
      expect(result.current.queue[0].id).toContain('pending_');
      expect(storage.set).toHaveBeenCalledWith('rize_sync_queue', expect.any(String));
    });

    it('should return unique IDs for multiple workouts', async () => {
      const { result } = renderHook(() => useSyncStore());

      const mockData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
      };

      let id1: string, id2: string;
      await act(async () => {
        id1 = result.current.addCreateWorkout(mockData);
        id2 = result.current.addCreateWorkout(mockData);
      });

      expect(id1).not.toBe(id2);
      expect(result.current.queue).toHaveLength(2);
    });
  });

  describe('removeFromQueue', () => {
    it('should remove item from queue', async () => {
      const { result } = renderHook(() => useSyncStore());

      const mockData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
      };

      let pendingId: string;
      await act(async () => {
        pendingId = result.current.addCreateWorkout(mockData);
      });

      expect(result.current.queue).toHaveLength(1);

      await act(async () => {
        result.current.removeFromQueue(pendingId);
      });

      expect(result.current.queue).toHaveLength(0);
      expect(storage.set).toHaveBeenCalled();
    });

    it('should handle removing non-existent item', async () => {
      const { result } = renderHook(() => useSyncStore());

      await act(async () => {
        result.current.removeFromQueue('non-existent-id');
      });

      expect(result.current.queue).toHaveLength(0);
    });
  });

  describe('flushQueue', () => {
    it('should successfully flush all pending workouts', async () => {
      (workoutsApi.createWorkout as jest.Mock).mockResolvedValue({ id: '123' });

      const { result } = renderHook(() => useSyncStore());

      const mockData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
      };

      await act(async () => {
        result.current.addCreateWorkout(mockData);
        result.current.addCreateWorkout(mockData);
      });

      expect(result.current.queue).toHaveLength(2);

      await act(async () => {
        await result.current.flushQueue();
      });

      expect(workoutsApi.createWorkout).toHaveBeenCalledTimes(2);
      expect(result.current.queue).toHaveLength(0);
      expect(result.current.isFlushing).toBe(false);
      expect(result.current.lastError).toBeNull();
    });

    it('should keep failed items in queue', async () => {
      (workoutsApi.createWorkout as jest.Mock)
        .mockResolvedValueOnce({ id: '1' })
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ id: '3' });

      const { result } = renderHook(() => useSyncStore());

      const mockData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
      };

      await act(async () => {
        result.current.addCreateWorkout(mockData);
        result.current.addCreateWorkout(mockData);
        result.current.addCreateWorkout(mockData);
      });

      await act(async () => {
        await result.current.flushQueue();
      });

      expect(result.current.queue).toHaveLength(1);
      expect(result.current.lastError).toBe('Network error');
      expect(result.current.isFlushing).toBe(false);
    });

    it('should handle empty queue', async () => {
      const { result } = renderHook(() => useSyncStore());

      await act(async () => {
        await result.current.flushQueue();
      });

      expect(workoutsApi.createWorkout).not.toHaveBeenCalled();
      expect(result.current.queue).toHaveLength(0);
    });
  });

  describe('clearError', () => {
    it('should clear error state', async () => {
      const { result } = renderHook(() => useSyncStore());

      (workoutsApi.createWorkout as jest.Mock).mockRejectedValue(new Error('Test error'));

      const mockData = {
        exercises: [{ exerciseId: '1', sets: [{ weight: 100, reps: 10 }] }],
        duration: 3600,
      };

      await act(async () => {
        result.current.addCreateWorkout(mockData);
        await result.current.flushQueue();
      });

      expect(result.current.lastError).toBe('Test error');

      await act(async () => {
        result.current.clearError();
      });

      expect(result.current.lastError).toBeNull();
    });
  });
});
