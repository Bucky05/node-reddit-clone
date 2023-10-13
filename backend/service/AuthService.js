const VerificationTokenRepository = require('../model/VerificationToken')
const RegisterRequest = require('../dto/RegisterRequest')
const User = require('../model/User')
const { v4: uuidv4 } = require('uuid');
const VerificationToken = require('../model/VerificationToken');
const MailService = require('./MailService')
const mailService = new MailService()
const NotificationEmail = require('../model/NotificationEmail')
class AuthService {
    verificationTokenRepository = VerificationTokenRepository
    async signup(registerRequest) {
        const user = new User()
        user.username = registerRequest.username
        user.email = registerRequest.email
        user.password = Buffer.from(registerRequest.password)
        user.created = new Date()
        user.enabled = false

        //save user info using pool

        const token = generateVerificationToken(user)
        mailService.sendMail(new NotificationEmail(user.email, "Please Activate your Account", "Thank you for signing up to Angular-Node REddit, " + "please click on the below url to activate your account \n" + "http://localhost:3500/api/auth/accountVerification/" + token))
    }
}
function generateVerificationToken(user) {
    const token = uuidv4().toString();
    const verificationToken = new VerificationToken(token, user)
    return token
}

module.exports = AuthService