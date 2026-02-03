import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useFriends,
  usePendingRequests,
  useSendFriendRequest,
  useAcceptFriendRequest,
  useRejectFriendRequest,
  useFeed,
  useLikeWorkout,
  useUnlikeWorkout,
  useComments,
  useAddComment,
} from '../useSocial';
import { socialApi } from '@/services/api/social.api';

// Mock the API
jest.mock('@/services/api/social.api', () => ({
  socialApi: {
    getFriends: jest.fn(),
    getPendingRequests: jest.fn(),
    sendFriendRequest: jest.fn(),
    acceptFriendRequest: jest.fn(),
    rejectFriendRequest: jest.fn(),
    getFeed: jest.fn(),
    likeWorkout: jest.fn(),
    unlikeWorkout: jest.fn(),
    getComments: jest.fn(),
    addComment: jest.fn(),
  },
}));

describe('useSocial Hooks', () => {
  let queryClient: QueryClient;
  let wrapper: any;

  const createWrapper = (client: QueryClient) => {
    const Wrapper = ({ children }: any) =>
      React.createElement(QueryClientProvider, { client }, children);
    return Wrapper;
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    wrapper = createWrapper(queryClient);
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('useFriends', () => {
    it('should fetch friends successfully', async () => {
      const mockFriends = [
        { id: '1', username: 'friend1', avatar: 'url1' },
        { id: '2', username: 'friend2', avatar: 'url2' },
      ];

      (socialApi.getFriends as jest.Mock).mockResolvedValue(mockFriends);

      const { result } = renderHook(() => useFriends(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockFriends);
      expect(socialApi.getFriends).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error', async () => {
      (socialApi.getFriends as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => useFriends(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('usePendingRequests', () => {
    it('should fetch pending requests successfully', async () => {
      const mockRequests = [
        { id: '1', from: 'user1', createdAt: new Date() },
        { id: '2', from: 'user2', createdAt: new Date() },
      ];

      (socialApi.getPendingRequests as jest.Mock).mockResolvedValue(mockRequests);

      const { result } = renderHook(() => usePendingRequests(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockRequests);
    });
  });

  describe('useSendFriendRequest', () => {
    it('should send friend request successfully', async () => {
      (socialApi.sendFriendRequest as jest.Mock).mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useSendFriendRequest(), { wrapper });

      await result.current.mutateAsync('user123');

      expect(socialApi.sendFriendRequest).toHaveBeenCalledWith('user123');
      expect(result.current.isSuccess).toBe(true);
    });

    it('should invalidate friends query on success', async () => {
      (socialApi.sendFriendRequest as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useSendFriendRequest(), { wrapper });

      await result.current.mutateAsync('user123');

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['friends'] });
    });
  });

  describe('useAcceptFriendRequest', () => {
    it('should accept friend request successfully', async () => {
      (socialApi.acceptFriendRequest as jest.Mock).mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useAcceptFriendRequest(), { wrapper });

      await result.current.mutateAsync('request123');

      expect(socialApi.acceptFriendRequest).toHaveBeenCalledWith('request123');
    });

    it('should invalidate both friends and pending requests', async () => {
      (socialApi.acceptFriendRequest as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useAcceptFriendRequest(), { wrapper });

      await result.current.mutateAsync('request123');

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['friends'] });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['pending-requests'],
      });
    });
  });

  describe('useRejectFriendRequest', () => {
    it('should reject friend request successfully', async () => {
      (socialApi.rejectFriendRequest as jest.Mock).mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useRejectFriendRequest(), { wrapper });

      await result.current.mutateAsync('request123');

      expect(socialApi.rejectFriendRequest).toHaveBeenCalledWith('request123');
    });

    it('should invalidate pending requests only', async () => {
      (socialApi.rejectFriendRequest as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useRejectFriendRequest(), { wrapper });

      await result.current.mutateAsync('request123');

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['pending-requests'],
      });
      expect(invalidateSpy).not.toHaveBeenCalledWith({ queryKey: ['friends'] });
    });
  });

  describe('useFeed', () => {
    it('should fetch feed with default pagination', async () => {
      const mockFeed = [
        { id: '1', user: 'user1', workout: {} },
        { id: '2', user: 'user2', workout: {} },
      ];

      (socialApi.getFeed as jest.Mock).mockResolvedValue(mockFeed);

      const { result } = renderHook(() => useFeed(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(socialApi.getFeed).toHaveBeenCalledWith(1, 20);
      expect(result.current.data).toEqual(mockFeed);
    });

    it('should fetch feed with custom pagination', async () => {
      const mockFeed = [{ id: '1', user: 'user1', workout: {} }];

      (socialApi.getFeed as jest.Mock).mockResolvedValue(mockFeed);

      const { result } = renderHook(() => useFeed(2, 10), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(socialApi.getFeed).toHaveBeenCalledWith(2, 10);
    });
  });

  describe('useLikeWorkout', () => {
    it('should like workout successfully', async () => {
      (socialApi.likeWorkout as jest.Mock).mockResolvedValue({ success: true });

      const { result } = renderHook(() => useLikeWorkout(), { wrapper });

      await result.current.mutateAsync('workout123');

      expect(socialApi.likeWorkout).toHaveBeenCalledWith('workout123');
    });

    it('should invalidate feed on like', async () => {
      (socialApi.likeWorkout as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useLikeWorkout(), { wrapper });

      await result.current.mutateAsync('workout123');

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['feed'] });
    });
  });

  describe('useUnlikeWorkout', () => {
    it('should unlike workout successfully', async () => {
      (socialApi.unlikeWorkout as jest.Mock).mockResolvedValue({
        success: true,
      });

      const { result } = renderHook(() => useUnlikeWorkout(), { wrapper });

      await result.current.mutateAsync('workout123');

      expect(socialApi.unlikeWorkout).toHaveBeenCalledWith('workout123');
    });

    it('should invalidate feed on unlike', async () => {
      (socialApi.unlikeWorkout as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useUnlikeWorkout(), { wrapper });

      await result.current.mutateAsync('workout123');

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['feed'] });
    });
  });

  describe('useComments', () => {
    it('should fetch comments for workout', async () => {
      const mockComments = [
        { id: '1', user: 'user1', content: 'Great workout!', createdAt: new Date() },
        { id: '2', user: 'user2', content: 'Nice!', createdAt: new Date() },
      ];

      (socialApi.getComments as jest.Mock).mockResolvedValue(mockComments);

      const { result } = renderHook(() => useComments('workout123'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(socialApi.getComments).toHaveBeenCalledWith('workout123');
      expect(result.current.data).toEqual(mockComments);
    });

    it('should not fetch when workoutId is empty', () => {
      const { result } = renderHook(() => useComments(''), { wrapper });

      expect(result.current.fetchStatus).toBe('idle');
      expect(socialApi.getComments).not.toHaveBeenCalled();
    });
  });

  describe('useAddComment', () => {
    it('should add comment successfully', async () => {
      const mockComment = {
        id: '1',
        workoutId: 'workout123',
        content: 'Great job!',
      };

      (socialApi.addComment as jest.Mock).mockResolvedValue(mockComment);

      const { result } = renderHook(() => useAddComment(), { wrapper });

      await result.current.mutateAsync({
        workoutId: 'workout123',
        content: 'Great job!',
      });

      expect(socialApi.addComment).toHaveBeenCalledWith(
        'workout123',
        'Great job!'
      );
    });

    it('should invalidate comments and feed on success', async () => {
      (socialApi.addComment as jest.Mock).mockResolvedValue({});

      const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useAddComment(), { wrapper });

      await result.current.mutateAsync({
        workoutId: 'workout123',
        content: 'Nice!',
      });

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['comments', 'workout123'],
      });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['feed'] });
    });

    it('should handle add comment error', async () => {
      (socialApi.addComment as jest.Mock).mockRejectedValue(
        new Error('Failed to add comment')
      );

      const { result } = renderHook(() => useAddComment(), { wrapper });

      try {
        await result.current.mutateAsync({
          workoutId: 'workout123',
          content: 'Test',
        });
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect(result.current.isError).toBe(true);
    });
  });
});
