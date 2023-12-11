import { MissingParamError } from '../../erros';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export default class LoginController implements Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    httpRequest;

    return new Promise((resolve) =>
      resolve(badRequest(new MissingParamError('email'))),
    );
  }
}
