import { THEMES } from '@/components/TileThemes/themes.js';
import { GameView } from '@/components/Game/GameView.jsx';
import { createGame } from '@/game/trio';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { toastAlreadyFound, toastErrors } from '@/utils/toast.js';
import { getHintsConfig, getStatusConfig, getGoals, getPlayers } from '@/utils/game.js';
import { useVisibilityChangeEffect } from '@/hooks/useVisibilityChangeEffect.js';
import { useIntervalEffect } from '@/hooks/useIntervalEffect.js';

export function LocalGame(props) {
  const {
    config,
    game,
    player,
    onUpdate,
    ...otherProps
  } = props;

  const theme = THEMES.find((t) => t.id === props.theme) || THEMES[0];

  let api = createGame(config, game)
    .join(player);

  if (!document.hidden && !api.state.ended) {
    api = api.start();
  }

  const [currentPlayer, otherPlayers] = getPlayers(api, player.id);
  const goals = getGoals(api);

  const onReorder = useCachedCallback(() => onUpdate?.(api.reorder().state));
  const onHint = useCachedCallback(() => onUpdate?.(api.hint(player.id).state));
  const onSelect = useCachedCallback((tile, table) => {
    const result = api.check(player.id, tile);

    if (result.valid && (!result.match || result.error)) {
      table.shakeTiles(currentPlayer.selected.concat(tile));

      if (result.miss) {
        toastErrors(result.miss, theme);
      } else if (result.error) {
        toastAlreadyFound();
      }
    }

    const newState = api.toggle(player.id, tile).state;

    onUpdate?.(newState);
  });

  useIntervalEffect(() => {
    if (api.state.started && !document.hidden) {
      onUpdate?.(api.tick().state);
    }
  }, 1000);

  useVisibilityChangeEffect(() => {
    if (!api.state.ended) {
      onUpdate?.(document.hidden ? api.stop().state : api.start().state);
    }
  });

  return <GameView
    {...otherProps}
    {...api.state}
    {...getStatusConfig(api, currentPlayer.id)}
    {...getHintsConfig(api, currentPlayer.id)}
    theme={theme.id}
    currentPlayer={currentPlayer}
    otherPlayers={otherPlayers}
    goals={goals}
    selected={currentPlayer.selected}
    onSelect={onSelect}
    onReorder={onReorder}
    onHint={onHint}
  />;
}
