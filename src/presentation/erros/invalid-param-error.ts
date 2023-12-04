export class InvalidParamError extends Error {
  constructor(paramname: string) {
    super(`Invalid param: ${paramname}`);

    this.name = 'InvalidParamError';
  }
}
