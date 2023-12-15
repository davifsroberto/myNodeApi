import { InvalidParamError } from '../../erros';
import { EmailValidator } from '../../protocols/email-validator';
import { Validation } from './validation';

export class EmailValidation implements Validation {
  private readonly fieldname: string;
  private readonly emailValidator: EmailValidator;

  constructor(fieldName: string, emailValidator: EmailValidator) {
    this.fieldname = fieldName;
    this.emailValidator = emailValidator;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldname]);

    if (!isValid) {
      return new InvalidParamError(this.fieldname);
    }

    return null;
  }
}
