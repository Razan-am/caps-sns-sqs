'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
// connect to SNS 
const sns = new AWS.SNS();
const {Consumer} = require('sqs-consumer');

const queueArn  = 'arn:aws:sns:us-east-1:340250733716:lab19caps';
const msg = { 
    orderId: '1234', 
    customer: "Jane Doe", 
    vendorId: queueArn}

const params = {
    TopicArn: queueArn,
    Message: JSON.stringify(msg)
}

sns.publish(params).promise().then(data=> {
    console.log('Pickup order',data)
}).catch(err=> {
    console.log(err)
});

const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/340250733716/lab19vendor',
    handleMessage: async(msg)=> {
        console.log('Delivered', msg.Body);
    }
});
app.start();
