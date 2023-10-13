class NotificationEmail {
    recipient = String
    subject = String
    body = String

    constructor(recipient, subject, body) {
        this.recipient = recipient
        this.subject = subject
        this.body = body
    }
}

module.exports = NotificationEmail