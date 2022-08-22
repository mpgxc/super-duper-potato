import { IReadRepository, IWriteRepository } from 'commons/application';
import { Maybe } from 'commons/logic';
import { Student, StudentProps } from 'domain/entities/student';

interface IStudentRespository
  extends IWriteRepository<Student>,
    IReadRepository<Student, StudentProps> {
  findByEmail(email: string): Promise<Maybe<Student>>;
}

export { IStudentRespository };
