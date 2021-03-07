require('dotenv').config()
const Sequelize = require("sequelize");
const sequelize = require(".");
const transport = require("../mail/config");
const mailQueue = require('../queues/mail');


const Contact = sequelize.define('Contact', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
    
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      notEmpty: true
    }
  }
}, {
  hooks: {
    async afterCreate(instance, options) {
      console.log('instance', instance)
      console.log('options', options)
      // add email job to the queue
      const data = {
        instance: instance,
        options: options
      }

      const opts = {
        priority: 1,
        delayed: 600,
        attempts: 2,
        jobId: instance.dataValues.id
      }

      const job = await mailQueue.add(data, opts)
      console.log('mail job', job)
      return {
        id: job.id
      }
    }
  }
})


module.exports = Contact