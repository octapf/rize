import { Schema, model, Document } from 'mongoose';

export interface IExercise extends Document {
  name: {
    es: string;
    en: string;
  };
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills';
  difficulty: number;
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
      enum: ['push', 'pull', 'legs', 'core', 'skills'],
      required: true,
      index: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 0.5,
      max: 10.0,
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
