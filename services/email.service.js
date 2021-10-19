const nodemailer = require('nodemailer');

const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../configs/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail) => {
    return transporter.sendMail({
        from: 'Name',
        to: userMail,
        subject: 'Theme of mail',
        html: 'Hello world'
    })
}

module.exports = {
    sendMail
}