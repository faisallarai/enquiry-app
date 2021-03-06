require('dotenv').config()
const throng = require('throng')
const Queue = require('bull')
const mailQueue = require('../queues/mail')

const workers = process.env.WEB_CONCURRENCY

function start() {
    console.log('mailQueue', mailQueue)

    mailQueue.process(maxJobsPerWorker, async (job) => {
      console.log('job', job)
        let progress = 0;
    
        // throw an error 5% of the time
        if (Math.random() < 0.05) {
          throw new Error("This job failed!")
        }
    
        while (progress < 100) {
          await sleep(50);
          progress += 1;
          job.progress(progress)
        }
    
        // A job can return values that will be stored in Redis as JSON
        // This return value is unused in this demo application.
        return { value: "This will be stored" };
      });

}

throng({ workers }, start)