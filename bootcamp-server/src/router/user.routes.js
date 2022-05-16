/* eslint-disable no-shadow */
import express from 'express';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';

import httpStatus from 'http-status';
import { userControllers } from '../controllers/index.js';
import { error, validate, middleware } from '../middlewares/index.js';
import { utils, makeResponseJSON } from '../utils/index.js';
import { schemas } from '../validation/validation.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(middleware, userControllers.getUsers);

router
  .route('/:userId')
  .get(middleware, userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
