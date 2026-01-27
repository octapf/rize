import type { IWorkout } from '@/models/Workout';
import { Workout } from '@/models/Workout';
import { User } from '@/models/User';
import { Exercise } from '@/models/Exercise';
import { WorkoutTemplate } from '@/models/WorkoutTemplate';
import { AppError } from '@/utils/errors';
import { recordsService } from '@/features/records/records.service';
import type { CreateWorkoutInput, UpdateWorkoutInput, GetWorkoutsQuery, CompleteSetInput, FinishWorkoutInput } from './workout.validation';

/**
 * Workout Service - Business logic for workouts
 */
export class WorkoutService {
  /**
   * Create a new workout and update user stats
   */
  async createWorkout(userId: string, data: CreateWorkoutInput): Promise<IWorkout> {
    // Verify all exercises exist
    const exerciseIds = data.exercises.map(ex => ex.exerciseId);
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
    
    if (exercises.length !== exerciseIds.length) {
      throw new AppError('One or more exercises not found', 400, 'EXERCISE_NOT_FOUND');
    }

    // Calculate total XP earned
    const totalSets = data.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const xpEarned = this.calculateWorkoutXP(totalSets, data.duration);

    // Create workout
    const workout = await Workout.create({
      userId,
      ...data,
      date: data.date || new Date(),
      xpEarned,
    });

    // Update user stats and XP
    await this.updateUserStats(userId, xpEarned);

    return workout;
  }

  /**
   * Create workout from template
   */
  async createFromTemplate(userId: string, templateId: string, name?: string): Promise<IWorkout> {
    const template = await WorkoutTemplate.findOne({
      _id: templateId,
      $or: [{ userId }, { isPublic: true }],
    });

    if (!template) {
      throw new AppError('Template not found', 404, 'TEMPLATE_NOT_FOUND');
    }

    // Create workout from template
    const workout = await this.createWorkout(userId, {
      name: name || template.name,
      exercises: template.exercises.map((ex) => ({
        exerciseId: ex.exerciseId.toString(),
        sets: ex.sets.map((set) => ({
          ...set,
          completed: false,
        })),
        notes: ex.notes,
      })),
      visibility: 'private',
    });

    // Increment template usage count
    await WorkoutTemplate.findByIdAndUpdate(templateId, {
      $inc: { usageCount: 1 },
      lastUsedAt: new Date(),
    });

    return workout;
  }

  /**
   * Get user workouts with filters and pagination
   */
  async getUserWorkouts(
    userId: string,
    query: GetWorkoutsQuery
  ): Promise<{ workouts: IWorkout[]; total: number; page: number; pages: number }> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100); // Max 100 per page
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = { userId, isDeleted: false };
    
    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) filter.date.$gte = new Date(query.startDate);
      if (query.endDate) filter.date.$lte = new Date(query.endDate);
    }
    
    if (query.exerciseId) {
      filter['exercises.exerciseId'] = query.exerciseId;
    }

    // Execute query
    const [workouts, total] = await Promise.all([
      Workout.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate('exercises.exerciseId', 'name category muscleGroups'),
      Workout.countDocuments(filter),
    ]);

    return {
      workouts,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Get single workout by ID
   */
  async getWorkoutById(workoutId: string, userId: string): Promise<IWorkout> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    }).populate('exercises.exerciseId');

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    return workout;
  }

  /**
   * Update workout
   */
  async updateWorkout(
    workoutId: string,
    userId: string,
    data: UpdateWorkoutInput
  ): Promise<IWorkout> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    // If exercises changed, verify they exist
    if (data.exercises) {
      const exerciseIds = data.exercises.map(ex => ex.exerciseId);
      const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
      
      if (exercises.length !== exerciseIds.length) {
        throw new AppError('One or more exercises not found', 400, 'EXERCISE_NOT_FOUND');
      }

      // Recalculate XP if sets changed
      const totalSets = data.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
      const newXP = this.calculateWorkoutXP(totalSets, data.duration || workout.duration);
      const xpDiff = newXP - workout.xpEarned;

      workout.xpEarned = newXP;
      
      // Update user XP if changed
      if (xpDiff !== 0) {
        await User.findByIdAndUpdate(userId, { $inc: { xp: xpDiff } });
      }
    }

    Object.assign(workout, data);
    await workout.save();

    return workout;
  }

  /**
   * Soft delete workout
   */
  async deleteWorkout(workoutId: string, userId: string): Promise<void> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    // Soft delete
    workout.isDeleted = true;
    await workout.save();

    // Subtract XP from user
    await User.findByIdAndUpdate(userId, { $inc: { xp: -workout.xpEarned } });
  }

  /**
   * Start a workout (tracking mode)
   */
  async startWorkout(workoutId: string, userId: string): Promise<IWorkout> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    workout.status = 'in-progress';
    workout.startedAt = new Date();
    await workout.save();

    return workout;
  }

  /**
   * Complete/uncomplete a specific set during workout
   */
  async completeSet(
    workoutId: string,
    userId: string,
    data: CompleteSetInput
  ): Promise<IWorkout> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    const { exerciseIndex, setIndex, completed } = data;

    if (!workout.exercises[exerciseIndex]) {
      throw new AppError('Exercise not found', 400, 'INVALID_EXERCISE_INDEX');
    }

    if (!workout.exercises[exerciseIndex].sets[setIndex]) {
      throw new AppError('Set not found', 400, 'INVALID_SET_INDEX');
    }

    workout.exercises[exerciseIndex].sets[setIndex].completed = completed;
    workout.exercises[exerciseIndex].sets[setIndex].completedAt = completed ? new Date() : undefined;
    
    await workout.save();

    return workout;
  }

  /**
   * Finish workout and calculate final stats
   */
  async finishWorkout(
    workoutId: string,
    userId: string,
    data: FinishWorkoutInput
  ): Promise<{ workout: IWorkout; newRecords: any[] }> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
      isDeleted: false,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    workout.status = 'completed';
    workout.completedAt = new Date();
    
    if (data.duration) {
      workout.duration = data.duration;
      // Recalculate XP with duration
      const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
      const newXP = this.calculateWorkoutXP(totalSets, data.duration);
      const xpDiff = newXP - workout.xpEarned;
      
      workout.xpEarned = newXP;
      
      // Update user XP if changed
      if (xpDiff !== 0) {
        await User.findByIdAndUpdate(userId, { $inc: { xp: xpDiff } });
      }
    }

    await workout.save();

    // Check and update personal records
    let newRecords: any[] = [];
    try {
      newRecords = await recordsService.checkAndUpdateRecords(workoutId, userId);
    } catch (error) {
      console.error('Error checking personal records:', error);
      // Don't fail workout completion if records check fails
    }

    return { workout, newRecords };
  }

  /**
   * Get workout statistics
   */
  async getWorkoutStats(userId: string, days = 30): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await Workout.aggregate([
      {
        $match: {
          userId: userId,
          isDeleted: false,
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalXP: { $sum: '$xpEarned' },
          totalDuration: { $sum: '$duration' },
          avgDuration: { $avg: '$duration' },
        },
      },
    ]);

    return stats[0] || {
      totalWorkouts: 0,
      totalXP: 0,
      totalDuration: 0,
      avgDuration: 0,
    };
  }

  /**
   * Calculate XP earned from workout
   * Formula: (sets * 10) + (duration bonus)
   */
  private calculateWorkoutXP(totalSets: number, duration?: number): number {
    let xp = totalSets * 10;

    // Duration bonus: +1 XP per minute, max 60 minutes
    if (duration) {
      const minutes = Math.min(Math.floor(duration / 60), 60);
      xp += minutes;
    }

    return xp;
  }

  /**
   * Update user stats after workout
   */
  private async updateUserStats(userId: string, xpEarned: number): Promise<void> {
    const user = await User.findById(userId);
    if (!user) return;

    // Increment XP
    user.xp += xpEarned;

    // Update stats
    if (!user.stats) {
      user.stats = {
        totalWorkouts: 0,
        totalXP: 0,
        currentStreak: 0,
        longestStreak: 0,
        weeklyWorkouts: 0,
        monthlyWorkouts: 0,
      };
    }

    user.stats.totalWorkouts += 1;
    user.stats.totalXP += xpEarned;

    // TODO: Update streak logic (requires checking last workout date)
    
    await user.save();
  }
}

export const workoutService = new WorkoutService();
