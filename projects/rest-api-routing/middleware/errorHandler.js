const { AppError } = require('../errors/AppError');

function notFoundHandler(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, 'ROUTE_NOT_FOUND'));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      code,
      message,
      statusCode
    }
  });
}

module.exports = { notFoundHandler, errorHandler };
