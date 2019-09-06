import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import User from '../app/models/User';
import userData from './userData';

const app = request(server);

const auth = {};

beforeAll(async () => {
  const user = await createUser(
    app,
    userData.name,
    userData.email,
    userData.password
  );
  userData.id = user.id;
  auth.token = await createAuth(app, userData.email, userData.password);
});

describe('Basics Tests,', () => {
  test('It should return 401, no token', async () => {
    expect.assertions(1);

    const response = await app.get('/creations');

    expect(response.statusCode).toEqual(401);
  });

  test('It should return 200, with token', async () => {
    expect.assertions(1);

    const response = await app
      .get('/creations')
      .set('Authorization', auth.token);
    expect(response.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await User.destroy({ where: { id: userData.id } });
  return true;
});
