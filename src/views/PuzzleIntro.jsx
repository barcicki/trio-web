import { Link, useLoaderData } from 'react-router-dom';
import { PuzzleGoal } from '@/components/PuzzleGoal.jsx';
import { IntroTile } from '@/components/IntroTile.jsx';
import { Intro } from '@/components/Intro.jsx';
import { format } from '@/utils/time.js';
import { IntroDetails } from '@/components/IntroDetails.jsx';

export function PuzzleIntro() {
  const savedPuzzle = useLoaderData();

  return (
    <Intro goal={<PuzzleGoal/>}>
      {savedPuzzle && <IntroTile>
        <IntroDetails details={{
          'Time spent': format(savedPuzzle.duration),
          'Trios to find': 3
        }}/>
        <Link className="button" to="continue">Continue</Link>
      </IntroTile>}
      <IntroTile>
        <Link className="button" to="new">{savedPuzzle ? 'New puzzle' : 'Start'}</Link>
      </IntroTile>
    </Intro>
  );
}
