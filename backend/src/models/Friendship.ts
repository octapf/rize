import { Schema, model, Document } from 'mongoose';

export interface IFriendship extends Document {
  requesterId: Schema.Types.ObjectId;
  recipientId: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

const friendshipSchema = new Schema<IFriendship>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'blocked'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate friendships
friendshipSchema.index({ requesterId: 1, recipientId: 1 }, { unique: true });

export const Friendship = model<IFriendship>('Friendship', friendshipSchema);
