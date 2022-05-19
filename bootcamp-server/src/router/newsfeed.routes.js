import express from 'express';

import feed from '../controllers/newsfeed.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', feed);

export default router;
