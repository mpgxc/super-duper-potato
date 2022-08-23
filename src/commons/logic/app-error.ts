abstract class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly name: string,
    public readonly ctxError: string = '',
  ) {
    super(message);
  }
}

export { AppError };
