import { Schema, model, Document } from 'mongoose';

export interface IExercise extends Document {
  name: {
    es: string;
    en: string;
  };
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills' | 'cardio' | 'flexibility';
  difficulty: number;
  type: 'reps' | 'time' | 'distance';
  unit?: 'seconds' | 'minutes' | 'meters' | 'kilometers' | 'miles';
  description?: {
    es: string;
    en: string;
  };
  isGlobal: boolean;
  createdBy?: Schema.Types.ObjectId;
  progression?: {
    previous?: Schema.Types.ObjectId;
    next?: Schema.Types.ObjectId;
  };
  createdAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      es: { type: String, required: true },
      en: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ['push', 'pull', 'legs', 'core', 'skills', 'cardio', 'flexibility'],
      required: true,
      index: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 0.5,
      max: 10.0,
    },
    type: {
      type: String,
      enum: ['reps', 'time', 'distance'],
      required: true,
      default: 'reps',
    },
    unit: {
      type: String,
      enum: ['seconds', 'minutes', 'meters', 'kilometers', 'miles'],
      required: function (this: IExercise) {
        return this.type === 'time' || this.type === 'distance';
      },
    },
    description: {
      es: String,
      en: String,
    },
    isGlobal: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: IExercise) {
        return !this.isGlobal;
      },
    },
    progression: {
      previous: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
      next: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
exerciseSchema.index({ category: 1, difficulty: 1 });
exerciseSchema.index({ 'name.es': 'text', 'name.en': 'text' });

export const Exercise = model<IExercise>('Exercise', exerciseSchema);
