import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TilesList } from '@/components/TilesList.jsx';
import { THEMES, Tile } from '@/components/Tile.jsx';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

import './Rules.css';

export function Rules() {
  const [theme, setTheme] = useState(THEMES[0]);
  const onChangeTheme = useCachedCallback(() => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]));

  return (
    <main className="rules">
      <h1>Rules</h1>

      <Tile className="rules-tile" tile="abac" theme={theme.id} onSelect={onChangeTheme}/>

      <p>Every tile consists of 4 features:</p>
      <ul>
        {theme.features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>

      <p><strong>A trio</strong> (or <strong>a match</strong>) is when every variant of this feature is either <strong>shared</strong> or <strong>unique</strong>.</p>

      <h2>Examples</h2>

      <p>Trio with 3 shared and 1 unique feature:</p>
      <TilesList className="rules-example" tiles={["aaaa", "aaab", "aaac"]} theme={theme.id}/>

      <p>Trio with 2 shared and 2 unique features:</p>
      <TilesList className="rules-example" tiles={["aaaa", "aabb", "aacc"]} theme={theme.id}/>

      <p>Trio with 1 shared and 3 unique features:</p>
      <TilesList className="rules-example" tiles={["aaaa", "abbb", "accc"]} theme={theme.id}/>

      <p>Trio with none shared and 4 unique features:</p>
      <TilesList className="rules-example" tiles={["aaaa", "bbbb", "cccc"]} theme={theme.id}/>

      <h2>Game modes</h2>

      <p>There are 3 games modes:</p>
      <ul>
        <li><strong><Link to="../game">classic game</Link></strong> - the goal is to find all trios in a shuffled deck of 81 unique tiles. The game starts with 12 tiles visible. When trio is found, selected 3 tiles are replaced with new ones from the deck. The game makes sure that at least 1 trio is available on the screen - sometimes it would mean that additional tiles needs to be drawn from the deck. The game ends when deck runs out of card and there are no more trios to be found on the screen.</li>
        <li><strong><Link to="../puzzle">puzzle</Link></strong> - the screen contains exactly 12 tiles with exactly 3 hidden trios - find them as soon as possible.</li>
        <li><strong><Link to="../practice">practice</Link></strong> - in this mode you need to find the tile matching the 2 shown ones to make a trio.</li>
      </ul>


      <div className="rules-options">
        <Link className="button" to="../practice/endless">Practice finding Trios</Link>
      </div>
    </main>
  );
}
