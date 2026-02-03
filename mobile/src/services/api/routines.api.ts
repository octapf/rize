import { apiClient } from './client';

export interface DaySchedule {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Routine {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  isActive: boolean;
  schedule: DaySchedule;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoutineInput {
  name: string;
  description?: string;
  schedule: DaySchedule;
  isActive?: boolean;
}

export interface UpdateRoutineInput {
  name?: string;
  description?: string;
  schedule?: DaySchedule;
  isActive?: boolean;
}

export interface RoutinesQuery {
  isActive?: boolean;
}

export interface RoutinesResponse {
  success: boolean;
  data: Routine[];
}

export interface SingleRoutineResponse {
  success: boolean;
  data: Routine;
}

export interface TodaysWorkoutResponse {
  success: boolean;
  data: {
    routine: {
      _id: string;
      name: string;
    };
    template: any;
    day: string;
  } | null;
}

export const routinesApi = {
  async getRoutines(query?: RoutinesQuery): Promise<RoutinesResponse> {
    const params = new URLSearchParams();
    if (query?.isActive !== undefined) {
      params.append('isActive', String(query.isActive));
    }

    const response = await apiClient.get(`/routines?${params.toString()}`);
    return response.data;
  },

  async getActiveRoutine(): Promise<SingleRoutineResponse> {
    const response = await apiClient.get('/routines/active');
    return response.data;
  },

  async getTodaysWorkout(): Promise<TodaysWorkoutResponse> {
    const response = await apiClient.get('/routines/today');
    return response.data;
  },

  async getRoutineById(id: string): Promise<SingleRoutineResponse> {
    const response = await apiClient.get(`/routines/${id}`);
    return response.data;
  },

  async createRoutine(data: CreateRoutineInput): Promise<SingleRoutineResponse> {
    const response = await apiClient.post('/routines', data);
    return response.data;
  },

  async updateRoutine(
    id: string,
    data: UpdateRoutineInput
  ): Promise<SingleRoutineResponse> {
    const response = await apiClient.patch(`/routines/${id}`, data);
    return response.data;
  },

  async deleteRoutine(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`/routines/${id}`);
    return response.data;
  },
};
