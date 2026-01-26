import type { Request, Response } from 'express';
import { socialService } from './social.service';
import { asyncHandler } from '@/utils/asyncHandler';

// Friends

export const sendFriendRequest = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { recipientId } = req.body;

  const friendship = await socialService.sendFriendRequest(userId, recipientId);

  res.status(201).json({
    success: true,
    data: friendship,
  });
});

export const acceptFriendRequest = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { friendshipId } = req.params;

  const friendship = await socialService.acceptFriendRequest(userId, friendshipId);

  res.json({
    success: true,
    data: friendship,
  });
});

export const rejectFriendRequest = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { friendshipId } = req.params;

  await socialService.rejectFriendRequest(userId, friendshipId);

  res.json({
    success: true,
    message: 'Friend request rejected',
  });
});

export const removeFriend = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { friendId } = req.params;

  await socialService.removeFriend(userId, friendId);

  res.json({
    success: true,
    message: 'Friend removed',
  });
});

export const getFriends = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const friends = await socialService.getFriends(userId);

  res.json({
    success: true,
    data: friends,
  });
});

export const getPendingRequests = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();

  const requests = await socialService.getPendingRequests(userId);

  res.json({
    success: true,
    data: requests,
  });
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const query = req.query.q as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

  if (!query) {
    return res.json({ success: true, data: [] });
  }

  const users = await socialService.searchUsers(query, userId, limit);

  res.json({
    success: true,
    data: users,
  });
});

// Feed

export const getFeed = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

  const feed = await socialService.getFriendsFeed(userId, page, limit);

  res.json({
    success: true,
    data: feed.workouts,
    pagination: {
      total: feed.total,
      page: feed.page,
      pages: feed.pages,
    },
  });
});

// Likes

export const likeWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { workoutId } = req.params;

  await socialService.likeWorkout(userId, workoutId);

  res.status(201).json({
    success: true,
    message: 'Workout liked',
  });
});

export const unlikeWorkout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { workoutId } = req.params;

  await socialService.unlikeWorkout(userId, workoutId);

  res.json({
    success: true,
    message: 'Workout unliked',
  });
});

// Comments

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { workoutId } = req.params;
  const { content } = req.body;

  const comment = await socialService.addComment(userId, workoutId, content);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const { workoutId } = req.params;

  const comments = await socialService.getComments(workoutId);

  res.json({
    success: true,
    data: comments,
  });
});

export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id.toString();
  const { commentId } = req.params;

  await socialService.deleteComment(userId, commentId);

  res.json({
    success: true,
    message: 'Comment deleted',
  });
});
