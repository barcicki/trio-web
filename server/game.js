import { Server } from 'socket.io';
import { GameTypes, TargetTypes, createGame } from '../src/game/trio';

export function createTrioSocketServer(httpServer) {
  const ioServer = new Server(httpServer);

  configureTrioServer(ioServer);
}

export function configureTrioServer(ioServer) {
  const games = {};
  const players = {};
  const socketsToPlayers = {};

  ioServer.on('connection', (socket) => {
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

    socket.on('join-game', ({ roomId, config }) => {
      if (!games[roomId] || hasGameEnded(roomId)) {
        games[roomId] = createGame(config || {
          type: GameTypes.FIND,
          target: TargetTypes.DECK,
          hintsLimit: 0
        });
      }

      const playerId = socketsToPlayers[socket.id];
      const player = players[playerId];

      socket.join(roomId);
      updateGame(roomId, 'join', player, false);
    });

    socket.on('leave-game', ({ roomId }) => {
      socket.leave(roomId);
      updateGame(roomId, 'leave', socketsToPlayers[socket.id]);
    });

    socket.on('ready', ({ roomId }) => {
      updateGame(roomId, 'join', players[socketsToPlayers[socket.id]], true);
    });

    socket.on('miss', ({ roomId, tiles }) => {
      const game = games[roomId];

      if (!game) {
        return;
      }

      updateGame(roomId, 'miss', socketsToPlayers[socket.id], tiles);
    });

    socket.on('check', ({ roomId, tiles }) => {
      const game = games[roomId];

      if (!game) {
        return;
      }

      updateGame(roomId, 'submit', socketsToPlayers[socket.id], tiles);

      if (hasGameEnded(roomId)) {
        ioServer.in(roomId).socketsLeave(roomId);
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
        updateGame(roomId, 'leave', playerId);
      }
    });
  });

  setInterval(() => {
    for (const roomId in games) {
      const game = games[roomId];

      if (shouldGameStart(game.state)) {
        updateGame(roomId, 'start');
      } else if (isGameActive(game.state)) {
        publishGameStatus(roomId);
      } else {
        game.abandon = (game.abandon ?? 0) + 1;
      }

      if (game.abandon > 10) {
        console.log('Game deleted', roomId);
        delete games[roomId];
      }
    }
  }, 1000);

  function hasGameEnded(roomId) {
    return games[roomId]?.state?.ended;
  }

  function shouldGameStart(state) {
    if (state.started) {
      return false;
    }

    const onlinePlayers = state.players.filter((p) => p.active);

    return onlinePlayers.length > 0 && onlinePlayers.every((p) => p.ready);
  }

  function isGameActive(state) {
    return state.players.some((p) => p.active) && !state.ended;
  }

  function updateGame(roomId, command, ...args) {
    const prev = games[roomId];
    const next = prev && prev[command](...args);

    if (prev !== next) {
      games[roomId] = next;
      publishGameStatus(roomId);
    }
  }

  function publishGameStatus(roomId) {
    const game = games[roomId];

    ioServer.to(roomId).emit('sync', cleanUpGame(game));
  }

  function cleanUpGame(game) {
    return {
      config: {
        ...game.config,
        seed: undefined
      },
      state: {
        ...game.state,
        seed: undefined,
        nextSeed: undefined,
        players: game.state.players.map((player) => ({
          ...player,
          sockets: undefined,
          selected: undefined
        }))
      }
    };
  }
}
