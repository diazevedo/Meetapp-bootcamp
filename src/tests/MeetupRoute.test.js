import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import user from './userData';

const app = request(server);

const auth = {};

const meetup = {
  title: 'JEST w',
  description: 'JEST meetup testing.',
  date: '2019-10-10T15:00:00+10:00',
  location: 'Sydney - NSW - Australia',
  file_id: 15,
};

beforeAll(async () => {
  const userSaved = await createUser(app, user.name, user.email, user.password);

  if (!userSaved.id) meetup.creator_id = 12;

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
    const meetupNoDate = { ...meetup };
    meetupNoDate.date = '2019-08-10T15:00:00+10:00';

    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token)
      .send(meetupNoDate);

    const res = JSON.parse(response.text);
    expect(res.error).toEqual('Invalid date.');
  });

  test('It should return 401, no title', async () => {
    expect.assertions(1);

    const meetupNoTitle = { ...meetup };
    delete meetupNoTitle.title;

    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token)
      .send(meetupNoTitle);

    const res = JSON.parse(response.text);
    expect(res.error).toEqual('Invalid data sent.');
  });

  test('It should return 200 - all data sent', async () => {
    expect.assertions(1);

    const response = await app
      .post('/meetups')
      .set('Authorization', auth.token)
      .send(meetup);
    expect(response.statusCode).toEqual(200);
  });
});
