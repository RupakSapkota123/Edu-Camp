import express from 'express';
import { bootcampsControllers } from '../controllers/index.js';
import { schemas } from '../validation/index.js';
import { middleware, validate } from '../middlewares/index.js';

const router = express.Router({ mergeParams: true });

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
    middleware.isAuthenticated,
    validate(schemas.createBootcamp),
    bootcampsControllers.createBootcamp,
  );

// eslint-disable-next-line prettier/prettier
router
  .route('/:bootcampID')
  .get(bootcampsControllers.getSingleBootcamp)
  .put(
    middleware.isAuthenticated,
    validate(schemas.updateBootcampById),
    bootcampsControllers.updateBootcampById,
  )
  .delete(
    middleware.isAuthenticated,
    validate(schemas.deleteBootcampById),
    bootcampsControllers.DeleteBootcampById,
  );

router.post(
  '/like/:bootcampID',
  middleware.isAuthenticated,
  middleware.validateObjectID('bootcampID'),
  bootcampsControllers.likePost,
);

export default router;
