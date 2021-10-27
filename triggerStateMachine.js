const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const stepFunction = new AWS.StepFunctions();

exports.handler = async (event) => {
  console.log('event', event);
  const filesProcessed = event.Records.map(async (record) => {
    console.log('record', record);
    const params = {
      stateMachineArn: process.env.STATE_MACHINE_ARN,
      input: JSON.stringify(record)
    }
    const data =  await stepFunction.startExecution(params).promise();
    console.log('data', data);
    return data;
  });

  return Promise.all(filesProcessed);
};
