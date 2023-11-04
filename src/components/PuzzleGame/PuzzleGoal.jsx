import { Link } from 'react-router-dom';

export function PuzzleGoal() {
  return (
    <p>
      Find hidden <strong>trios</strong> - three tiles satisfying <Link to="/rules">the rules</Link> - among 12 cards.<br/>
      There are exactly <strong>three</strong> trios hidden. Be quick!
    </p>
  );
}
