import {
  Body,
  Post,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { CreateSession } from 'application/use-cases/create-session';

import { SessionInput } from '../inputs/session.input';
import { SessionOutput } from '../outputs/session.output';

@Controller('session')
export class SessionController {
  constructor(private readonly createSession: CreateSession) {}

  @Post('/')
  async session(@Body() event: SessionInput): Promise<SessionOutput> {
    const session = await this.createSession.handle(event);

    if (session.hasError) {
      throw new HttpException(
        {
          errorLayer: session.value.name,
          ctxError: session.value.ctxError,
          message: session.value.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return session.value;
  }
}
