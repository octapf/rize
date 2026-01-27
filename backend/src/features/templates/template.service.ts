import { WorkoutTemplate } from '@/models/WorkoutTemplate';
import { Workout } from '@/models/Workout';
import { Exercise } from '@/models/Exercise';
import type { IWorkoutTemplate } from '@/models/WorkoutTemplate';
import type { CreateTemplateInput, UpdateTemplateInput, GetTemplatesQuery, CreateFromWorkoutInput } from './template.validation';
import { AppError } from '@/utils/errors';

export class TemplateService {
  async getTemplates(
    userId: string,
    query: GetTemplatesQuery
  ): Promise<{ templates: IWorkoutTemplate[]; total: number; page: number; pages: number }> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const skip = (page - 1) * limit;

    const filter: any = {
      $or: [
        { userId },
        { isPublic: true },
      ],
    };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.isPublic !== undefined) {
      filter.isPublic = query.isPublic;
    }

    const [templates, total] = await Promise.all([
      WorkoutTemplate.find(filter)
        .populate('exercises.exerciseId', 'name category type unit')
        .sort({ lastUsedAt: -1, usageCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      WorkoutTemplate.countDocuments(filter),
    ]);

    return {
      templates,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async getTemplateById(templateId: string, userId: string): Promise<IWorkoutTemplate> {
    const template = await WorkoutTemplate.findOne({
      _id: templateId,
      $or: [
        { userId },
        { isPublic: true },
      ],
    }).populate('exercises.exerciseId');

    if (!template) {
      throw new AppError('Template not found', 404, 'TEMPLATE_NOT_FOUND');
    }

    return template;
  }

  async createTemplate(userId: string, data: CreateTemplateInput): Promise<IWorkoutTemplate> {
    // Verify exercises exist
    const exerciseIds = data.exercises.map((ex) => ex.exerciseId);
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } });

    if (exercises.length !== exerciseIds.length) {
      throw new AppError('One or more exercises not found', 400, 'EXERCISE_NOT_FOUND');
    }

    const template = await WorkoutTemplate.create({
      userId,
      ...data,
    });

    return template.populate('exercises.exerciseId');
  }

  async createFromWorkout(
    workoutId: string,
    userId: string,
    data: CreateFromWorkoutInput
  ): Promise<IWorkoutTemplate> {
    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
    });

    if (!workout) {
      throw new AppError('Workout not found', 404, 'WORKOUT_NOT_FOUND');
    }

    // Convert workout exercises to template format (remove completed flags)
    const exercises = workout.exercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      sets: ex.sets.map((set) => ({
        reps: set.reps,
        weight: set.weight,
        duration: set.duration,
        distance: set.distance,
      })),
      notes: ex.notes,
    }));

    const template = await WorkoutTemplate.create({
      userId,
      name: data.name,
      description: data.description,
      category: data.category || 'custom',
      exercises,
      isPublic: data.isPublic || false,
    });

    return template.populate('exercises.exerciseId');
  }

  async updateTemplate(
    templateId: string,
    userId: string,
    data: UpdateTemplateInput
  ): Promise<IWorkoutTemplate> {
    const template = await WorkoutTemplate.findOne({
      _id: templateId,
      userId,
    });

    if (!template) {
      throw new AppError('Template not found or you do not have permission', 404, 'TEMPLATE_NOT_FOUND');
    }

    if (data.exercises) {
      const exerciseIds = data.exercises.map((ex) => ex.exerciseId);
      const exercises = await Exercise.find({ _id: { $in: exerciseIds } });

      if (exercises.length !== exerciseIds.length) {
        throw new AppError('One or more exercises not found', 400, 'EXERCISE_NOT_FOUND');
      }
    }

    Object.assign(template, data);
    await template.save();

    return template.populate('exercises.exerciseId');
  }

  async deleteTemplate(templateId: string, userId: string): Promise<void> {
    const result = await WorkoutTemplate.deleteOne({
      _id: templateId,
      userId,
    });

    if (result.deletedCount === 0) {
      throw new AppError('Template not found or you do not have permission', 404, 'TEMPLATE_NOT_FOUND');
    }
  }

  async incrementUsageCount(templateId: string): Promise<void> {
    await WorkoutTemplate.findByIdAndUpdate(templateId, {
      $inc: { usageCount: 1 },
      lastUsedAt: new Date(),
    });
  }

  async getPublicTemplates(
    query: GetTemplatesQuery
  ): Promise<{ templates: IWorkoutTemplate[]; total: number; page: number; pages: number }> {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const skip = (page - 1) * limit;

    const filter: any = { isPublic: true };

    if (query.category) {
      filter.category = query.category;
    }

    const [templates, total] = await Promise.all([
      WorkoutTemplate.find(filter)
        .populate('exercises.exerciseId', 'name category type unit')
        .populate('userId', 'username')
        .sort({ usageCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      WorkoutTemplate.countDocuments(filter),
    ]);

    return {
      templates,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}

export const templateService = new TemplateService();
