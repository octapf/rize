import { Friendship } from '@/models/Friendship';
import { WorkoutLike } from '@/models/WorkoutLike';
import { WorkoutComment } from '@/models/WorkoutComment';
import { Workout } from '@/models/Workout';
import { User } from '@/models/User';
import { AppError } from '@/utils/errors';

/**
 * Social Service - Friends, feed, likes, comments
 */
export class SocialService {
  /**
   * Send friend request
   */
  async sendFriendRequest(requesterId: string, recipientId: string): Promise<any> {
    if (requesterId === recipientId) {
      throw new AppError('Cannot add yourself as friend', 400, 'INVALID_FRIEND_REQUEST');
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Check if friendship already exists
    const existing = await Friendship.findOne({
      $or: [
        { requesterId, recipientId },
        { requesterId: recipientId, recipientId: requesterId },
      ],
    });

    if (existing) {
      if (existing.status === 'accepted') {
        throw new AppError('Already friends', 400, 'ALREADY_FRIENDS');
      }
      if (existing.status === 'pending') {
        throw new AppError('Request already sent', 400, 'REQUEST_PENDING');
      }
      if (existing.status === 'blocked') {
        throw new AppError('Cannot send request', 400, 'USER_BLOCKED');
      }
    }

    const friendship = await Friendship.create({
      requesterId,
      recipientId,
      status: 'pending',
    });

    return friendship;
  }

  /**
   * Accept friend request
   */
  async acceptFriendRequest(userId: string, friendshipId: string): Promise<any> {
    const friendship = await Friendship.findOne({
      _id: friendshipId,
      recipientId: userId,
      status: 'pending',
    });

    if (!friendship) {
      throw new AppError('Friend request not found', 404, 'REQUEST_NOT_FOUND');
    }

    friendship.status = 'accepted';
    await friendship.save();

    return friendship;
  }

  /**
   * Reject friend request
   */
  async rejectFriendRequest(userId: string, friendshipId: string): Promise<void> {
    const friendship = await Friendship.findOne({
      _id: friendshipId,
      recipientId: userId,
      status: 'pending',
    });

    if (!friendship) {
      throw new AppError('Friend request not found', 404, 'REQUEST_NOT_FOUND');
    }

    await friendship.deleteOne();
  }

  /**
   * Remove friend
   */
  async removeFriend(userId: string, friendId: string): Promise<void> {
    const friendship = await Friendship.findOne({
      $or: [
        { requesterId: userId, recipientId: friendId },
        { requesterId: friendId, recipientId: userId },
      ],
      status: 'accepted',
    });

    if (!friendship) {
      throw new AppError('Friendship not found', 404, 'NOT_FRIENDS');
    }

    await friendship.deleteOne();
  }

  /**
   * Get user's friends
   */
  async getFriends(userId: string): Promise<any[]> {
    const friendships = await Friendship.find({
      $or: [{ requesterId: userId }, { recipientId: userId }],
      status: 'accepted',
    })
      .populate('requesterId', 'username xp')
      .populate('recipientId', 'username xp');

    return friendships.map((f) => {
      const friend = f.requesterId._id.toString() === userId ? f.recipientId : f.requesterId;
      return {
        userId: friend._id,
        username: (friend as any).username,
        xp: (friend as any).xp,
        friendshipId: f._id,
      };
    });
  }

  /**
   * Get pending friend requests
   */
  async getPendingRequests(userId: string): Promise<any[]> {
    const requests = await Friendship.find({
      recipientId: userId,
      status: 'pending',
    }).populate('requesterId', 'username xp');

    return requests.map((r) => ({
      requestId: r._id,
      user: {
        userId: r.requesterId._id,
        username: (r.requesterId as any).username,
        xp: (r.requesterId as any).xp,
      },
      createdAt: r.createdAt,
    }));
  }

  /**
   * Search users
   */
  async searchUsers(query: string, currentUserId: string, limit = 20): Promise<any[]> {
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: currentUserId },
      isDeleted: false,
    })
      .select('username xp')
      .limit(limit);

    // Check friendship status for each user
    const userIds = users.map((u) => u._id);
    const friendships = await Friendship.find({
      $or: [
        { requesterId: currentUserId, recipientId: { $in: userIds } },
        { requesterId: { $in: userIds }, recipientId: currentUserId },
      ],
    });

    const friendshipMap = new Map();
    friendships.forEach((f) => {
      const otherId =
        f.requesterId.toString() === currentUserId
          ? f.recipientId.toString()
          : f.requesterId.toString();
      friendshipMap.set(otherId, f.status);
    });

    return users.map((user) => ({
      userId: user._id,
      username: user.username,
      xp: user.xp,
      friendshipStatus: friendshipMap.get(user._id.toString()) || 'none',
    }));
  }

  /**
   * Get friends' feed (public/friends workouts)
   */
  async getFriendsFeed(userId: string, page = 1, limit = 20): Promise<any> {
    // Get friend IDs
    const friendships = await Friendship.find({
      $or: [{ requesterId: userId }, { recipientId: userId }],
      status: 'accepted',
    });

    const friendIds = friendships.map((f) =>
      f.requesterId.toString() === userId ? f.recipientId : f.requesterId
    );

    friendIds.push(userId as any); // Include own workouts

    const skip = (page - 1) * limit;

    const [workouts, total] = await Promise.all([
      Workout.find({
        userId: { $in: friendIds },
        isDeleted: false,
        status: 'completed',
        visibility: { $in: ['public', 'friends'] },
      })
        .populate('userId', 'username xp')
        .populate('exercises.exerciseId', 'name category')
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      Workout.countDocuments({
        userId: { $in: friendIds },
        isDeleted: false,
        status: 'completed',
        visibility: { $in: ['public', 'friends'] },
      }),
    ]);

    // Get likes and comments count for each workout
    const workoutIds = workouts.map((w) => w._id);
    const [likes, comments] = await Promise.all([
      WorkoutLike.aggregate([
        { $match: { workoutId: { $in: workoutIds } } },
        { $group: { _id: '$workoutId', count: { $sum: 1 } } },
      ]),
      WorkoutComment.aggregate([
        { $match: { workoutId: { $in: workoutIds } } },
        { $group: { _id: '$workoutId', count: { $sum: 1 } } },
      ]),
    ]);

    const likesMap = new Map(likes.map((l) => [l._id.toString(), l.count]));
    const commentsMap = new Map(comments.map((c) => [c._id.toString(), c.count]));

    // Check if current user liked each workout
    const userLikes = await WorkoutLike.find({
      workoutId: { $in: workoutIds },
      userId,
    });
    const userLikesSet = new Set(userLikes.map((l) => l.workoutId.toString()));

    const feedItems = workouts.map((workout) => ({
      ...workout.toJSON(),
      likesCount: likesMap.get(workout._id.toString()) || 0,
      commentsCount: commentsMap.get(workout._id.toString()) || 0,
      isLikedByUser: userLikesSet.has(workout._id.toString()),
    }));

    return {
      workouts: feedItems,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Like a workout
   */
  async likeWorkout(userId: string, workoutId: string): Promise<void> {
    const workout = await Workout.findOne({ _id: workoutId, isDeleted: false });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    // Check if workout is accessible
    if (workout.visibility === 'private' && workout.userId.toString() !== userId) {
      const isFriend = await this.areFriends(userId, workout.userId.toString());
      if (!isFriend) {
        throw new AppError('Cannot like private workout', 403, 'FORBIDDEN');
      }
    }

    try {
      await WorkoutLike.create({ workoutId, userId });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new AppError('Already liked', 400, 'ALREADY_LIKED');
      }
      throw error;
    }
  }

  /**
   * Unlike a workout
   */
  async unlikeWorkout(userId: string, workoutId: string): Promise<void> {
    const result = await WorkoutLike.deleteOne({ workoutId, userId });

    if (result.deletedCount === 0) {
      throw new AppError('Like not found', 404, 'NOT_LIKED');
    }
  }

  /**
   * Add comment to workout
   */
  async addComment(userId: string, workoutId: string, content: string): Promise<any> {
    const workout = await Workout.findOne({ _id: workoutId, isDeleted: false });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    // Check if workout is accessible
    if (workout.visibility === 'private' && workout.userId.toString() !== userId) {
      const isFriend = await this.areFriends(userId, workout.userId.toString());
      if (!isFriend) {
        throw new AppError('Cannot comment on private workout', 403, 'FORBIDDEN');
      }
    }

    const comment = await WorkoutComment.create({
      workoutId,
      userId,
      content,
    });

    await comment.populate('userId', 'username xp');

    return comment;
  }

  /**
   * Get workout comments
   */
  async getComments(workoutId: string): Promise<any[]> {
    const comments = await WorkoutComment.find({ workoutId })
      .populate('userId', 'username xp')
      .sort({ createdAt: -1 });

    return comments;
  }

  /**
   * Delete comment
   */
  async deleteComment(userId: string, commentId: string): Promise<void> {
    const comment = await WorkoutComment.findOne({ _id: commentId, userId });

    if (!comment) {
      throw new AppError('Comment not found', 404, 'COMMENT_NOT_FOUND');
    }

    await comment.deleteOne();
  }

  /**
   * Check if two users are friends
   */
  private async areFriends(userId1: string, userId2: string): Promise<boolean> {
    const friendship = await Friendship.findOne({
      $or: [
        { requesterId: userId1, recipientId: userId2 },
        { requesterId: userId2, recipientId: userId1 },
      ],
      status: 'accepted',
    });

    return !!friendship;
  }
}

export const socialService = new SocialService();
