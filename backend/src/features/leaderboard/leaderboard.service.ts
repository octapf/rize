import { User } from '@/models/User';
import { Workout } from '@/models/Workout';
import { PersonalRecord } from '@/models/PersonalRecord';

export const leaderboardService = {
  // Get top users by total XP
  async getTopByXP(limit: number = 50): Promise<any[]> {
    const users = await User.find()
      .select('name username xp level avatar')
      .sort({ xp: -1 })
      .limit(limit)
      .lean();

    return users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: user.name,
      username: user.username,
      xp: user.xp,
      level: user.level,
      avatar: user.avatar,
    }));
  },

  // Get top users by workout count (this month)
  async getTopByWorkouts(limit: number = 50): Promise<any[]> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const leaderboard = await Workout.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: startOfMonth },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$userId',
          workoutCount: { $sum: 1 },
          totalVolume: {
            $sum: {
              $reduce: {
                input: '$exercises',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    {
                      $reduce: {
                        input: '$$this.sets',
                        initialValue: 0,
                        in: {
                          $add: [
                            '$$value',
                            {
                              $multiply: [
                                { $ifNull: ['$$this.weight', 0] },
                                { $ifNull: ['$$this.reps', 0] },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: { workoutCount: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          username: '$user.username',
          avatar: '$user.avatar',
          workoutCount: 1,
          totalVolume: 1,
        },
      },
    ]);

    return leaderboard.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));
  },

  // Get top users by total volume (this month)
  async getTopByVolume(limit: number = 50): Promise<any[]> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const leaderboard = await Workout.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: startOfMonth },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$userId',
          totalVolume: {
            $sum: {
              $reduce: {
                input: '$exercises',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    {
                      $reduce: {
                        input: '$$this.sets',
                        initialValue: 0,
                        in: {
                          $add: [
                            '$$value',
                            {
                              $multiply: [
                                { $ifNull: ['$$this.weight', 0] },
                                { $ifNull: ['$$this.reps', 0] },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          workoutCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalVolume: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          username: '$user.username',
          avatar: '$user.avatar',
          totalVolume: 1,
          workoutCount: 1,
        },
      },
    ]);

    return leaderboard.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));
  },

  // Get top users by streak
  async getTopByStreak(limit: number = 50): Promise<any[]> {
    const users = await User.find()
      .select('name username streak xp level avatar')
      .sort({ streak: -1 })
      .limit(limit)
      .lean();

    return users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: user.name,
      username: user.username,
      streak: user.streak,
      xp: user.xp,
      level: user.level,
      avatar: user.avatar,
    }));
  },

  // Get user's rank in different leaderboards
  async getUserRanks(userId: string): Promise<any> {
    // XP Rank
    const xpRank = await User.countDocuments({ xp: { $gt: (await User.findById(userId))?.xp || 0 } });

    // Streak Rank
    const streakRank = await User.countDocuments({
      streak: { $gt: (await User.findById(userId))?.streak || 0 },
    });

    // Workouts this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const userWorkoutCount = await Workout.countDocuments({
      userId,
      status: 'completed',
      completedAt: { $gte: startOfMonth },
      isDeleted: false,
    });

    const workoutsRank = await Workout.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: startOfMonth },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: userWorkoutCount },
        },
      },
      {
        $count: 'rank',
      },
    ]);

    return {
      xpRank: xpRank + 1,
      streakRank: streakRank + 1,
      workoutsRank: (workoutsRank[0]?.rank || 0) + 1,
      totalUsers: await User.countDocuments(),
    };
  },

  // Get friends leaderboard
  async getFriendsLeaderboard(userId: string, type: 'xp' | 'workouts' | 'volume' = 'xp'): Promise<any[]> {
    const user = await User.findById(userId).select('following');
    const friendIds = user?.following || [];

    if (type === 'xp') {
      const friends = await User.find({ _id: { $in: [...friendIds, userId] } })
        .select('name username xp level avatar')
        .sort({ xp: -1 })
        .lean();

      return friends.map((friend, index) => ({
        rank: index + 1,
        userId: friend._id,
        name: friend.name,
        username: friend.username,
        xp: friend.xp,
        level: friend.level,
        avatar: friend.avatar,
        isCurrentUser: friend._id.toString() === userId,
      }));
    }

    // For workouts and volume, we need aggregation
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const leaderboard = await Workout.aggregate([
      {
        $match: {
          userId: { $in: [...friendIds.map((id) => id), userId] },
          status: 'completed',
          completedAt: { $gte: startOfMonth },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$userId',
          workoutCount: { $sum: 1 },
          totalVolume: {
            $sum: {
              $reduce: {
                input: '$exercises',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    {
                      $reduce: {
                        input: '$$this.sets',
                        initialValue: 0,
                        in: {
                          $add: [
                            '$$value',
                            {
                              $multiply: [
                                { $ifNull: ['$$this.weight', 0] },
                                { $ifNull: ['$$this.reps', 0] },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: type === 'workouts' ? { workoutCount: -1 } : { totalVolume: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          username: '$user.username',
          avatar: '$user.avatar',
          workoutCount: 1,
          totalVolume: 1,
        },
      },
    ]);

    return leaderboard.map((item, index) => ({
      rank: index + 1,
      ...item,
      isCurrentUser: item.userId.toString() === userId,
    }));
  },
};
