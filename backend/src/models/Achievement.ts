import { Schema, model, Document } from 'mongoose';

export interface IAchievement extends Document {
  key: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  icon: string;
  category: 'workout' | 'streak' | 'social' | 'exercise' | 'xp';
  requirement: number;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievementSchema = new Schema<IAchievement>({
  key: { type: String, required: true, unique: true },
  name: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  icon: { type: String, required: true },
  category: {
    type: String,
    enum: ['workout', 'streak', 'social', 'exercise', 'xp'],
    required: true,
  },
  requirement: { type: Number, required: true },
  xpReward: { type: Number, required: true },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common',
  },
});

export const Achievement = model<IAchievement>('Achievement', achievementSchema);
