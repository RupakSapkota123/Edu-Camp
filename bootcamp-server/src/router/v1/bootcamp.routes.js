import express from 'express';
import { BootcampControllers } from '../../controllers/index.js';
import { middleware } from '../../middlewares/index.js';
import { multer } from '../../storage/cloudinary.js';

const router = express.Router({ mergeParams: true });
router
  .route('/bootcamps')
  .post(
    middleware.isAuthenticated,
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

export default router;
