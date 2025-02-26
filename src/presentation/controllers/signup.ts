import { badRequest, serverError } from '../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../erros';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      const reqBody = httpRequest.body;

      for (const field of requiredFields) {
        if (!reqBody[field]) return badRequest(new MissingParamError(field));
      }

      const isValid = this.emailValidator.isValid(reqBody.email);

      if (!isValid) return badRequest(new InvalidParamError('email'));
    } catch (error) {
      return serverError();
    }

    return {
      statusCode: 200,
      body: {
        message: 'Success',
      },
    };
  }
}
