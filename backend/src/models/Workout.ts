import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  date: Date;
  exercises: {
    exerciseId: Schema.Types.ObjectId;
    sets: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
      completed: boolean;
      completedAt?: Date;
    }[];
    notes?: string;
  }[];
  duration?: number;
  notes?: string;
  xpEarned: number;
  visibility: 'private' | 'friends' | 'public';
  status: 'planned' | 'in-progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  photo?: {
    url: string;
    publicId: string;
  };
  isDeleted: boolean;
  createdAt: Date;
  lastEditedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: Date, required: true, default: Date.now },
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
            duration: { type: Number, min: 0, max: 86400 }, // max 24 hours
            distance: { type: Number, min: 0, max: 999999 },
            completed: { type: Boolean, default: false },
            completedAt: { type: Date },
          },
        ],
        notes: { type: String, maxlength: 500 },
      },
    ],
    duration: { type: Number, min: 0, max: 86400 }, // seconds
    notes: { type: String, maxlength: 1000 },
    xpEarned: { type: Number, required: true, default: 0, min: 0 },
    visibility: {
      type: String,
      enum: ['private', 'friends', 'public'],
      default: 'private',
    },
    status: {
      type: String,
      enum: ['planned', 'in-progress', 'completed'],
      default: 'planned',
    },
    startedAt: { type: Date },
    completedAt: { type: Date },
    photo: {
      url: String,
      publicId: String,
    },
    isDeleted: { type: Boolean, default: false, index: true },
    lastEditedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Compound indexes
workoutSchema.index({ userId: 1, createdAt: -1 });
workoutSchema.index({ visibility: 1, createdAt: -1 });
workoutSchema.index({ userId: 1, isDeleted: 1, createdAt: -1 });

// Virtual populate
workoutSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Update lastEditedAt on modify
workoutSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.lastEditedAt = new Date();
  }
  next();
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
