import mongoose from 'mongoose';

export const TNotification = {
  like: 'like',
  comment: 'comment',
  reply: 'reply',
  follow: 'follow',
  commentLike: 'comment-like',
};

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['like', 'comment', 'follow', 'comment-like', 'replay'],
    },

    initiator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    target: {
      type: mongoose.Schema.ObjectId,
      // refPath: 'type',
      required: true,
      ref: 'User',
    },

    unread: {
      type: Boolean,
      default: true,
    },

    link: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true },
  },
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
