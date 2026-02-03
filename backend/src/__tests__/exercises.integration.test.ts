/**
 * Integration tests for Exercises API (GET /api/v1/exercises/*)
 * Tests search, filtering, and CRUD operations
 */
import request from 'supertest';
import { app } from '../server';
import { setupDb, teardownDb } from './setup';
import { User } from '../models/User';
import { Exercise } from '../models/Exercise';

describe('Exercises API', () => {
  let accessToken: string;
  let userId: string;

  beforeAll(async () => {
    await setupDb();

    // Create test user
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'exercises.test@rize.dev',
        username: 'exercisetest',
        password: 'Password123',
      })
      .expect(201);

    accessToken = registerRes.body.data.accessToken;
    userId = registerRes.body.data.user._id;
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'exercises.test@rize.dev' });
    await teardownDb();
  });

  describe('GET /api/v1/exercises', () => {
    it('should return all exercises without auth', async () => {
      const res = await request(app)
        .get('/api/v1/exercises')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toMatchObject({
        name: expect.any(String),
        category: expect.any(String),
        muscleGroup: expect.any(String),
        difficulty: expect.any(String),
      });
    });

    it('should filter by muscle group', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?muscleGroup=CHEST')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      res.body.data.forEach((ex: any) => {
        expect(ex.muscleGroup).toBe('CHEST');
      });
    });

    it('should filter by category', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?category=PUSH')
        .expect(200);

      expect(res.body.success).toBe(true);
      res.body.data.forEach((ex: any) => {
        expect(ex.category).toBe('PUSH');
      });
    });

    it('should filter by difficulty', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?difficulty=BEGINNER')
        .expect(200);

      expect(res.body.success).toBe(true);
      res.body.data.forEach((ex: any) => {
        expect(ex.difficulty).toBe('BEGINNER');
      });
    });

    it('should filter by equipment', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?equipment=BAR')
        .expect(200);

      expect(res.body.success).toBe(true);
      res.body.data.forEach((ex: any) => {
        expect(ex.equipment).toBe('BAR');
      });
    });

    it('should search by name', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?search=push')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      res.body.data.forEach((ex: any) => {
        expect(ex.name.toLowerCase()).toContain('push');
      });
    });

    it('should combine multiple filters', async () => {
      const res = await request(app)
        .get('/api/v1/exercises?muscleGroup=CHEST&difficulty=INTERMEDIATE')
        .expect(200);

      expect(res.body.success).toBe(true);
      res.body.data.forEach((ex: any) => {
        expect(ex.muscleGroup).toBe('CHEST');
        expect(ex.difficulty).toBe('INTERMEDIATE');
      });
    });
  });

  describe('GET /api/v1/exercises/:id', () => {
    let exerciseId: string;

    beforeAll(async () => {
      const allExercises = await request(app).get('/api/v1/exercises');
      exerciseId = allExercises.body.data[0]._id;
    });

    it('should get single exercise by ID', async () => {
      const res = await request(app)
        .get(`/api/v1/exercises/${exerciseId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        _id: exerciseId,
        name: expect.any(String),
        category: expect.any(String),
        muscleGroup: expect.any(String),
      });
    });

    it('should return 404 for invalid ID', async () => {
      const res = await request(app)
        .get('/api/v1/exercises/507f1f77bcf86cd799439011')
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/exercises/categories/list', () => {
    it('should return list of categories', async () => {
      const res = await request(app)
        .get('/api/v1/exercises/categories/list')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toContain('PUSH');
      expect(res.body.data).toContain('PULL');
      expect(res.body.data).toContain('LEGS');
    });
  });

  describe('GET /api/v1/exercises/muscle-groups/list', () => {
    it('should return list of muscle groups', async () => {
      const res = await request(app)
        .get('/api/v1/exercises/muscle-groups/list')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toContain('CHEST');
      expect(res.body.data).toContain('BACK');
      expect(res.body.data).toContain('LEGS');
    });
  });
});
