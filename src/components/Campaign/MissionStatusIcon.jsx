import { TbCircleCheck, TbLock, TbLockOpen } from 'react-icons/tb';

export function MissionStatusIcon({ completed, locked }) {
  if (completed) {
    return <TbCircleCheck/>;
  }

  if (locked) {
    return <TbLock/>;
  }

  return <TbLockOpen/>;
}
