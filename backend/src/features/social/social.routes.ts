import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriends,
  getPendingRequests,
  searchUsers,
  getFeed,
  likeWorkout,
  unlikeWorkout,
  addComment,
  getComments,
  deleteComment,
} from './social.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Friends
router.post('/friends/request', sendFriendRequest);
router.post('/friends/accept/:friendshipId', acceptFriendRequest);
router.delete('/friends/reject/:friendshipId', rejectFriendRequest);
router.delete('/friends/:friendId', removeFriend);
router.get('/friends', getFriends);
router.get('/friends/requests', getPendingRequests);

// User search
router.get('/users/search', searchUsers);

// Feed
router.get('/feed', getFeed);

// Likes
router.post('/workouts/:workoutId/like', likeWorkout);
router.delete('/workouts/:workoutId/like', unlikeWorkout);

// Comments
router.post('/workouts/:workoutId/comments', addComment);
router.get('/workouts/:workoutId/comments', getComments);
router.delete('/comments/:commentId', deleteComment);

export default router;
