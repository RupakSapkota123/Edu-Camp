/* eslint-disable no-fallthrough */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import createError from 'http-errors';
import http from 'http';
import passport from 'passport';
import hpp from 'hpp';
import session from 'express-session';

import csurf from 'csurf';
import appRoutes from './router/api.routes.js';
import { error, rateLimiter } from './middlewares/index.js';
import { ApiError } from './utils/index.js';
import { config, passport as initPassport } from './config/index.js';
import socket from './config/socket.js';

const app = express();

//* set security HTTP headers
app.use(helmet());

//* enable cors
app.use(cors(config.cors));
app.set('trust proxy', 1);

app.disable('x-powered-by');
//* parse json request body
app.use(express.json());

const server = http.createServer(app);

//* sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

//* protect against http parameter pollution
app.use(hpp());

//* parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

socket(app, server);

//* enable session
app.use(cookieParser());
initPassport(passport);
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
//! limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('api/v1/auth', rateLimiter);
}

//* log requests
if (config.env === 'development') {
  app.use(morgan('dev'));
}

//* v1 api routes
app.use('/api/v1', appRoutes);

//* catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//* error handler
app.use(csurf());
app.use(error.errorMiddleware);

server.on('error', (err) => {
  if (err.syscall !== 'listen') {
    throw err;
  }
});

export { app, server };
