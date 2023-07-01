import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { GameTimer } from '@/components/GameTimer.jsx';

import './GameHeader.css';

export function GameHeader({ game, children, status }) {

  return (
    <div className="game-header">
      <div className="game-header-actions">
        <Link className="button" to="/"><MdArrowBackIosNew/></Link>
        {children}
      </div>
      <div className="game-header-status">
        {status}
        {game?.started && <GameTimer game={game}/>}
      </div>
    </div>
  );
}
