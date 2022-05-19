/* eslint-disable import/prefer-default-export */
import { Follow } from '../schema/index.js';

export const getFollow = (query, type, user, skip, limit) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const myFollowDoc = await Follow.find({ user: user?._id });
      console.log('myFollowDoc', myFollowDoc);
      const myFollowing = myFollowDoc.map((follow) => follow.target);

      const agg = await Follow.aggregate([
        { $match: query },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: type === 'following' ? 'target' : 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $addFields: {
            isFollowing: { $in: ['$user._id', myFollowing] },
          },
        },
        {
          $project: {
            _id: 0,
            id: '$user._id',
            username: '$user.username',
            profilePicture: '$user.profilePicture',
            isFollowing: 1,
            email: '$user.email',
          },
        },
      ]);

      resolve(agg);
    } catch (error) {
      reject(error);
    }
  });
};
