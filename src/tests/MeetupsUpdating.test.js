import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import createFile from './CreateFile';
import userData from './userData';
import meetup from './meetupData';

const app = request(server);

const auth = {};

beforeAll(async () => {
  const user = await createUser();
  meetup.user_id = user.id;

  auth.token = await createAuth();

  const res = await createFile(auth.token);
  meetup.file_id = res.body.id;
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

    await createUser(app, userData.name, 'jestmod@jest.com', userData.password);
    const tokenDiff = await createAuth(
      app,
      'jestmod@jest.com',
      userData.password
    );

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

// afterAll(async () => {
//   user.destroy();
// });
