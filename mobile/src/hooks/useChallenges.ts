import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { challengesApi, Challenge, CreateChallengeData } from '@/services/api/challenges.api';

export function useChallenges(status?: Challenge['status']) {
  return useQuery({
    queryKey: ['challenges', status],
    queryFn: () => challengesApi.getUserChallenges(status),
  });
}

export function useChallenge(id: string) {
  return useQuery({
    queryKey: ['challenge', id],
    queryFn: () => challengesApi.getChallenge(id),
    enabled: !!id,
  });
}

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChallengeData) => challengesApi.createChallenge(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}

export function useAcceptChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.acceptChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}

export function useRejectChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.rejectChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}

export function useUpdateChallengeProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.updateChallengeProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}
