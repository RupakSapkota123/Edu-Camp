/* eslint-disable no-shadow */
import httpStatus from 'http-status';
import passport from 'passport';

import { userServices } from '../services/index.js';
import { error } from '../middlewares/index.js';
import {
  utils,
  ApiError,
  CatchAsync,
  pick,
  makeResponseJSON,
} from '../utils/index.js';

const getUsers = CatchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userServices.queryUsers(filter, options);
    res.status(httpStatus.OK).json({ result, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

const getUser = CatchAsync(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUser(userId);
    if (!user || user === null) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

const getUserByEmail = CatchAsync(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (!user || user === null) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).json({ user, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

const createUser = (req, res, next) => {
  passport.authenticate('local-register', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      // if user has been successfully created
      req.logIn(user, function (err) {
        // <-- Log user in
        if (err) {
          return next(err);
        }

        const userData = utils.sessionizeUser(user);
        return res.status(200).send(makeResponseJSON(userData));
      });
    } else {
      next(new error.ErrorHandler(409, info.message));
    }
  })(req, res, next);
};

const updateUser = CatchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userServices.updateUser(userId, req.body);
  res.status(httpStatus.OK).send(makeResponseJSON(user));
});

const deleteUser = CatchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userServices.deleteUser(userId);
    res.status(httpStatus.OK).json({ user, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});

export default {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
