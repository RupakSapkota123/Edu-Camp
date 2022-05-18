import { error } from './index.js';

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('CHECK MIDDLEWARE: IS AUTH: ', req.isAuthenticated());
    return next();
  }

  return next(new error.ErrorHandler(401));
}

export default isAuthenticated;
