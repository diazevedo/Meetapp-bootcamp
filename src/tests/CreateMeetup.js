import request from 'supertest';
import server from '../app';

const app = request(server);

const CreateMeetup = async (meetup, token = '') => {
  const response = await app
    .post('/meetups')
    .set('Authorization', token)
    .send(meetup);

  return response;
};

export default CreateMeetup;
