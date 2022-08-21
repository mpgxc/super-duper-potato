import {
  Body,
  Post,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateStudent } from 'application/use-cases/create-student';

import { StudentInput } from '../inputs/student.input';

@Controller('student')
export class StudentController {
  constructor(private readonly createStudent: CreateStudent) {}

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

  @Get('/profile')
  async profile(@Body() event: any): Promise<any> {
    return {
      ...event,
    };
  }
}
