import { MissingParamError } from '../erros/missing-param-error';
import { badRequest, successRequest } from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name)
      return badRequest(new MissingParamError('name'));

    if (!httpRequest.body.email)
      return badRequest(new MissingParamError('email'));

    return successRequest();
  }
}
