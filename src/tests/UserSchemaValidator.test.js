import UserSchemaValidator from '../helpers/UserSchemaValidator';
import user from './userData';

describe('User creation tests', () => {
  test('Test all required data sent', async () => {
    const validation = await UserSchemaValidator.store(user);
    expect(validation).toBeTruthy();
  });

  test('Test empty name', async () => {
    const userNoName = { ...user };
    delete userNoName.name;
    const validation = await UserSchemaValidator.store(userNoName);
    expect(validation).toBeFalsy();
  });

  test('Test email without email', async () => {
    const userNoEmail = { ...user };
    delete userNoEmail.email;
    const validation = await UserSchemaValidator.store(userNoEmail);
    expect(validation).toBeFalsy();
  });

  test('Test email without @ symbol', async () => {
    const userNoAt = { ...user };
    userNoAt.email = 'diegojest.com';
    const validation = await UserSchemaValidator.store(userNoAt);
    expect(validation).toBeFalsy();
  });

  test('Test no password', async () => {
    const userEmpyPassword = { ...user };
    userEmpyPassword.password = '';

    const validation = await UserSchemaValidator.store(userEmpyPassword);
    expect(validation).toBeFalsy();
  });
});
