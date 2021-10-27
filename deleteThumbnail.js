const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

exports.handler = async (event) => {
  let params = {
    Bucket: process.env.S3_BUCKET,
    Key: event.s3.object.key
  }

  await s3.deleteObject(params).promise();
  return true;
};
