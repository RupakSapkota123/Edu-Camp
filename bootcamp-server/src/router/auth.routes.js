import express from 'express';
import passport from 'passport';
import config from '../config/config.js';

import { authControllers } from '../controllers/index.js';
import { error, validate } from '../middlewares/index.js';
import { validate as validation } from '../validation/index.js';

const router = express.Router({ mergeParams: true });

const app = express();

router.post('/login', validate(validation.loginUser), authControllers.login);
router.post(
  '/register',
  validate(validation.createUser),
  authControllers.register,
);
router.get('/check-session', authControllers.checkSession);

router.delete('/logout', authControllers.logout);

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    failureRedirect: '/failure',
    scope: ['email', 'public_profile'],
    authType: 'reauthenticate',
  }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${config.client}/auth/facebook/failed`,
    failureFlash: true,
    failureMessage: true,
    successReturnToOrRedirect: `${config.client}/welcome`,
    successMessage: true,
  }),
);

router.get('/failure', (req, res, next) => {
  next(new error.ErrorHandler());
});

export default router;
