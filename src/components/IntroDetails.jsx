import './IntroDetails.css';

export function IntroDetails({ details }) {
  return (
    <ul className="intro-details">
      {Object.entries(details).map(([label, value]) => <li key={label}>{label}: <strong>{value}</strong></li>)}
    </ul>
  );
}
