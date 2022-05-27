import express from 'express';
import BootcampRoutes from './v1/bootcamp.routes.js';
import FollowRoutes from './v1/follow.routes.js';
import authRoutes from './v1/auth.routes.js';

const app = express();

app.use('/v1/auth', authRoutes);

app.use('/v1', BootcampRoutes);
app.use('/v1', FollowRoutes);

export default app;
