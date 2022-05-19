import express from 'express';

import bootcampRoutes from './bootcamps.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import feedRoutes from './newsfeed.routes.js';
import followRoutes from './follow.routes.js';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoutes);

router.use('/bootcamps', bootcampRoutes);
router.use('/user', userRoutes);
router.use('/feed', feedRoutes);

router.use('/', followRoutes);

export default router;
