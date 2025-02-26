import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  // eslint-disable-next-line no-unused-vars
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
