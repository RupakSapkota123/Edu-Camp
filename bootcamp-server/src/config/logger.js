import winston from 'winston';
import morgan from 'morgan';
import config from './config.js';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack,
    });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

//* Logs the request to console
export const logRequest = (req, res, next) => {
  if (config.env === 'development') {
    morgan('dev');
  }
  next();
};

export default logger;
