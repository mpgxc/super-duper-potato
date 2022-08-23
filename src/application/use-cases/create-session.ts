import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { StudentRespository } from 'application/repositories/student.repository';
import { Either, failure, success } from 'commons/logic';
import {
  ICreateSession,
  CreateSessionInput,
} from 'domain/use-cases/create-session';
import { HashProvider } from 'infra/providers/hash.provider';

import { ApplicationError } from '../errors/application.erros';

type CreateSessionOutputSuccess = {
  accessToken: string;
};

type CreateSessionOutput = Either<CreateSessionOutputSuccess, ApplicationError>;

@Injectable()
class CreateSession implements ICreateSession<CreateSessionOutput> {
  constructor(
    private readonly hasher: HashProvider,
    private readonly jwtService: JwtService,
    private readonly repository: StudentRespository,
  ) {}

  async handle({
    email,
    password,
  }: CreateSessionInput): Promise<CreateSessionOutput> {
    try {
      const student = await this.repository.findByEmail(email);

      if (!student) {
        return failure(
          ApplicationError.build('Student not registered!', 'NotFound'),
        );
      }

      const isPasswordMatches = await this.hasher.isMatch(
        password,
        student.password,
      );

      if (!isPasswordMatches) {
        return failure(
          ApplicationError.build(
            'Invalid password or email!',
            'InvalidCredentials',
          ),
        );
      }

      const accessToken = await this.jwtService.signAsync({
        sub: student.id,
        slug: student.slug,
        email: student.email,
      });

      return success({ accessToken });
    } catch ({ message }) {
      return failure(
        ApplicationError.build(
          `Unexpected error on create session! ${message}`,
        ),
      );
    }
  }
}

export { CreateSession };
