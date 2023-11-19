const RegisterRequest = require('../dto/RegisterRequest')
const User = require('../model/User')
const { v4: uuidv4 } = require('uuid');
const VerificationToken = require('../model/VerificationToken');
const MailService = require('./MailService')
const mailService = new MailService()
const NotificationEmail = require('../model/NotificationEmail')
const jwt = require('jsonwebtoken')
const {secret,expiresIn} = require('../config/config')
const futureTime = require('./time').futureTime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
const pool = require('../db/connection')
const {createUser,getUserFromToken,addToken,enableUser , deleteToken} = require('../db/queries')
const refreshToken = require('./RefreshTokenService')
class AuthService {
    currentUser = ""
    async signup(registerRequest) {
        try {
        const user = new User()
        user.username = registerRequest.username
        user.email = registerRequest.email
        user.password = Buffer.from(registerRequest.password)
        user.created = new Date()
        user.enabled = false
        //save user info using pool
        await pool.query(createUser,user)
        const token = generateVerificationToken(user)
        await pool.query(addToken,[user.email,token])
        mailService.sendMail(new NotificationEmail(user.email, "Please Activate your Account", "Thank you for signing up to Angular-Node REddit, " + "please click on the below url to activate your account \n" + "http://localhost:3500/api/auth/accountVerification?token=" + token))
    }
    catch(err) {
        console.error("Unable to add user. Error: ",err)
    }
    }
    async verifyAccount(token) {
    const user = await pool.query(getUserFromToken,token)
    if(user.length < 1 ) {
        return 'Token either invalid or expired'
    }
    await Promise.all([
        pool.query(enableUser,user[0].email),
        pool.query(deleteToken,user[0].email)
    ])
    currentUser = user[0].username
    return 'User Activated'
    }
    async getLoginToken(loginForm) {
        const token = jwt.sign({"username" : loginForm.username ,
        "password" : loginForm.password},secret,{"expiresIn":expiresIn+"s"})
        this.currentUser = loginForm.username
        const rt = await refreshToken.generateRefreshToken()

        return {"authenticationToken":token,
                "refreshToken":rt.token,
                "expiresAt" : futureTime(expiresIn),
                "username" : this.createUser}
    }
    getCurrentUser() {
        if(this.currentUser === '')
            throw 'Please Login First'
        return this.currentUser
    }
    async validateRefreshToken(req) {
        try {
        await refreshToken.validateRefreshToken(req.refreshToken)
        const token = generateTokenWithUserName(req.username)
        this.currentUser = req.username
        return {"authenticationToken":token,
        "refreshToken":req.refreshToken,
        "expiresAt" : futureTime(expiresIn),
        "username" : this.createUser}
        }
        catch {
            return 'Invalid Refresh Token'
        }
        
    }
}
function generateVerificationToken(user) {
    const token = uuidv4().toString();
    const verificationToken = new VerificationToken(token, user)
    return token
}
function generateTokenWithUserName(username) {
    const token = jwt.sign({"username" : username},secret,{"expiresIn":expiresIn+"s"})
    return token
}

module.exports = new AuthService()