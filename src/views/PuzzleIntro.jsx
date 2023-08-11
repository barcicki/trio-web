import { Link, useLoaderData } from 'react-router-dom';
import { PuzzleGoal } from '@/components/PuzzleGoal.jsx';
import { IntroTile } from '@/components/IntroTile.jsx';
import { Intro } from '@/components/Intro.jsx';
import { format } from '@/utils/time.js';
import { Details } from '@/components/Details.jsx';
import { countMatches } from '@game/trio';
import { getTotalFoundTrios } from '@game/trio/player.js';

export function PuzzleIntro() {
  const savedPuzzle = useLoaderData();

  return (
    <Intro goal={<PuzzleGoal/>}>
      {savedPuzzle && !savedPuzzle.ended && <IntroTile>
        <Details details={{
          'Time spent': format(savedPuzzle.duration),
          'Trios to find': countMatches(savedPuzzle.table) - getTotalFoundTrios(savedPuzzle)
        }}/>
        <Link className="button" to="continue">Continue</Link>
      </IntroTile>}
      <IntroTile>
        <Link className="button" to="new">{savedPuzzle ? 'New puzzle' : 'Start'}</Link>
      </IntroTile>
    </Intro>
  );
}
