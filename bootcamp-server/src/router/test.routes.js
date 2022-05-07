import express from 'express';
import { testControllers } from '../controllers/index.js';

const router = express.Router();

router.route('/').get(testControllers.testControllers);

export default router;
