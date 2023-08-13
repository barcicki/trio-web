import './GameView.css';
import { GameHeader } from '@/components/Game/GameHeader.jsx';
import { GameBody } from '@/components/Game/GameBody.jsx';
import { GameEnd } from '@/components/Game/GameEnd.jsx';
import { AnimatePresence } from 'framer-motion';

export function GameView(props) {
  return (
    <>
      <main className="game--view limited">
        <GameHeader {...props} />
        <GameBody {...props} />
        <AnimatePresence>
          {props.ended && <GameEnd {...props}/>}
        </AnimatePresence>
      </main>
    </>
  );
}
