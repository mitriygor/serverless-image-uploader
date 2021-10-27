const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const dDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
  try {
    const params = {
      ExpressionAttributeNames: {
        '#L': 'label',
        '#N': 'note',
        '#T': 'timestamp'
      },
      ExpressionAttributeValues: {
        ':l': {
          S: event.label
        },
        ':n': {
          S: event.note
        },
        ':t': {
          S: new Date().getTime().toString()
        }
      },
      Key: {
        'original': {
          S: event.original
        }
      },
      TableName: 'catlog-images',
      UpdateExpression: 'SET #L = :l, #N = :n, #T = :t'
    };

    await dDB.updateItem(params, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success!", data);
      }
    }).promise();
  } catch (err) {
    console.error('Cannot save in DynamoDB', err)
  }
};
