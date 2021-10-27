const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const stepFunction = new AWS.StepFunctions();

exports.handler =  (event, context) => {
  console.log('event', event);
  const params = {
    stateMachineArn: process.env.STATE_MACHINE_ARN,
    input: JSON.stringify({
      original: event.original,
      s3: {
        bucket: {
          name: process.env.S3
        },
        object: {
          key: event.original
        }
      }
    })
  }
  return stepFunction.startExecution(params).promise();
};
