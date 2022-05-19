import { error } from '../middlewares/index.js';
import { bootcampsServices } from '../services/index.js';
import { getNewsFeed } from '../services/newsfeed.services.js';
import { makeResponseJSON } from '../utils/index.js';

const feed = async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = offset * limit;

    let result = [];

    if (req.isAuthenticated()) {
      result = await getNewsFeed(
        req.user,
        { follower: req.user._id },
        skip,
        limit,
      );
    } else {
      result = await bootcampsServices.getBootcamps(
        null,
        { privacy: 'public' },
        { skip, limit, sort: { createdAt: -1 } },
      );
    }

    if (result.length === 0) {
      return next(new error.ErrorHandler(404, 'No newsfeed found'));
    }

    res.status(200).send(makeResponseJSON(result));
  } catch (err) {
    console.log('error', err);
    next(err);
  }
};

export default feed;
