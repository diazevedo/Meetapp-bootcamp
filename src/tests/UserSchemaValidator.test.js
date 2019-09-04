import UserSchemaValidator from '../helpers/UserSchemaValidator';

test('Test all required data sent', async () => {
  const user = {
    name: 'Diego',
    email: 'diego@email.com',
    password: '123456',
  };

  const validation = await UserSchemaValidator.store(user);
  expect(validation).toBeTruthy();
});

test('Test empty name', async () => {
  const user = {
    email: 'diego@email.com',
    password: '123456',
  };

  const validation = await UserSchemaValidator.store(user);
  expect(validation).toBeFalsy();
});

test('Test email without @', async () => {
  const user = {
    name: 'Diego',
    email: 'diegoemail.com',
    password: '123456',
  };

  const validation = await UserSchemaValidator.store(user);
  expect(validation).toBeFalsy();
});

test('Test email without @', async () => {
  const user = {
    name: 'Diego',
    email: 'diegoemail.com',
    password: '123456',
  };

  const validation = await UserSchemaValidator.store(user);
  expect(validation).toBeFalsy();
});

test('Test no password', async () => {
  const user = {
    name: 'Diego',
    email: 'diegoemail.com',
    password: '',
  };

  const validation = await UserSchemaValidator.store(user);
  expect(validation).toBeFalsy();
});
