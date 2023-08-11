import './GameView.css';
import { GameHeader } from '@/components/Game/GameHeader.jsx';
import { GameBody } from '@/components/Game/GameBody.jsx';
import { GameEnd } from '@/components/Game/GameEnd.jsx';

export function GameView(props) {
  return (
    <>
      <main className="game--view limited">
        <GameHeader {...props} />
        <GameBody {...props} />
        {props.ended && <GameEnd {...props}/>}
      </main>
    </>
  );
}
