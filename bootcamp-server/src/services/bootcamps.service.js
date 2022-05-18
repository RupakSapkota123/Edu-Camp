/* eslint-disable no-async-promise-executor */
import moment from 'moment';
import { Bootcamp } from '../schema/index.js';
import { utils } from '../utils/index.js';

/**
 * @desc: get all bootcamps
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
const getAllBootcamps = async (body) => {
  try {
    const bootcamps = await Bootcamp.find({
      body,
    });
    return bootcamps;
  } catch (err) {
    return err;
  }
};

/**
 * @desc: get single bootcamps
 * @param {ObjectId} id
 * @returns {Promise<Bootcamp>}
 */
const getSingleBootcamp = async (id) => {
  const bootcamp = await Bootcamp.findById(id);

  //* check if bootcamp exists
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }

  return bootcamp;
};

/**
 * @desc: Create New Bootcamps
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
const createBootcamp = async (body, user) => {
  console.log('body', user);
  const { description, privacy, address, name } = body;
  console.log('profile', user.author);
  const bootcamp = new Bootcamp({
    _author_id: user._id,
    author: user.fullName,
    name,
    description: utils.filterWords.clean(description),
    privacy: privacy || 'public',
    address: address || '',
    createdAt: Date.now(),
  });
  await bootcamp.save();
  await bootcamp.populate([
    {
      path: 'author',
      select: 'profilePicture username fullName email',
    },
  ]);
  return bootcamp;
};

/**
 * @desc: Update Bootcamp
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
const updateBootcampById = async (id, bootcampBody) => {
  const bootcamp = await getSingleBootcamp(id);
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }
  if (await Bootcamp.findByName(bootcampBody.name)) {
    throw new Error('Bootcamp name is taken');
  }
  Object.assign(bootcamp, bootcampBody);
  await bootcamp.save();
  return bootcamp;
};

/**
 * @desc: Delete Bootcamp
 * @param {ObjectId} id
 * @returns {Promise<Bootcamp>}
 */
const deleteBootcampById = async (id) => {
  const bootcamp = await getSingleBootcamp(id);
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }
  await bootcamp.remove();
  return bootcamp;
};

const buildPaginateOptions = (opts) => {
  const arr = [];
  if (opts.sort) arr.push({ $sort: opts.sort });
  if (opts.skip) arr.push({ $skip: opts.skip });
  if (opts.limit) arr.push({ $limit: opts.limit });

  return arr;
};

export const getBootcamps = (user, query, paginate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const agg = await Bootcamp.aggregate([
        {
          $match: query,
        },
        ...buildPaginateOptions(paginate || {}),
        //* lookup form comments collection to get total comments
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: '_bootcamp_id',
            as: 'comments',
          },
        },
        //* lookup from likes collection to get total likes
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'target',
            as: 'likes',
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { authorID: '$_author_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$authorID'],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  id: '$_id',
                  profilePicture: 1,
                  username: 1,
                  fullName: 1,
                  email: 1,
                },
              },
            ],
            as: 'author',
          },
        },
        {
          $addFields: {
            likeIDs: {
              $map: {
                input: '$likes',
                as: 'postLike',
                in: '$$postLike.user',
              },
            },
          },
        },
        //* add isLiked field by checking if user id is in $likes array form lookup
        {
          $addFields: {
            isLiked: {
              $in: [user?._id, '$likeIDs'],
            },
            isOwnPost: {
              $eq: ['$$CURRENT._author_id', user?._id],
            },
            isBookmarked: {
              $in: ['$_id', bookmarkPostIDs],
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            privacy: 1,
            photos: 1,
            description: 1,
            isEdited: 1,
            createdAt: 1,
            updatedAt: 1,
            author: { $first: '$author' },
            isLiked: 1,
            isOwnPost: 1,
            isBookmarked: 1,
            commentsCount: {
              $size: '$comments',
            },
            likesCount: {
              $size: '$likes',
            },
          },
        },
      ]);
      resolve(agg);
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
};
