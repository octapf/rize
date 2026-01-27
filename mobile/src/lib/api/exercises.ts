import { apiClient } from './client';

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
  isCustom?: boolean;
  userId?: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  date: string;
  maxWeight: number;
  maxReps: number;
  oneRepMax: number;
  totalVolume: number;
}

export interface CreateExerciseDto {
  name: string;
  description?: string;
  category: string;
  muscleGroups: string[];
  equipment?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string[];
}

export const exercisesApi = {
  // Get all exercises
  getExercises: (filters?: {
    category?: string;
    muscleGroup?: string;
    equipment?: string;
    difficulty?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    return apiClient.get<Exercise[]>(`/exercises?${params.toString()}`);
  },

  // Get exercise by ID
  getExercise: (id: string) =>
    apiClient.get<Exercise>(`/exercises/${id}`),

  // Create custom exercise
  createExercise: (data: CreateExerciseDto) =>
    apiClient.post<Exercise>('/exercises', data),

  // Update exercise
  updateExercise: (id: string, data: Partial<CreateExerciseDto>) =>
    apiClient.put<Exercise>(`/exercises/${id}`, data),

  // Delete exercise
  deleteExercise: (id: string) =>
    apiClient.delete(`/exercises/${id}`),

  // Get exercise progress
  getProgress: (exerciseId: string, days = 30) =>
    apiClient.get<ExerciseProgress[]>(`/exercises/${exerciseId}/progress?days=${days}`),

  // Get personal records
  getPersonalRecords: (exerciseId: string) =>
    apiClient.get<{
      maxWeight: { weight: number; reps: number; date: string };
      maxReps: { weight: number; reps: number; date: string };
      maxVolume: { volume: number; date: string };
      oneRepMax: { weight: number; date: string };
    }>(`/exercises/${exerciseId}/records`),

  // Get my custom exercises
  getMyExercises: () =>
    apiClient.get<Exercise[]>('/exercises/my'),
};
