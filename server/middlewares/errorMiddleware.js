const { errorResponse } = require('../utils/responseFormatter');

/**
 * @desc Global error handler
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Handle Mongoose CastError (Invalid ID)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Resource not found / Invalid ID';
    }

    // Handle Mongoose ValidationError
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Session expired. Please log in again.';
    }

    console.error(`[Error] ${req.method} ${req.url} - ${err.stack}`);

    errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

/**
 * @desc 404 handler
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = {
    errorHandler,
    notFound
};
