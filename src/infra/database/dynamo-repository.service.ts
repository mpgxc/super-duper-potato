import {
  PutItemCommand,
  PutItemCommandInput,
  PutItemCommandOutput,
  GetItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';

import { DynamoClientService } from './dynamo-client.service';

type CustomType<T> = Omit<T, 'TableName'>;

@Injectable()
export class DynamoRepositoryService {
  private TableName: string;

  constructor(private readonly client: DynamoClientService) {}

  setTableName(name: string) {
    this.TableName = name;

    return this;
  }

  async update(
    params: CustomType<PutItemCommandInput>,
  ): Promise<PutItemCommandOutput> {
    return this.client.send(
      new PutItemCommand({
        ...params,
        TableName: this.TableName,
      }),
    );
  }

  async find(
    params: CustomType<GetItemCommandInput>,
  ): Promise<GetItemCommandOutput> {
    return this.client.send(
      new GetItemCommand({
        ...params,
        TableName: this.TableName,
      }),
    );
  }

  async list(params: CustomType<ScanCommandInput>): Promise<ScanCommandOutput> {
    return this.client.send(
      new ScanCommand({
        ...params,
        TableName: this.TableName,
      }),
    );
  }
}
