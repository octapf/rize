import { Schema, model, Document } from 'mongoose';

export interface IWorkoutTemplate extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  description?: string;
  category?: 'push' | 'pull' | 'legs' | 'core' | 'upper' | 'lower' | 'full-body' | 'custom';
  exercises: {
    exerciseId: Schema.Types.ObjectId;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }[];
    notes?: string;
  }[];
  isPublic: boolean;
  usageCount: number;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutTemplateSchema = new Schema<IWorkoutTemplate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: String,
      enum: ['push', 'pull', 'legs', 'core', 'upper', 'lower', 'full-body', 'custom'],
      default: 'custom',
    },
    exercises: [
      {
        exerciseId: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise',
          required: true,
        },
        sets: [
          {
            reps: { type: Number, min: 0, max: 999 },
            weight: { type: Number, min: 0, max: 9999 },
            duration: { type: Number, min: 0, max: 86400 },
            distance: { type: Number, min: 0, max: 999999 },
          },
        ],
        notes: { type: String, maxlength: 500 },
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastUsedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
workoutTemplateSchema.index({ userId: 1, name: 1 });
workoutTemplateSchema.index({ category: 1 });
workoutTemplateSchema.index({ isPublic: 1, usageCount: -1 });

export const WorkoutTemplate = model<IWorkoutTemplate>('WorkoutTemplate', workoutTemplateSchema);
