const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();
const tableName = process.env.tableName;

exports.handler = async (event, context, callback) => {
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

    for (let i = 0; i < eggCounts; i++) {
      rotations.push({ egg: i + 1, was_rotated: 0 });
    }

    rotations = rotateEgg(rotations, sequenceArray, rotatePercent);

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
  body: {
    Error: "Failed in reaching Database"
  }
};

const rotateEgg = (rotations, sequenceArray, rotatePercent) => {
  let rotationsArray = rotations;

  sequenceArray.forEach(sequence => {
    if (sequence > rotationsArray.length) return;

    const indexFound = rotationsArray.findIndex(x => {
      return x.egg == sequence;
    });

    rotationsArray[indexFound].was_rotated += rotatePercent;
  });
  return rotationsArray;
};
