import { GamePlayerState, GameState } from './types.ts';
import { updateTable } from './table.js';

export function syncState(state: GameState, newState: GameState): GameState {
  const oldPlayersMap = state.players.reduce<Record<string, GamePlayerState>>((map, player) => {
    map[player.id] = player;

    return map;
  }, {});

  return {
    ...state,
    ...newState,
    players: newState.players.map((p) => {
      const old = oldPlayersMap[p.id];

      if (!old) {
        return p;
      }

      return ({
        ...p,
        selected: old.selected?.length ? old.selected.filter((tile) => newState.table!.includes(tile)) : []
      });
    }),
    table: updateTable(state.table || [], newState.table)
  };
}
