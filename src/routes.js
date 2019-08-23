import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/users', (req, res) => {
  res.json({ server: 'server is running' });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.storeToken);

export default routes;
