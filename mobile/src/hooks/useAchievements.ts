import { useQuery, useMutation, useQueryClient } from '@tantml/react-query';
import { achievementsApi } from '@/services/api/achievements.api';

export const useAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: achievementsApi.getUserAchievements,
  });
};

export const useCheckAchievements = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: achievementsApi.checkAchievements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
    },
  });
};
