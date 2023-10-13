class User {
    userId = Number
    username = String
    password = String
    email = String
    created = Date
    enabled = Boolean

    constructor(userId, username, password, email, created, enabled) {
        this.userId = userId
        this.username = username
        this.password = password
        this.email = email
        this.created = created
        this.enabled = enabled
    }
}
module.exports = User