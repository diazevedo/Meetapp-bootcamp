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

describe('Test file upload route', () => {
  test('it should return 401, no token', async () => {
    expect.assertions(1);
    const response = await app.post('/files');
    expect(response.statusCode).toEqual(401);
  });

  test('it should return 401 no file sent', async () => {
    expect.assertions(1);
    const response = await app.post('/files').set('Authorization', auth.token);
    expect(response.statusCode).toEqual(401);
  });
});