import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/services/api/stats.api';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: statsApi.getDashboard,
  });
};

export const useExerciseProgress = (exerciseId: string) => {
  return useQuery({
    queryKey: ['exercise-progress', exerciseId],
    queryFn: () => statsApi.getExerciseProgress(exerciseId),
    enabled: !!exerciseId,
  });
};

export const useStreak = () => {
  return useQuery({
    queryKey: ['streak'],
    queryFn: statsApi.getStreak,
  });
};

export const useLeaderboard = (limit = 100) => {
  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: () => statsApi.getLeaderboard(limit),
  });
};
