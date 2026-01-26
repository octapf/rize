import { apiClient } from './client';
import type { Exercise } from './exercises.api';

export interface WorkoutSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  completed: boolean;
}

export interface WorkoutExercise {
  exerciseId: string | Exercise; // Populated when fetching workout details
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  _id: string;
  userId: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  duration?: number;
  notes?: string;
  xpEarned: number;
  visibility: 'private' | 'friends' | 'public';
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkoutData {
  name: string;
  date?: string;
  exercises: WorkoutExercise[];
  duration?: number;
  notes?: string;
  visibility?: 'private' | 'friends' | 'public';
}

export interface UpdateWorkoutData {
  name?: string;
  date?: string;
  exercises?: WorkoutExercise[];
  duration?: number;
  notes?: string;
  visibility?: 'private' | 'friends' | 'public';
}

export interface WorkoutsQuery {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  exerciseId?: string;
}

export interface WorkoutsResponse {
  success: boolean;
  data: Workout[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface WorkoutResponse {
  success: boolean;
  data: Workout;
}

export interface WorkoutStatsResponse {
  success: boolean;
  data: {
    totalWorkouts: number;
    totalXP: number;
    totalDuration: number;
    avgDuration: number;
  };
}

export const workoutsApi = {
  getWorkouts: async (query?: WorkoutsQuery): Promise<WorkoutsResponse> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.startDate) params.append('startDate', query.startDate);
    if (query?.endDate) params.append('endDate', query.endDate);
    if (query?.exerciseId) params.append('exerciseId', query.exerciseId);

    const response = await apiClient.get<WorkoutsResponse>(
      `/workouts?${params.toString()}`
    );
    return response.data;
  },

  getWorkoutById: async (id: string): Promise<WorkoutResponse> => {
    const response = await apiClient.get<WorkoutResponse>(`/workouts/${id}`);
    return response.data;
  },

  createWorkout: async (data: CreateWorkoutData): Promise<WorkoutResponse> => {
    const response = await apiClient.post<WorkoutResponse>('/workouts', data);
    return response.data;
  },

  updateWorkout: async (
    id: string,
    data: UpdateWorkoutData
  ): Promise<WorkoutResponse> => {
    const response = await apiClient.patch<WorkoutResponse>(
      `/workouts/${id}`,
      data
    );
    return response.data;
  },

  deleteWorkout: async (id: string): Promise<void> => {
    await apiClient.delete(`/workouts/${id}`);
  },

  getStats: async (days = 30): Promise<WorkoutStatsResponse> => {
    const response = await apiClient.get<WorkoutStatsResponse>(
      `/workouts/stats?days=${days}`
    );
    return response.data;
  },
};
