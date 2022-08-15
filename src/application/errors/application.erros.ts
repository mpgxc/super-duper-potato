import { AppError } from 'commons/logic';

export class ApplicationError extends AppError {
  private constructor(message: string) {
    super(`${message}`, 'ApplicationError');
  }

  static build(value: string) {
    return new this(value);
  }
}
