import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    target: {
      type: mongoose.Schema.ObjectId,
      refPath: 'type',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Post', 'Comment'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true },
  },
);

const Like = mongoose.model('Like', likeSchema);

export default Like;
