import { Details } from '@/components/Details.jsx';
import { getTimerProps } from '@/utils/time.js';
import { Timer } from '@/components/Timer.jsx';
import { Link } from 'react-router-dom';

import './GameEnd.css';

export function GameEnd(props) {
  const {
    endHeader = 'Well done!',
    endMessage,
    endDetails,
    endShowHeader = true,
    endShowTime = true,
    endBody,
    endActions = (props.backPath || props.onBack) && (
      <Link className="button" to={props.backPath} onClick={props.onBack}>Back</Link>
    )
  } = props;

  return (
    <main className="game--ended">
      <div className="game--modal">
        {endShowHeader && <h1>{endHeader}</h1>}
        {endMessage && <p>{endMessage}</p>}
        {endShowTime && props.duration && !props.remaining && <Timer className="game--end-timer" {...getTimerProps(props)}/>}
        {endBody}
        {endDetails && <Details className="game--end-details" details={endDetails(props)}></Details>}
        {endActions && <div className="game--end-actions">{endActions}</div>}
      </div>
    </main>
  );
}
