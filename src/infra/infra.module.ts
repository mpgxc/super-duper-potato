import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationModule } from 'application/application.module';
import { CreateStudent } from 'application/use-cases/create-student';
import { ListStudent } from 'application/use-cases/list-student';

import { DynamoClientService } from './database/dynamo-client.service';
import { DynamoRepositoryService } from './database/dynamo-repository.service';
import { StudentController } from './http/controllers/student.controller';
import { HashProvider } from './providers/hash.provider';
import { SlugProvider } from './providers/slug/slug.provider';

@Module({
  imports: [ConfigModule.forRoot(), ApplicationModule],
  providers: [
    SlugProvider,
    HashProvider,
    DynamoClientService,
    DynamoRepositoryService,
    CreateStudent,
    ListStudent,
  ],
  exports: [
    SlugProvider,
    HashProvider,
    DynamoRepositoryService,
    DynamoClientService,
  ],
  controllers: [StudentController],
})
export class InfraModule {}
