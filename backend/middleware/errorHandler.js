// middleware/errorHandler.js
module.exports = function (err, req, res, next) {
  console.error(err) // use a logger in prod
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Internal Server Error' })
}
