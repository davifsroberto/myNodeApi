import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashApy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(hashApy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashApy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(hashApy).toHaveBeenCalledWith('any_value', salt);
  });
});
