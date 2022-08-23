import { AppError } from 'commons/logic';

export class NotFound extends AppError {
  private constructor(context: string) {
    super(`${context} not found!`, 'NotFound');
  }

  static build(value: string) {
    throw new this(value);
  }
}
