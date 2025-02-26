import { AccountModel } from '../models/account';

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  // eslint-disable-next-line no-unused-vars
  add(account: AddAccountModel): Promise<AccountModel>;
}
