import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { GameTimer } from '@/components/GameTimer.jsx';

import './GameHeader.css';

export function GameHeader({ game, children, status }) {
  const navigate = useNavigate();

  return (
    <div className="game-header">
      <div className="game-header-actions">
        <button onClick={() => navigate(-1)}><MdArrowBackIosNew/></button>
        {children}
      </div>
      <div className="game-header-status">
        {status}
        {game && <GameTimer game={game}/>}
      </div>
    </div>
  );
}
