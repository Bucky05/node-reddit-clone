const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const authService = require('../service/AuthService')
const configureCreds = require('../config/securityConfig')
const refreshTokenService = require('../service/RefreshTokenService')
router.post('/signup', signup)
router.get('/accountVerification',verifyAccount)
router.post('/login',login)
router.post('/refresh/token',validateRefreshToken)
router.post('/logout',logout)
async function signup(req, res, next) {
  try {
    await authService.signup(req.body)
    return res.status(201).json({ message: 'User registration successful' })
  } catch (err) {
    next(err)
  }
}

async function verifyAccount (req,res) {
    const result = await authService.verifyAccount(req.query.token)
    res.status(200)
    res.send(result)
}
async function login(req, res, next) {
  try {
    const token = await authService.login(req.body)
    return res.status(200).json(token)
  } catch (err) {
    next(err)
  }
}
async function validateRefreshToken(req,res) {
    const response =  await authService.validateRefreshToken(req.body)
    res.status(200).send(response)
}
async function logout(req,res) {
    refreshTokenService.deleteRefreshToken(req.body.refreshToken)
    res.status(200).send('Refresh Token Deleted Successfully!')
}
module.exports = router