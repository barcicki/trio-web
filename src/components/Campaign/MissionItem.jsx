import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Tile } from '@/components/Tile.jsx';
import { MissionStatusIcon } from '@/components/Campaign/MissionStatusIcon.jsx';

import './MissionItem.css';

export function MissionItem(props) {
  const { id, label, locked, completed, theme, tile } = props;

  return (
    <Link className={classNames({
      mission: true,
      completed,
      locked
    })} to={id}>
      <MissionStatusIcon {...props}/>
      {label}
      <Tile className="mission--tile" tile={tile} theme={theme}/>
    </Link>
  );
}
