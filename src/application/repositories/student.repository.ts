import { marshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';

import { StudentMapper } from 'application/mappers/student.mapper';
import { Maybe } from 'commons/logic';
import { Student, StudentProps } from 'domain/entities/student';
import { IStudentRespository } from 'domain/repositories/student.repository';
import { DynamoRepositoryService } from 'infra/database/dynamo-repository.service';

@Injectable()
class StudentRespository implements IStudentRespository {
  constructor(
    private readonly client: DynamoRepositoryService,
    private readonly mapper: StudentMapper,
  ) {}

  async update(item: Student): Promise<void> {
    const { document, id, email, name, password, slug } =
      this.mapper.toPersistence(item);

    await this.client.setTableName('application-table').update({
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

  list(): Promise<Maybe<Array<StudentProps>>> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Maybe<Student>> {
    throw new Error('Method not implemented.');
  }

  findByIdRender(id: string): Promise<Maybe<StudentProps>> {
    throw new Error('Method not implemented.');
  }
}

export { StudentRespository };
