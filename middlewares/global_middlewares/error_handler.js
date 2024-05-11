const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An internal server error occured";
  res.status(statusCode).json({
    suceess: false,
    message: message,
    data: null,
  });
};

module.exports = errorHandler;
