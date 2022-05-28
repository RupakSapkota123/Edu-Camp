import express from 'express';
import { BootcampControllers } from '../../controllers/index.js';
import { middleware, validate } from '../../middlewares/index.js';
import { multer } from '../../storage/cloudinary.js';
import { bootcampValidation } from '../../validation/index.js';

const router = express.Router({ mergeParams: true });
router
  .route('/bootcamps')
  .post(
    middleware.isAuthenticated,
    validate(bootcampValidation.createBootcamp),
    multer.array('photos', 5),
    BootcampControllers.createBootcamp,
  );
router
  .route('/bootcamps/:id')
  .post(BootcampControllers.createBootcamp)
  .patch(BootcampControllers.updateBootcamp)
  .delete(BootcampControllers.deleteBootcamp);

router
  .route('/:username/bootcamps')
  .get(middleware.isAuthenticated, BootcampControllers.getBootcampByUsername);

router
  .route('/bootcamps/radius/:zipcode/:distance')
  .get(BootcampControllers.getBootcampsInRadius);
export default router;
