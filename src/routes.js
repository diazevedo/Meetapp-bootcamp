import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import checkToken from './app/middlewares/jwt';
import FileController from './app/controllers/FileController';
import multerConfigs from './config/multer';

const routes = new Router();
const upload = multer(multerConfigs);

routes.get('/users', (req, res) => {
  res.json({ server: 'server is running' });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.storeToken);
routes.put('/users', checkToken, UserController.update);
routes.post('/file', checkToken, upload.single('file'), FileController.store);

export default routes;
