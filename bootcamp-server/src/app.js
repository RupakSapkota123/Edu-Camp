import express from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import http from 'http';

import appRoutes from './router/api.routes.js';
import { error, rateLimiter } from './middlewares/index.js';
import { ApiError } from './utils/index.js';
import { config } from './config/index.js';
import socket from './config/socket.js';

const app = express();

//* set security HTTP headers
app.use(helmet());

//* enable cors
app.use(cors());
app.options('*', cors());

//* parse json request body
app.use(express.json());

const server = http.createServer(app);

//* sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

//* parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

socket(app, server);

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

//* send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

//* convert error to ApiError, if needed
app.use(error.errorConverter);

//* handle error
app.use(error.errorHandler);

export { app, server };
