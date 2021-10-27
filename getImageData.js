const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const params = {
    TableName: process.env.DYNAMO_DB,
    Key: {
      original: {S: event.name}
    }
  };

  const image = await dynamodb.getItem(params, (err, data) => {
    if (err) {
      console.error(err);
    }
  }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      imagePath: process.env.S3_IMAGE_URL + image.Item.original.S,
      label: image.Item.label.S,
      note: image.Item.note.S,
      original: image.Item.original.S,
    })
  };

  return response;
};
