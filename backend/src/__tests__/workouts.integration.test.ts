/**
 * Integration tests for Workouts API (GET/POST/PATCH/DELETE /api/v1/workouts)
 * Requires MongoDB and .env. Depends on Exercise existing (run seed first or create in setup).
 */
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server';
import { setupDb, teardownDb } from './setup';
import { Exercise } from '../models/Exercise';
import { User } from '../models/User';

describe('Workouts API', () => {
  let accessToken: string;
  let exerciseId: string;
  let userId: string;

  beforeAll(async () => {
    await setupDb();
    // Ensure we have at least one exercise (use existing or create)
    let exercise = await Exercise.findOne();
    if (!exercise) {
      exercise = await Exercise.create({
        name: { es: 'Flexiones', en: 'Push-ups' },
        category: 'push',
        difficulty: 1,
        type: 'reps',
        isGlobal: true,
      });
    }
    exerciseId = exercise._id.toString();

    // Create a user and get token
    const registerRes = await request(app).post('/api/v1/auth/register').send({
      email: 'workout.test@rize.dev',
      username: 'workouttest',
      password: 'Password123',
    });
    accessToken = registerRes.body.data.accessToken;
    userId = registerRes.body.data.user._id;
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'workout.test@rize.dev' });
    await teardownDb();
  });

  describe('POST /api/v1/workouts', () => {
    it('should create a workout with valid body', async () => {
      const body = {
        name: 'Test workout',
        exercises: [
          {
            exerciseId,
            sets: [{ reps: 10, completed: true }, { reps: 8, completed: false }],
          },
        ],
        visibility: 'private' as const,
      };

      const res = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(body)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        name: 'Test workout',
        visibility: 'private',
        user: userId,
      });
      expect(res.body.data.exercises).toHaveLength(1);
      expect(res.body.data.exercises[0].sets).toHaveLength(2);
      expect(res.body.data._id).toBeDefined();
    });

    it('should reject without auth with 401', async () => {
      await request(app)
        .post('/api/v1/workouts')
        .send({
          name: 'No auth',
          exercises: [{ exerciseId, sets: [{ reps: 5, completed: true }] }],
        })
        .expect(401);
    });

    it('should reject invalid exerciseId with 400', async () => {
      await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Bad',
          exercises: [{ exerciseId: 'invalid', sets: [{ reps: 5, completed: true }] }],
        })
        .expect(400);
    });
  });

  describe('GET /api/v1/workouts', () => {
    it('should return user workouts with pagination', async () => {
      const res = await request(app)
        .get('/api/v1/workouts')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toMatchObject({
        total: expect.any(Number),
        page: expect.any(Number),
        pages: expect.any(Number),
      });
    });

    it('should reject without auth with 401', async () => {
      await request(app).get('/api/v1/workouts').expect(401);
    });
  });

  describe('GET /api/v1/workouts/stats', () => {
    it('should return workout stats', async () => {
      const res = await request(app)
        .get('/api/v1/workouts/stats')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });
  });

  describe('GET /api/v1/workouts/:id and DELETE', () => {
    let workoutId: string;

    beforeAll(async () => {
      const createRes = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'To fetch and delete',
          exercises: [{ exerciseId, sets: [{ reps: 5, completed: true }] }],
        });
      workoutId = createRes.body.data._id;
    });

    it('should get workout by id', async () => {
      const res = await request(app)
        .get(`/api/v1/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(workoutId);
      expect(res.body.data.name).toBe('To fetch and delete');
    });

    it('should return 404 for non-existent id', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/v1/workouts/${fakeId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should delete workout by id', async () => {
      await request(app)
        .delete(`/api/v1/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      await request(app)
        .get(`/api/v1/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
