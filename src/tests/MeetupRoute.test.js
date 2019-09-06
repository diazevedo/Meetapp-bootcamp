import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import user from './userData';

const app = request(server);

const auth = {};

const meetup = {
  title: 'JEST',
  description: 'JEST meetup testing.',
  date: '2019-08-10T14:00:00+10:00',
  location: 'Sydney - NSW - Australia',
  file_id: 15,
};

beforeAll(async () => {
  const userSaved = await createUser(app, user.name, user.email, user.password);
  user.id = userSaved.id;

  auth.token = await createAuth(app, user.email, user.password);
});

describe('Basic routes tests', () => {
  test('Test route exists, no token- should return 401', async () => {
    expect.assertions(1);
    const response = await app.post('/meetups');
    expect(response.statusCode).toEqual(401);
  });

  test('It should return 400, past date - invalid date', async () => {
    expect.assertions(1);
    meetup.creator_id = user.id;

    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token)
      .send(meetup);

    expect(response.statusCode).toEqual(400);
  });

  test('It should return 400, no title', async () => {
    expect.assertions(1);
    meetup.creator_id = user.id;
    const meetupNoTitle = meetup;

    delete meetupNoTitle.name;
    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token)
      .send(meetupNoTitle);

    expect(response.statusCode).toEqual(400);
  });
});
