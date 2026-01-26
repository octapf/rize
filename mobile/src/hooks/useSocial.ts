import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialApi } from '@/services/api/social.api';

export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: socialApi.getFriends,
  });
};

export const usePendingRequests = () => {
  return useQuery({
    queryKey: ['pending-requests'],
    queryFn: socialApi.getPendingRequests,
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['pending-requests'] });
    },
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-requests'] });
    },
  });
};

export const useFeed = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['feed', page, limit],
    queryFn: () => socialApi.getFeed(page, limit),
  });
};

export const useLikeWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.likeWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useUnlikeWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.unlikeWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useComments = (workoutId: string) => {
  return useQuery({
    queryKey: ['comments', workoutId],
    queryFn: () => socialApi.getComments(workoutId),
    enabled: !!workoutId,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ workoutId, content }: { workoutId: string; content: string }) =>
      socialApi.addComment(workoutId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.workoutId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
