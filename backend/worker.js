require('dotenv').config()
const throng = require('throng')
const Queue = require('bull')
const transport = require('./mail/config')
const mailQueue = require('./queues/mail')
const Contact = require('./models/Contact')

const workers = process.env.WEB_CONCURRENCY
const maxJobsPerWorker = 50

const sendMail = async (job) => {
    try {
        const { fullName, email, subject, message } = job.data.instance

        const mailOptions = {
            from: fullName,
            to: process.env.MAIL_USER,
            subject: subject,
            html:`
            <p>You have a new contact request.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${fullName}</li>
                <li>Email: ${email}</li>
                <li>Subject: ${subject}</li>
                <li>Message: ${message}</li>
            </ul>
            `
        }

        transport.sendMail(mailOptions, (err, info) => {
            if(err){
                return {
                    success: false,
                    message: 'Something went wrong'
                }
            } else {
                return {
                    success: true,
                    message: info
                }
            }
        })
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

function start() {
    //const mailQueue = new Queue('mail', process.env.REDIS_URL)
    console.log('mailQueue', mailQueue)

    mailQueue.process(maxJobsPerWorker, async (job) => {
        console.log('job', job)
        console.log('jobInstance', job.data.instance)
        console.log('workers', workers)
        return await sendMail(job);
    })

    mailQueue.on('completed', job => {
        console.log(`Job with id ${job.id} has been completed`)
        Contact.update({ status: 'sent'}, {
            where: {
                id: job.id
            }
        })
    })

}

throng({ workers, start })