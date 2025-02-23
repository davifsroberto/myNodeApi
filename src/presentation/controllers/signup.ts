import { MissingParamError } from '../erros/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const { body } = httpRequest;

    if (!body) return badRequest(new MissingParamError('Missing request body'));

    const { name, email } = body;

    if (!name) return badRequest(new MissingParamError('Missing param: name'));

    if (!email)
      return badRequest(new MissingParamError('Missing param: email'));

    return {
      statusCode: 200,
      body: {
        message: 'Success',
      },
    };
  }
}
