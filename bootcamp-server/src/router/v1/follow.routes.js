import express from 'express';
import { followControllers } from '../../controllers/index.js';

const router = express.Router({ mergeParams: true });

router.post('/follow/:followID', followControllers.followUsers);

export default router;
