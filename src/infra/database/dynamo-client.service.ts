import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoClientService
  extends DynamoDBClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      region: configService.get<string>('AWS_REGION'),
    });
  }

  onModuleInit() {
    return this;
  }

  onModuleDestroy() {
    this.destroy();
  }
}
