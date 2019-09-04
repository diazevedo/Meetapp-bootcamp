import request from 'supertest';
import app from '../app';

const auth = {};
const userDetails = {};
const appTest = request(app);

beforeAll(async () => {
  const user = await appTest.post('/users').send({
    name: 'Diego Jest',
    email: 'diego@jest.com',
    password: '123456',
  });

  userDetails.id = user.id;

  const authentication = await appTest
    .post('/session')
    .send({ email: 'diego@jest.com', password: '123456' });

  auth.token = `bearer ${authentication.body.token}`;
});

describe('Test file upload route', () => {
  test('it should return 401, no token', async () => {
    expect.assertions(1);
    const response = await appTest.post('/files');
    expect(response.statusCode).toEqual(401);
  });

  test('it should return 401 no file sent', async () => {
    expect.assertions(1);
    const response = await appTest
      .post('/files')
      .set('Authorization', auth.token);
    expect(response.statusCode).toEqual(401);
  });
});
