/**
 * Offline sync store: queue pending actions and flush when back online.
 * Persisted so queue survives app restarts.
 */
import { create } from 'zustand';
import { storage } from '@/services/storage/mmkv';
import { workoutsApi, type CreateWorkoutData } from '@/services/api/workouts.api';

const SYNC_QUEUE_KEY = 'rize_sync_queue';

export type PendingAction =
  | { type: 'CREATE_WORKOUT'; id: string; payload: CreateWorkoutData; createdAt: number };

interface SyncStore {
  queue: PendingAction[];
  isFlushing: boolean;
  lastError: string | null;
  /** Load queue from storage (call once on app init) */
  loadQueue: () => Promise<void>;
  /** Add a workout create to the queue (when offline or API fails) */
  addCreateWorkout: (payload: CreateWorkoutData) => string;
  /** Remove one item from queue (e.g. after successful sync or user cancel) */
  removeFromQueue: (id: string) => void;
  /** Flush all pending actions to the API (called when coming online) */
  flushQueue: () => Promise<void>;
  clearError: () => void;
}

function generateId(): string {
  return `pending_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function loadQueueFromStorage(): Promise<PendingAction[]> {
  try {
    const raw = await storage.getString(SYNC_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PendingAction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveQueueToStorage(queue: PendingAction[]): Promise<void> {
  await storage.set(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

export const useSyncStore = create<SyncStore>((set, get) => ({
  queue: [],
  isFlushing: false,
  lastError: null,

  loadQueue: async () => {
    const queue = await loadQueueFromStorage();
    set({ queue });
  },

  addCreateWorkout: (payload: CreateWorkoutData) => {
    const id = generateId();
    const item: PendingAction = {
      type: 'CREATE_WORKOUT',
      id,
      payload,
      createdAt: Date.now(),
    };
    const queue = [...get().queue, item];
    set({ queue });
    saveQueueToStorage(queue);
    return id;
  },

  removeFromQueue: (id: string) => {
    const queue = get().queue.filter((item) => item.id !== id);
    set({ queue });
    saveQueueToStorage(queue);
  },

  flushQueue: async () => {
    const { queue } = get();
    if (queue.length === 0) return;

    set({ isFlushing: true, lastError: null });

    const remaining: PendingAction[] = [];
    let lastError: string | null = null;

    for (const item of queue) {
      if (item.type === 'CREATE_WORKOUT') {
        try {
          await workoutsApi.createWorkout(item.payload);
          // Success: don't add to remaining
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Sync failed';
          lastError = message;
          remaining.push(item);
        }
      }
    }

    set({
      queue: remaining,
      isFlushing: false,
      lastError,
    });
    await saveQueueToStorage(remaining);
  },

  clearError: () => set({ lastError: null }),
}));
