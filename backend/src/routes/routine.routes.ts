import { Router } from 'express';
import * as routineController from '../controllers/routine.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', routineController.createRoutine);
router.get('/my', routineController.getUserRoutines);
router.get('/community', routineController.getCommunityRoutines);
router.get('/search', routineController.searchRoutines);
router.get('/difficulty/:difficulty', routineController.getRoutinesByDifficulty);
router.get('/active', routineController.getActiveRoutine);
router.put('/active/:id', routineController.setActiveRoutine);
router.delete('/active', routineController.clearActiveRoutine);
router.get('/:id', routineController.getRoutineById);
router.put('/:id', routineController.updateRoutine);
router.delete('/:id', routineController.deleteRoutine);
router.post('/:id/duplicate', routineController.duplicateRoutine);

export default router;
