import { Injectable } from '@nestjs/common';
import { UnableList } from 'application/errors/custom/UnableList';

import { StudentRespository } from 'application/repositories/student.repository';
import { Either, failure, success } from 'commons/logic';
import {
  IListStudent,
  ListStudentOutput as TListStudentOutput,
} from 'domain/use-cases/list-student';

import { ApplicationError } from '../errors/application.erros';

type ListStudentOutput = Either<Array<TListStudentOutput>, ApplicationError>;

@Injectable()
class ListStudent implements IListStudent<ListStudentOutput> {
  constructor(private readonly repository: StudentRespository) {}

  async handle(): Promise<ListStudentOutput> {
    try {
      const students = await this.repository.list();

      if (!students) UnableList.build('students');

      return success(students as Array<TListStudentOutput>);
    } catch (error) {
      return failure(
        ApplicationError.build(
          `Unexpected error on list student! ${error.message}`,
        ),
      );
    }
  }
}

export { ListStudent };
