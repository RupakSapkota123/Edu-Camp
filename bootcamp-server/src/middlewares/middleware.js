import mongoose from 'mongoose';
import { error } from './index.js';

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('CHECK MIDDLEWARE: IS AUTH: ', req.isAuthenticated());
    console.log('currentUser', req.user);
    return next();
  }

  return next(new error.ErrorHandler(401));
}

function validateObjectID(...ObjectIDs) {
  return function (req, res, next) {
    ObjectIDs.forEach((id) => {
      if (!mongoose.isValidObjectId(req.params[id])) {
        return next(
          new error.ErrorHandler(400, `ObjectID ${id} supplied is not valid`),
        );
      }
      next();
    });
  };
}

export default {
  isAuthenticated,
  validateObjectID,
};
