import { Controller } from '../../presentation/protocols';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { LogControllerDecorator } from '../decorators/log-controller';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';
import { makeSingUpValidation } from './signup-validation';

export const makeSingUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const logMongoRepository = new LogMongoRepository();
  const signUpController = new SignUpController(
    dbAddAccount,
    makeSingUpValidation(),
  );

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
