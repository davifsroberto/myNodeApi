import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composit';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const fields = ['name', 'email', 'password', 'passwordConfirmation'];

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
