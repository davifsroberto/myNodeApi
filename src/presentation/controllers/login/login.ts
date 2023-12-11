import { MissingParamError } from '../../erros';
import { badRequest, ok } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export default class LoginController implements Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email'))),
      );
    }

    if (!httpRequest.body.password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password'))),
      );
    }

    return new Promise((resolve) => resolve(ok({ ok })));
  }
}
