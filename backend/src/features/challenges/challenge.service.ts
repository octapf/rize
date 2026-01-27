import { Challenge, IChallenge } from './challenge.model';
import { User } from '@/models/User';
import { Workout } from '@/models/Workout';
import { AppError } from '@/utils/errors';
import { notificationService } from '../notifications/notification.service';
import mongoose from 'mongoose';

class ChallengeService {
  /**
   * Crear un reto
   */
  async createChallenge(data: {
    challengerId: string;
    challengedId: string;
    type: IChallenge['type'];
    targetValue: number;
    unit?: string;
    exerciseId?: string;
    duration: number;
  }) {
    // Verificar que ambos usuarios existen
    const [challenger, challenged] = await Promise.all([
      User.findById(data.challengerId),
      User.findById(data.challengedId),
    ]);

    if (!challenger || !challenged) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    if (data.challengerId === data.challengedId) {
      throw new AppError('Cannot challenge yourself', 400, 'INVALID_CHALLENGE');
    }

    // Crear reto
    const challenge = await Challenge.create({
      ...data,
      status: 'pending',
    });

    // Enviar notificación
    await notificationService.notifyChallengeReceived(
      data.challengedId,
      challenger.username,
      challenge._id.toString()
    );

    return challenge;
  }

  /**
   * Aceptar un reto
   */
  async acceptChallenge(challengeId: string, userId: string) {
    const challenge = await Challenge.findOne({
      _id: challengeId,
      challengedId: userId,
      status: 'pending',
    });

    if (!challenge) {
      throw new AppError('Challenge not found', 404, 'CHALLENGE_NOT_FOUND');
    }

    // Configurar fechas
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + challenge.duration);

    challenge.status = 'accepted';
    challenge.startDate = startDate;
    challenge.endDate = endDate;
    challenge.acceptedAt = new Date();

    await challenge.save();

    return challenge;
  }

  /**
   * Rechazar un reto
   */
  async rejectChallenge(challengeId: string, userId: string) {
    const challenge = await Challenge.findOne({
      _id: challengeId,
      challengedId: userId,
      status: 'pending',
    });

    if (!challenge) {
      throw new AppError('Challenge not found', 404, 'CHALLENGE_NOT_FOUND');
    }

    challenge.status = 'rejected';
    await challenge.save();

    return challenge;
  }

  /**
   * Obtener retos del usuario
   */
  async getUserChallenges(userId: string, status?: IChallenge['status']) {
    const query: any = {
      $or: [{ challengerId: userId }, { challengedId: userId }],
    };

    if (status) {
      query.status = status;
    }

    const challenges = await Challenge.find(query)
      .populate('challengerId', 'username name avatar')
      .populate('challengedId', 'username name avatar')
      .populate('exerciseId', 'name')
      .sort({ createdAt: -1 });

    return challenges;
  }

  /**
   * Obtener un reto específico
   */
  async getChallenge(challengeId: string) {
    const challenge = await Challenge.findById(challengeId)
      .populate('challengerId', 'username name avatar')
      .populate('challengedId', 'username name avatar')
      .populate('exerciseId', 'name');

    if (!challenge) {
      throw new AppError('Challenge not found', 404, 'CHALLENGE_NOT_FOUND');
    }

    return challenge;
  }

  /**
   * Actualizar progreso de un reto
   */
  async updateChallengeProgress(challengeId: string) {
    const challenge = await Challenge.findOne({
      _id: challengeId,
      status: 'accepted',
    });

    if (!challenge || !challenge.startDate || !challenge.endDate) {
      return;
    }

    // Calcular progreso según tipo de reto
    let challengerProgress = 0;
    let challengedProgress = 0;

    switch (challenge.type) {
      case 'workout_count':
        challengerProgress = await this.getWorkoutCount(
          challenge.challengerId.toString(),
          challenge.startDate,
          challenge.endDate
        );
        challengedProgress = await this.getWorkoutCount(
          challenge.challengedId.toString(),
          challenge.startDate,
          challenge.endDate
        );
        break;

      case 'volume':
        challengerProgress = await this.getTotalVolume(
          challenge.challengerId.toString(),
          challenge.startDate,
          challenge.endDate
        );
        challengedProgress = await this.getTotalVolume(
          challenge.challengedId.toString(),
          challenge.startDate,
          challenge.endDate
        );
        break;

      case 'specific_exercise':
        if (challenge.exerciseId) {
          challengerProgress = await this.getExerciseVolume(
            challenge.challengerId.toString(),
            challenge.exerciseId.toString(),
            challenge.startDate,
            challenge.endDate
          );
          challengedProgress = await this.getExerciseVolume(
            challenge.challengedId.toString(),
            challenge.exerciseId.toString(),
            challenge.startDate,
            challenge.endDate
          );
        }
        break;
    }

    challenge.challengerProgress = challengerProgress;
    challenge.challengedProgress = challengedProgress;

    // Verificar si el reto expiró
    if (new Date() > challenge.endDate) {
      challenge.status = 'completed';
      challenge.completedAt = new Date();

      // Determinar ganador
      if (challengerProgress > challengedProgress) {
        challenge.winner = challenge.challengerId;
      } else if (challengedProgress > challengerProgress) {
        challenge.winner = challenge.challengedId;
      }
    }

    await challenge.save();
    return challenge;
  }

  /**
   * Contar workouts completados en un período
   */
  private async getWorkoutCount(userId: string, startDate: Date, endDate: Date) {
    return await Workout.countDocuments({
      userId,
      status: 'completed',
      completedAt: { $gte: startDate, $lte: endDate },
      isDeleted: false,
    });
  }

  /**
   * Calcular volumen total en un período
   */
  private async getTotalVolume(userId: string, startDate: Date, endDate: Date) {
    const workouts = await Workout.find({
      userId,
      status: 'completed',
      completedAt: { $gte: startDate, $lte: endDate },
      isDeleted: false,
    });

    let totalVolume = 0;
    for (const workout of workouts) {
      for (const exercise of workout.exercises) {
        for (const set of exercise.sets) {
          totalVolume += (set.weight || 0) * (set.reps || 0);
        }
      }
    }

    return totalVolume;
  }

  /**
   * Calcular volumen de un ejercicio específico en un período
   */
  private async getExerciseVolume(
    userId: string,
    exerciseId: string,
    startDate: Date,
    endDate: Date
  ) {
    const workouts = await Workout.find({
      userId,
      status: 'completed',
      completedAt: { $gte: startDate, $lte: endDate },
      isDeleted: false,
      'exercises.exerciseId': exerciseId,
    });

    let exerciseVolume = 0;
    for (const workout of workouts) {
      for (const exercise of workout.exercises) {
        if (exercise.exerciseId.toString() === exerciseId) {
          for (const set of exercise.sets) {
            exerciseVolume += (set.weight || 0) * (set.reps || 0);
          }
        }
      }
    }

    return exerciseVolume;
  }

  /**
   * Expirar retos vencidos (usar con cron job)
   */
  async expireOldChallenges() {
    const expiredChallenges = await Challenge.find({
      status: 'pending',
      createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // 7 días
    });

    for (const challenge of expiredChallenges) {
      challenge.status = 'expired';
      await challenge.save();
    }

    return expiredChallenges.length;
  }
}

export const challengeService = new ChallengeService();
