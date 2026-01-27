import { apiClient } from './client';

export interface FeedPost {
  _id: string;
  userId: string;
  user: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  type: 'workout' | 'achievement' | 'pr' | 'challenge' | 'post';
  content: string;
  workoutId?: string;
  achievementId?: string;
  exerciseId?: string;
  images?: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  userId: string;
  user: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
}

export interface Friendship {
  _id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
}

export const socialApi = {
  // Feed
  getFeed: (page = 1, limit = 20) =>
    apiClient.get<{ posts: FeedPost[]; total: number; page: number }>(
      `/social/feed?page=${page}&limit=${limit}`
    ),

  // Create post
  createPost: (data: { content: string; type?: string; workoutId?: string }) =>
    apiClient.post<FeedPost>('/social/posts', data),

  // Like post
  likePost: (postId: string) =>
    apiClient.post(`/social/posts/${postId}/like`),

  // Unlike post
  unlikePost: (postId: string) =>
    apiClient.delete(`/social/posts/${postId}/like`),

  // Add comment
  addComment: (postId: string, text: string) =>
    apiClient.post<Comment>(`/social/posts/${postId}/comments`, { text }),

  // Delete comment
  deleteComment: (postId: string, commentId: string) =>
    apiClient.delete(`/social/posts/${postId}/comments/${commentId}`),

  // Friends
  getFriends: () =>
    apiClient.get<any[]>('/social/friends'),

  // Friend requests
  getFriendRequests: () =>
    apiClient.get<any[]>('/social/friends/requests'),

  // Send friend request
  sendFriendRequest: (userId: string) =>
    apiClient.post('/social/friends/request', { userId }),

  // Accept friend request
  acceptFriendRequest: (requestId: string) =>
    apiClient.post(`/social/friends/requests/${requestId}/accept`),

  // Reject friend request
  rejectFriendRequest: (requestId: string) =>
    apiClient.delete(`/social/friends/requests/${requestId}`),

  // Remove friend
  removeFriend: (friendId: string) =>
    apiClient.delete(`/social/friends/${friendId}`),

  // Get suggested friends
  getSuggestedFriends: () =>
    apiClient.get<any[]>('/social/friends/suggestions'),
};
