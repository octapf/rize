import mongoose from 'mongoose';
import { Routine, IRoutine } from '@/models/Routine';
import { WorkoutTemplate } from '@/models/WorkoutTemplate';
import { CreateRoutineInput, UpdateRoutineInput, GetRoutinesQuery } from './routine.validation';

export const routineService = {
  // Get all routines for a user
  async getRoutines(userId: string, query: GetRoutinesQuery) {
    const filter: any = { userId };

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    const routines = await Routine.find(filter)
      .populate({
        path: 'schedule.monday schedule.tuesday schedule.wednesday schedule.thursday schedule.friday schedule.saturday schedule.sunday',
        select: 'name description category exercises',
        populate: {
          path: 'exercises.exerciseId',
          select: 'name category muscleGroup',
        },
      })
      .sort({ isActive: -1, createdAt: -1 });

    return routines;
  },

  // Get routine by ID
  async getRoutineById(routineId: string, userId: string): Promise<IRoutine> {
    const routine = await Routine.findOne({
      _id: routineId,
      userId,
    }).populate({
      path: 'schedule.monday schedule.tuesday schedule.wednesday schedule.thursday schedule.friday schedule.saturday schedule.sunday',
      select: 'name description category exercises',
      populate: {
        path: 'exercises.exerciseId',
        select: 'name category muscleGroup',
      },
    });

    if (!routine) {
      throw new Error('Routine not found');
    }

    return routine;
  },

  // Create a new routine
  async createRoutine(userId: string, data: CreateRoutineInput): Promise<IRoutine> {
    // Verify that all template IDs exist and belong to the user or are public
    const templateIds = Object.values(data.schedule).filter(
      (id): id is string => id !== undefined && id !== null
    );

    if (templateIds.length > 0) {
      const templates = await WorkoutTemplate.find({
        _id: { $in: templateIds },
        $or: [{ userId }, { isPublic: true }],
      });

      if (templates.length !== templateIds.length) {
        throw new Error('One or more templates not found or not accessible');
      }
    }

    // If this routine is set to active, deactivate others
    if (data.isActive) {
      await Routine.updateMany({ userId, _id: { $exists: true } }, { isActive: false });
    }

    const routine = await Routine.create({
      userId,
      ...data,
    });

    return routine;
  },

  // Update a routine
  async updateRoutine(
    routineId: string,
    userId: string,
    data: UpdateRoutineInput
  ): Promise<IRoutine> {
    const routine = await Routine.findOne({ _id: routineId, userId });

    if (!routine) {
      throw new Error('Routine not found');
    }

    // Verify template IDs if schedule is being updated
    if (data.schedule) {
      const templateIds = Object.values(data.schedule).filter(
        (id): id is string => id !== undefined && id !== null
      );

      if (templateIds.length > 0) {
        const templates = await WorkoutTemplate.find({
          _id: { $in: templateIds },
          $or: [{ userId }, { isPublic: true }],
        });

        if (templates.length !== templateIds.length) {
          throw new Error('One or more templates not found or not accessible');
        }
      }
    }

    // If setting this routine to active, deactivate others
    if (data.isActive && !routine.isActive) {
      await Routine.updateMany(
        { userId, _id: { $ne: routineId } },
        { isActive: false }
      );
    }

    Object.assign(routine, data);
    await routine.save();

    return routine;
  },

  // Delete a routine
  async deleteRoutine(routineId: string, userId: string): Promise<void> {
    const routine = await Routine.findOneAndDelete({
      _id: routineId,
      userId,
    });

    if (!routine) {
      throw new Error('Routine not found');
    }
  },

  // Get active routine for a user
  async getActiveRoutine(userId: string): Promise<IRoutine | null> {
    const routine = await Routine.findOne({ userId, isActive: true }).populate({
      path: 'schedule.monday schedule.tuesday schedule.wednesday schedule.thursday schedule.friday schedule.saturday schedule.sunday',
      select: 'name description category exercises',
      populate: {
        path: 'exercises.exerciseId',
        select: 'name category muscleGroup',
      },
    });

    return routine;
  },

  // Get today's workout from active routine
  async getTodaysWorkout(userId: string): Promise<any> {
    const routine = await this.getActiveRoutine(userId);

    if (!routine) {
      return null;
    }

    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayKey = dayMap[today] as keyof typeof routine.schedule;

    const templateId = routine.schedule[todayKey];

    if (!templateId) {
      return null;
    }

    const template = await WorkoutTemplate.findById(templateId).populate(
      'exercises.exerciseId'
    );

    return {
      routine: {
        _id: routine._id,
        name: routine.name,
      },
      template,
      day: todayKey,
    };
  },
};
