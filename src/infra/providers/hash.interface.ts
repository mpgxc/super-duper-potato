interface IHashProvider {
  hash(payload: string): Promise<string>;
  isMatch(payload: string, hashed: string): Promise<boolean>;
}

export { IHashProvider };
