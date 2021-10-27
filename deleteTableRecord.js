const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const params = {
    TableName: process.env.DYNAMO_DB,
    Key: {
      original: {S: event.original}
    }
  };

  const image = await dynamodb.deleteItem(params, (err, data) => {
    if (err) {
      console.error(err);
    }
  }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(image)
  };

  return response;
};
