const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();
const tableName = process.env.tableName;

exports.handler = async (event, context, callback) => {
  // TODO implement
  console.log(JSON.stringify(event));
  // if (event.httpMethod != "POST") return responseNotPut;

  const scanParams = {
    TableName: tableName
  };

  const scanResult = await dynamodb.scan(scanParams).promise();

  if (scanResult.Count == 1) {
    // If no record in the first time
    let eggCounts = parseInt(scanResult.Items[0].eggCounts.S);
    let rotatePercent = parseFloat(scanResult.Items[0].rotatePercent.S);
    let sequence = scanResult.Items[0].sequence.S;
    let sequenceArray = sequence.split(" ");

    let rotations = [];

    sequenceArray.forEach(sequence => {
      console.log("New Round: " + sequence);
      // [5 ,6 ]  7
      if (rotations.length == 0) {
        rotations.push({
          egg: parseInt(sequence),
          was_rotated: rotatePercent
        });

        return;
      }

      let existing = false;

      rotations.map(egg => {
        if (egg.egg == parseInt(sequence)) {
          egg.was_rotated += rotatePercent;
          if (egg.was_rotated > 1) {
            egg.was_rotated = parseFloat((egg.was_rotated - 1.0).toFixed(2));
          }
          existing = true;
          return egg;
        }
      });

      if (!existing) {
        rotations.push({
          egg: parseInt(sequence),
          was_rotated: rotatePercent
        });
      }
    });

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        report: {
          number_of_eggs: eggCounts,
          sequence: sequence,
          rotation_amount: rotatePercent,
          rotations: rotations
        }
      })
    };
    return response;
  } else return responseFailed;
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
