import { MissingParamError } from '../erros/missing-param-error';
import { SignUpController } from './signup';

const makeSut = (): SignUpController => {
  return new SignUpController();
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provider', () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no passwordConfirmation is provider', () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        password: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });
});
