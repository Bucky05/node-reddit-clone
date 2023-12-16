const express = require('express')
const router = express.Router()
const authService = require('../service/AuthService')
const configureCreds = require('../config/securityConfig')
const refreshTokenService = require('../service/RefreshTokenService')
router.post('/signup', signup)
router.get('/accountVerification',verifyAccount)
router.post('/login',login)
router.post('/refresh/token',validateRefreshToken)
router.post('/logout',logout)
async function signup(req, res) {
    try {
        authService.signup(req.body)
        res.sendStatus(200, "User Registration Successful")
    }
    catch (er) {
        console.log(er)
    }
}
async function verifyAccount (req,res) {
    const result = await authService.verifyAccount(req.query.token)
    res.status(200)
    res.send(result)
}
async function login (req,res) {
    const credConf = await configureCreds(req.body)
    console.log(credConf)
        if(credConf === true) {
        //res.cookie("uid", authService.login(req.body))
        res.send( await authService.getLoginToken(req.body))
        //return res.send('Login Successful')
        //return res.redirect('/home')
        }
        else {
            res.status(401).send(credConf)
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