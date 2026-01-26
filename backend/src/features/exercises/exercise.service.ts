import { Exercise } from '@/models/Exercise';
import type { IExercise } from '@/models/Exercise';
import type { GetExercisesQuery } from './exercise.validation';

export class ExerciseService {
  async getExercises(
    query: GetExercisesQuery
  ): Promise<{ exercises: IExercise[]; total: number; page: number; pages: number }> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 50, 100);
    const skip = (page - 1) * limit;

    // Build filter - only show global exercises
    const filter: any = { isGlobal: true };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.difficulty) {
      filter.difficulty = { $lte: query.difficulty };
    }

    if (query.search) {
      filter.$or = [
        { 'name.es': { $regex: query.search, $options: 'i' } },
        { 'name.en': { $regex: query.search, $options: 'i' } },
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

  async getExercisesByCategory(category: string): Promise<IExercise[]> {
    return Exercise.find({ isGlobal: true, category }).sort({ difficulty: 1 });
  }
}

export const exerciseService = new ExerciseService();
