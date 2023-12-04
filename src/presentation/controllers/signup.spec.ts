import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: 'any_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });

  test('Should return 400 if no email is provider', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: email'));
  });
});
