import { AggregateRoot } from 'commons/domain';

type StudentProps = {
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  password: string;
  document: string;
};

class Student extends AggregateRoot<StudentProps> {
  private constructor(props: StudentProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this._props.name;
  }

  get slug(): string {
    return this._props.slug;
  }

  get email(): string {
    return this._props.email;
  }

  get avatar(): string | undefined {
    return this._props.avatar;
  }

  get document(): string {
    return this._props.document;
  }

  get password(): string {
    return this._props.password;
  }

  static build(props: StudentProps, id?: string): Student {
    return new this(props, id);
  }
}

export { Student, StudentProps };
