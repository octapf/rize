import mongoose, { Schema, Document } from 'mongoose';

export interface IChallenge extends Document {
  challengerId: mongoose.Types.ObjectId;
  challengedId: mongoose.Types.ObjectId;
  type: 'workout_count' | 'volume' | 'specific_exercise' | 'streak';
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'expired';
  targetValue: number;
  unit?: string;
  exerciseId?: mongoose.Types.ObjectId;
  duration: number; // días de duración
  startDate?: Date;
  endDate?: Date;
  challengerProgress: number;
  challengedProgress: number;
  winner?: mongoose.Types.ObjectId;
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    challengerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    challengedId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['workout_count', 'volume', 'specific_exercise', 'streak'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed', 'expired'],
      default: 'pending',
      index: true,
    },
    targetValue: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 90,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
      index: true,
    },
    challengerProgress: {
      type: Number,
      default: 0,
    },
    challengedProgress: {
      type: Number,
      default: 0,
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    acceptedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index compuesto
challengeSchema.index({ challengerId: 1, status: 1 });
challengeSchema.index({ challengedId: 1, status: 1 });

export const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);
