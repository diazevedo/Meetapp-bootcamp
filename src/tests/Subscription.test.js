import request from 'supertest';
import server from '../app';
import createUser from './CreateUser';
import createAuth from './Auth';
import createMeetup from './CreateMeetup';
import createFile from './CreateFile';
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

  const meetupRes = await createMeetup(meetup, auth.token);
  deleteData.meetup_id = meetupRes.body.id;
  meetup.id = meetupRes.body.id;

  const userGuest = await createUser(app, 'Guest', 'guest@guest.com', '123456');
  deleteData.guest_id = userGuest.id;
  auth.guestToken = await createAuth('guest@guest.com', '123456');
});

describe('Subscription tests', () => {
  test('It should return meetup not found', async () => {
    expect.assertions(1);
    const response = await app
      .post(`/subscriptions/${meetup.id * 35}`)
      .set('Authorization', auth.guestToken)
      .send(meetup);

    expect(response.body.error).toEqual('Meetup was not found.');
  });

  afterAll(async () => {
    await MeetupModel.destroy({ where: { id: deleteData.meetup_id } });
    await User.destroy({ where: { id: deleteData.user_id } });
    await User.destroy({ where: { id: deleteData.guest_id } });
    await File.destroy({ where: { id: deleteData.file_id } });
  });
});
