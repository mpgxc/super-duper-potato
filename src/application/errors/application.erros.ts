import { AppError } from 'commons/logic';

export class ApplicationError extends AppError {
  private constructor(message: string, ctxError: string) {
    super(message, 'ApplicationError', ctxError);
  }

  static build(value: string, ctxError = '') {
    return new this(value, ctxError);
  }
}
