import { EmailValidator } from '../presentation/protocols/email-validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(_email: string): boolean {
    _email;

    return false;
  }
}
