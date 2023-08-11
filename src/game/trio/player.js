import { getHash } from './table.js';

export function getPlayer(state, playerId) {
  return state.players.find((p) => p.id === playerId);
}

export function joinPlayer(state, player, ready) {
  const existingPlayer = getPlayer(state, player.id);

  if (existingPlayer) {
    if (existingPlayer.active && existingPlayer.ready === ready) {
      return state;
    }

    return updatePlayer(state, player.id, {
      ...activatePlayer(existingPlayer),
      ready: ready ?? existingPlayer.ready
    });
  }

  return {
    ...state,
    players: state.players.concat({
      ...player,
      active: true,
      hints: 0,
      reorders: 0,
      found: [],
      missed: [],
      selected: [],
    })
  };
}

export function leavePlayer(state, playerId) {
  return updatePlayer(state, playerId, deactivatePlayer);
}

export function updatePlayer(state, playerId, change, ...args) {
  if (!getPlayer(state, playerId)) {
    return state;
  }

  const fn = typeof change === 'function' ? change : () => change;

  return {
    ...state,
    players: state.players.map((p) => p.id === playerId ? fn(p, ...args) : p)
  };
}

export function activatePlayer(player) {
  return {
    ...player,
    active: true
  };
}

export function deactivatePlayer(player) {
  return {
    ...player,
    active: false,
    ready: false
  };
}

export function increaseMissed(player, tiles) {
  return {
    ...player,
    missed: [...player.missed, tiles]
  };
}

export function increaseFound(player, tiles) {
  return {
    ...player,
    found: [...player.found, tiles]
  };
}

export function getTotalFoundTrios(state) {
  return state.players.reduce((sum, p) => sum + p.found?.length ?? 0, 0);
}

export function hasAnyPlayerFound(state, tiles) {
  const hash = getHash(tiles);

  return state.players.some((player) => player.found?.some((found) => getHash(found) === hash));
}
