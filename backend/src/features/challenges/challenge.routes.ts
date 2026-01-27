import { Router } from 'express';
import { authenticate } from '@/middleware/auth';
import {
  createChallenge,
  acceptChallenge,
  rejectChallenge,
  getUserChallenges,
  getChallenge,
  updateChallengeProgress,
} from './challenge.controller';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// POST /api/v1/challenges - Crear reto
router.post('/', createChallenge);

// GET /api/v1/challenges - Obtener retos del usuario
router.get('/', getUserChallenges);

// GET /api/v1/challenges/:id - Obtener un reto específico
router.get('/:id', getChallenge);

// PUT /api/v1/challenges/:id/accept - Aceptar reto
router.put('/:id/accept', acceptChallenge);

// PUT /api/v1/challenges/:id/reject - Rechazar reto
router.put('/:id/reject', rejectChallenge);

// PUT /api/v1/challenges/:id/progress - Actualizar progreso
router.put('/:id/progress', updateChallengeProgress);

export default router;
