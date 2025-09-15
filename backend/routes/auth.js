const express = require('express')
const { body, validationResult } = require('express-validator')
const AuthController = require('../controller/AuthController')

const router = express.Router()

// Validation middleware
const validateSignup = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// Use validation before controller
router.use('/signup',validateSignup)
router.post('/signup', AuthController.signup)
router.post('/login', AuthController.login)
router.post('/refresh/token', AuthController.refreshToken)
router.post('/logout', AuthController.logout)

module.exports = router
