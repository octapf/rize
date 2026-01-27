import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  bio?: string;
  xp: number;
  level: number;
  stats: {
    totalWorkouts: number;
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    weeklyWorkouts?: number;
    monthlyWorkouts?: number;
  };
  isPremium: boolean;
  premiumExpiresAt?: Date;
  preferences: {
    units: 'metric' | 'imperial';
    language: 'es' | 'en';
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      followers: boolean;
      comments: boolean;
      achievements: boolean;
    };
  };
  lastLogin?: Date;
  activeRoutine?: Schema.Types.ObjectId;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  calculateLevel(): number;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-z0-9_]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    avatar: {
      url: String,
      publicId: String,
    },
    bio: {
      type: String,
      maxlength: 160,
    },
    xp: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    stats: {
      totalWorkouts: { type: Number, default: 0 },
      totalXP: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: Date,
    preferences: {
      units: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric',
      },
      language: {
        type: String,
        enum: ['es', 'en'],
        default: 'es',
      },
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto',
      },
      notifications: {
        followers: { type: Boolean, default: true },
        comments: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
      },
    },
    lastLogin: Date,
    activeRoutine: {
      type: Schema.Types.ObjectId,
      ref: 'Routine',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ xp: -1 });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Calculate level automatically
userSchema.pre('save', function (next) {
  this.level = this.calculateLevel();
  next();
});

// Methods
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.calculateLevel = function (): number {
  return Math.floor(Math.sqrt(this.xp / 100)) + 1;
};

export const User = model<IUser>('User', userSchema);
