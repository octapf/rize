import { Schema, model, Document } from 'mongoose';

export interface IWorkoutLike extends Document {
  workoutId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}

const workoutLikeSchema = new Schema<IWorkoutLike>(
  {
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate likes
workoutLikeSchema.index({ workoutId: 1, userId: 1 }, { unique: true });

export const WorkoutLike = model<IWorkoutLike>('WorkoutLike', workoutLikeSchema);
