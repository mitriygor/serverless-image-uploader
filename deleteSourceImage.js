const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const data = event.hasOwnProperty('deletionStatus') ? event.deletionStatus : event.s3;
  let params = {
    Bucket: data.bucket.name,
    Key: data.object.key
  }

  await s3.deleteObject(params).promise();
  return {
    bucket: {
      name: data.bucket.name === process.env.S3_ORIGINAL ? process.env.S3_THUMBNAIL :  process.env.S3_ORIGINAL
    },
    object: {
      key: data.object.key
    }
  };
};
