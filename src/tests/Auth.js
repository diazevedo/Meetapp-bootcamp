import request from 'supertest';
import userData from './userData';
import server from '../app';

const app = request(server);

const auth = async (email = userData.email, password = userData.password) => {
  const authentication = await app.post('/session').send({ email, password });
  return `bearer ${authentication.body.token}`;
};

export default auth;
