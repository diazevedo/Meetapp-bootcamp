import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import createFile from './CreateFile';
import createMeetup from './CreateMeetup';
import User from '../app/models/User';
import File from '../app/models/File';
import MeetupModel from '../app/models/Meetup';

import meetup from './meetupData';

const app = request(server);

const auth = {};
const deleteData = {};

beforeAll(async () => {
  const user = await createUser();
  deleteData.user_id = user.id;

  auth.token = await createAuth();

  const response = await createFile(auth.token);

  deleteData.file_id = response.body.id;
  meetup.file_id = response.body.id;
});

describe('Basic routes tests', () => {
  expect.assertions(1);

  test('Test route exists, no token- should return 401', async () => {
    const response = await app.post('/meetups');
    expect(response.statusCode).toEqual(401);
  });

  test('It should return 400, past date - invalid date', async () => {
    const meetupNoDate = { ...meetup };
    meetupNoDate.date = '2019-08-10T15:00:00+10:00';

    const response = await createMeetup(meetupNoDate, auth.token);
    expect(response.error).toEqual('Invalid date.');
  });

  test('It should return 401, no title', async () => {
    const meetupNoTitle = { ...meetup };
    delete meetupNoTitle.title;

    const response = await createMeetup(meetupNoTitle, auth.token);

    expect(response.body.error).toEqual('Invalid data sent.');
  });

  test('It should return 200 - all data sent', async () => {
    const response = await createMeetup(meetup, auth.token);

    deleteData.meetup_id = response.body.id;
    expect(response.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await MeetupModel.destroy({ where: { id: deleteData.meetup_id } });
    await User.destroy({ where: { id: deleteData.user_id } });
    await File.destroy({ where: { id: deleteData.file_id } });
  });
});
