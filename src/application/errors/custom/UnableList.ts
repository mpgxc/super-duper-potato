import { AppError } from 'commons/logic';

export class UnableList extends AppError {
  private constructor(context: string) {
    super(
      `Unable to list all ${context}, check your database connection!`,
      'UnableList',
    );
  }

  static build(value: string) {
    throw new this(value);
  }
}
