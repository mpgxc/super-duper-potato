import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { StudentMapper } from 'application/mappers/student.mapper';
import { Maybe } from 'commons/logic';
import { Student } from 'domain/entities/student';
import {
  IStudentRespository,
  StudentResponse,
} from 'domain/repositories/student.repository';
import { DynamoRepositoryService } from 'infra/database/dynamo-repository.service';

@Injectable()
class StudentRespository implements IStudentRespository {
  private readonly client: DynamoRepositoryService;

  constructor(
    client: DynamoRepositoryService,
    private readonly mapper: StudentMapper,
    private readonly config: ConfigService,
  ) {
    this.client = client.setTableName(
      this.config.get<string>('AWS_DYNAMODB_TABLE') as string,
    );
  }

  async findByEmail(email: string): Promise<Maybe<Student>> {
    const student = await this.client.findIndex({
      IndexName: 'email-Index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: marshall({
        ':email': email,
      }),
      ScanIndexForward: false,
    });

    const [studentItem] = student?.Items ?? [];

    return studentItem
      ? this.mapper.toDomain(unmarshall(studentItem) as any)
      : null;
  }

  async update(item: Student): Promise<void> {
    const { document, id, email, name, password, slug } =
      this.mapper.toPersistence(item);

    await this.client.update({
      Item: marshall({
        PK: `STUDENT-${id}`,
        SK: `PROFILE`,
        slug,
        name,
        email,
        document,
        password,
      }),
    });
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<Maybe<Array<StudentResponse>>> {
    const students = await this.client.list({
      FilterExpression: 'begins_with(SK, :SK)',
      ExpressionAttributeValues: marshall({
        ':SK': 'PROFILE',
      }),
    });

    return students?.Items?.length
      ? students.Items.map(unmarshall as any).map(this.mapper.toRender as any)
      : [];
  }

  async findById(id: string): Promise<Maybe<Student>> {
    const student = await this.client.find({
      Key: marshall({
        PK: `STUDENT-${id}`,
        SK: `PROFILE`,
      }),
    });

    return student?.Item
      ? this.mapper.toDomain(unmarshall(student.Item) as any)
      : null;
  }

  findByIdRender(id: string): Promise<Maybe<StudentResponse>> {
    throw new Error('Method not implemented.');
  }
}

export { StudentRespository };
