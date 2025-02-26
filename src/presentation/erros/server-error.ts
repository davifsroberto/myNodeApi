export class ServerError extends Error {
  constructor() {
    super('Interno server error');

    this.name = 'ServerError';
  }
}
