// Custom Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    // Set the status code
    res.status(statusCode);
  
    // Respond with JSON
    res.json({
      status: 'error',
      statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {} // Show stack trace in development
    });
  };
  
  module.exports = {
    errorHandler,
  };
  