import * as serverGame from '../game/trio/online';
import { isMatch } from '../game/trio';

export function configureGameSocket(server) {
  const games = {};
  const players = {};
  const socketsToPlayers = {};

  server.on('connection', (socket) => {
    socket.on('hello', ({ id, name, color}) => {
      if (!players[id]) {
        players[id] = {
          id,
          name,
          color,
          sockets: []
        };
      }

      if (!players[id].sockets.includes(socket.id)) {
        players[id].sockets.push(socket.id);
        players[id].name = name;
        players[id].color = color;
      }

      socketsToPlayers[socket.id] = id;
    });

    socket.on('join-game', ({ roomId }) => {
      if (!games[roomId]) {
        games[roomId] = serverGame.create();
      }

      const game = games[roomId];

      addPlayer(game, socketsToPlayers[socket.id]);

      socket.emit('update-game', game);
      socket.to(roomId).emit('update-players', game.players);
      socket.join(roomId);
    });

    socket.on('leave-game', ({ roomId }) => {
      const game = games[roomId];

      removePlayer(game, socketsToPlayers[socket.id]);

      socket.leave(roomId);
      socket.to(roomId).emit('update-players', game.players);
    });


    socket.on('ready', ({ roomId }) => {
      const game = games[roomId];
      const player = game?.players.find((p) => p.id === socketsToPlayers[socket.id]);

      if (player) {
        player.ready = true;
        socket.emit('update-players', game.players);
        socket.to(roomId).emit('update-players', game.players);

        if (game.players.every((p) => p.ready)) {
          Object.assign(game, serverGame.start(game));
          socket.emit('update-game', game);
          socket.to(roomId).emit('update-game', game);
        }
      }
    });

    socket.on('check', ({ roomId, tiles }) => {
      const game = games[roomId];

      if (!game || game.ended || !game.started) {
        return;
      }

      const player = game.players.find((p) => p.id === socketsToPlayers[socket.id]);
      const canCheck = player && tiles.length === 3 && tiles.every((tile) => game.table.includes(tile));

      if (canCheck && isMatch(tiles)) {
        player.score += 1;
        Object.assign(game, serverGame.replace(game, tiles));
        Object.assign(game, serverGame.check(game));

        socket.emit('update-game', game);
        socket.to(roomId).emit('update-game', game);

        if (game.ended) {
          delete games[roomId];
        }
      }
    });

    socket.on('disconnect', () => {
      const playerId = socketsToPlayers[socket.id];
      const player = players[playerId];

      if (player) {
        player.sockets = player.sockets.filter((s) => s !== socket.id);

        if (player.sockets.length) {
          return;
        }
      }

      for (const roomId in games) {
        const game = games[roomId];

        if (removePlayer(game, playerId)) {
          socket.to(roomId).emit('update-players', game.players);
        }
      }
    });
  });

  setInterval(() => {
    for (const roomId in games) {
      const game = games[roomId];

      if (game.players.some((p) => p.online)) {
        server.to(roomId).emit('update-game', game);
      } else {
        game.abandon = (game.abandon ?? 0) + 1;
      }

      if (game.abandon > 10) {
        console.log('Game deleted', roomId);
        delete games[roomId];
      }
    }
  }, 1000);

  function addPlayer(game, id) {
    const player = game.players.find((p) => p.id === id);

    if (!player) {
      game.players.push({
        id,
        score: 0,
        online: true,
        color: players[id].color,
        name: players[id].name,
        ready: !!game.started
      });
    } else {
      player.online = true;
    }
  }

  function removePlayer(game, id) {
    const player = game?.players.find((p) => p.id === id);

    if (player) {
      player.online = false;
      return true;
    }

    return false;
  }

}
