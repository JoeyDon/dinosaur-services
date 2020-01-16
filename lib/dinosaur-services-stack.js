"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_iam_1 = require("@aws-cdk/aws-iam");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const apigateway = require("@aws-cdk/aws-apigateway");
class DinosaurServicesStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const table = new dynamodb.Table(this, "DinosaurSettings", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
        });
        const restAPI = new apigateway.RestApi(this, "dinosaur-api");
        const api = restAPI.root.addResource("api");
        const updateHandlerRole = new aws_iam_1.Role(this, "updateHandlerRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("lambda.amazonaws.com")
        });
        updateHandlerRole.addToPolicy(new aws_iam_1.PolicyStatement({
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
        }));
        const updateHandler = new aws_lambda_1.Function(this, "updateHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            code: aws_lambda_1.Code.asset(`lambdas`),
            handler: "put/update.handler",
            environment: {
                tableName: table.tableName
            },
            role: updateHandlerRole
        });
        const updateIntegration = new apigateway.LambdaIntegration(updateHandler);
        const settings = api.addResource("settings");
        settings.addMethod("PUT", updateIntegration);
        const runHandlerRole = new aws_iam_1.Role(this, "runHandlerRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("lambda.amazonaws.com")
        });
        runHandlerRole.addToPolicy(new aws_iam_1.PolicyStatement({
            resources: ["*"],
            actions: [
                "logs:CreateLogStream",
                "logs:DescribeLogStreams",
                "logs:CreateLogGroup",
                "logs:PutLogEvents",
                "dynamodb:Scan"
            ]
        }));
        const runHandler = new aws_lambda_1.Function(this, "runHandler", {
            runtime: aws_lambda_1.Runtime.NODEJS_12_X,
            code: aws_lambda_1.Code.asset(`lambdas`),
            handler: "post/run.handler",
            environment: {
                tableName: table.tableName
            },
            role: runHandlerRole
        });
        const runIntegration = new apigateway.LambdaIntegration(runHandler);
        const run = api.addResource("run");
        run.addMethod("POST", runIntegration);
    }
}
exports.DinosaurServicesStack = DinosaurServicesStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlub3NhdXItc2VydmljZXMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaW5vc2F1ci1zZXJ2aWNlcy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFzQztBQUN0QyxvREFBOEQ7QUFDOUQsOENBQTJFO0FBQzNFLGtEQUFtRDtBQUNuRCxzREFBdUQ7QUFFdkQsTUFBYSxxQkFBc0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNsRCxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN6RCxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtTQUNsRSxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTdELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzVELFNBQVMsRUFBRSxJQUFJLDBCQUFnQixDQUFDLHNCQUFzQixDQUFDO1NBQ3hELENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLFdBQVcsQ0FDM0IsSUFBSSx5QkFBZSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNoQixPQUFPLEVBQUU7Z0JBQ1Asc0JBQXNCO2dCQUN0Qix5QkFBeUI7Z0JBQ3pCLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixlQUFlO2dCQUNmLGtCQUFrQjtnQkFDbEIscUJBQXFCO2FBQ3RCO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN4RCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDM0IsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixXQUFXLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzNCO1lBQ0QsSUFBSSxFQUFFLGlCQUFpQjtTQUN4QixDQUFDLENBQUM7UUFDSCxNQUFNLGlCQUFpQixHQUFHLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUU3QyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDdEQsU0FBUyxFQUFFLElBQUksMEJBQWdCLENBQUMsc0JBQXNCLENBQUM7U0FDeEQsQ0FBQyxDQUFDO1FBRUgsY0FBYyxDQUFDLFdBQVcsQ0FDeEIsSUFBSSx5QkFBZSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNoQixPQUFPLEVBQUU7Z0JBQ1Asc0JBQXNCO2dCQUN0Qix5QkFBeUI7Z0JBQ3pCLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixlQUFlO2FBQ2hCO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNsRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDM0IsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixXQUFXLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzNCO1lBQ0QsSUFBSSxFQUFFLGNBQWM7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUEzRUQsc0RBMkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jb3JlXCIpO1xuaW1wb3J0IHsgRnVuY3Rpb24sIENvZGUsIFJ1bnRpbWUgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgUm9sZSwgU2VydmljZVByaW5jaXBhbCwgUG9saWN5U3RhdGVtZW50IH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1pYW1cIjtcbmltcG9ydCBkeW5hbW9kYiA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtZHluYW1vZGJcIik7XG5pbXBvcnQgYXBpZ2F0ZXdheSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiKTtcblxuZXhwb3J0IGNsYXNzIERpbm9zYXVyU2VydmljZXNTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCBcIkRpbm9zYXVyU2V0dGluZ3NcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwiaWRcIiwgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzdEFQSSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJkaW5vc2F1ci1hcGlcIik7XG5cbiAgICBjb25zdCBhcGkgPSByZXN0QVBJLnJvb3QuYWRkUmVzb3VyY2UoXCJhcGlcIik7XG5cbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyUm9sZSA9IG5ldyBSb2xlKHRoaXMsIFwidXBkYXRlSGFuZGxlclJvbGVcIiwge1xuICAgICAgYXNzdW1lZEJ5OiBuZXcgU2VydmljZVByaW5jaXBhbChcImxhbWJkYS5hbWF6b25hd3MuY29tXCIpXG4gICAgfSk7XG5cbiAgICB1cGRhdGVIYW5kbGVyUm9sZS5hZGRUb1BvbGljeShcbiAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICByZXNvdXJjZXM6IFtcIipcIl0sXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICBcImxvZ3M6Q3JlYXRlTG9nU3RyZWFtXCIsXG4gICAgICAgICAgXCJsb2dzOkRlc2NyaWJlTG9nU3RyZWFtc1wiLFxuICAgICAgICAgIFwibG9nczpDcmVhdGVMb2dHcm91cFwiLFxuICAgICAgICAgIFwibG9nczpQdXRMb2dFdmVudHNcIixcbiAgICAgICAgICBcImR5bmFtb2RiOlNjYW5cIixcbiAgICAgICAgICBcImR5bmFtb2RiOlB1dEl0ZW1cIixcbiAgICAgICAgICBcImR5bmFtb2RiOlVwZGF0ZUl0ZW1cIlxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyID0gbmV3IEZ1bmN0aW9uKHRoaXMsIFwidXBkYXRlSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgY29kZTogQ29kZS5hc3NldChgbGFtYmRhc2ApLFxuICAgICAgaGFuZGxlcjogXCJwdXQvdXBkYXRlLmhhbmRsZXJcIixcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIHRhYmxlTmFtZTogdGFibGUudGFibGVOYW1lXG4gICAgICB9LFxuICAgICAgcm9sZTogdXBkYXRlSGFuZGxlclJvbGVcbiAgICB9KTtcbiAgICBjb25zdCB1cGRhdGVJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKHVwZGF0ZUhhbmRsZXIpO1xuICAgIGNvbnN0IHNldHRpbmdzID0gYXBpLmFkZFJlc291cmNlKFwic2V0dGluZ3NcIik7XG4gICAgc2V0dGluZ3MuYWRkTWV0aG9kKFwiUFVUXCIsIHVwZGF0ZUludGVncmF0aW9uKTtcblxuICAgIGNvbnN0IHJ1bkhhbmRsZXJSb2xlID0gbmV3IFJvbGUodGhpcywgXCJydW5IYW5kbGVyUm9sZVwiLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIilcbiAgICB9KTtcblxuICAgIHJ1bkhhbmRsZXJSb2xlLmFkZFRvUG9saWN5KFxuICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIHJlc291cmNlczogW1wiKlwiXSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIFwibG9nczpDcmVhdGVMb2dTdHJlYW1cIixcbiAgICAgICAgICBcImxvZ3M6RGVzY3JpYmVMb2dTdHJlYW1zXCIsXG4gICAgICAgICAgXCJsb2dzOkNyZWF0ZUxvZ0dyb3VwXCIsXG4gICAgICAgICAgXCJsb2dzOlB1dExvZ0V2ZW50c1wiLFxuICAgICAgICAgIFwiZHluYW1vZGI6U2NhblwiXG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJ1bkhhbmRsZXIgPSBuZXcgRnVuY3Rpb24odGhpcywgXCJydW5IYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBDb2RlLmFzc2V0KGBsYW1iZGFzYCksXG4gICAgICBoYW5kbGVyOiBcInBvc3QvcnVuLmhhbmRsZXJcIixcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIHRhYmxlTmFtZTogdGFibGUudGFibGVOYW1lXG4gICAgICB9LFxuICAgICAgcm9sZTogcnVuSGFuZGxlclJvbGVcbiAgICB9KTtcbiAgICBjb25zdCBydW5JbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKHJ1bkhhbmRsZXIpO1xuICAgIGNvbnN0IHJ1biA9IGFwaS5hZGRSZXNvdXJjZShcInJ1blwiKTtcblxuICAgIHJ1bi5hZGRNZXRob2QoXCJQT1NUXCIsIHJ1bkludGVncmF0aW9uKTtcbiAgfVxufVxuIl19