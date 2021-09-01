'use strict';

const AWS = require('aws-sdk');
const {Consumer} = require('sqs-consumer');
console.log("inside index!!!")
AWS.config.update({region: 'us-east-1'});

// connect to SQS 
const sqs = new AWS.SQS();

const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/340250733716/lab19vendor',
    handleMessage: async(msg)=> {
        let parsedBody = await JSON.parse(msg.Body); 
        const myMsg = await JSON.parse(parsedBody.Message);
        console.log('Pick Up',myMsg);
        setTimeout(async () => {
            console.log(`Delivered ${myMsg.orderId}`);
          }, 5000);
    }
});

// =====================================
app.on('error', err=> {
    console.error(err)
});

app.on('processing_error', (err) => {
    console.error(err.message);
});
app.start();
