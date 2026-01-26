import { apiClient } from './client';

export interface Exercise {
  _id: string;
  name: {
    es: string;
    en: string;
  };
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio' | 'flexibility';
  difficulty: number;
  type: 'reps' | 'time' | 'distance';
  unit?: 'seconds' | 'minutes' | 'meters' | 'kilometers' | 'miles';
  description?: {
    es: string;
    en: string;
  };
  isGlobal: boolean;
  createdBy?: string;
}

export interface ExercisesQuery {
  page?: number;
  limit?: number;
  category?: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio' | 'flexibility';
  difficulty?: number;
  search?: string;
  type?: 'reps' | 'time' | 'distance';
}

export interface CreateExerciseInput {
  name: {
    es: string;
    en: string;
  };
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio' | 'flexibility';
  difficulty: number;
  type: 'reps' | 'time' | 'distance';
  unit?: 'seconds' | 'minutes' | 'meters' | 'kilometers' | 'miles';
  description?: {
    es: string;
    en: string;
  };
}

export interface ExercisesResponse {
  success: boolean;
  data: Exercise[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface SingleExerciseResponse {
  success: boolean;
  data: Exercise;
}

export const exercisesApi = {
  getExercises: async (query?: ExercisesQuery): Promise<ExercisesResponse> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.category) params.append('category', query.category);
    if (query?.difficulty) params.append('difficulty', query.difficulty.toString());
    if (query?.search) params.append('search', query.search);
    if (query?.type) params.append('type', query.type);

    const response = await apiClient.get<ExercisesResponse>(
      `/exercises?${params.toString()}`
    );
    return response.data;
  },

  getExercisesByCategory: async (category: string): Promise<ExercisesResponse> => {
    const response = await apiClient.get<ExercisesResponse>(
      `/exercises/category/${category}`
    );
    return response.data;
  },

  createCustomExercise: async (data: CreateExerciseInput): Promise<SingleExerciseResponse> => {
    const response = await apiClient.post<SingleExerciseResponse>('/exercises/custom', data);
    return response.data;
  },

  getUserCustomExercises: async (): Promise<ExercisesResponse> => {
    const response = await apiClient.get<ExercisesResponse>('/exercises/custom/my');
    return response.data;
  },

  updateCustomExercise: async (id: string, data: Partial<CreateExerciseInput>): Promise<SingleExerciseResponse> => {
    const response = await apiClient.patch<SingleExerciseResponse>(`/exercises/custom/${id}`, data);
    return response.data;
  },

  deleteCustomExercise: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/exercises/custom/${id}`);
    return response.data;
  },
};
