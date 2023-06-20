import { Tile } from '@/components/Tile.jsx';
import { AnimatePresence } from 'framer-motion';

import './Home.css';

export function Home({ onSelect }) {
  return (
    <>
      <div className="section menu">
        <button onClick={() => onSelect?.('newGame')}>New game</button>
      </div>
      <div className="section home">
        <h1>TRIO</h1>
        <div className="tiles">
          <AnimatePresence>
            <Tile theme="shapes" tile="cbac"/>
            <Tile theme="shields" tile="cbac"/>
            <Tile theme="shields" tile="babb"/>
            <Tile theme="shapes" tile="bcba"/>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
