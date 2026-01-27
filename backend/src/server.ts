import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './features/auth/auth.routes';
import workoutRoutes from './features/workouts/workout.routes';
import exerciseRoutes from './features/exercises/exercise.routes';
import statsRoutes from './features/stats/stats.routes';
import socialRoutes from './features/social/social.routes';
import achievementsRoutes from './features/achievements/achievements.routes';
import templateRoutes from './features/templates/template.routes';
import routineRoutes from './features/routines/routine.routes';
import recordsRoutes from './features/records/records.routes';
import leaderboardRoutes from './features/leaderboard/leaderboard.routes';

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API version
app.get('/api/version', (_req, res) => {
  res.json({
    version: '1.0.0',
    name: 'RIZE API',
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workouts', workoutRoutes);
app.use('/api/v1/exercises', exerciseRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/social', socialRoutes);
app.use('/api/v1/achievements', achievementsRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/routines', routineRoutes);
app.use('/api/v1/records', recordsRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.PORT;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { app };
