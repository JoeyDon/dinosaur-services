#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const dinosaur_services_stack_1 = require("../lib/dinosaur-services-stack");
const app = new cdk.App();
new dinosaur_services_stack_1.DinosaurServicesStack(app, 'DinosaurServicesStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlub3NhdXItc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaW5vc2F1ci1zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsNEVBQXVFO0FBRXZFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksK0NBQXFCLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IHsgRGlub3NhdXJTZXJ2aWNlc1N0YWNrIH0gZnJvbSAnLi4vbGliL2Rpbm9zYXVyLXNlcnZpY2VzLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBEaW5vc2F1clNlcnZpY2VzU3RhY2soYXBwLCAnRGlub3NhdXJTZXJ2aWNlc1N0YWNrJyk7Il19