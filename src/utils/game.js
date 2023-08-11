import { GameTypes, getMatches, TargetTypes } from '@/game/trio';
import { hasAnyPlayerFound } from '@/game/trio/player.js';

export function getHintsConfig(api, playerId) {
  const { config, state } = api;
  const player = state?.players?.find?.((p) => p.id === playerId);

  if (player && (config.hintsLimit > 0 || config.hintsLimit === null)) {
    const showRemainingHints = config.hintsLimit > 0;
    const remainingHints = showRemainingHints ? config.hintsLimit - player.hints : 0;

    return {
      showRemainingHints,
      remainingHints
    };
  }

  return {
    showHint: false
  };
}

export function getStatusConfig(api, playerId) {
  const { state, config } = api;
  const player = state?.players?.find?.((p) => p.id === playerId);

  if (!player) {
    return;
  }


  const found = player.found?.length ?? 0;

  if (config.type === GameTypes.MATCH) {
    if (config.matchLimit > 1) {
      return {
        showScore: true,
        score: `${found} / ${config.matchLimit}`
      };
    } else if (!config.matchLimit) {
      return {
        showScore: true,
        score: found
      };
    }
  }

  if (config.type === GameTypes.FIND && config.target === TargetTypes.DECK) {
    return {
      showScore: true,
      score: found,
      scoreLabel: 'Found trios',
      showTilesInDeck: true,
      tilesInDeck: state.deck.length
    };
  }

  if (config.type === GameTypes.FIND && config.target === TargetTypes.ENDLESS) {
    return {
      showScore: true,
      score: config.goalSize > 0 ? `${found} / ${config.goalSize}` : found
    };
  }
}

export function getPlayers(api, playerId) {
  const me = api.state.players.find((p) => p.id === playerId);
  const others = api.state.players.filter((p) => p.id !== playerId)
    .sort((a, b) => {
      if (b.active === a.active) {
        return b.ready - a.ready;
      }

      return b.active - a.active;
    })
    .map((p) => ({
      ...p,
      color: p.active ? p.color : '#232323'
    }));

  return [me, others];
}

export function getGoals(api) {
  if (api.config.type === GameTypes.MATCH) {
    return [
      {
        type: GameTypes.MATCH,
        tiles: api.state.matchTiles,
        found: api.state.ended && !api.state.remaining
      }
    ];
  }

  if (api.config.target === TargetTypes.GOAL) {
    return getMatches(api.state.table.slice().sort()).map((tiles) => ({
      type: GameTypes.FIND,
      tiles,
      found: hasAnyPlayerFound(api.state, tiles)
    }));
  }

  return [];
}
