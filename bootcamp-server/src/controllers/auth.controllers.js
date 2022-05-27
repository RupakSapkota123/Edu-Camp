import passport from 'passport';
import { utils, makeResponseJSON } from '../utils/index.js';
import { error } from '../middlewares/index.js';

const register = async (req, res, next) => {
  passport.authenticate('local-register', (err, user, info) => {
    console.log('called');
    if (err) return next(err);
    console.log('user', user);
    if (user) {
      const userData = utils.sessionizeUser(user);
      res.status(200).send(makeResponseJSON(userData));
    } else {
      console.log(info);
      next(new error.ErrorHandler(409, info.message));
    }
  })(req, res, next);
};

const login = async (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      next(new error.ErrorHandler(401, info.message));
    } else {
      req.login(user, function (err) {
        if (err) return next(err);

        const userData = utils.sessionizeUser(user);
        return res
          .status(200)
          .send(
            makeResponseJSON({ auth: userData, user: req.user.toUserJSON() }),
          );
      });
    }
  })(req, res, next);
};

export default {
  register,
  login,
};
