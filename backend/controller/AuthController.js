const RegisterRequest = require('../dto/RegisterRequest')
const express = require('express')
const router = express.Router()
const AuthService = require('../service/AuthService')
const authService = new AuthService()

router.post('/signup', signup)
router.get('/accountVerification',verifyAccount)
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
module.exports = router