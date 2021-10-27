const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const copySource = encodeURI('/' + event.s3.bucket.name + '/' + event.s3.object.key);
  const params = {
    Bucket: process.env.DESTINATION_BUCKET,
    CopySource: '/' + event.s3.bucket.name + '/' + event.s3.object.key,
    Key: event.s3.object.key
  };

  await s3.copyObject(params).promise();
  return {
    region: 'us-east-1',
    bucket: process.env.DESTINATION_BUCKET,
    key: event.s3.object.key
  }
};
