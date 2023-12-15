import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composit';
import { makeSingUpValidation } from './signup-validation';

jest.mock('../../presentation/helpers/validators/validation-composit');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationCOmposite eith all validations', () => {
    makeSingUpValidation();
    const validations: Validation[] = [];
    const fields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
