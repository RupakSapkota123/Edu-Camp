/* eslint-disable no-else-return */
import moment from 'moment';
import mongoose from 'mongoose';

import { User, Bootcamp, Follow } from '../models/index.js';
import {
  deleteImageFromStorage,
  uploadImageToStorage,
} from '../storage/cloudinary.js';
import { utils, makeResponseJSON, geocoder } from '../utils/index.js';
import { error } from '../middlewares/index.js';
import { BootcampService } from '../services/index.js';
import { POST_LIMIT } from '../constants/constants.js';

const getCamps = async (req, res, next) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = POST_LIMIT;
    const skip = offset * limit;
    const query = {};
    const sortQuery = {
      [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1,
    };

    const agg = await BootcampService.getPosts(req.user, query, {
      skip,
      limit,
      sort: sortQuery,
    });

    if (agg.length === 0 && offset === 0) {
      return next(new error.ErrorHandler(404, 'No bootcamps found.'));
    } else if (agg.length <= 0 && offset >= 1) {
      return next(new error.ErrorHandler(404, 'No more bootcamps found.'));
    }

    res.status(200).send(makeResponseJSON(agg));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBootcamp = async (req, res, next) => {
  try {
    const {
      name,
      description,
      privacy,
      address,
      careers,
      averageCost,
      email,
      ...rest
    } = req.body;

    let photos = [];
    if (req.files) {
      const photosToSave = req.files.map((files) =>
        uploadImageToStorage(files, `$/posts`),
      );
      photos = await Promise.all(photosToSave);
    }

    const bootcamp = new Bootcamp({
      _author_id: req.user._id,
      name: utils.filterWords.clean(name),
      description: utils.filterWords.clean(description),
      //   name,
      photos,
      privacy: privacy || 'public',
      address,
      careers,
      email,
      averageCost,
      createdAt: Date.now(),
      ...rest,
    });

    await bootcamp.save();
    await bootcamp.populate({
      path: 'author',
      select: 'profilePicture username fullName',
    });
    return res.status(200).send(
      makeResponseJSON({
        ...bootcamp.toObject(),
        isOwnPost: true,
      }),
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBootcampByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { sortBy, sortOrder } = req.query;

    const user = await User.findOne({ username });
    const myFollowingDoc = await Follow.find({ user: req.user?._id });
    const myFollowing = myFollowingDoc.map((user) => user?.target);
    if (!user) return next(new error.ErrorHandler(404, 'User not found'));

    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = POST_LIMIT;
    const skip = offset * limit;
    const query = {
      _author_id: mongoose.Types.ObjectId(user._id),
      privacy: { $in: ['public'] },
    };
    const sortQuery = {
      [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1,
    };

    if (username === req.user.username) {
      // if own profile, get both public,private,follower posts
      query.privacy.$in = ['public', 'follower', 'private'];
    } else if (myFollowing.includes(user._id.toString())) {
      // else get only public posts or follower-only posts
      query.privacy.$in = ['public', 'follower'];
    }

    const agg = await BootcampService.getPosts(req.user, query, {
      skip,
      limit,
      sort: sortQuery,
    });
    console.log('len', agg.length);
    if (agg.length === 0 && offset === 0) {
      return next(
        new error.ErrorHandler(404, `${username} hasn't posted anything yet.`),
      );
    } else if (agg.length <= 0 && offset >= 1) {
      return next(new error.ErrorHandler(404, 'No more posts.'));
    }

    res.status(200).send(makeResponseJSON(agg));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBootcamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      privacy,
      address,
      careers,
      averageCost,
      email,
      ...rest
    } = req.body;
    const obj = {
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss a'),
      isEdited: true,
      description,
      name,
    };

    if (!description && !privacy && !name && !address && !careers) {
      next(new error.ErrorHandler(400));
    }

    if (description) obj.description = utils.filterWords.clean(description);
    if (name) obj.name = utils.filterWords.clean(name);

    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) return next(new error.ErrorHandler(400));

    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
      id,
      {
        $set: {
          ...obj,
          ...rest,
        },
      },
      {
        new: true,
      },
    );

    await updatedBootcamp.populate({
      path: 'author',
      select: 'profilePicture username fullName',
    });

    res
      .status(200)
      .send(
        makeResponseJSON({ ...updatedBootcamp.toObject(), isOwnPost: true }),
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBootcamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp)
      return next(new error.ErrorHandler(404, 'Bootcamp not found'));

    if (id) {
      const imageIDs = bootcamp.photos
        .filter((img) => img?.public_id)
        .map((img) => img.public_id);

      if (bootcamp.photos && bootcamp.photos.length !== 0) {
        await deleteImageFromStorage(imageIDs);
      }

      await Bootcamp.findByIdAndDelete(id);
      res.status(200).send(makeResponseJSON({ message: 'Deleted' }));
    } else {
      return next(new error.ErrorHandler(401));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getBootcampsInRadius = async (req, res, next) => {
  try {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamp = await Bootcamp.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res
      .status(200)
      .send(makeResponseJSON({ bootcamp, count: bootcamp.length }));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  createBootcamp,
  getBootcampByUsername,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  getCamps,
};
