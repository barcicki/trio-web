import { Server } from 'socket.io';
import { configureGameSocket } from './game.js';

export default function createGameSocket() {
  return {
    name: 'trio-socket-server',
    configureServer(server) {
      const io = new Server(server.httpServer);

      configureGameSocket(io);
    }
  };
}
