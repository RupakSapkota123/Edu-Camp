import express from 'express';
import { bootcampsControllers } from '../controllers/index.js';

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
.route('/')
.get(bootcampsControllers.getAllBootcamps)
.post(bootcampsControllers.createBootcamp);

// eslint-disable-next-line prettier/prettier
router
  .route('/:id')
  .get(bootcampsControllers.getSingleBootcamp)
  // .post(bootcampsControllers.createBootcampById)
  .put(bootcampsControllers.updateBootcampById)
  .delete(bootcampsControllers.DeleteBootcampById);

export default router;
