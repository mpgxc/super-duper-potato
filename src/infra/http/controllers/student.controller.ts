import {
  Body,
  Post,
  Controller,
  UnauthorizedException,
  Get,
} from '@nestjs/common';

import { CreateStudent } from 'application/use-cases/create-student';

import { StudentInput } from '../inputs/student.input';

@Controller('student')
export class StudentController {
  constructor(private readonly createStudent: CreateStudent) {}

  @Post('/create')
  async create(
    @Body()
    { document, email, name, password }: StudentInput,
  ): Promise<void> {
    const session = await this.createStudent.handle({
      document,
      email,
      name,
      password,
    });

    if (session?.hasError) {
      throw new UnauthorizedException(
        `${session.value.name} - ${session.value.message}`,
      );
    }
  }

  @Get('/profile')
  async profile(@Body() event: any): Promise<any> {
    console.log(event);

    return {
      ...event,
    };
  }
}
