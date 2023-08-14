import { Link } from 'react-router-dom';
import { MdArrowBackIosNew, MdOutlineInfo } from 'react-icons/md';
import { TbArrowsShuffle, TbBulb, TbCards, TbStarsFilled } from 'react-icons/tb';
import { ThemeButton } from '@/components/ThemeButton.jsx';
import { ColorTag } from '@/components/ColorTag.jsx';
import { Timer } from '@/components/Timer.jsx';
import { getTimerProps } from '@/utils/time.js';

import './GameHeader.css';

export function GameHeader({
  backPath = '/',
  onBack,
  onHint,
  onReorder,
  onThemeSwitch,
  theme = null,
  nextTheme = theme,
  ended,
  started,
  remaining,
  duration,
  currentPlayer = null,
  otherPlayers = [],
  remainingHints,
  showBack = backPath || onBack,
  showHint = !!onHint,
  showRemainingHints = !!remainingHints,
  showReorder = !!onReorder,
  showThemeSwitcher = !!onThemeSwitch,
  tilesInDeck,
  showTilesInDeck = !!tilesInDeck,
  score,
  scoreLabel = 'Score',
  showScore = !!score,
  showTimer = true,
  showPlayers = true,
  onInfo,
  infoLabel = 'About',
  showInfo = !!onInfo,
}) {
  return (
    <div className="game--header">
      <div className="game--header-actions">
        {showBack && <Link className="button" to={backPath} onClick={onBack}><MdArrowBackIosNew/></Link>}
        {showHint && <button disabled={showRemainingHints && remainingHints === 0} onClick={onHint} title="Show hint"><TbBulb/>{showRemainingHints ? remainingHints : ''}</button>}
        {showReorder && <button onClick={onReorder} title="Reorder tiles"><TbArrowsShuffle/></button>}
        {showThemeSwitcher && <ThemeButton theme={nextTheme} onClick={onThemeSwitch} title="Switch theme"/>}
        {showInfo && <button onClick={onInfo} title={infoLabel}><MdOutlineInfo/></button> }
        {showPlayers && currentPlayer && (
            <ColorTag className="game--current-player" color={currentPlayer.color} title={currentPlayer.name}>
              {currentPlayer.score ?? currentPlayer.found?.length ?? 0}
            </ColorTag>
        )}
        {showPlayers && otherPlayers?.length ? otherPlayers.map((p) =>
            <ColorTag className="game--other-player" key={p.id} color={p.color} title={p.name}>
              {p.score ?? p.found?.length ?? 0}
            </ColorTag>
        ) : ''}
      </div>
      <div className="game--header-status">
        {showScore && <div className="button non-interactive" title={scoreLabel}><TbStarsFilled/> {score}</div>}
        {showTilesInDeck && <div className="button non-interactive" title="Tiles in deck"><TbCards/> {tilesInDeck}</div>}
        {showTimer && <div className="button non-interactive"><Timer className="game--header-timer" {...getTimerProps({ started, remaining, duration, ended })}/></div>}
      </div>
    </div>
  );
}
