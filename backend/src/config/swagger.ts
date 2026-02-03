/**
 * Swagger/OpenAPI configuration for RIZE API
 * Access at: http://localhost:5000/api-docs
 */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RIZE API',
    version: '1.0.0',
    description: 'Calisthenics tracking and social fitness API',
    contact: {
      name: 'RIZE Team',
      url: 'https://github.com/octapf/rize',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Development server',
    },
    {
      url: 'https://api.rize.app/api/v1',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
          email: { type: 'string', format: 'email', example: 'user@rize.app' },
          username: { type: 'string', example: 'fituser123' },
          displayName: { type: 'string', example: 'Fit User' },
          xp: { type: 'number', example: 1500 },
          level: { type: 'number', example: 5 },
          profileImage: { type: 'string', nullable: true },
          bio: { type: 'string', nullable: true },
          streak: { type: 'number', example: 7 },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Exercise: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string', example: 'Push-ups' },
          category: { type: 'string', enum: ['PUSH', 'PULL', 'LEGS', 'CORE', 'CARDIO', 'FULL_BODY'] },
          muscleGroup: { type: 'string', enum: ['CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'CORE', 'CARDIO'] },
          difficulty: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] },
          equipment: { type: 'string', enum: ['BODYWEIGHT', 'BAR', 'RINGS', 'PARALLETTES', 'RESISTANCE_BAND', 'WEIGHTED'] },
          description: { type: 'string' },
          instructions: { type: 'array', items: { type: 'string' } },
          videoUrl: { type: 'string', nullable: true },
          imageUrl: { type: 'string', nullable: true },
        },
      },
      Workout: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          user: { type: 'string' },
          name: { type: 'string', example: 'Morning Push Day' },
          exercises: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                exercise: { type: 'string' },
                sets: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      reps: { type: 'number' },
                      weight: { type: 'number', nullable: true },
                      duration: { type: 'number', nullable: true },
                      completed: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
          startedAt: { type: 'string', format: 'date-time' },
          finishedAt: { type: 'string', format: 'date-time', nullable: true },
          duration: { type: 'number', nullable: true },
          totalVolume: { type: 'number' },
          notes: { type: 'string', nullable: true },
          isPublic: { type: 'boolean', default: true },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              code: { type: 'string' },
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Workouts', description: 'Workout management' },
    { name: 'Exercises', description: 'Exercise library' },
    { name: 'Social', description: 'Social features (follow, likes, comments)' },
    { name: 'Stats', description: 'User statistics and analytics' },
    { name: 'Achievements', description: 'Achievements and gamification' },
    { name: 'Routines', description: 'Workout routines' },
    { name: 'Templates', description: 'Workout templates' },
    { name: 'Records', description: 'Personal records' },
    { name: 'Leaderboard', description: 'Rankings and leaderboard' },
    { name: 'Notifications', description: 'User notifications' },
    { name: 'Challenges', description: 'Fitness challenges' },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/features/**/*.routes.ts', './src/features/**/*.controller.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'RIZE API Documentation',
  }));

  // JSON endpoint for the spec
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger documentation available at /api-docs');
}
