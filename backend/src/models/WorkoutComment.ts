import { Schema, model, Document } from 'mongoose';

export interface IWorkoutComment extends Document {
  workoutId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutCommentSchema = new Schema<IWorkoutComment>(
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
    content: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WorkoutComment = model<IWorkoutComment>(
  'WorkoutComment',
  workoutCommentSchema
);
