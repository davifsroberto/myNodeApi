export class UnauthorizedError extends Error {
  constructor() {
    super(`Unauthorized server error`);

    this.name = 'UnauthorizedError';
  }
}
