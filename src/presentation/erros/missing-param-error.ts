export class MissingParamError extends Error {
  constructor(paramname: string) {
    super(`Missing param: ${paramname}`);

    this.name = 'MissingParamError';
  }
}
