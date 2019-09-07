import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import User from '../app/models/User';
import File from '../app/models/File';
import CreateFile from './CreateFile';

const app = request(server);

const auth = {};
const deleteData = {};

beforeAll(async () => {
  const user = await createUser();
  deleteData.user_id = user.id;
  auth.token = await createAuth();
});

describe('Test file upload route', () => {
  expect.assertions(1);

  test('it should return 401 no file sent', async () => {
    const response = await app.post('/files').set('Authorization', auth.token);
    expect(response.body.error).toEqual('File was not sent.');
  });

  test('Should return 200', async () => {
    const response = await CreateFile(auth.token);
    deleteData.file_id = response.body.id;
    expect(response.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await User.destroy({ where: { id: deleteData.user_id } });
    await File.destroy({ where: { id: deleteData.file_id } });
  });
});
