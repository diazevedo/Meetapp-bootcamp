import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import user from './userData';

const app = request(server);

const auth = {};

beforeAll(async () => {
  const userSaved = await createUser(app, user.name, user.email, user.password);
  user.id = userSaved.id;

  auth.token = await createAuth(app, user.email, user.password);
});

describe('Test route exists,', () => {
  test('It should return 401, no token', async () => {
    expect.assertions(1);
    const response = await app.get('/creations');
    expect(response.statusCode).toEqual(401);
  });

  test('It should return 200', async () => {
    expect.assertions(1);
    const response = await app
      .get('/creations')
      .set('Authorization', auth.token);
    expect(response.statusCode).toEqual(200);
  });
});
