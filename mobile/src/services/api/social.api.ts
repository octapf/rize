import { apiClient } from './client';

export interface Friend {
  userId: string;
  username: string;
  xp: number;
  friendshipId: string;
}

export interface FriendRequest {
  requestId: string;
  user: {
    userId: string;
    username: string;
    xp: number;
  };
  createdAt: string;
}

export interface UserSearchResult {
  userId: string;
  username: string;
  xp: number;
  friendshipStatus: 'none' | 'pending' | 'accepted' | 'rejected' | 'blocked';
}

export interface FeedWorkout {
  _id: string;
  userId: {
    _id: string;
    username: string;
    xp: number;
  };
  name: string;
  date: string;
  exercises: any[];
  xpEarned: number;
  likesCount: number;
  commentsCount: number;
  isLikedByUser: boolean;
}

export interface Comment {
  _id: string;
  workoutId: string;
  userId: {
    _id: string;
    username: string;
    xp: number;
  };
  content: string;
  createdAt: string;
}

export const socialApi = {
  // Friends
  sendFriendRequest: async (recipientId: string) => {
    const response = await apiClient.post('/social/friends/request', {
      recipientId,
    });
    return response.data;
  },

  acceptFriendRequest: async (friendshipId: string) => {
    const response = await apiClient.post(
      `/social/friends/accept/${friendshipId}`,
      {}
    );
    return response.data;
  },

  rejectFriendRequest: async (friendshipId: string) => {
    await apiClient.delete(`/social/friends/reject/${friendshipId}`);
  },

  removeFriend: async (friendId: string) => {
    await apiClient.delete(`/social/friends/${friendId}`);
  },

  getFriends: async (): Promise<{ success: boolean; data: Friend[] }> => {
    const response = await apiClient.get('/social/friends');
    return response.data;
  },

  getPendingRequests: async (): Promise<{
    success: boolean;
    data: FriendRequest[];
  }> => {
    const response = await apiClient.get('/social/friends/requests');
    return response.data;
  },

  searchUsers: async (
    query: string
  ): Promise<{ success: boolean; data: UserSearchResult[] }> => {
    const response = await apiClient.get(`/social/users/search?q=${query}`);
    return response.data;
  },

  // Feed
  getFeed: async (
    page = 1,
    limit = 20
  ): Promise<{
    success: boolean;
    data: FeedWorkout[];
    pagination: { total: number; page: number; pages: number };
  }> => {
    const response = await apiClient.get(
      `/social/feed?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Likes
  likeWorkout: async (workoutId: string) => {
    const response = await apiClient.post(`/social/workouts/${workoutId}/like`, {});
    return response.data;
  },

  unlikeWorkout: async (workoutId: string) => {
    await apiClient.delete(`/social/workouts/${workoutId}/like`);
  },

  // Comments
  addComment: async (workoutId: string, content: string) => {
    const response = await apiClient.post(
      `/social/workouts/${workoutId}/comments`,
      { content }
    );
    return response.data;
  },

  getComments: async (
    workoutId: string
  ): Promise<{ success: boolean; data: Comment[] }> => {
    const response = await apiClient.get(
      `/social/workouts/${workoutId}/comments`
    );
    return response.data;
  },

  deleteComment: async (commentId: string) => {
    await apiClient.delete(`/social/comments/${commentId}`);
  },
};
