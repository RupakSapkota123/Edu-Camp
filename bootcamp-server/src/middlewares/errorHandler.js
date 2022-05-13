// import {NextFunction, Re} from 'express'
import httpStatus from 'http-status';
import moment from 'moment';

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errResponseToJSON = ({
  statusCode,
  title,
  type,
  message,
  errors = null,
}) => ({
  status_code: statusCode,
  success: false,
  data: null,
  error: {
    title,
    type,
    message,
    errors,
  },
  timeStamp: moment().format('YYYY-MM-DD'),
});

const errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message = 'Internal server error' } = err;

  //* Mongo error
  if (err.name === 'MongoError' && err.code === 11000) {
    const field = Object.keys(err.keyValue);

    return res.status(httpStatus.CONFLICT).json(
      errResponseToJSON({
        statusCode: httpStatus.CONFLICT,
        title: 'Conflict',
        type: 'Conflict_ERROR',
        message: `An account with that ${field} already exists`,
      }),
    );
  }

  //* Mongoose validation error
  if (err.name === 'validationError') {
    const errors = Object.value(err.errors).map((el) => ({
      message: el.message,
      path: el.path,
    }));

    return res.status(httpStatus.BAD_REQUEST).json(
      errResponseToJSON({
        statusCode: httpStatus.BAD_REQUEST,
        title: 'Invalid Input',
        type: 'INVALID_INPUT_ERROR',
        message: err?.message || 'Invalid input',
        errors,
      }),
    );
  }

  //* Bad request error
  if (err.statusCode === httpStatus.BAD_REQUEST) {
    return res.status(httpStatus.BAD_REQUEST).json(
      errResponseToJSON({
        statusCode: httpStatus.BAD_REQUEST,
        title: 'Bad Request',
        type: 'BAD_REQUEST_ERROR',
        message: err?.message || 'Bad request',
      }),
    );
  }

  //* Unauthorized error
  if (err.statusCode === httpStatus.UNAUTHORIZED) {
    return res.status(httpStatus.UNAUTHORIZED).json(
      errResponseToJSON({
        statusCode: httpStatus.UNAUTHORIZED,
        title: 'Unauthorized error',
        type: 'UNAUTHORIZED_ERROR',
        message:
          err?.message || 'You are not authorized to perform your request',
      }),
    );
  }

  //* Forbidden error
  if (err.statusCode === httpStatus.FORBIDDEN) {
    return res.status(httpStatus.FORBIDDEN).json(
      errResponseToJSON({
        statusCode: httpStatus.FORBIDDEN,
        title: 'Forbidden error',
        type: 'FORBIDDEN_ERROR',
        message: err?.message || 'Forbidden Request',
      }),
    );
  }

  //* Not found error
  if (err.statusCode === httpStatus.NOT_FOUND) {
    return res.status(httpStatus.NOT_FOUND).json(
      errResponseToJSON({
        statusCode: httpStatus.NOT_FOUND,
        title: 'Resource not found',
        type: 'NOT_FOUND_ERROR',
        message: err?.message || 'Requested resource not found',
      }),
    );
  }

  //* unprocessable entity error
  if (err.statusCode === httpStatus.UNPROCESSABLE_ENTITY) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(
      errResponseToJSON({
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        title: 'UNPROCESSABLE_ENTITY',
        type: 'UNPROCESSABLE_ENTITY_ERROR',
        message: err?.message || 'Unable to process your request',
      }),
    );
  }

  console.log('FROM MIDDLEWARE----------------------', err);
  return res.status(statusCode).json({
    statusCode,
    title: 'Server error',
    type: 'SERVER_ERROR',
    message,
  });
};

// eslint-disable-next-line no-restricted-exports
export default { errorMiddleware, ErrorHandler };
