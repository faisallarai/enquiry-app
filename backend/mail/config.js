require('dotenv').config()
const nodemailer = require('nodemailer')

const { MAIL_USER, MAIL_PASSWORD } = process.env

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
})

module.exports = transport