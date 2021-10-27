const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async (event) => {
  console.log('event', event);

  const params = {
    FilterExpression: "userSubAttr = :sub",
    ExpressionAttributeValues: {
      ":sub": {S: event.sub}
    },
    TableName: process.env.DYNAMO_DB
  };

  const images = await dynamodb.scan(params, (err, data) => {
    console.log('data', data);
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }).promise();

  const imagesPath = images.Items.map(image => {
    return {
      original: image.original.S,
      label: image.label.S,
      note: image.note.S,
      imagePath:process.env.BUCKET_URL + image.original.S

    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(imagesPath)
  };

  return response;
};
