import Joi from 'joi';
import httpStatus from 'http-status';

import { pick, ApiError } from '../utils/index.js';
import { error as ErrorHandle } from './index.js';
import { ErrorHandler } from './errorHandler.js';

const validate = (schema) => (req, res, next) => {
  //   const validSchema = pick(schema, ['params', 'query', 'body']);
  //   const object = pick(req, Object.keys(validSchema));
  //   const { value, error } = Joi.compile(validSchema)
  //     .prefs({
  //       errors: {
  //         label: 'key',
  //       },
  //       abortEarly: false,
  //     })
  //     .validate(object);
  //   if (error) {
  //     const errorMessage = error.details.map((details) => details.message);
  //     return next(new ErrorHandle(httpStatus.BAD_REQUEST, errorMessage));
  //   }
  //   Object.assign(req, value);
  //   return next();
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result.error);
    return next(new ErrorHandler(400, result.error.details[0].message));
  }
  if (!req.value) {
    req.value = {};
  }
  req.value.body = result.value;
  next();
};

export default validate;
