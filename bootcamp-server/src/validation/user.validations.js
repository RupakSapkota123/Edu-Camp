import Joi from 'joi';
import { objectID, password } from './custom.validations.js';

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password).min(8).max(12),
    role: Joi.string().required().valid('user', 'publisher').default('user'),
    isEmailVerified: Joi.boolean(),
    createdAt: Joi.date(),
    resetPasswordToken: Joi.string(),
    resetPasswordExpire: Joi.date(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectID),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectID),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password).min(8).max(12),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectID),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
