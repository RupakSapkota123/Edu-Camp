import express from 'express';

import bootcampRoutes from './bootcamps.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoutes);

router.use('/bootcamps', bootcampRoutes);
router.use('/user', userRoutes);

export default router;
