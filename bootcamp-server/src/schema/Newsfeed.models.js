import mongoose from 'mongoose';

const NewsFeedSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  post_author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: Date,
});

const Newsfeed = mongoose.model('Newsfeed', NewsFeedSchema);

export default Newsfeed;
