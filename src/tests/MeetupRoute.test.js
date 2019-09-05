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

describe('Basic routes tests', () => {
  test('Test route exists -no token- should return 401', async () => {
    expect.assertions(1);
    const response = await app.post('/meetups');
    expect(response.statusCode).toEqual(401);
  });
  test('it should return ok', async () => {
    expect.assertions(1);
    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token);
    expect(response.ok).toBeTruthy();
  });
});
