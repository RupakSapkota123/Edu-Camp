/* eslint-disable no-shadow */
import express from 'express';
import passport from 'passport';

import httpStatus from 'http-status';
import { userControllers } from '../controllers/index.js';
import validate from '../middlewares/validate.js';
import { error } from '../middlewares/index.js';
import { utils, makeResponseJSON } from '../utils/index.js';
import { schemas, validateBody } from '../validation/validation.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(userControllers.getUsers)
  .post((req, res, next) => {
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
          return res
            .status(httpStatus.CREATED)
            .send(makeResponseJSON(userData));
        });
      } else {
        next(new error.ErrorHandler(409, info.message));
      }
    })(req, res, next);
  });

router
  .route('/:userId')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
