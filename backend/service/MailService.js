
//     private final MailContentBuilder mailContentBuilder;

//     void sendMail(NotificationEmail notificationEmail) {
//         MimeMessagePreparator messagePreparator = mimeMessage -> {
//             MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
//             messageHelper.setFrom("springreddit@email.com");
//             messageHelper.setTo(notificationEmail.getRecipient());
//             messageHelper.setSubject(notificationEmail.getSubject());
//             messageHelper.setText(mailContentBuilder.build(ntoficationEmail.getBoyd()))
//         }
//         mailSender.send(messagePreparator);

//     }
// }
const config = require('../config/config')
const nodemailer = require('nodemailer');
const MailContentBuilder = require('./MailContentBuilder')
const mailContentBuilder = new MailContentBuilder()
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // Configure your email service settings here
            host: config.smtp.Host,
            port: config.smtp.Port,
            service: config.smtp.protocol,
            auth: {
                user: config.smtp.Username,
                pass: config.smtp.Password,
            },
        });
    }

    async sendMail(notificationEmail) {
        try {
            const mailOptions = {
                from: 'springreddit@email.com',
                to: notificationEmail.recipient,
                subject: notificationEmail.subject,
                text: mailContentBuilder.build(notificationEmail.body),
            };

            const res = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully ', res);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
module.exports = MailService