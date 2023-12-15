import { InvalidParamError } from '../../erros';
import { Validation } from './validation';

export class CompareFieldsValidation implements Validation {
  private readonly fieldname: string;
  private readonly fieldNameToCompareName: string;

  constructor(fieldName: string, fieldNameToCompareName: string) {
    this.fieldname = fieldName;
    this.fieldNameToCompareName = fieldNameToCompareName;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(input: any): Error | null {
    if (input[this.fieldname] !== input[this.fieldNameToCompareName]) {
      return new InvalidParamError(this.fieldNameToCompareName);
    }

    return null;
  }
}
