import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { getters: true, virtuals: true },
  },
);

const Follow = mongoose.model('Follow', FollowSchema);

export default Follow;
