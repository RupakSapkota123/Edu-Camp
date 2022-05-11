import express from 'express';

import { userControllers } from '../controllers/index.js';

const router = express.Router();

router
  .route('/')
  .get(userControllers.getUsers)
  .post(userControllers.createUser);

router
  .route('/:userId')
  .get(userControllers.getUser)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
