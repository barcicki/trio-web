import toast from 'react-hot-toast';
import { getMatchError } from '@/game/game.js';

export function toastErrors(miss, theme) {
  const invalidFeatures = getMatchError(miss)
    .map((val, index) => val ? theme.features[index] : null)
    .filter(Boolean);

  toast.remove();
  toast(`Wrong ${invalidFeatures.join(', ')}`);
}

export function toastAlreadyFound() {
  toast.remove();
  toast('This trio is already found!');
}
