// import { error } from './index.js';
import { error } from './index.js';

const validate = (schema) => (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return next(new error.ErrorHandler(400, result.error.details[0].message));
  }
  if (!req.value) {
    req.value = {};
  }
  req.value.body = result.value;
  next();
};

export default validate;
