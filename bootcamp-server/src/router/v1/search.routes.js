import express from 'express';
import { searchControllers } from '../../controllers/index.js';

const router = express.Router({ mergeParams: true });

router.route('/search').get(searchControllers.search);
export default router;
