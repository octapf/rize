import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { Alert } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Unauthorized - logout
              useAuthStore.getState().logout();
              Alert.alert('Sesión Expirada', 'Por favor inicia sesión nuevamente');
              break;
            case 403:
              Alert.alert('Acceso Denegado', 'No tienes permiso para realizar esta acción');
              break;
            case 404:
              Alert.alert('No Encontrado', 'El recurso solicitado no existe');
              break;
            case 500:
              Alert.alert('Error del Servidor', 'Ocurrió un error en el servidor. Intenta más tarde.');
              break;
            default:
              if (error.response.data && typeof error.response.data === 'object') {
                const message = (error.response.data as any).message || 'Ocurrió un error';
                Alert.alert('Error', message);
              }
          }
        } else if (error.request) {
          Alert.alert('Error de Conexión', 'No se pudo conectar al servidor. Verifica tu conexión.');
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic methods
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Upload file
  async uploadFile<T>(url: string, file: any, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: any) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<T>(url, formData, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
