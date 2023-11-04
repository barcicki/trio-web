import { Link } from 'react-router-dom';
import { Intro } from '@/components/Intro.jsx';
import { IntroTile } from '@/components/IntroTile.jsx';
import { PracticeGoal } from '@/components/PracticeGame/PracticeGoal.jsx';

export function PracticeIntro() {
  return (
    <Intro goal={<PracticeGoal/>}>
      <IntroTile>
        <p className="intro-hint">Endless mode - just practice</p>
        <Link className="button" to="endless">Start</Link>
      </IntroTile>
      <IntroTile>
        <p className="intro-hint">Find as many trios as possible in 1&nbsp;minute</p>
        <Link className="button" to="speed">Start</Link>
      </IntroTile>
    </Intro>
  );
}
