import { Exercise } from '@/models/Exercise';
import type { IExercise } from '@/models/Exercise';
import type { GetExercisesQuery, CreateExerciseInput, UpdateExerciseInput } from './exercise.validation';

export class ExerciseService {
  async getExercises(
    query: GetExercisesQuery,
    userId?: string
  ): Promise<{ exercises: IExercise[]; total: number; page: number; pages: number }> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 50, 100);
    const skip = (page - 1) * limit;

    // Build filter - show global exercises and user's custom exercises
    const filter: any = {
      $or: [
        { isGlobal: true },
        ...(userId ? [{ createdBy: userId }] : []),
      ],
    };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.difficulty) {
      filter.difficulty = { $lte: query.difficulty };
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.search) {
      filter.$and = [
        {
          $or: [
            { 'name.es': { $regex: query.search, $options: 'i' } },
            { 'name.en': { $regex: query.search, $options: 'i' } },
          ],
        },
      ];
    }

    const [exercises, total] = await Promise.all([
      Exercise.find(filter)
        .sort({ category: 1, difficulty: 1, 'name.es': 1 })
        .skip(skip)
        .limit(limit),
      Exercise.countDocuments(filter),
    ]);

    return {
      exercises,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async getExerciseById(id: string): Promise<IExercise | null> {
    return Exercise.findById(id);
  }

  async getExercisesByCategory(category: string, userId?: string): Promise<IExercise[]> {
    return Exercise.find({
      $or: [
        { isGlobal: true, category },
        ...(userId ? [{ createdBy: userId, category }] : []),
      ],
    }).sort({ difficulty: 1 });
  }

  async createCustomExercise(userId: string, data: CreateExerciseInput): Promise<IExercise> {
    const exercise = new Exercise({
      ...data,
      isGlobal: false,
      createdBy: userId,
    });

    return exercise.save();
  }

  async updateCustomExercise(
    exerciseId: string,
    userId: string,
    data: UpdateExerciseInput
  ): Promise<IExercise | null> {
    // Only allow updating user's own custom exercises
    const exercise = await Exercise.findOne({
      _id: exerciseId,
      createdBy: userId,
      isGlobal: false,
    });

    if (!exercise) {
      return null;
    }

    Object.assign(exercise, data);
    return exercise.save();
  }

  async deleteCustomExercise(exerciseId: string, userId: string): Promise<boolean> {
    const result = await Exercise.deleteOne({
      _id: exerciseId,
      createdBy: userId,
      isGlobal: false,
    });

    return result.deletedCount > 0;
  }

  async getUserCustomExercises(userId: string): Promise<IExercise[]> {
    return Exercise.find({ createdBy: userId, isGlobal: false }).sort({ createdAt: -1 });
  }
}

export const exerciseService = new ExerciseService();
