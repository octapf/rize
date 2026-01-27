import mongoose, { Schema, Document } from 'mongoose';

export interface IPersonalRecord extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  type: 'weight' | 'reps' | 'volume' | 'duration' | 'distance';
  value: number;
  unit?: string; // 'kg', 'lbs', 'km', 'mi', 'min', 'sec'
  workoutId: mongoose.Types.ObjectId;
  achievedAt: Date;
  previousValue?: number;
  improvement?: number; // Percentage or absolute improvement
  createdAt: Date;
  updatedAt: Date;
}

const personalRecordSchema = new Schema<IPersonalRecord>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: [true, 'Exercise ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['weight', 'reps', 'volume', 'duration', 'distance'],
      required: [true, 'Record type is required'],
    },
    value: {
      type: Number,
      required: [true, 'Value is required'],
      min: [0, 'Value must be positive'],
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs', 'km', 'mi', 'min', 'sec'],
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: [true, 'Workout ID is required'],
    },
    achievedAt: {
      type: Date,
      default: Date.now,
    },
    previousValue: {
      type: Number,
      min: [0, 'Previous value must be positive'],
    },
    improvement: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for userId + exerciseId + type to quickly find records
personalRecordSchema.index({ userId: 1, exerciseId: 1, type: 1 });

// Index for sorting by achievedAt
personalRecordSchema.index({ userId: 1, achievedAt: -1 });

export const PersonalRecord = mongoose.model<IPersonalRecord>(
  'PersonalRecord',
  personalRecordSchema
);
