/* eslint-disable radix */
import mongoose from 'mongoose';
import moment from 'moment';
import { getFollow } from '../services/follow.service.js';
import {
  Follow,
  User,
  Notification,
  Bootcamp,
  Newsfeed,
} from '../schema/index.js';
import { makeResponseJSON } from '../utils/index.js';
import { error } from '../middlewares/index.js';

const followById = async (req, res, next) => {
  try {
    const { followID } = req.params;

    const user = await User.findById(followID);

    //* check if following user exist
    if (!user)
      return next(
        new error.ErrorHandler(
          400,
          "The person you're trying to follow doesn't exist",
        ),
      );

    //* check if following is not self
    if (followID === req?.user?.id.toString())
      return next(new error.ErrorHandler(400, "You can't follow yourself"));

    //* check if already following
    const isFollowing = await Follow.findOne({
      user: req.user?._id,
      target: mongoose.Types.ObjectId(followID),
    });

    if (isFollowing) {
      return next(new error.ErrorHandler(400, 'You are already following'));
    }
    const newFollower = new Follow({
      user: req.user?.id,
      target: mongoose.Types.ObjectId(followID),
    });

    await newFollower.save();

    // TODO --filter out duplicate followers
    const io = req.app.get('io');
    const notification = new Notification({
      type: 'follow',
      initiator: req.user._id,
      target: mongoose.Types.ObjectId(followID),
      link: `/user/${req.user._id}`,
      createdAt: Date.now(),
    });

    notification.save().then(async (doc) => {
      await doc.populate({
        path: 'initiator target',
        select: 'fullName username profilePicture',
      });

      io.to(followID).emit('newNotification', { notification: doc, count: 1 });
    });

    //* suscribe to user's channel
    const subscribeToUserFeed = await Bootcamp.find({
      _author_id: mongoose.Types.ObjectId(followID),
    })
      .sort({ createdAt: -1 })
      .limit(10);

    if (subscribeToUserFeed.length !== 0) {
      const feeds = subscribeToUserFeed.map((post) => {
        return {
          follower: req.user._id,
          post: post._id,
          post_owner: post._author_id,
          createdAt: moment().format('MMMM Do YYYY, h:mm:ss a').toString(),
        };
      });
      await Newsfeed.insertMany(feeds);
    }

    res.status(200).send(makeResponseJSON({ state: true }));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const unFollowByID = async (req, res, next) => {
  try {
    const { followID } = req.params;

    const user = User.findById(followID);
    if (!user)
      return next(
        new error.ErrorHandler(
          400,
          "The person you're trying to follow doesn't exist",
        ),
      );
    if (followID === req.user?._id?.toString()) return next(400);

    await Follow.deleteOne({
      target: mongoose.Types.ObjectId(followID),
      user: req.user?._id,
    });

    //* unsubscribe to user's channel
    await Newsfeed.deleteMany({
      post_owner: mongoose.Types.ObjectId(followID),
      follower: req.user?._id,
    });

    res.status(200).send(makeResponseJSON({ state: false }));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const following = async (req, res, next) => {
  try {
    const { userID } = req.params;
    // eslint-disable-next-line radix
    const offset = parseInt(req.query.offset) || 0;
    const limit = 10;
    const skip = 10;

    const user = await User.findOne({ userID });
    if (!user) return next(new error.ErrorHandler(400, 'User not found'));

    const followings = await getFollow(
      { user: user._id },
      'following',
      req.user,
      skip,
      limit,
    );

    if (followings.length === 0)
      return next(
        new error.ErrorHandler(404, `${userID} is not following anyone`),
      );

    res.status(200).send(makeResponseJSON(followings));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const followers = async (req, res, next) => {
  try {
    const { userID } = req.params;
    // eslint-disable-next-line radix
    const offset = parseInt(req.query.offset) || 0;
    const limit = 10;
    const skip = offset * limit;

    const user = await User.findOne({ userID });
    if (!user) return next(new error.ErrorHandler(400, 'User not found'));

    const follower = await getFollow(
      { target: user._id },
      'followers',
      req.user,
      skip,
      limit,
    );

    if (follower.length === 0)
      return next(new error.ErrorHandler(404, `${userID} has no followers`));

    res.status(200).send(makeResponseJSON(follower));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const suggestions = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const skipParam = parseInt(req.query.skip) || 0;

    const limit = parseInt(req.query.limit) || 10;
    const skip = skipParam || offset * limit;

    const myFollowingDoc = await Follow.find({ user: req.user._id });
    const myFollowing = myFollowingDoc.map((follow) => follow.target);

    const people = await User.aggregate([
      { $match: { _id: { $nin: [...myFollowing, req.user._id] } } },
      ...(limit < 0 ? [{ $sample: { size: limit } }] : []),
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          id: '$_id',
          username: 1,
          profilePicture: 1,
          isFollowing: 1,
        },
      },
    ]);

    if (people.length === 0)
      return next(error.ErrorHandler(404, 'No suggestions found'));

    res.status(200).send(makeResponseJSON(people));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default {
  followById,
  unFollowByID,
  following,
  followers,
  suggestions,
};
