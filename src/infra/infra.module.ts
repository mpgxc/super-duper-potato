import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApplicationModule } from 'application/application.module';
import { CreateSession } from 'application/use-cases/create-session';
import { CreateStudent } from 'application/use-cases/create-student';
import { ListStudent } from 'application/use-cases/list-student';

import { DynamoClientService } from './database/dynamo-client.service';
import { DynamoRepositoryService } from './database/dynamo-repository.service';
import { TokenStrategy } from './http/auth/token.strategy';
import { SessionController } from './http/controllers/session.controller';
import { StudentController } from './http/controllers/student.controller';
import { HashProvider } from './providers/hash.provider';
import { SlugProvider } from './providers/slug/slug.provider';

const parseStringEnv = (value: string) => value.replace(/\\n/gm, '\n');

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApplicationModule,
    PassportModule,
    JwtModule.register({
      privateKey: parseStringEnv(process.env.JWT_KEY_PRIVATE as string),
      publicKey: parseStringEnv(process.env.JWT_KEY_PUBLIC as string),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '300s',
      },
    }),
  ],
  providers: [
    SlugProvider,
    HashProvider,
    DynamoClientService,
    DynamoRepositoryService,
    TokenStrategy,
    //Use cases
    CreateStudent,
    ListStudent,
    CreateSession,
  ],
  exports: [
    SlugProvider,
    HashProvider,
    DynamoRepositoryService,
    DynamoClientService,
    TokenStrategy,
  ],
  controllers: [StudentController, SessionController],
})
export class InfraModule {}
