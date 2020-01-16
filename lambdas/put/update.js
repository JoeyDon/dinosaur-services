const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();
const tableName = process.env.tableName;

exports.handler = async (event, context, callback) => {
  // TODO implement
  console.log(JSON.stringify(event));
  if (Object.keys(event.queryStringParameters).length != 3)
    return responseMissParams;

  let eggCounts = event.queryStringParameters.eggCounts;
  let rotatePercent = event.queryStringParameters.rotatePercent;
  let sequence = event.queryStringParameters.sequence;

  if (event.httpMethod != "PUT") return responseNotPut;

  const scanParams = {
    TableName: tableName
  };

  const scanResult = await dynamodb.scan(scanParams).promise();
  console.log(JSON.stringify(scanResult));

  if (scanResult.Count == 0) {
    // If no record in the first time

    let putParams = {
      Item: {
        id: {
          S: "Setting"
        },
        eggCounts: {
          S: eggCounts
        },
        rotatePercent: {
          S: rotatePercent
        },
        sequence: {
          S: sequence
        }
      },
      TableName: tableName
    };
    const putResult = await dynamodb.putItem(putParams).promise();
    return responseCreated;
  } else if (scanResult.Count == 1) {
    // Update the setting

    let uptParams = {
      TableName: tableName,
      Key: {
        id: {
          S: "Setting"
        }
      },
      UpdateExpression:
        "SET #eggCounts =:val1, #rotatePercent =:val2, #sequence =:val3",
      ExpressionAttributeNames: {
        "#eggCounts": "eggCounts",
        "#rotatePercent": "rotatePercent",
        "#sequence": "sequence"
      },
      ExpressionAttributeValues: {
        ":val1": {
          S: eggCounts
        },
        ":val2": {
          S: rotatePercent
        },
        ":val3": {
          S: sequence
        }
      }
    };
    const uptResult = await dynamodb.updateItem(uptParams).promise();
    console.log(uptResult);
    return responseUpdated;
  } else return responseFailed;
};

const responseNotPut = {
  statusCode: 400,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
  },
  body: {
    Error: "This API only accepts PUT method."
  }
};

const responseFailed = {
  statusCode: 400,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
  },
  body: {
    Error: "Failed in reaching Database"
  }
};
const responseMissParams = {
  statusCode: 400,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
  },
  body: {
    Error: "Missing required parameters"
  }
};
const responseCreated = {
  statusCode: 201,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
  },
  body: JSON.stringify({
    status: "Success",
    message: "No existing settings found, but now it's created."
  })
};

const responseUpdated = {
  statusCode: 201,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
  },
  body: JSON.stringify({
    status: "Success",
    message: "Updated"
  })
};
