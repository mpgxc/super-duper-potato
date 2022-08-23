import { IReadRepository, IWriteRepository } from 'commons/application';
import { Maybe } from 'commons/logic';
import { Student, StudentProps } from 'domain/entities/student';

type StudentResponse = StudentProps & {
  id: string;
};

interface IStudentRespository
  extends IWriteRepository<Student>,
    IReadRepository<Student, StudentResponse> {
  findByEmail(email: string): Promise<Maybe<Student>>;
}

export { IStudentRespository, StudentResponse };
