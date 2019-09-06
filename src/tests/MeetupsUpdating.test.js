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
  file_id: 16,
};

beforeAll(async () => {
  const userSaved = await createUser(app, user.name, user.email, user.password);

  if (!userSaved.id) meetup.creator_id = 12;

  auth.token = await createAuth(app, user.email, user.password);
});

describe('Update meetups', () => {
  test('It should return Meetup was not found.', async () => {
    expect.assertions(1);
    const response = await app
      .put('/meetups/10000')
      .set('Authorization', auth.token)
      .send(meetup);

    expect(response.body.error).toEqual('Meetup was not found.');
  });

  test('It should return You cannot modify past meetups.', async () => {
    expect.assertions(1);
    const response = await app
      .put('/meetups/47')
      .set('Authorization', auth.token)
      .send(meetup);
    expect(response.body.error).toEqual('You cannot modify past meetups.');
  });

  test('It should return A past date cannot be set.', async () => {
    expect.assertions(1);
    const meetupPastDate = { ...meetup };
    meetupPastDate.date = '2018-10-10T15:00:00+10:00';

    const response = await app
      .put('/meetups/49')
      .set('Authorization', auth.token)
      .send(meetupPastDate);

    expect(response.body.error).toEqual('A past date cannot be set.');
  });

  test('It should return You are not allowed to cancel this meetup.', async () => {
    expect.assertions(1);

    await createUser(app, user.name, 'jestmod@jest.com', user.password);
    const tokenDiff = await createAuth(app, 'jestmod@jest.com', user.password);

    const response = await app
      .put('/meetups/49')
      .set('Authorization', tokenDiff)
      .send(meetup);
    expect(response.statusCode).toEqual(
      'You are not allowed to cancel this meetup.'
    );
  });
  test('It should return ok.', async () => {
    expect.assertions(1);
    const meetupPastDate = { ...meetup };
    meetupPastDate.description = 'JEST EVENT WAS UPDATED 1';

    const response = await app
      .put('/meetups/49')
      .set('Authorization', auth.token)
      .send(meetupPastDate);
    expect(response.statusCode).toEqual(200);
  });
});
