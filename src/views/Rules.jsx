import { Link } from 'react-router-dom';
import { TilesList } from '@/components/TilesList.jsx';
import { Tile } from '@/components/Tile.jsx';
import { useTheme } from '@/hooks/useTheme.js';

import './Rules.css';

export function Rules() {
  const [theme, ,changeTheme] = useTheme();

  return (
    <main className="rules">
      <h1>Rules</h1>

      <p>There are 81 unique tiles in the game.</p>

      <Tile className="rules-tile" tile="abac" theme={theme.id} onSelect={changeTheme}/>

      <p>Every tile has <strong>four features</strong>:</p>
      <ul>
        {theme.features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>

      <p>Every feature has <strong>three variants</strong>, e.g. different variant of color.</p>

      <h2>Trio</h2>

      <p><strong>A trio</strong> is when <em>every</em> variant of <em>every</em> feature is either <strong>shared</strong> or <strong>unique</strong>.</p>

      <h3>Examples</h3>

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
        <li><strong><Link to="../game">single game</Link></strong> - the goal is to find all trios in a shuffled deck of 81 unique tiles. The game starts with 12 tiles visible. When trio is found, selected 3 tiles are replaced with new ones from the deck. The game makes sure that at least 1 trio is available on the screen - sometimes it would mean that additional tiles needs to be drawn from the deck. The game ends when deck runs out of card and there are no more trios to be found on the screen.</li>
        <li><strong><Link to="../puzzle">puzzle</Link></strong> - the screen contains exactly 12 tiles with exactly 3 hidden trios - find them as soon as possible.</li>
        <li><strong><Link to="../practice">practice</Link></strong> - in this mode you can practice completing trios. The game randomly selects 2 tiles from the deck and then presents you 6 possible choices. Only one of them is right.</li>
      </ul>

      <div className="rules-options">
        <Link className="button" to="../">Home</Link>
        <Link className="button" to="../practice/endless">Practice finding Trios</Link>
      </div>
    </main>
  );
}
