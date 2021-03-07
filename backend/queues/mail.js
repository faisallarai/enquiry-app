require('dotenv').config()
const Queue = require('bull')

const mailQueue = new Queue('mail', process.env.REDIS_URL)

module.exports = mailQueue