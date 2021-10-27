const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY
});

const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  let url = '';
  const payload = JSON.stringify({
    original: event.fileName,
    note: event.note,
    label: event.label,
    userSubAttr: event.userSubAttr
  });

  const lambdaParams = {
    FunctionName: process.env.SAVE_TO_DB_LAMBDA,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: payload
  };

  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: event.fileName,
    Expires: 500,
    ContentType: event.fileType,
    ACL: 'public-read'
  };

  url = await s3.getSignedUrlPromise('putObject', s3Params);

  await lambda.invoke(lambdaParams, (err, data) => {
    if (err) {
      console.error('invoke ERR:', err);
    }
  }).promise();

  return url;
};
