import './IntroTile.css';

export function IntroTile({ className, children }) {
  return <section className={`intro-tile ${className || ''}`}>{children}</section>;
}
