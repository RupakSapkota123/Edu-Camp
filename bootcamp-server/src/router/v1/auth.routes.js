import express from 'express';

import { authControllers } from '../../controllers/index.js';

const router = express.Router({ mergeParams: true });

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);

export default router;
