import express from 'express';
import { bootcampsControllers } from '../controllers/index.js';
import { bootcampValidation } from '../validation/index.js';
import { validate } from '../middlewares/index.js';

const router = express.Router();

/**
 * @bootcampsRoutes - /api/bootcamps
 * @description - This is the main route for the bootcamps api.
 * @access - public
 * @bootcampValidation - Joi validation
 * @bootcampsControllers - bootcampsControllers
 */

// eslint-disable-next-line prettier/prettier
router
  .route("/")
                                                                                .get(
                                                                                                                                                                validate(
                                                                                                                                                                                                                                                bootcampValidation.getAllBootcamps,
                                                                                                                                                                ),
                                                                                                                                                                bootcampsControllers.getAllBootcamps,
                                                                                )
                                                                                .post(
                                                                                                                                                                validate(
                                                                                                                                                                                                                                                bootcampValidation.createBootcamp,
                                                                                                                                                                ),
                                                                                                                                                                bootcampsControllers.createBootcamp,
                                                                                );

// eslint-disable-next-line prettier/prettier
router
  .route("/:id")
                                                                                .get(
                                                                                                                                                                validate(
                                                                                                                                                                                                                                                bootcampValidation.getSingleBootcamp,
                                                                                                                                                                ),
                                                                                                                                                                bootcampsControllers.getSingleBootcamp,
                                                                                )
                                                                                // .post(bootcampsControllers.createBootcampById)
                                                                                .put(
                                                                                                                                                                validate(
                                                                                                                                                                                                                                                bootcampValidation.updateBootcampById,
                                                                                                                                                                ),
                                                                                                                                                                bootcampsControllers.updateBootcampById,
                                                                                )
                                                                                .delete(
                                                                                                                                                                validate(
                                                                                                                                                                                                                                                bootcampValidation.deleteBootcampById,
                                                                                                                                                                ),
                                                                                                                                                                bootcampsControllers.DeleteBootcampById,
                                                                                );

export default router;
