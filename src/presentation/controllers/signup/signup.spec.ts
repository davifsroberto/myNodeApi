import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  EmailValidator,
} from './signup-protocols';
import { InvalidParamError, MissingParamError, ServerError } from '../../erros';
import { SignUpController } from './signup';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(_email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(_account: AddAccountModel): AccountModel {
      _account;

      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };
      return fakeAccount;
    }
  }
  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);

  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  test('Should return 400 if no password is provider', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no passwordConfirmation is provider', () => {
    const { sut } = makeSut();
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

  test('Should return 400 if invalid email is provider', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should return 400 if passwordConfirmation false', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        password: 'password',
        passwordConfirmation: 'invalid_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('invalid_email@domain.com');
  });

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@domain.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    };

    sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'invalid_email@domain.com',
      password: 'password',
    });
  });
});
