import { Link } from 'react-router-dom';

export function GameGoal() {
  return (
    <p>
      Find hidden <strong>trios</strong> - three tiles satisfying <Link to="/rules">the rules</Link>.<br/>
      Found trios are replaced with new tiles from the deck until it runs out.
    </p>
  );
}
