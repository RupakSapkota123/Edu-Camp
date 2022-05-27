import { Bootcamp } from '../models/index.js';

const buildPaginateOptions = (opts) => {
  const arr = [];
  if (opts.sort) arr.push({ $sort: opts.sort });
  if (opts.skip) arr.push({ $skip: opts.skip });
  if (opts.limit) arr.push({ $limit: opts.limit });

  return arr;
};

const getPosts = (user, query, paginate) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const agg = await Bootcamp.aggregate([
        {
          $match: query,
        },
        ...buildPaginateOptions(paginate || {}),
        {
          // lookup from Comments collection to get total
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: '_post_id',
            as: 'comments',
          },
        },
        {
          // lookup from Likes collection to get total
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
                  email: 1,
                  profilePicture: 1,
                  username: 1,
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
        {
          // add isLiked field by checking if user id exists in $likes array from lookup
          $addFields: {
            isLiked: { $in: [user?._id, '$likeIDs'] },
            isOwnPost: { $eq: ['$$CURRENT._author_id', user?._id] },
          },
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            name: 1,
            privacy: 1,
            photos: 1,
            description: 1,
            website: 1,
            address: 1,
            careers: 1,
            averageCost: 1,
            email: 1,
            phone: 1,
            location: 1,
            averageRating: 1,
            housing: 1,
            jobAssistance: 1,
            jobGuarantee: 1,
            acceptGi: 1,
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

export default { getPosts };
