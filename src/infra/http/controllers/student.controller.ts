import {
  Body,
  Post,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateStudent } from 'application/use-cases/create-student';
import { ListStudent } from 'application/use-cases/list-student';

import { StudentInput } from '../inputs/student.input';

@Controller('student')
export class StudentController {
  constructor(
    private readonly createStudent: CreateStudent,
    private readonly listStudent: ListStudent,
  ) {}

  @Post('/create')
  async create(
    @Body()
    payload: StudentInput,
  ): Promise<void> {
    const session = await this.createStudent.handle(payload);

    if (session?.hasError) {
      throw new HttpException(
        `${session.value.name} - ${session.value.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/list')
  async list(): Promise<any> {
    const students = await this.listStudent.handle();

    if (students?.hasError) {
      throw new HttpException(
        `${students.value.name} - ${students.value.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return students.value;
  }

  @Get('/profile')
  async profile(@Body() event: any): Promise<any> {
    return {
      ...event,
    };
  }
}
