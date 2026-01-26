import { Achievement } from '@/models/Achievement';
import { UserAchievement } from '@/models/UserAchievement';
import { User } from '@/models/User';
import { Workout } from '@/models/Workout';
import { Friendship } from '@/models/Friendship';

/**
 * Achievements Service - Manage user achievements and progress
 */
export class AchievementsService {
  /**
   * Get all achievements
   */
  async getAllAchievements(): Promise<any[]> {
    return await Achievement.find().sort({ category: 1, requirement: 1 });
  }

  /**
   * Get user achievements with progress
   */
  async getUserAchievements(userId: string): Promise<any> {
    const [allAchievements, userAchievements] = await Promise.all([
      Achievement.find(),
      UserAchievement.find({ userId }),
    ]);

    const unlockedMap = new Map(
      userAchievements.map((ua) => [ua.achievementKey, ua])
    );

    const progress = await this.calculateProgress(userId);

    const achievements = allAchievements.map((achievement) => {
      const userAch = unlockedMap.get(achievement.key);
      const currentProgress = progress[achievement.category] || 0;

      return {
        ...achievement.toJSON(),
        unlocked: !!userAch,
        unlockedAt: userAch?.unlockedAt,
        progress: Math.min(currentProgress, achievement.requirement),
        percentage: Math.min((currentProgress / achievement.requirement) * 100, 100),
      };
    });

    return {
      achievements,
      totalUnlocked: userAchievements.length,
      totalAchievements: allAchievements.length,
    };
  }

  /**
   * Check and unlock achievements for user
   */
  async checkAchievements(userId: string): Promise<any[]> {
    const progress = await this.calculateProgress(userId);
    const achievements = await Achievement.find();
    const userAchievements = await UserAchievement.find({ userId });
    const unlockedKeys = new Set(userAchievements.map((ua) => ua.achievementKey));

    const newlyUnlocked = [];

    for (const achievement of achievements) {
      if (unlockedKeys.has(achievement.key)) continue;

      const currentProgress = progress[achievement.category] || 0;

      if (currentProgress >= achievement.requirement) {
        // Unlock achievement
        await UserAchievement.create({
          userId,
          achievementKey: achievement.key,
          progress: currentProgress,
        });

        // Award XP
        await User.findByIdAndUpdate(userId, {
          $inc: { xp: achievement.xpReward },
        });

        newlyUnlocked.push(achievement);
      }
    }

    return newlyUnlocked;
  }

  /**
   * Calculate current progress for all achievement categories
   */
  private async calculateProgress(userId: string): Promise<any> {
    const [workoutStats, friendsCount, user] = await Promise.all([
      Workout.aggregate([
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
      ]),
      Friendship.countDocuments({
        $or: [{ requesterId: userId }, { recipientId: userId }],
        status: 'accepted',
      }),
      User.findById(userId),
    ]);

    const stats = workoutStats[0] || { totalWorkouts: 0, totalSets: 0 };

    return {
      workout: stats.totalWorkouts,
      exercise: stats.totalSets,
      social: friendsCount,
      xp: user?.xp || 0,
      streak: user?.stats?.currentStreak || 0,
    };
  }

  /**
   * Seed default achievements
   */
  async seedAchievements(): Promise<void> {
    const achievements = [
      // Workout achievements
      {
        key: 'first_workout',
        name: { en: 'First Steps', es: 'Primeros Pasos' },
        description: {
          en: 'Complete your first workout',
          es: 'Completa tu primer entrenamiento',
        },
        icon: 'fitness',
        category: 'workout',
        requirement: 1,
        xpReward: 50,
        rarity: 'common',
      },
      {
        key: 'workout_10',
        name: { en: 'Getting Started', es: 'Comenzando' },
        description: {
          en: 'Complete 10 workouts',
          es: 'Completa 10 entrenamientos',
        },
        icon: 'barbell',
        category: 'workout',
        requirement: 10,
        xpReward: 100,
        rarity: 'common',
      },
      {
        key: 'workout_50',
        name: { en: 'Dedicated', es: 'Dedicado' },
        description: {
          en: 'Complete 50 workouts',
          es: 'Completa 50 entrenamientos',
        },
        icon: 'trophy',
        category: 'workout',
        requirement: 50,
        xpReward: 300,
        rarity: 'rare',
      },
      {
        key: 'workout_100',
        name: { en: 'Centurion', es: 'Centurión' },
        description: {
          en: 'Complete 100 workouts',
          es: 'Completa 100 entrenamientos',
        },
        icon: 'medal',
        category: 'workout',
        requirement: 100,
        xpReward: 500,
        rarity: 'epic',
      },

      // Streak achievements
      {
        key: 'streak_3',
        name: { en: 'On Fire', es: 'En Llamas' },
        description: {
          en: '3 day workout streak',
          es: 'Racha de 3 días entrenando',
        },
        icon: 'flame',
        category: 'streak',
        requirement: 3,
        xpReward: 75,
        rarity: 'common',
      },
      {
        key: 'streak_7',
        name: { en: 'Week Warrior', es: 'Guerrero Semanal' },
        description: {
          en: '7 day workout streak',
          es: 'Racha de 7 días entrenando',
        },
        icon: 'flame',
        category: 'streak',
        requirement: 7,
        xpReward: 150,
        rarity: 'rare',
      },
      {
        key: 'streak_30',
        name: { en: 'Month Master', es: 'Maestro del Mes' },
        description: {
          en: '30 day workout streak',
          es: 'Racha de 30 días entrenando',
        },
        icon: 'flame',
        category: 'streak',
        requirement: 30,
        xpReward: 500,
        rarity: 'epic',
      },

      // Social achievements
      {
        key: 'social_1',
        name: { en: 'Social Butterfly', es: 'Mariposa Social' },
        description: {
          en: 'Add your first friend',
          es: 'Agrega tu primer amigo',
        },
        icon: 'people',
        category: 'social',
        requirement: 1,
        xpReward: 50,
        rarity: 'common',
      },
      {
        key: 'social_10',
        name: { en: 'Popular', es: 'Popular' },
        description: {
          en: 'Have 10 friends',
          es: 'Ten 10 amigos',
        },
        icon: 'people',
        category: 'social',
        requirement: 10,
        xpReward: 200,
        rarity: 'rare',
      },

      // Exercise achievements
      {
        key: 'sets_100',
        name: { en: 'Set Crusher', es: 'Aplastador de Series' },
        description: {
          en: 'Complete 100 sets',
          es: 'Completa 100 series',
        },
        icon: 'repeat',
        category: 'exercise',
        requirement: 100,
        xpReward: 150,
        rarity: 'common',
      },
      {
        key: 'sets_500',
        name: { en: 'Volume King', es: 'Rey del Volumen' },
        description: {
          en: 'Complete 500 sets',
          es: 'Completa 500 series',
        },
        icon: 'repeat',
        category: 'exercise',
        requirement: 500,
        xpReward: 400,
        rarity: 'epic',
      },

      // XP achievements
      {
        key: 'xp_1000',
        name: { en: 'Rising Star', es: 'Estrella Naciente' },
        description: {
          en: 'Earn 1000 XP',
          es: 'Gana 1000 XP',
        },
        icon: 'star',
        category: 'xp',
        requirement: 1000,
        xpReward: 200,
        rarity: 'rare',
      },
      {
        key: 'xp_5000',
        name: { en: 'Elite Athlete', es: 'Atleta Élite' },
        description: {
          en: 'Earn 5000 XP',
          es: 'Gana 5000 XP',
        },
        icon: 'star',
        category: 'xp',
        requirement: 5000,
        xpReward: 500,
        rarity: 'epic',
      },
      {
        key: 'xp_10000',
        name: { en: 'Legend', es: 'Leyenda' },
        description: {
          en: 'Earn 10000 XP',
          es: 'Gana 10000 XP',
        },
        icon: 'star',
        category: 'xp',
        requirement: 10000,
        xpReward: 1000,
        rarity: 'legendary',
      },
    ];

    for (const achievement of achievements) {
      await Achievement.findOneAndUpdate(
        { key: achievement.key },
        achievement,
        { upsert: true }
      );
    }
  }
}

export const achievementsService = new AchievementsService();
