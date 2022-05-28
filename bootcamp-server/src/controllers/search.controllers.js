import { Follow, User, Bootcamp } from '../models/index.js';
import { BootcampService } from '../services/index.js';
import { error } from '../middlewares/index.js';
import { makeResponseJSON } from '../utils/index.js';

const search = async (req, res, next) => {
  try {
    const { q, type } = req.query;
    console.log('search', type);
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = offset * limit;
    if (!q)
      return next(new error.ErrorHandler(400, 'Please provide a search query'));
    let results = [];
    console.log('req.user', req.user);
    if (type === 'bootcamp') {
      const bootcamps = await BootcampService.getPosts(
        req.user,
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { slug: { $regex: q, $options: 'i' } },
          ],
        },
        // {
        //   slug: { $regex: q, $options: 'i' },
        //   privacy: 'public',
        // },
        {
          sort: { createdAt: -1 },
          skip,
          limit,
        },
      );

      console.log('bootcamps', bootcamps);
      if (bootcamps.length === 0) {
        return next(new error.ErrorHandler(404, 'No bootcamps found'));
      }
      results = bootcamps;
    } else {
      const users = await User.find({
        $or: [
          { username: { $regex: q, $options: 'i' } },
          { firstName: { $regex: q, $options: 'i' } },
          { lastName: { $regex: q, $options: 'i' } },
        ],
      })
        .limit(limit)
        .skip(skip);
      if (users.length === 0) {
        return next(new error.ErrorHandler(404, 'No users found'));
      }
      const myFollowingDoc = await Follow.find({
        user: req.user?._id,
      });
      const myFollowing = myFollowingDoc.map((user) => user.target);
      const usersResult = users.map((user) => {
        return {
          ...user.toProfileJSON(),
          isFollowing: myFollowing.includes(user.id),
        };
      });
      results = usersResult;
    }
    res.status(200).send(makeResponseJSON(results));
    // const { q } = req.query;
    // console.log('q', q);
    // const users = await User.find({
    //   $or: [
    //     {
    //       firstName: { $regex: q.firstName, $options: 'i' },
    //       username: { $regex: q.username, $options: 'i' },
    //     },
    //   ],
    // });
    // console.log('users', users);
    // res.status(200).send(makeResponseJSON(users));
  } catch (error) {
    console.error('errs', error);
    // next(error);
  }
};

export default { search };
