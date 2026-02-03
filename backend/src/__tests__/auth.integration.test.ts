/**
 * Integration tests for Auth API (POST /api/v1/auth/*)
 * Requires MongoDB and .env (MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET).
 */
import request from 'supertest';
import { app } from '../server';
import { setupDb, teardownDb } from './setup';
import { User } from '../models/User';

describe('Auth API', () => {
  beforeAll(async () => {
    await setupDb();
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'auth.test@rize.dev' });
    await teardownDb();
  });

  const validUser = {
    email: 'auth.test@rize.dev',
    username: 'authtest',
    password: 'Password123',
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user and return user + tokens', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(validUser)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        user: expect.objectContaining({
          email: validUser.email,
          username: validUser.username,
          xp: 0,
          level: 1,
        }),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number),
      });
      expect(res.body.data.user.password).toBeUndefined();
    });

    it('should reject duplicate email with 400', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(validUser)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should reject invalid body with 400', async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'bad', username: 'x', password: 'short' })
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login with email and return tokens', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ emailOrUsername: validUser.email, password: validUser.password })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.refreshToken).toBeDefined();
      expect(res.body.data.user.email).toBe(validUser.email);
    });

    it('should login with username', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ emailOrUsername: validUser.username, password: validUser.password })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
    });

    it('should reject wrong password with 401', async () => {
      await request(app)
        .post('/api/v1/auth/login')
        .send({ emailOrUsername: validUser.email, password: 'WrongPass1' })
        .expect(401);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    let refreshToken: string;

    beforeAll(async () => {
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ emailOrUsername: validUser.email, password: validUser.password });
      refreshToken = loginRes.body.data.refreshToken;
    });

    it('should return new access token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.expiresIn).toBeDefined();
    });

    it('should reject invalid refresh token with 401', async () => {
      await request(app)
        .post('/api/v1/auth/refresh')
        .send({ refreshToken: 'invalid' })
        .expect(401);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let accessToken: string;

    beforeAll(async () => {
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ emailOrUsername: validUser.email, password: validUser.password });
      accessToken = loginRes.body.data.accessToken;
    });

    it('should return current user with valid token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(validUser.email);
      expect(res.body.data.username).toBe(validUser.username);
    });

    it('should reject missing or invalid token with 401', async () => {
      await request(app).get('/api/v1/auth/me').expect(401);
      await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid')
        .expect(401);
    });
  });
});
