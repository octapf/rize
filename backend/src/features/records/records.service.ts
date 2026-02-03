import mongoose from 'mongoose';
import { PersonalRecord, IPersonalRecord } from '@/models/PersonalRecord';
import { Workout } from '@/models/Workout';
import { notificationService } from '../notifications/notification.service';

export interface RecordUpdate {
  exerciseId: string;
  type: 'weight' | 'reps' | 'volume' | 'duration' | 'distance';
  value: number;
  unit?: string;
}

export const recordsService = {
  // Check and update personal records for a completed workout
  async checkAndUpdateRecords(
    workoutId: string,
    userId: string
  ): Promise<IPersonalRecord[]> {
    const workout = await Workout.findById(workoutId).populate('exercises.exerciseId');

    if (!workout || workout.userId.toString() !== userId) {
      throw new Error('Workout not found');
    }

    const newRecords: IPersonalRecord[] = [];

    for (const exercise of workout.exercises) {
      const exerciseId = exercise.exerciseId.toString();

      // Check weight PR
      const maxWeight = Math.max(...exercise.sets.map((set) => set.weight || 0));
      if (maxWeight > 0) {
        const record = await this.updateRecordIfBetter(
          userId,
          exerciseId,
          'weight',
          maxWeight,
          'kg',
          workoutId
        );
        if (record) newRecords.push(record);
      }

      // Check reps PR (max reps in a single set)
      const maxReps = Math.max(...exercise.sets.map((set) => set.reps || 0));
      if (maxReps > 0) {
        const record = await this.updateRecordIfBetter(
          userId,
          exerciseId,
          'reps',
          maxReps,
          undefined,
          workoutId
        );
        if (record) newRecords.push(record);
      }

      // Check volume PR (total weight × reps)
      const totalVolume = exercise.sets.reduce(
        (sum, set) => sum + (set.weight || 0) * (set.reps || 0),
        0
      );
      if (totalVolume > 0) {
        const record = await this.updateRecordIfBetter(
          userId,
          exerciseId,
          'volume',
          totalVolume,
          'kg',
          workoutId
        );
        if (record) newRecords.push(record);
      }

      // Check duration PR (max duration in a single set)
      const maxDuration = Math.max(...exercise.sets.map((set) => set.duration || 0));
      if (maxDuration > 0) {
        const record = await this.updateRecordIfBetter(
          userId,
          exerciseId,
          'duration',
          maxDuration,
          'sec',
          workoutId
        );
        if (record) newRecords.push(record);
      }

      // Check distance PR (max distance in a single set)
      const maxDistance = Math.max(...exercise.sets.map((set) => set.distance || 0));
      if (maxDistance > 0) {
        const record = await this.updateRecordIfBetter(
          userId,
          exerciseId,
          'distance',
          maxDistance,
          'km',
          workoutId
        );
        if (record) newRecords.push(record);
      }
    }

    // Populate exercise data for newRecords
    await PersonalRecord.populate(newRecords, {
      path: 'exerciseId',
      select: 'name category muscleGroup',
    });

    return newRecords;
  },

  // Update record if new value is better
  async updateRecordIfBetter(
    userId: string,
    exerciseId: string,
    type: 'weight' | 'reps' | 'volume' | 'duration' | 'distance',
    value: number,
    unit: string | undefined,
    workoutId: string
  ): Promise<IPersonalRecord | null> {
    const existingRecord = await PersonalRecord.findOne({
      userId,
      exerciseId,
      type,
    }).sort({ value: -1 });

    // If no existing record or new value is better, create new record
    if (!existingRecord || value > existingRecord.value) {
      const previousValue = existingRecord?.value;
      const improvement = previousValue
        ? ((value - previousValue) / previousValue) * 100
        : 0;

      const newRecord = await PersonalRecord.create({
        userId,
        exerciseId,
        type,
        value,
        unit,
        workoutId,
        previousValue,
        improvement,
        achievedAt: new Date(),
      });

      // Enviar notificación de nuevo record
      const exercise = await mongoose.model('Exercise').findById(exerciseId);
      if (exercise && (type === 'weight' || type === 'volume')) {
        await notificationService.notifyPersonalRecord(
          userId,
          exercise.name.es || exercise.name.en,
          value,
          type
        );
      }

      return newRecord;
    }

    return null;
  },

  // Get all personal records for a user
  async getUserRecords(userId: string): Promise<any> {
    const records = await PersonalRecord.find({ userId })
      .populate('exerciseId', 'name category muscleGroup')
      .sort({ achievedAt: -1 });

    // Group records by exercise
    const recordsByExercise: any = {};

    records.forEach((record) => {
      const exerciseId = record.exerciseId._id.toString();

      if (!recordsByExercise[exerciseId]) {
        recordsByExercise[exerciseId] = {
          exerciseId: record.exerciseId,
          records: {},
        };
      }

      // Keep only the best record for each type
      if (
        !recordsByExercise[exerciseId].records[record.type] ||
        record.value > recordsByExercise[exerciseId].records[record.type].value
      ) {
        recordsByExercise[exerciseId].records[record.type] = {
          _id: record._id,
          type: record.type,
          value: record.value,
          unit: record.unit,
          achievedAt: record.achievedAt,
          workoutId: record.workoutId,
          previousValue: record.previousValue,
          improvement: record.improvement,
        };
      }
    });

    return Object.values(recordsByExercise);
  },

  // Get records for a specific exercise
  async getExerciseRecords(exerciseId: string, userId: string): Promise<IPersonalRecord[]> {
    const records = await PersonalRecord.find({ userId, exerciseId })
      .populate('exerciseId', 'name category muscleGroup')
      .populate('workoutId', 'name date')
      .sort({ achievedAt: -1 });

    return records;
  },

  // Get recent records (last 30 days)
  async getRecentRecords(userId: string, days: number = 30): Promise<IPersonalRecord[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const records = await PersonalRecord.find({
      userId,
      achievedAt: { $gte: cutoffDate },
    })
      .populate('exerciseId', 'name category muscleGroup')
      .populate('workoutId', 'name date')
      .sort({ achievedAt: -1 });

    return records;
  },
};
