export type ListStudentOutput = Array<{
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar?: string;
  password: string;
  document: string;
}>;
