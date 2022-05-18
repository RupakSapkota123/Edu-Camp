import express from 'express';
import { bootcampsControllers } from '../controllers/index.js';
import { schemas } from '../validation/index.js';
import { middleware, validate } from '../middlewares/index.js';

const router = express.Router();

/**
 * @bootcampsRoutes - /api/bootcamps
 * @description - This is the main route for the bootcamps api.
 * @access - public
 * @schemas - Joi validation
 * @bootcampsControllers - bootcampsControllers
 */

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(validate(schemas.getAllBootcamps), bootcampsControllers.getAllBootcamps)
  .post(
    middleware,
    validate(schemas.createBootcamp),
    bootcampsControllers.createBootcamp,
  );

// eslint-disable-next-line prettier/prettier
router
  .route('/:id')
  .get(bootcampsControllers.getSingleBootcamp)
  // .post(bootcampsControllers.createBootcampById)
  .put(
    middleware,
    validate(schemas.updateBootcampById),
    bootcampsControllers.updateBootcampById,
  )
  .delete(
    middleware,
    validate(schemas.deleteBootcampById),
    bootcampsControllers.DeleteBootcampById,
  );

export default router;
