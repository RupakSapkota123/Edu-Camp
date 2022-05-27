import mongoose from 'mongoose';

import { Follow, User } from '../models/index.js';
import { FollowService } from '../services/index.js';
import { error } from '../middlewares/index.js';
import makeResponseJSON from '../utils/makeResponseJSON.js';

const followUsers = async (req, res, next) => {
  try {
    const { followID } = req.params;

    const user = User.findById(followID);
    // CHECK IF FOLLOWING USER EXIST
    if (!user)
      return next(
        new error.ErrorHandler(
          404,
          "The person you're trying to follow doesn't exist.",
        ),
      );
    // CHECK IF FOLLOWING IS NOT YOURSELF
    if (followID === req.user?._id.toString())
      return next(new error.ErrorHandler(400, "You can't follow yourself."));

    //  CHECK IF ALREADY FOLLOWING
    const isFollowing = await Follow.findOne({
      user: req.user?._id,
      target: mongoose.Types.ObjectId(followID),
    });

    if (isFollowing) {
      next(new error.ErrorHandler(400, 'Already following.'));
    } else {
      const newFollower = new Follow({
        user: req.user?._id,
        target: mongoose.Types.ObjectId(followID),
      });

      await newFollower.save();
    }

    res.status(200).send(makeResponseJSON({ state: true }));
  } catch (error) {
    console.log('followUsersErr', error);
    next(error);
  }
};

export default {
  followUsers,
};
