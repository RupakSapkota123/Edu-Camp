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

const checkSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = utils.sessionizeUser(req.user);
    res
      .status(200)
      .send(makeResponseJSON({ auth: user, user: req.user.toUserJSON() }));
  } else {
    return next(new error.ErrorHandler(404, 'Session invalid/expired.'));
  }
};

const logout = (req, res, next) => {
  try {
    req.logOut();
    res.status(200).send(makeResponseJSON({}));
  } catch (err) {
    next(new error.ErrorHandler(422, 'Unable to logout. Please try again.'));
  }
};

const facebookAuth = (req, res, next) => {
  passport.authenticate('facebook', {
    failureRedirect: `${process.env.CLIENT_URL}/auth/facebook/failed`,
    successRedirect: `${process.env.CLIENT_URL}`,
  });
};

const loginFailure = (req, res, next) => {
  next(new error.ErrorHandler(404, 'Login failed.'));
};

export default {
  register,
  login,
  checkSession,
  logout,
  facebookAuth,
  loginFailure,
};
