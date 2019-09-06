import request from 'supertest';
import { resolve } from 'path';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import userData from './userData';
import User from '../app/models/User';
import File from '../app/models/File';

const app = request(server);

const auth = {};
const deleteData = {};

beforeAll(async () => {
  const user = await createUser(
    app,
    userData.name,
    userData.email,
    userData.password
  );
  deleteData.user_id = user.id;
  auth.token = await createAuth(app, userData.email, userData.password);
});

describe('Test file upload route', () => {
  test('it should return 401 no file sent', async () => {
    expect.assertions(1);
    const response = await app.post('/files').set('Authorization', auth.token);
    expect(response.body.error).toEqual('File was not sent.');
  });

  test('should do something', async () => {
    expect.assertions(1);
    const filePath = resolve(__dirname, '..', '..', 'testFiles', 'profile.png');
    const response = await app
      .post('/files')
      .set('Authorization', auth.token)
      .attach('file', filePath);
    deleteData.file_id = response.body.id;
    expect(response.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await User.destroy({ where: { id: deleteData.user_id } });
  await File.destroy({ where: { id: deleteData.file_id } });
  return true;
});
