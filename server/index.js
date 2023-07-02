import path from 'path';
import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
import { createTrioSocketServer } from './game.js';

export function startServer(dir, port) {
  const app = express();
  const server = createServer(app);

  createTrioSocketServer(server);

  app.use(compression());
  app.use(express.static(path.join(process.cwd(), dir)));
  app.get('*', (req, res) => res.sendFile(path.resolve(process.cwd(), `${dir}/index.html`)));

  server.listen(port);
}

