import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { DynamoClientService } from 'infra/database/dynamo-client.service';
import { DynamoRepositoryService } from 'infra/database/dynamo-repository.service';
import { HashProvider } from 'infra/providers/hash.provider';
import { SlugProvider } from 'infra/providers/slug/slug.provider';

import { StudentMapper } from './mappers/student.mapper';
import { StudentRespository } from './repositories/student.repository';
import { CreateSession } from './use-cases/create-session';
import { CreateStudent } from './use-cases/create-student';
import { ListStudent } from './use-cases/list-student';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    JwtService,
    StudentMapper,
    StudentRespository,
    SlugProvider,
    HashProvider,
    DynamoClientService,
    DynamoRepositoryService,
    // Use cases
    CreateStudent,
    ListStudent,
    CreateSession,
  ],
  exports: [CreateStudent, StudentMapper, StudentRespository],
})
export class ApplicationModule {}
