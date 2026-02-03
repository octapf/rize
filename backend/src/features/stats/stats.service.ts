import { Workout } from '@/models/Workout';
import { User } from '@/models/User';

/**
 * Stats Service - Advanced statistics and analytics
 */
export class StatsService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(userId: string): Promise<any> {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [overallStats, weeklyStats, monthlyWorkouts, user] = await Promise.all([
      this.getOverallStats(userId),
      this.getWeeklyStats(userId, sevenDaysAgo),
      this.getWorkoutsByDay(userId, thirtyDaysAgo),
      User.findById(userId),
    ]);

    return {
      overall: overallStats,
      weekly: weeklyStats,
      chart: monthlyWorkouts,
      user: {
        xp: user?.xp || 0,
        level: this.calculateLevel(user?.xp || 0),
        stats: user?.stats || {},
      },
    };
  }

  /**
   * Get overall lifetime statistics
   */
  async getOverallStats(userId: string): Promise<any> {
    const stats = await Workout.aggregate([
      {
        $match: {
          userId: userId,
          isDeleted: false,
          status: 'completed',
        },
      },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalXP: { $sum: '$xpEarned' },
          totalDuration: { $sum: '$duration' },
          avgDuration: { $avg: '$duration' },
          totalSets: {
            $sum: {
              $reduce: {
                input: '$exercises',
                initialValue: 0,
                in: { $add: ['$$value', { $size: '$$this.sets' }] },
              },
            },
          },
        },
      },
    ]);

    return stats[0] || {
      totalWorkouts: 0,
      totalXP: 0,
      totalDuration: 0,
      avgDuration: 0,
      totalSets: 0,
    };
  }

  /**
   * Get weekly statistics
   */
  async getWeeklyStats(userId: string, startDate: Date): Promise<any> {
    const stats = await Workout.aggregate([
      {
        $match: {
          userId: userId,
          isDeleted: false,
          status: 'completed',
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: null,
          workouts: { $sum: 1 },
          xpEarned: { $sum: '$xpEarned' },
          duration: { $sum: '$duration' },
        },
      },
    ]);

    return stats[0] || {
      workouts: 0,
      xpEarned: 0,
      duration: 0,
    };
  }

  /**
   * Get workouts grouped by day for charts
   */
  async getWorkoutsByDay(userId: string, startDate: Date): Promise<any[]> {
    const workouts = await Workout.aggregate([
      {
        $match: {
          userId: userId,
          isDeleted: false,
          status: 'completed',
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' },
          },
          count: { $sum: 1 },
          xp: { $sum: '$xpEarned' },
          duration: { $sum: '$duration' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          xp: 1,
          duration: 1,
          _id: 0,
        },
      },
    ]);

    return workouts;
  }

  /**
   * Get exercise-specific progress
   */
  async getExerciseProgress(userId: string, exerciseId: string): Promise<any> {
    const workouts = await Workout.find({
      userId,
      isDeleted: false,
      status: 'completed',
      'exercises.exerciseId': exerciseId,
    })
      .select('date exercises')
      .sort({ date: -1 })
      .limit(20);

    const progressData = workouts.map((workout) => {
      const exercise = workout.exercises.find(
        (ex) => ex.exerciseId.toString() === exerciseId
      );

      if (!exercise) return null;

      const totalSets = exercise.sets.length;
      const totalReps = exercise.sets.reduce((sum, set) => sum + (set.reps || 0), 0);
      const totalWeight = exercise.sets.reduce((sum, set) => sum + (set.weight || 0), 0);
      const avgWeight = totalWeight / totalSets;
      const maxWeight = Math.max(...exercise.sets.map((set) => set.weight || 0));

      return {
        date: workout.date,
        sets: totalSets,
        reps: totalReps,
        avgWeight,
        maxWeight,
        volume: totalReps * avgWeight,
      };
    }).filter(Boolean);

    return {
      history: progressData,
      personalRecords: this.calculatePersonalRecords(progressData),
    };
  }

  /**
   * Calculate personal records from exercise history
   */
  private calculatePersonalRecords(history: any[]): any {
    if (history.length === 0) {
      return {
        maxWeight: 0,
        maxVolume: 0,
        maxSets: 0,
        maxReps: 0,
      };
    }

    return {
      maxWeight: Math.max(...history.map((h) => h.maxWeight || 0)),
      maxVolume: Math.max(...history.map((h) => h.volume || 0)),
      maxSets: Math.max(...history.map((h) => h.sets || 0)),
      maxReps: Math.max(...history.map((h) => h.reps || 0)),
    };
  }

  /**
   * Calculate level from XP (100 XP per level)
   */
  private calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
  }

  /**
   * Get current streak
   */
  async getCurrentStreak(userId: string): Promise<number> {
    const workouts = await Workout.find({
      userId,
      isDeleted: false,
      status: 'completed',
    })
      .select('date')
      .sort({ date: -1 })
      .limit(365);

    if (workouts.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of workouts) {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak || (streak === 0 && diffDays <= 1)) {
        streak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get leaderboard (top users by XP)
   */
  async getLeaderboard(limit = 100): Promise<any[]> {
    const users = await User.find({ isDeleted: false })
      .select('username xp stats.totalWorkouts')
      .sort({ xp: -1 })
      .limit(limit);

    return users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      username: user.username,
      xp: user.xp,
      level: this.calculateLevel(user.xp),
      totalWorkouts: user.stats?.totalWorkouts || 0,
    }));
  }
}

export const statsService = new StatsService();
