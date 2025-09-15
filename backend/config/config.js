require('dotenv').config()

module.exports = {
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  port: process.env.PORT || 3500,
  smtp: {
    Host: process.env.SMTP_HOST,
    Port: process.env.SMTP_PORT,
    Username: process.env.SMTP_USER,
    Password: process.env.SMTP_PASS,
    protocol: 'SMTP'
  },
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || 9000
}