import { badRequest, serverError } from '../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../erros';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols';
import { AddAccount } from '../../domain/usecases/add-account';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
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
      const { name, email, password, passwordConfirmation } = reqBody;

      for (const field of requiredFields) {
        if (!reqBody[field]) return badRequest(new MissingParamError(field));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) return badRequest(new InvalidParamError('email'));

      this.addAccount.add({ name, email, password });
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
