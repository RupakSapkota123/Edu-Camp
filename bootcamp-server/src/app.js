/* eslint-disable no-fallthrough */
import cors from 'cors';
import csurf from 'csurf';
import express from 'express';
import session from 'express-session';
import hpp from 'hpp';
import http, { Server } from 'http';
import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';
import createError from 'http-errors';
import createDebug from 'debug';

import { error } from './middlewares/index.js';
import {
  config,
  logger as conLogger,
  passport as initPassport,
  socket as initSocket,
} from './config/index.js';
import apiRoutes from './router/api.routes.js';

const debug = createDebug('Server:server');

class Express {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.initializeMiddlewares();
    initSocket(this.app, this.server);
    initPassport(passport);
  }

  initializeMiddlewares() {
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(config.cors));
    this.app.set('trust proxy', 1);
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(hpp());

    this.app.use(session(config.session));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use('/api', apiRoutes);

    //* catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    //* error handler
    this.app.use(csurf());
    this.app.use(error.errorMiddleware);
  }

  onError() {
    this.server.on('error', (error) => {
      if (error.syscall !== 'listen') throw error;
      const bind =
        typeof config.PORT === 'string'
          ? `Pipe${config.PORT}`
          : `Port${config.PORT}`;

      //* handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
        case 'EADDRINUSE':
          console.error(`${bind} already in use`);
          process.exit(1);
        default:
          throw error;
      }
    });
  }

  onListening() {
    this.server.on('listening', () => {
      const addrs = this.server.address();
      const bind =
        typeof addrs === 'string' ? `pipe ${addrs}` : `port ${addrs.port}`;
      debug('listening on' + bind);
    });
  }

  listen() {
    this.server.listen(config.PORT, () => {
      conLogger.info(
        `# Application is Listening on ${config.env} mode from port ${config.PORT}`
          .yellow.bold,
      );
    });
  }
}

export default Express;
