import { apiClient } from './client';
import type { Exercise } from './exercises.api';

export interface WorkoutTemplate {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  category?: 'push' | 'pull' | 'legs' | 'core' | 'upper' | 'lower' | 'full-body' | 'custom';
  exercises: {
    exerciseId: Exercise | string;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }[];
    notes?: string;
  }[];
  isPublic: boolean;
  usageCount: number;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateInput {
  name: string;
  description?: string;
  category?: WorkoutTemplate['category'];
  exercises: {
    exerciseId: string;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }[];
    notes?: string;
  }[];
  isPublic?: boolean;
}

export interface CreateFromWorkoutInput {
  name: string;
  description?: string;
  category?: WorkoutTemplate['category'];
  isPublic?: boolean;
}

export interface TemplatesQuery {
  page?: number;
  limit?: number;
  category?: WorkoutTemplate['category'];
  isPublic?: boolean;
}

export interface TemplatesResponse {
  success: boolean;
  data: WorkoutTemplate[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface SingleTemplateResponse {
  success: boolean;
  data: WorkoutTemplate;
}

export const templatesApi = {
  getTemplates: async (query?: TemplatesQuery): Promise<TemplatesResponse> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.category) params.append('category', query.category);
    if (query?.isPublic !== undefined) params.append('isPublic', query.isPublic.toString());

    const response = await apiClient.get<TemplatesResponse>(
      `/templates?${params.toString()}`
    );
    return response.data;
  },

  getPublicTemplates: async (query?: TemplatesQuery): Promise<TemplatesResponse> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.category) params.append('category', query.category);

    const response = await apiClient.get<TemplatesResponse>(
      `/templates/public?${params.toString()}`
    );
    return response.data;
  },

  getTemplateById: async (id: string): Promise<SingleTemplateResponse> => {
    const response = await apiClient.get<SingleTemplateResponse>(`/templates/${id}`);
    return response.data;
  },

  createTemplate: async (data: CreateTemplateInput): Promise<SingleTemplateResponse> => {
    const response = await apiClient.post<SingleTemplateResponse>('/templates', data);
    return response.data;
  },

  createFromWorkout: async (
    workoutId: string,
    data: CreateFromWorkoutInput
  ): Promise<SingleTemplateResponse> => {
    const response = await apiClient.post<SingleTemplateResponse>(
      `/templates/from-workout/${workoutId}`,
      data
    );
    return response.data;
  },

  updateTemplate: async (
    id: string,
    data: Partial<CreateTemplateInput>
  ): Promise<SingleTemplateResponse> => {
    const response = await apiClient.patch<SingleTemplateResponse>(`/templates/${id}`, data);
    return response.data;
  },

  deleteTemplate: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/templates/${id}`);
    return response.data;
  },

  createWorkoutFromTemplate: async (templateId: string, name?: string): Promise<any> => {
    const response = await apiClient.post(`/workouts/from-template/${templateId}`, { name });
    return response.data;
  },
};
