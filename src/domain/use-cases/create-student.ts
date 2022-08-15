type CreateStudentInput = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  document: string;
};

interface ICreateStudent<Response = void> {
  handle(props: CreateStudentInput): Promise<Response>;
}

export { ICreateStudent, CreateStudentInput };
