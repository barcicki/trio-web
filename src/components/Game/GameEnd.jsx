import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer } from '@/components/Timer.jsx';
import { Details } from '@/components/Details.jsx';
import { getTimerProps } from '@/utils/time.js';

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

  const opacity = useMotionValue(0);
  const pointerEvents = useTransform(opacity, (val) => val === 1 ? 'all' : 'none');

  return (
    <motion.main className="game--ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ opacity }}>
      <motion.div className="game--modal" style={{ pointerEvents }}>
        {endShowHeader && <h1>{endHeader}</h1>}
        {endMessage && <p>{endMessage}</p>}
        {endShowTime && props.duration && !props.remaining && <Timer className="game--end-timer" {...getTimerProps(props)}/>}
        {endBody}
        {endDetails && <Details className="game--end-details" details={endDetails(props)}></Details>}
        {endActions && <div className="game--end-actions">{endActions}</div>}
      </motion.div>
    </motion.main>
  );
}
