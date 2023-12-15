import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composit';

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const fields = ['name', 'email', 'passwords', 'passwordConmfirmation'];

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
