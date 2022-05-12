import httpStatus from 'http-status';

import { userServices } from '../services/index.js';
import { ApiError, CatchAsync, pick } from '../utils/index.js';

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

const getUser = CatchAsync(async (req, res) => {
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

const createUser = CatchAsync(async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({ user, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

const updateUser = CatchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userServices.updateUser(userId, req.body);
    res.status(httpStatus.OK).json({ user, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
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
