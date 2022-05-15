import express from 'express';

import { authControllers } from '../controllers/index.js';
import { validate } from '../middlewares/index.js';
import { validate as validation } from '../validation/index.js';

const router = express.Router({ mergeParams: true });

router.post('/login', validate(validation.loginUser), authControllers.login);
router.post(
  '/register',
  validate(validation.createUser),
  authControllers.register,
);

export default router;
