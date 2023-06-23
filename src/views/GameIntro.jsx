import { Link, useLoaderData } from 'react-router-dom';
import { format } from '@/utils/time.js';

import './GameIntro.css';

export function GameIntro() {
  const savedGame = useLoaderData();

  return (
    <main className="game-intro">
      <div className="game-intro-goal">
        <p>
          Find hidden <strong>trios</strong> - three tiles satisfying <Link to="/tutorial">the rules</Link>.<br/>
          Found trios are replaced with new tiles from the deck until it runs out.
        </p>
      </div>
      <div className="game-intro-options">
        {savedGame && <section className="game-intro-tile">
          <ul className="game-intro-details">
            <li>Trios found: <strong>{savedGame.found.length}</strong></li>
            <li>Tiles in deck: <strong>{savedGame.deck.length}</strong></li>
            <li>Time spent: <strong>{format(savedGame.duration)}</strong></li>
          </ul>
          <Link className="button" to="continue">Continue</Link>
        </section>}
        <section className="game-intro-tile">
          <Link className="button" to="new">{savedGame ? 'New game' : 'Start'}</Link>
        </section>
      </div>
    </main>
  );
}
