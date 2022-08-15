import { IReadRepository, IWriteRepository } from 'commons/application';
import { Student, StudentProps } from 'domain/entities/student';

interface IStudentRespository
  extends IWriteRepository<Student>,
    IReadRepository<Student, StudentProps> {}

export { IStudentRespository };
