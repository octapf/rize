import { apiClient } from './client';

export interface Exercise {
  _id: string;
  name: {
    es: string;
    en: string;
  };
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills';
  difficulty: number;
  description?: {
    es: string;
    en: string;
  };
  isGlobal: boolean;
}

export interface ExercisesQuery {
  page?: number;
  limit?: number;
  category?: 'push' | 'pull' | 'legs' | 'core' | 'skills';
  difficulty?: number;
  search?: string;
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

export const exercisesApi = {
  getExercises: async (query?: ExercisesQuery): Promise<ExercisesResponse> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.category) params.append('category', query.category);
    if (query?.difficulty) params.append('difficulty', query.difficulty.toString());
    if (query?.search) params.append('search', query.search);

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
};
