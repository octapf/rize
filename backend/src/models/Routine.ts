import mongoose, { Schema, Document } from 'mongoose';

export interface IRoutine extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  schedule: {
    monday?: mongoose.Types.ObjectId; // Template ID
    tuesday?: mongoose.Types.ObjectId;
    wednesday?: mongoose.Types.ObjectId;
    thursday?: mongoose.Types.ObjectId;
    friday?: mongoose.Types.ObjectId;
    saturday?: mongoose.Types.ObjectId;
    sunday?: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const routineSchema = new Schema<IRoutine>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Routine name is required'],
      trim: true,
      minlength: [2, 'Routine name must be at least 2 characters'],
      maxlength: [100, 'Routine name must be less than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be less than 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    schedule: {
      monday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      tuesday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      wednesday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      thursday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      friday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      saturday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
      sunday: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for userId + isActive
routineSchema.index({ userId: 1, isActive: 1 });

// Ensure only one active routine per user
routineSchema.pre('save', async function (next) {
  if (this.isActive && this.isModified('isActive')) {
    // Deactivate all other routines for this user
    await mongoose.model('Routine').updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

export const Routine = mongoose.model<IRoutine>('Routine', routineSchema);
