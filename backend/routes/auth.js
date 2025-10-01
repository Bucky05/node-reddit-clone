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
router.post('/signup', validateSignup, AuthController.signup)
router.post('/login', AuthController.login)
router.post('/refresh/token', AuthController.validateRefreshToken)
router.post('/logout', AuthController.logout)
router.get("/accountVerification", AuthController.verifyAccount);
module.exports = router
