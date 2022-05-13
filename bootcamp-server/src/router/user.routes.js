import express from 'express';

import { userControllers } from '../controllers/index.js';
import validate from '../middlewares/validate.js';
import { schemas, validateBody } from '../validation/validation.js';

const router = express.Router();

router
  .route('/')
  .get(userControllers.getUsers)
  .post(validate(schemas.createUser), userControllers.createUser);

router
  .route('/:userId')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
