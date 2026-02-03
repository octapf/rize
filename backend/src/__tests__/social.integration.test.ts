/**
 * Integration tests for Social API (POST /api/v1/social/*)
 * Tests friendships, likes, comments, and feed functionality
 */
import request from 'supertest';
import { app } from '../server';
import { setupDb, teardownDb } from './setup';
import { User } from '../models/User';
import { Workout } from '../models/Workout';
import { Friendship } from '../models/Friendship';
import { WorkoutLike } from '../models/WorkoutLike';
import { WorkoutComment } from '../models/WorkoutComment';

describe('Social API', () => {
  let user1Token: string;
  let user1Id: string;
  let user2Token: string;
  let user2Id: string;
  let workoutId: string;

  beforeAll(async () => {
    await setupDb();

    // Create user 1
    const user1Res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'social1.test@rize.dev',
        username: 'socialtest1',
        password: 'Password123',
      });

    user1Token = user1Res.body.data.accessToken;
    user1Id = user1Res.body.data.user._id;

    // Create user 2
    const user2Res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'social2.test@rize.dev',
        username: 'socialtest2',
        password: 'Password123',
      });

    user2Token = user2Res.body.data.accessToken;
    user2Id = user2Res.body.data.user._id;

    // Create a workout for user 2
    const workoutRes = await request(app)
      .post('/api/v1/workouts')
      .set('Authorization', `Bearer ${user2Token}`)
      .send({
        name: 'Test Workout',
        exercises: [],
      });

    workoutId = workoutRes.body.data._id;
  });

  afterAll(async () => {
    await User.deleteMany({ email: /social.*\.test@rize\.dev/ });
    await Workout.deleteMany({ user: { $in: [user1Id, user2Id] } });
    await Friendship.deleteMany({
      $or: [{ requester: user1Id }, { recipient: user1Id }],
    });
    await WorkoutLike.deleteMany({ user: user1Id });
    await WorkoutComment.deleteMany({ user: user1Id });
    await teardownDb();
  });

  describe('POST /api/v1/social/follow/:userId', () => {
    it('should send friend request', async () => {
      const res = await request(app)
        .post(`/api/v1/social/follow/${user2Id}`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        requester: user1Id,
        recipient: user2Id,
        status: 'pending',
      });
    });

    it('should reject following yourself', async () => {
      const res = await request(app)
        .post(`/api/v1/social/follow/${user1Id}`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should reject duplicate request', async () => {
      const res = await request(app)
        .post(`/api/v1/social/follow/${user2Id}`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .post(`/api/v1/social/follow/${user2Id}`)
        .expect(401);
    });
  });

  describe('POST /api/v1/social/accept/:userId', () => {
    it('should accept friend request', async () => {
      const res = await request(app)
        .post(`/api/v1/social/accept/${user1Id}`)
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('accepted');
    });

    it('should reject accepting non-existent request', async () => {
      const res = await request(app)
        .post(`/api/v1/social/accept/507f1f77bcf86cd799439011`)
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/social/friends', () => {
    it('should return list of friends', async () => {
      const res = await request(app)
        .get('/api/v1/social/friends')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toMatchObject({
        _id: expect.any(String),
        username: expect.any(String),
        level: expect.any(Number),
      });
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/social/friends')
        .expect(401);
    });
  });

  describe('DELETE /api/v1/social/unfollow/:userId', () => {
    it('should unfollow/remove friend', async () => {
      const res = await request(app)
        .delete(`/api/v1/social/unfollow/${user2Id}`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it('should handle non-existent friendship gracefully', async () => {
      const res = await request(app)
        .delete(`/api/v1/social/unfollow/507f1f77bcf86cd799439011`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/social/workouts/:workoutId/like', () => {
    beforeAll(async () => {
      // Re-establish friendship for feed access
      await request(app)
        .post(`/api/v1/social/follow/${user2Id}`)
        .set('Authorization', `Bearer ${user1Token}`);
      
      await request(app)
        .post(`/api/v1/social/accept/${user1Id}`)
        .set('Authorization', `Bearer ${user2Token}`);
    });

    it('should like a workout', async () => {
      const res = await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/like`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        user: user1Id,
        workout: workoutId,
      });
    });

    it('should prevent duplicate likes', async () => {
      const res = await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/like`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/like`)
        .expect(401);
    });
  });

  describe('DELETE /api/v1/social/workouts/:workoutId/like', () => {
    it('should unlike a workout', async () => {
      const res = await request(app)
        .delete(`/api/v1/social/workouts/${workoutId}/like`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('POST /api/v1/social/workouts/:workoutId/comment', () => {
    it('should add comment to workout', async () => {
      const res = await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/comment`)
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ text: 'Great workout!' })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        user: user1Id,
        workout: workoutId,
        text: 'Great workout!',
      });
    });

    it('should reject empty comment', async () => {
      const res = await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/comment`)
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ text: '' })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .post(`/api/v1/social/workouts/${workoutId}/comment`)
        .send({ text: 'Comment' })
        .expect(401);
    });
  });

  describe('GET /api/v1/social/workouts/:workoutId/comments', () => {
    it('should get workout comments', async () => {
      const res = await request(app)
        .get(`/api/v1/social/workouts/${workoutId}/comments`)
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toMatchObject({
        text: 'Great workout!',
        user: expect.objectContaining({
          username: 'socialtest1',
        }),
      });
    });
  });

  describe('GET /api/v1/social/feed', () => {
    it('should return feed of friends workouts', async () => {
      const res = await request(app)
        .get('/api/v1/social/feed')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/v1/social/feed?limit=5&page=1')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeLessThanOrEqual(5);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/social/feed')
        .expect(401);
    });
  });

  describe('GET /api/v1/social/search', () => {
    it('should search for users by username', async () => {
      const res = await request(app)
        .get('/api/v1/social/search?q=socialtest')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', async () => {
      const res = await request(app)
        .get('/api/v1/social/search?q=nonexistentuser12345')
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(0);
    });
  });
});
