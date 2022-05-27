import mongoose from 'mongoose';
import colors from 'colors';

import Express from './app.js';
import { config, logger } from './config/index.js';

const express = new Express();
/*
 * Connect to the database
 * @server {Object}
 */
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB'.cyan.underline.bold);
  server = express.listen();
});
/*
 * @exitHandler {Function} - will be called on process exit
 * @unexpectedErrorHandler {Function} - will be called on unexpected error
 */

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

express.onError();
express.onListening();