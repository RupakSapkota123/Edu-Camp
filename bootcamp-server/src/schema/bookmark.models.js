import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
  {
    _bootcamp_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
    _author_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
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

BookmarkSchema.virtual('post', {
  ref: 'Bootcamp',
  localField: '_bootcamp_id',
  foreignField: '_id',
  justOne: true,
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;
