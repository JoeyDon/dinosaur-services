#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { DinosaurServicesStack } from '../lib/dinosaur-services-stack';

const app = new cdk.App();
new DinosaurServicesStack(app, 'DinosaurServicesStack');