const fs = require('fs');
const path = require('path');
class MailContentBuilder {
    templatePath = '../resources/template/mailTemplate.html'
    build(message) {
        try {
            let htmlTemplate = fs.readFileSync(path.join(__dirname, this.templatePath), 'utf8');

            htmlTemplate = htmlTemplate.replace('{{message}}', message);

            return htmlTemplate;

        } catch (error) {
            console.error('Error rendering template', error);
        }
    }
}
module.exports = MailContentBuilder