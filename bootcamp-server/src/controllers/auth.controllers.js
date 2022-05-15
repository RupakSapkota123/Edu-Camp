import passport from 'passport';
import httpStatus from 'http-status';

import { makeResponseJSON, utils } from '../utils/index.js';
import { error } from '../middlewares/index.js';

const register = (req, res, next) => {
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
        return res.status(httpStatus.CREATED).send(makeResponseJSON(userData));
      });
    } else {
      next(new error.ErrorHandler(409, info.message));
    }
  })(req, res, next);
};

const login = (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new error.ErrorHandler(400, info.message));
    }
    req.logIn(user, function (err) {
      // <-- Log user in
      if (err) {
        return next(err);
      }

      const userData = utils.sessionizeUser(user);
      return res
        .status(200)
        .send(
          makeResponseJSON({ auth: userData, user: req.user.toUserJSON() }),
        );
    });
  })(req, res, next);
};

export default {
  register,
  login,
};
