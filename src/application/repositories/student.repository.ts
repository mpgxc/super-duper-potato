import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { StudentMapper } from 'application/mappers/student.mapper';
import { Maybe } from 'commons/logic';
import { Student, StudentProps } from 'domain/entities/student';
import { IStudentRespository } from 'domain/repositories/student.repository';
import { DynamoRepositoryService } from 'infra/database/dynamo-repository.service';

@Injectable()
class StudentRespository implements IStudentRespository {
  private readonly client: DynamoRepositoryService;

  constructor(
    client: DynamoRepositoryService,
    private readonly mapper: StudentMapper,
    private readonly config: ConfigService,
  ) {
    this.client = client.setTableName(this.config.get('AWS_DYNAMODB_TABLE'));
  }

  async update(item: Student): Promise<void> {
    const { document, id, email, name, password, slug } =
      this.mapper.toPersistence(item);

    await this.client.update({
      Item: marshall({
        PK: `STUDENT-${id}`,
        SK: `PROFILE-${slug}`,
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

  async list(): Promise<Maybe<Array<StudentProps>>> {
    const students = await this.client.list({
      FilterExpression: 'begins_with(SK, :SK)',
      ExpressionAttributeValues: marshall({
        ':SK': 'PROFILE-',
      }),
    });

    return students.Items.map(unmarshall as any).map(this.mapper.toRender);
  }

  findById(id: string): Promise<Maybe<Student>> {
    throw new Error('Method not implemented.');
  }

  findByIdRender(id: string): Promise<Maybe<StudentProps>> {
    throw new Error('Method not implemented.');
  }
}

export { StudentRespository };
