import express from 'express';
import routes from './routes';

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
