import { apiClient } from './client';

export interface Workout {
  _id: string;
  userId: string;
  name: string;
  exercises: WorkoutExercise[];
  duration: number;
  totalVolume: number;
  date: string;
  notes?: string;
  isTemplate?: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutSet {
  setNumber: number;
  weight: number;
  reps: number;
  restTime?: number;
  completed: boolean;
}

export interface CreateWorkoutDto {
  name: string;
  exercises: WorkoutExercise[];
  duration?: number;
  notes?: string;
  isTemplate?: boolean;
}

export const workoutsApi = {
  // Get all workouts
  getWorkouts: (page = 1, limit = 20) =>
    apiClient.get<{ workouts: Workout[]; total: number; page: number }>(
      `/workouts?page=${page}&limit=${limit}`
    ),

  // Get workout by ID
  getWorkout: (id: string) =>
    apiClient.get<Workout>(`/workouts/${id}`),

  // Create workout
  createWorkout: (data: CreateWorkoutDto) =>
    apiClient.post<Workout>('/workouts', data),

  // Update workout
  updateWorkout: (id: string, data: Partial<CreateWorkoutDto>) =>
    apiClient.put<Workout>(`/workouts/${id}`, data),

  // Delete workout
  deleteWorkout: (id: string) =>
    apiClient.delete(`/workouts/${id}`),

  // Get workout templates
  getTemplates: () =>
    apiClient.get<Workout[]>('/workouts/templates'),

  // Create from template
  createFromTemplate: (templateId: string) =>
    apiClient.post<Workout>(`/workouts/templates/${templateId}/create`),

  // Get active workout
  getActiveWorkout: () =>
    apiClient.get<Workout | null>('/workouts/active'),

  // Start workout
  startWorkout: (workoutId?: string) =>
    apiClient.post<Workout>('/workouts/start', { workoutId }),

  // Complete workout
  completeWorkout: (id: string, data: { duration: number; totalVolume: number }) =>
    apiClient.post<Workout>(`/workouts/${id}/complete`, data),

  // Get workout history
  getHistory: (startDate?: string, endDate?: string) =>
    apiClient.get<Workout[]>(`/workouts/history?start=${startDate || ''}&end=${endDate || ''}`),

  // Get workout stats
  getStats: () =>
    apiClient.get<{
      totalWorkouts: number;
      totalVolume: number;
      totalDuration: number;
      averageDuration: number;
      workoutsThisWeek: number;
      workoutsThisMonth: number;
    }>('/workouts/stats'),
};
