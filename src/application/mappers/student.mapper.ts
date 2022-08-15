import { Injectable } from '@nestjs/common';

import { IMapper } from 'commons/application';
import { Student, StudentProps } from 'domain/entities/student';

type StudentResponse = StudentProps & {
  PK: string;
  SK: string;
};

type StudentPersistence = StudentProps & {
  id: string;
};

@Injectable()
class StudentMapper
  implements IMapper<Student, StudentPersistence | StudentResponse>
{
  toDomain(data: StudentResponse): Student {
    const id = data.PK.split('-').pop();

    return Student.build(
      {
        ...data,
      },
      id,
    );
  }

  toPersistence(data: Student): StudentPersistence {
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      document: data.document,
      password: data.password,
    };
  }
}

export { StudentMapper };
