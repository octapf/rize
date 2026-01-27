import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'achievement' | 'record' | 'challenge' | 'social' | 'reminder' | 'system';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  actionUrl?: string; // Deep link para navegar
  createdAt: Date;
  expiresAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['achievement', 'record', 'challenge', 'social', 'reminder', 'system'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
      maxlength: 500,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
    actionUrl: {
      type: String,
    },
    expiresAt: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index compuesto para queries frecuentes
notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

// TTL index para auto-eliminar notificaciones expiradas
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
