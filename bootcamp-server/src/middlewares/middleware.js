import { error } from './index.js';

function isAuthenticated(req, res, next) {
  console.log('middleware.js: isAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated || req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return next();
  }

  return next(new error.ErrorHandler(401));
}

export default isAuthenticated;
