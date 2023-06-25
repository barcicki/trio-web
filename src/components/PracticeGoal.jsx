import { Link } from 'react-router-dom';

export function PracticeGoal() {
  return (
    <p>
      Complete <strong>a trio</strong>. Two tiles shown on the screen are missing a tile to be <strong>a trio</strong> - three tiles satisfying <Link to="/rules">the rules</Link>.
    </p>
  );
}
