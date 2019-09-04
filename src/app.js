import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
  /**
   * Has its server.
   */
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  /**
   * API can accept json
   */
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  /**
   * Includes routs to the server.
   * the same as define GET's, POST's methods as functions
   */
  routes() {
    this.server.use(routes);
  }
}

/**
 * Returning only the server property
 * Creates a server
 * Inits its middlewares
 * Sets its routes
 */
export default new App().server;
