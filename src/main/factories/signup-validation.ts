import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composit';

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const fields = ['name', 'email', 'password', 'passwordConfirmation'];

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );

  return new ValidationComposite(validations);
};
