/* eslint-disable no-shadow */
import express from 'express';
import passport from 'passport';

import httpStatus from 'http-status';
import { userControllers } from '../controllers/index.js';
import validate from '../middlewares/validate.js';
import { error } from '../middlewares/index.js';
import { utils, makeResponseJSON } from '../utils/index.js';
import { schemas } from '../validation/validation.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(userControllers.getUsers);

router
  .route('/:userId')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
