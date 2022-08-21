import { Injectable } from '@nestjs/common';

import { IMapper } from 'commons/application';
import { Student, StudentProps } from 'domain/entities/student';

type StudentResponse = StudentProps & {
  id?: string;
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
    const id = data.PK.split('STUDENT-').pop();

    return Student.build(
      {
        ...data,
      },
      id,
    );
  }

  toRender(data: StudentResponse): StudentResponse {
    Reflect.deleteProperty(data, 'password');

    const id = data.PK.split('STUDENT-').pop();

    return {
      ...data,
      id,
    };
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
