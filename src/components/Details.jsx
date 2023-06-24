import './Details.css';
import classNames from 'classnames';

export function Details({ details, horizontal = false }) {
  return (
    <ul className={classNames({
      details: true,
      horizontal
    })}>
      {Object.entries(details).map(([label, value]) => <li key={label}>{label}: <strong>{value}</strong></li>)}
    </ul>
  );
}
