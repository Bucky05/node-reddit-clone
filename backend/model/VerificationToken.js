const User = require("./User")

class VerificationToken {
    id = Number
    user = User
    expiryDate = Date
    token = String

    constructor(id, user, expiryDate, token) {
        this.id = id
        this.user = user
        this.expiryDate = expiryDate
        this.token = token
    }
}

module.exports = VerificationToken