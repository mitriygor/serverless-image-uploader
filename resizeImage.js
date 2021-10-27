const GM = require('gm');
const gm = GM.subClass({ imageMagick: true });
const FileType = require('file-type');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

AWS.config.update({ region: 'us-east-1' });

const resize = async (buf, width, height) => {
  return new Promise((resolve, reject) => {
    gm(buf).resize(width, height).noProfile().toBuffer((err, buffer) => err ? reject(err) : resolve(buffer));
  });
};

const saveToS3 = async (name, buf) => {
  const contentType = await FileType.fromBuffer(buf);
  const key = `${name}`;

  await s3.putObject({
    Bucket: process.env.DESTINATION_S3,
    Key: key,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: contentType.mime,
  }).promise();
  return key;
};

exports.handler = async (event) => {
  const bucket = event.s3.bucket.name;
  const filename = event.s3.object.key;

  const params = {
    Bucket: bucket,
    Key: filename
  };

  const inputData = await s3.getObject(params).promise();
  const resized = await resize(inputData.Body, 100, 100);
  const key = await saveToS3(filename, resized);

  return key;
}
