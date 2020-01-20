import cdk = require("@aws-cdk/core");
import { Function, Code, Runtime } from "@aws-cdk/aws-lambda";
import { Role, ServicePrincipal, PolicyStatement } from "@aws-cdk/aws-iam";
import dynamodb = require("@aws-cdk/aws-dynamodb");
import apigateway = require("@aws-cdk/aws-apigateway");

export class DinosaurServicesStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "DinosaurSettings", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
    });

    const restAPI = new apigateway.RestApi(this, "dinosaur-api");

    const api = restAPI.root.addResource("api");

    const updateHandlerRole = new Role(this, "updateHandlerRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com")
    });

    updateHandlerRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: [
          "logs:CreateLogStream",
          "logs:DescribeLogStreams",
          "logs:CreateLogGroup",
          "logs:PutLogEvents",
          "dynamodb:Scan",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
      })
    );

    const updateHandler = new Function(this, "updateHandler", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.asset(`lambdas`),
      handler: "put/update.handler",
      environment: {
        tableName: table.tableName
      },
      role: updateHandlerRole
    });
    const updateIntegration = new apigateway.LambdaIntegration(updateHandler);
    const settings = api.addResource("settings");
    settings.addMethod("PUT", updateIntegration);

    const runHandlerRole = new Role(this, "runHandlerRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com")
    });

    runHandlerRole.addToPolicy(
      new PolicyStatement({
        resources: ["*"],
        actions: [
          "logs:CreateLogStream",
          "logs:DescribeLogStreams",
          "logs:CreateLogGroup",
          "logs:PutLogEvents",
          "dynamodb:Scan"
        ]
      })
    );

    const runHandler = new Function(this, "runHandler", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.asset(`lambdas`),
      handler: "get/run.handler",
      environment: {
        tableName: table.tableName
      },
      role: runHandlerRole
    });
    const runIntegration = new apigateway.LambdaIntegration(runHandler);
    const run = api.addResource("run");

    run.addMethod("GET", runIntegration);
  }
}
