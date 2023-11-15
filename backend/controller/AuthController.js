const express = require('express')
const router = express.Router()
const authService = require('../service/AuthService')
const configureCreds = require('../config/securityConfig')
router.post('/signup', signup)
router.get('/accountVerification',verifyAccount)
router.post('/login',login)
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
    const result = authService.verifyAccount(req.query.token)
    res.status(200)
    res.json({"message" : result})
}
async function login (req,res) {
    if(await configureCreds(req.body)) {
        //res.cookie("uid", authService.login(req.body))
        res.send({"authenticationToken":authService.getLoginToken(req.body)})
        //return res.send('Login Successful')
        //return res.redirect('/home')
    }
}
module.exports = router