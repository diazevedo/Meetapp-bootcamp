import { resolve } from 'path';
import request from 'supertest';
import server from '../app';

const app = request(server);

const CreateFile = async token => {
  const filePath = resolve(__dirname, '..', '..', 'testFiles', 'profile.png');

  const response = await app
    .post('/files')
    .set('Authorization', token)
    .attach('file', filePath);

  return response;
};

export default CreateFile;
