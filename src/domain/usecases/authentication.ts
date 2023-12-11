export interface Authentication {
  auth(_email: string, _password: string): Promise<string>;
}
