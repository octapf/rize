import { Schema, model, Document } from 'mongoose';

export interface IUserAchievement extends Document {
  userId: Schema.Types.ObjectId;
  achievementKey: string;
  unlockedAt: Date;
  progress: number;
}

const userAchievementSchema = new Schema<IUserAchievement>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    achievementKey: {
      type: String,
      required: true,
      index: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate achievements
userAchievementSchema.index({ userId: 1, achievementKey: 1 }, { unique: true });

export const UserAchievement = model<IUserAchievement>(
  'UserAchievement',
  userAchievementSchema
);
