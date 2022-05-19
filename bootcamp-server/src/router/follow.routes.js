import express from 'express';

import { followControllers } from '../controllers/index.js';

const router = express.Router();

router.post('/follow/:followID', followControllers.followById);

router.post('/unfollow/:followID', followControllers.unFollowByID);

router.get('/:userID/following', followControllers.following);

router.get('/:userID/followers', followControllers.followers);

router.get('/people/suggested', followControllers.suggestions);

export default router;
