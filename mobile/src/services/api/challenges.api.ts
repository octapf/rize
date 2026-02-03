import { apiClient } from './client';

export interface Challenge {
  _id: string;
  challengerId: {
    _id: string;
    username: string;
    name: string;
    avatar?: string;
  };
  challengedId: {
    _id: string;
    username: string;
    name: string;
    avatar?: string;
  };
  type: 'workout_count' | 'volume' | 'specific_exercise' | 'streak';
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'expired';
  targetValue: number;
  unit?: string;
  exerciseId?: {
    _id: string;
    name: {
      es: string;
      en: string;
    };
  };
  duration: number;
  startDate?: string;
  endDate?: string;
  challengerProgress: number;
  challengedProgress: number;
  winner?: string;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
}

export interface CreateChallengeData {
  challengedId: string;
  type: Challenge['type'];
  targetValue: number;
  unit?: string;
  exerciseId?: string;
  duration: number;
}

export const challengesApi = {
  /**
   * Crear un reto
   */
  async createChallenge(data: CreateChallengeData): Promise<{ success: boolean; data: Challenge }> {
    const response = await apiClient.post('/challenges', data);
    return response.data;
  },

  /**
   * Obtener retos del usuario
   */
  async getUserChallenges(status?: Challenge['status']): Promise<{ success: boolean; data: Challenge[] }> {
    const response = await apiClient.get('/challenges', {
      params: status ? { status } : undefined,
    });
    return response.data;
  },

  /**
   * Obtener un reto específico
   */
  async getChallenge(id: string): Promise<{ success: boolean; data: Challenge }> {
    const response = await apiClient.get(`/challenges/${id}`);
    return response.data;
  },

  /**
   * Aceptar reto
   */
  async acceptChallenge(id: string): Promise<{ success: boolean; data: Challenge }> {
    const response = await apiClient.put(`/challenges/${id}/accept`);
    return response.data;
  },

  /**
   * Rechazar reto
   */
  async rejectChallenge(id: string): Promise<{ success: boolean; data: Challenge }> {
    const response = await apiClient.put(`/challenges/${id}/reject`);
    return response.data;
  },

  /**
   * Actualizar progreso del reto
   */
  async updateChallengeProgress(id: string): Promise<{ success: boolean; data: Challenge }> {
    const response = await apiClient.put(`/challenges/${id}/progress`);
    return response.data;
  },
};
