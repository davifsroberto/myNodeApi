import { InvalidParamError, MissingParamError } from '../../erros';
import { badRequest, ok } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export default class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email'))),
      );
    }

    if (!password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password'))),
      );
    }

    const isValid = this.emailValidator.isValid(email);

    if (!isValid) {
      return new Promise((resolve) =>
        resolve(badRequest(new InvalidParamError('email'))),
      );
    }

    return new Promise((resolve) => resolve(ok({ ok })));
  }
}
