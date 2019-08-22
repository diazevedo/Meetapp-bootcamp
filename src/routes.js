import { Router } from 'express';

const routes = new Router();
routes.get('/users', (req, res) => {
  res.json({ server: 'server is running' });
});

export default routes;
