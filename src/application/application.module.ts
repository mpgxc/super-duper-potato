import { Module } from '@nestjs/common';

import { DynamoClientService } from 'infra/database/dynamo-client.service';
import { DynamoRepositoryService } from 'infra/database/dynamo-repository.service';
import { HashProvider } from 'infra/providers/hash.provider';
import { SlugProvider } from 'infra/providers/slug/slug.provider';

import { StudentMapper } from './mappers/student.mapper';
import { StudentRespository } from './repositories/student.repository';
import { CreateStudent } from './use-cases/create-student';

@Module({
  imports: [],
  providers: [
    StudentMapper,
    StudentRespository,
    CreateStudent,
    SlugProvider,
    HashProvider,
    DynamoClientService,
    DynamoRepositoryService,
  ],
  exports: [CreateStudent, StudentMapper, StudentRespository],
})
export class ApplicationModule {}
