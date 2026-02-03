import { User } from '../models/User';
import { Workout } from '../models/Workout';
import { Achievement } from '../models/Achievement';
import { UserAchievement } from '../models/UserAchievement';
import { PersonalRecord } from '../models/PersonalRecord';

class UserService {
  /**
   * Get public profile for a user
   */
  async getPublicProfile(userId: string) {
    const user = await User.findById(userId).select(
      'username email xp streak createdAt'
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Get workout count
    const workoutCount = await Workout.countDocuments({
      userId,
      status: 'completed',
    });

    // Get achievement count
    const achievementCount = await Achievement.countDocuments({
      userId,
    });

    // Get recent workouts (last 5 completed)
    const recentWorkouts = await Workout.find({
      userId,
      status: 'completed',
    })
      .sort({ completedAt: -1 })
      .limit(5)
      .populate('exercises.exercise', 'name category')
      .select('name completedAt exercises notes');

    // Calculate total volume
    const completedWorkouts = await Workout.find({
      userId,
      status: 'completed',
    });

    let totalVolume = 0;
    completedWorkouts.forEach((workout) => {
      workout.exercises.forEach((exercise: any) => {
        exercise.sets.forEach((set: any) => {
          if (set.completed && set.weight && set.reps) {
            totalVolume += set.weight * set.reps;
          }
        });
      });
    });

    // Get personal records count
    const recordsCount = await PersonalRecord.countDocuments({ userId });

    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        xp: user.xp,
        streak: user.stats.currentStreak,
        level: Math.floor(user.xp / 100) + 1,
        createdAt: user.createdAt,
      },
      stats: {
        workoutCount,
        achievementCount,
        recordsCount,
        totalVolume: Math.round(totalVolume),
      },
      recentWorkouts,
    };
  }

  /**
   * Get user stats for dashboard
   */
  async getUserStats(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get workouts this week
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const workoutsThisWeek = await Workout.countDocuments({
      userId,
      status: 'completed',
      completedAt: { $gte: weekAgo },
    });

    // Get workouts this month
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const workoutsThisMonth = await Workout.countDocuments({
      userId,
      status: 'completed',
      completedAt: { $gte: monthAgo },
    });

    // Get total completed workouts
    const totalWorkouts = await Workout.countDocuments({
      userId,
      status: 'completed',
    });

    // Get records this month
    const recordsThisMonth = await PersonalRecord.countDocuments({
      userId,
      achievedAt: { $gte: monthAgo },
    });

    // Calculate total volume
    const completedWorkouts = await Workout.find({
      userId,
      status: 'completed',
    });

    let totalVolume = 0;
    let totalSets = 0;
    let totalReps = 0;

    completedWorkouts.forEach((workout) => {
      workout.exercises.forEach((exercise: any) => {
        exercise.sets.forEach((set: any) => {
          if (set.completed) {
            totalSets++;
            if (set.reps) totalReps += set.reps;
            if (set.weight && set.reps) {
              totalVolume += set.weight * set.reps;
            }
          }
        });
      });
    });

    // Calculate total training time (in minutes)
    let totalTrainingTime = 0;
    completedWorkouts.forEach((workout) => {
      if (workout.completedAt && workout.startedAt) {
        const duration =
          (new Date(workout.completedAt).getTime() -
            new Date(workout.startedAt).getTime()) /
          1000;
        totalTrainingTime += duration;
      }
    });

    return {
      user: {
        xp: user.xp,
        level: Math.floor(user.xp / 100) + 1,
        streak: user.stats.currentStreak,
      },
      workouts: {
        thisWeek: workoutsThisWeek,
        thisMonth: workoutsThisMonth,
        total: totalWorkouts,
      },
      volume: {
        total: Math.round(totalVolume),
        totalSets,
        totalReps,
      },
      time: {
        total: Math.round(totalTrainingTime / 60), // in minutes
      },
      records: {
        thisMonth: recordsThisMonth,
        total: await PersonalRecord.countDocuments({ userId }),
      },
      achievements: {
        total: await Achievement.countDocuments({ userId }),
      },
    };
  }

  /**
   * Search users by username
   */
  async searchUsers(query: string, currentUserId: string, limit = 20) {
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: currentUserId }, // Exclude current user
    })
      .select('username email xp streak createdAt')
      .limit(limit);

    // Get workout counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const workoutCount = await Workout.countDocuments({
          userId: user._id,
          status: 'completed',
        });

        const achievementCount = await Achievement.countDocuments({
          userId: user._id,
        });

        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          xp: user.xp,
          level: Math.floor(user.xp / 100) + 1,
          streak: user.stats.currentStreak,
          workoutCount,
          achievementCount,
          createdAt: user.createdAt,
        };
      })
    );

    return usersWithStats;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: {
      username?: string;
      email?: string;
    }
  ) {
    // Check if username is already taken
    if (updates.username) {
      const existing = await User.findOne({
        username: updates.username,
        _id: { $ne: userId },
      });
      if (existing) {
        throw new Error('Username already taken');
      }
    }

    // Check if email is already taken
    if (updates.email) {
      const existing = await User.findOne({
        email: updates.email,
        _id: { $ne: userId },
      });
      if (existing) {
        throw new Error('Email already taken');
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Get user's activity feed
   */
  async getUserActivityFeed(userId: string, limit = 10) {
    const activities: any[] = [];

    // Get recent workouts
    const recentWorkouts = await Workout.find({
      userId,
      status: 'completed',
    })
      .sort({ completedAt: -1 })
      .limit(5)
      .populate('exercises.exercise', 'name');

    recentWorkouts.forEach((workout) => {
      activities.push({
        type: 'workout',
        date: workout.completedAt,
        data: {
          workoutId: workout._id,
          workoutName: workout.name,
          exerciseCount: workout.exercises.length,
        },
      });
    });

    // Get recent achievements
    const recentAchievements = await UserAchievement.find({ userId })
      .sort({ unlockedAt: -1 })
      .limit(5);

    recentAchievements.forEach((achievement) => {
      activities.push({
        type: 'achievement',
        date: achievement.unlockedAt,
        data: {
          achievementId: achievement._id,
          achievementKey: achievement.achievementKey,
          progress: achievement.progress,
        },
      });
    });

    // Get recent records
    const recentRecords = await PersonalRecord.find({ userId })
      .sort({ achievedAt: -1 })
      .limit(5)
      .populate('exerciseId', 'name');

    recentRecords.forEach((record) => {
      activities.push({
        type: 'record',
        date: record.achievedAt,
        data: {
          recordId: record._id,
          exerciseName: (record.exerciseId as any).name,
          recordType: record.type,
          value: record.value,
        },
      });
    });

    // Sort by date and limit
    activities.sort((a, b) => b.date.getTime() - a.date.getTime());

    return activities.slice(0, limit);
  }
}

export const userService = new UserService();
