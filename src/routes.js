import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import CreatorMeetupController from './app/controllers/CreatorMeetupController';
import checkToken from './app/middlewares/jwt';
import userExists from './app/middlewares/userExists';
import FileController from './app/controllers/FileController';
import SubscriptionController from './app/controllers/SubscriptionController';
import multerConfigs from './config/multer';

const routes = new Router();
const upload = multer(multerConfigs);

routes.get('/users', (req, res) => {
  res.json({ server: 'server is running' });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.storeToken);
routes.put('/users', checkToken, userExists, UserController.update);
routes.post(
  '/files',
  checkToken,
  userExists,
  upload.single('file'),
  FileController.store
);
routes.post('/meetups', checkToken, userExists, MeetupController.store);
routes.get(
  '/creations/',
  checkToken,
  userExists,
  CreatorMeetupController.index
);

routes.put('/meetups/:id', checkToken, userExists, MeetupController.update);
routes.delete('/meetups/:id', checkToken, userExists, MeetupController.delete);
routes.post(
  '/subscriptions/:meetup_id',
  checkToken,
  userExists,
  SubscriptionController.store
);
export default routes;
