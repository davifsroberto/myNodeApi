import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composit';
import { EmailValidator } from '../../presentation/protocols/email-validator';
import { makeSingUpValidation } from './signup-validation';

jest.mock('../../presentation/helpers/validators/validation-composit');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      email;

      return true;
    }
  }
  return new EmailValidatorStub();
};
describe('SignUpValidation Factory', () => {
  test('Should call ValidationCOmposite eith all validations', () => {
    makeSingUpValidation();
    const validations: Validation[] = [];
    const fields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );

    validations.push(new EmailValidation('email', makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
