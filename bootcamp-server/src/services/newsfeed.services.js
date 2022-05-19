/* eslint-disable import/prefer-default-export */
import { User, bookmark, Newsfeed } from '../schema/index.js';

export const getNewsFeed = (user, query, skip, limit) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const myBookmarks = await bookmark.find({ _author_id: user?._id });
      const bookmarkPostIDs = myBookmarks.map((bookmark) => bookmark._post_id);

      const agg = await Newsfeed.aggregate([
        {
          $match: query,
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'posts',
            localField: 'post',
            foreignField: '_id',
            as: 'post',
          },
        },
        {
          $project: {
            post: {
              $first: '$post',
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: '$post._id',
            privacy: '$post.privacy',
            photos: '$post.photos',
            isEdited: '$post.isEdited',
            _author_id: '$post._author_id',
            createdAt: '$post.createdAt',
            updatedAt: '$post.updatedAt',
          },
        },
        {
          //* lookup from Comments collection to get total comments
          $lookup: {
            from: 'comments',
            localField: 'id',
            foreignField: '_post_id',
            as: 'comments',
          },
        },
        {
          //* lookup from likes collection to get total likes
          $lookup: {
            from: 'likes',
            localField: 'id',
            foreignField: 'target',
            as: 'likes',
          },
        },
        {
          //* lookup from bookmarks collection to get total bookmarks
          $lookup: {
            from: 'bookmarks',
            localField: 'id',
            foreignField: '_post_id',
            as: 'bookmarks',
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
        {
          //* add isLiked field by checking if user id is in $likes array form lookup
          $addFields: {
            isLiked: { $in: [user?._id, '$likeIDs'] },
            isOwnPost: { $eq: ['$$CURRENT._author_id', user?._id] },
            isBookMarked: { $in: ['$id', bookmarkPostIDs] },
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            privacy: 1,
            photos: 1,
            description: 1,
            isEdited: 1,
            createdAt: 1,
            updatedAt: 1,
            isLiked: 1,
            isOwnPost: 1,
            isBookMarked: 1,
            commentsCount: { $size: '$comments' },
            likesCount: { $size: '$likes' },
            author: { $first: '$author' },
          },
        },
      ]);

      const filtered = [];

      agg.forEach((post) => {
        //* make sure to not include private posts of users
        // eslint-disable-next-line no-useless-return
        if (!post.isOwnPost && post.privacy === 'private') return;
        filtered.push(post);
      });

      resolve(filtered);
    } catch (e) {
      reject(e);
    }
  });
};
