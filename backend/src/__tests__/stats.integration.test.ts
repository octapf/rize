/**
 * Integration tests for Stats API (GET /api/v1/stats/*)
 * Tests user statistics, progress tracking, and analytics
 */
import request from 'supertest';
import { app } from '../server';
import { setupDb, teardownDb } from './setup';
import { User } from '../models/User';
import { Workout } from '../models/Workout';
import { Exercise } from '../models/Exercise';

describe('Stats API', () => {
  let accessToken: string;
  let userId: string;
  let exerciseId: string;

  beforeAll(async () => {
    await setupDb();

    // Create test user
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'stats.test@rize.dev',
        username: 'statstest',
        password: 'Password123',
      })
      .expect(201);

    accessToken = registerRes.body.data.accessToken;
    userId = registerRes.body.data.user._id;

    // Get an exercise ID
    const exercisesRes = await request(app).get('/api/v1/exercises');
    exerciseId = exercisesRes.body.data[0]._id;

    // Create multiple workouts for testing
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    await request(app)
      .post('/api/v1/workouts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Push Day',
        exercises: [
          {
            exercise: exerciseId,
            sets: [
              { reps: 10, weight: 100, completed: true },
              { reps: 8, weight: 110, completed: true },
            ],
          },
        ],
        startedAt: yesterday.toISOString(),
        finishedAt: yesterday.toISOString(),
      });

    await request(app)
      .post('/api/v1/workouts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Pull Day',
        exercises: [
          {
            exercise: exerciseId,
            sets: [
              { reps: 12, weight: 90, completed: true },
              { reps: 10, weight: 100, completed: true },
            ],
          },
        ],
        startedAt: today.toISOString(),
        finishedAt: today.toISOString(),
      });
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'stats.test@rize.dev' });
    await Workout.deleteMany({ user: userId });
    await teardownDb();
  });

  describe('GET /api/v1/stats/overview', () => {
    it('should return user stats overview', async () => {
      const res = await request(app)
        .get('/api/v1/stats/overview')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        totalWorkouts: expect.any(Number),
        currentStreak: expect.any(Number),
        longestStreak: expect.any(Number),
        totalVolume: expect.any(Number),
        totalSets: expect.any(Number),
        totalReps: expect.any(Number),
        level: expect.any(Number),
        xp: expect.any(Number),
      });
      expect(res.body.data.totalWorkouts).toBeGreaterThanOrEqual(2);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/stats/overview')
        .expect(401);
    });
  });

  describe('GET /api/v1/stats/weekly', () => {
    it('should return weekly workout stats', async () => {
      const res = await request(app)
        .get('/api/v1/stats/weekly')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(7); // 7 days
      
      res.body.data.forEach((day: any) => {
        expect(day).toMatchObject({
          day: expect.any(String),
          workouts: expect.any(Number),
          volume: expect.any(Number),
          duration: expect.any(Number),
        });
      });
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/stats/weekly')
        .expect(401);
    });
  });

  describe('GET /api/v1/stats/monthly', () => {
    it('should return monthly workout stats', async () => {
      const res = await request(app)
        .get('/api/v1/stats/monthly')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        totalWorkouts: expect.any(Number),
        totalVolume: expect.any(Number),
        totalDuration: expect.any(Number),
        avgWorkoutsPerWeek: expect.any(Number),
        exercisesDistribution: expect.any(Object),
      });
    });

    it('should support custom month/year', async () => {
      const now = new Date();
      const res = await request(app)
        .get(`/api/v1/stats/monthly?month=${now.getMonth() + 1}&year=${now.getFullYear()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/stats/progress/:exerciseId', () => {
    it('should return progress for specific exercise', async () => {
      const res = await request(app)
        .get(`/api/v1/stats/progress/${exerciseId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        exercise: expect.objectContaining({
          _id: exerciseId,
          name: expect.any(String),
        }),
        history: expect.any(Array),
        personalBest: expect.any(Object),
      });
    });

    it('should return 404 for non-existent exercise', async () => {
      const res = await request(app)
        .get('/api/v1/stats/progress/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .get(`/api/v1/stats/progress/${exerciseId}`)
        .expect(401);
    });
  });

  describe('GET /api/v1/stats/muscle-distribution', () => {
    it('should return muscle group distribution', async () => {
      const res = await request(app)
        .get('/api/v1/stats/muscle-distribution')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        distribution: expect.any(Object),
        totalSets: expect.any(Number),
      });
    });

    it('should support time range filter', async () => {
      const res = await request(app)
        .get('/api/v1/stats/muscle-distribution?days=30')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/stats/volume-chart', () => {
    it('should return volume data for charting', async () => {
      const res = await request(app)
        .get('/api/v1/stats/volume-chart')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      
      res.body.data.forEach((point: any) => {
        expect(point).toMatchObject({
          date: expect.any(String),
          volume: expect.any(Number),
        });
      });
    });

    it('should support custom period', async () => {
      const res = await request(app)
        .get('/api/v1/stats/volume-chart?period=week')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/stats/personal-records', () => {
    it('should return all personal records', async () => {
      const res = await request(app)
        .get('/api/v1/stats/personal-records')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should filter by exercise', async () => {
      const res = await request(app)
        .get(`/api/v1/stats/personal-records?exercise=${exerciseId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/stats/streak', () => {
    it('should return workout streak information', async () => {
      const res = await request(app)
        .get('/api/v1/stats/streak')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        currentStreak: expect.any(Number),
        longestStreak: expect.any(Number),
        lastWorkoutDate: expect.any(String),
      });
    });
  });

  describe('GET /api/v1/stats/heatmap', () => {
    it('should return workout heatmap data', async () => {
      const res = await request(app)
        .get('/api/v1/stats/heatmap')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      
      res.body.data.forEach((entry: any) => {
        expect(entry).toMatchObject({
          date: expect.any(String),
          count: expect.any(Number),
          intensity: expect.any(Number),
        });
      });
    });

    it('should support custom year', async () => {
      const res = await request(app)
        .get(`/api/v1/stats/heatmap?year=${new Date().getFullYear()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/stats/totals', () => {
    it('should return lifetime totals', async () => {
      const res = await request(app)
        .get('/api/v1/stats/totals')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        totalWorkouts: expect.any(Number),
        totalSets: expect.any(Number),
        totalReps: expect.any(Number),
        totalVolume: expect.any(Number),
        totalDuration: expect.any(Number),
        avgDuration: expect.any(Number),
      });
    });
  });
});
