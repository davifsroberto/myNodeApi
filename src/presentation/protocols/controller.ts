import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle(_httpRequest: HttpRequest): HttpResponse;
}
