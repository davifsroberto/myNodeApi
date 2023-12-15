import { MissingParamError } from '../../erros';
import { Validation } from './validation';

export class RequiredFieldValidation implements Validation {
  private readonly fieldname: string;

  constructor(fieldName: string) {
    this.fieldname = fieldName;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(input: any): Error | null {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname);
    }

    return null;
  }
}
