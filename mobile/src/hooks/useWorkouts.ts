import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  workoutsApi,
  type WorkoutsQuery,
  type CreateWorkoutData,
  type UpdateWorkoutData,
} from '@/services/api/workouts.api';

export const useWorkouts = (query?: WorkoutsQuery) => {
  return useQuery({
    queryKey: ['workouts', query],
    queryFn: () => workoutsApi.getWorkouts(query),
  });
};

export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: () => workoutsApi.getWorkoutById(id),
    enabled: !!id,
  });
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkoutData) => workoutsApi.createWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkoutData }) =>
      workoutsApi.updateWorkout(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['workout', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workoutsApi.deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};

export const useWorkoutStats = (days = 30) => {
  return useQuery({
    queryKey: ['stats', days],
    queryFn: () => workoutsApi.getStats(days),
  });
};
