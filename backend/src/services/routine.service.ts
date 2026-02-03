import { Routine } from '../models/Routine';
import { User } from '../models/User';
import { FilterQuery } from 'mongoose';

interface CreateRoutineData {
  name: string;
  description?: string;
  workouts: string[]; // Workout IDs
  schedule?: {
    day: number; // 0-6 (Sunday-Saturday)
    workoutIndex: number;
  }[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  isPublic?: boolean;
}

interface UpdateRoutineData {
  name?: string;
  description?: string;
  workouts?: string[];
  schedule?: {
    day: number;
    workoutIndex: number;
  }[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  isPublic?: boolean;
}

class RoutineService {
  async createRoutine(userId: string, data: CreateRoutineData) {
    const routine = await Routine.create({
      ...data,
      createdBy: userId,
    });

    return routine.populate('workouts createdBy', 'name username');
  }

  async getUserRoutines(userId: string) {
    const routines = await Routine.find({ createdBy: userId })
      .populate('workouts', 'name description')
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    return routines;
  }

  async getCommunityRoutines(limit: number = 20, skip: number = 0) {
    const routines = await Routine.find({ isPublic: true })
      .populate('workouts', 'name description')
      .populate('createdBy', 'username')
      .sort({ usageCount: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return routines;
  }

  async getRoutineById(routineId: string, userId?: string) {
    const routine = await Routine.findById(routineId)
      .populate({
        path: 'workouts',
        populate: {
          path: 'exercises.exercise',
          select: 'name description muscleGroup equipment',
        },
      })
      .populate('createdBy', 'username');

    if (!routine) {
      throw new Error('Routine not found');
    }

    // Check if user has access (owner or public)
    if (!routine.isPublic && userId && routine.createdBy._id.toString() !== userId) {
      throw new Error('Access denied');
    }

    return routine;
  }

  async updateRoutine(routineId: string, userId: string, updates: UpdateRoutineData) {
    const routine = await Routine.findOne({
      _id: routineId,
      createdBy: userId,
    });

    if (!routine) {
      throw new Error('Routine not found or access denied');
    }

    Object.assign(routine, updates);
    await routine.save();

    return routine.populate('workouts createdBy', 'name username');
  }

  async deleteRoutine(routineId: string, userId: string) {
    const routine = await Routine.findOne({
      _id: routineId,
      createdBy: userId,
    });

    if (!routine) {
      throw new Error('Routine not found or access denied');
    }

    await routine.deleteOne();
    return { message: 'Routine deleted successfully' };
  }

  async duplicateRoutine(routineId: string, userId: string) {
    const originalRoutine = await Routine.findById(routineId);

    if (!originalRoutine) {
      throw new Error('Routine not found');
    }

    // Check access
    if (!originalRoutine.isPublic && originalRoutine.createdBy.toString() !== userId) {
      throw new Error('Access denied');
    }

    // Increment usage count if it's a community routine
    if (originalRoutine.isPublic && originalRoutine.createdBy.toString() !== userId) {
      originalRoutine.usageCount = (originalRoutine.usageCount || 0) + 1;
      await originalRoutine.save();
    }

    // Create duplicate
    const duplicate = await Routine.create({
      name: `${originalRoutine.name} (Copia)`,
      description: originalRoutine.description,
      workouts: originalRoutine.workouts,
      schedule: originalRoutine.schedule,
      difficulty: originalRoutine.difficulty,
      goals: originalRoutine.goals,
      createdBy: userId,
      isPublic: false, // Duplicates are private by default
    });

    return duplicate.populate('workouts createdBy', 'name username');
  }

  async searchRoutines(query: string, limit: number = 20) {
    const filter: FilterQuery<any> = {
      isPublic: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { goals: { $in: [new RegExp(query, 'i')] } },
      ],
    };

    const routines = await Routine.find(filter)
      .populate('workouts', 'name description')
      .populate('createdBy', 'username')
      .sort({ usageCount: -1 })
      .limit(limit);

    return routines;
  }

  async getRoutinesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced', limit: number = 20) {
    const routines = await Routine.find({
      isPublic: true,
      difficulty,
    })
      .populate('workouts', 'name description')
      .populate('createdBy', 'username')
      .sort({ usageCount: -1 })
      .limit(limit);

    return routines;
  }

  async getActiveRoutine(userId: string) {
    const user = await User.findById(userId).populate({
      path: 'activeRoutine',
      populate: {
        path: 'workouts',
        populate: {
          path: 'exercises.exercise',
          select: 'name description muscleGroup',
        },
      },
    });

    return user?.activeRoutine || null;
  }

  async setActiveRoutine(userId: string, routineId: string) {
    const routine = await Routine.findById(routineId);

    if (!routine) {
      throw new Error('Routine not found');
    }

    // Check access
    if (!routine.isPublic && routine.createdBy.toString() !== userId) {
      throw new Error('Access denied');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { activeRoutine: routineId },
      { new: true }
    ).populate({
      path: 'activeRoutine',
      populate: {
        path: 'workouts',
        select: 'name description',
      },
    });

    return user?.activeRoutine;
  }

  async clearActiveRoutine(userId: string) {
    await User.findByIdAndUpdate(userId, { activeRoutine: null });
    return { message: 'Active routine cleared' };
  }
}

export default new RoutineService();
