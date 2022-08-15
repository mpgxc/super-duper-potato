type CreateSessionInput = {
  email: string;
  password: string;
};

interface ICreateSession<Response = void> {
  handle(props: CreateSessionInput): Promise<Response>;
}

export { ICreateSession, CreateSessionInput };
