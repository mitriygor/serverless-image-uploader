const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const dDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
  try {
    const params = {
      TableName: process.env.DB_NAME,
      Item: {
        original: {S: event.original},
        note: {S: event.note},
        label: {S: event.label},
        userSubAttr: {S: event.userSubAttr},
        timestamp: {S: new Date().getTime().toString()}
      }
    };

    await dDB.putItem(params, (err, data) => {
      if (err) {
        console.error('Error', err);
      }
    }).promise();
  } catch (err) {
    console.error('Cannot save in DynamoDB', err);
  }
};
