import request from 'supertest';
import userData from './userData';
import server from '../app';

const app = request(server);

const createUser = async (
  appTest = app,
  name = userData.name,
  email = userData.email,
  password = userData.password
) => {
  const response = await appTest.post('/users').send({
    name,
    email,
    password,
  });

  return response.body;
};

export default createUser;
