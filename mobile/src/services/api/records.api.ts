import { apiClient } from './client';

export interface PersonalRecord {
  _id: string;
  userId: string;
  exerciseId: any;
  type: 'weight' | 'reps' | 'volume' | 'duration' | 'distance';
  value: number;
  unit?: string;
  workoutId: string;
  achievedAt: string;
  previousValue?: number;
  improvement?: number;
}

export interface ExerciseRecords {
  exerciseId: any;
  records: {
    [key: string]: {
      _id: string;
      type: string;
      value: number;
      unit?: string;
      achievedAt: string;
      workoutId: string;
      previousValue?: number;
      improvement?: number;
    };
  };
}

export interface RecordsResponse {
  success: boolean;
  data: ExerciseRecords[];
}

export interface RecordsListResponse {
  success: boolean;
  data: PersonalRecord[];
}

export const recordsApi = {
  async getUserRecords(): Promise<RecordsResponse> {
    const response = await apiClient.get('/records');
    return response.data;
  },

  async getExerciseRecords(exerciseId: string): Promise<RecordsListResponse> {
    const response = await apiClient.get(`/records/exercise/${exerciseId}`);
    return response.data;
  },

  async getRecentRecords(days: number = 30): Promise<RecordsListResponse> {
    const response = await apiClient.get(`/records/recent?days=${days}`);
    return response.data;
  },
};
