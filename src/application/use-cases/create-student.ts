import { Injectable } from '@nestjs/common';

import { StudentRespository } from 'application/repositories/student.repository';
import { Either, failure } from 'commons/logic';
import { Student } from 'domain/entities/student';
import {
  ICreateStudent,
  CreateStudentInput,
} from 'domain/use-cases/create-student';
import { HashProvider } from 'infra/providers/hash.provider';
import { SlugProvider } from 'infra/providers/slug/slug.provider';

import { ApplicationError } from '../errors/application.erros';

type CreateStudentOutput = Either<void, ApplicationError>;

@Injectable()
class CreateStudent implements ICreateStudent<CreateStudentOutput> {
  constructor(
    private readonly hasher: HashProvider,
    private readonly slugger: SlugProvider,
    private readonly repository: StudentRespository,
  ) {}

  async handle({
    name,
    email,
    document,
    password,
  }: CreateStudentInput): Promise<CreateStudentOutput> {
    try {
      const student = Student.build({
        name,
        email,
        document,
        slug: this.slugger.generate(name),
        password: await this.hasher.hash(password),
      });

      console.log({ student });

      const response = await this.repository.update(student);

      console.log({ response });
    } catch (error) {
      console.log({ error });

      return failure(
        ApplicationError.build('Unexpected error on create student!'),
      );
    }
  }
}

export { CreateStudent };
