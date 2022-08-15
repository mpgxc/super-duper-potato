import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DynamoClientService
  extends DynamoDBClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      region: 'us-east-1',
    });
  }

  onModuleInit() {
    return this;
  }

  onModuleDestroy() {
    this.destroy();
  }
}
