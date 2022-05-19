import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    target: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true },
  },
);

const Follow = mongoose.model('Follow', FollowSchema);

export default Follow;
