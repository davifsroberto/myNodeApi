import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';
import { LogControllerDecorator } from './log-controller';

interface SuitTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      httpRequest;

      const httpResponse: HttpResponse = await {
        body: {
          email: 'any_email@domain.com',
        },
        statusCode: 200,
      };

      return new Promise((resolve) => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

const makeSuit = (): SuitTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return {
    sut,
    controllerStub,
  };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSuit();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
      },
    };

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same resultof the controller', async () => {
    const { sut } = makeSuit();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@domain.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
      },
    };

    await sut.handle(httpRequest);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      body: {
        email: 'any_email@domain.com',
      },
      statusCode: 200,
    });
  });
});
