type ListStudentOutput = {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  password: string;
  document: string;
};

interface IListStudent<Response = void> {
  handle(): Promise<Response>;
}

export { IListStudent, ListStudentOutput };
