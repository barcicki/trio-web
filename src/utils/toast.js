import toast from 'react-hot-toast';
import { getMatchError } from '@game/trio';

export function toastMiss(miss, theme) {
  toastErrors(getMatchError(miss), theme);
}

export function toastErrors(errors, theme) {
  const invalidFeatures = errors
    .map((val, index) => val ? theme.features[index] : null)
    .filter(Boolean);

  toast.remove();
  toast(`Wrong ${invalidFeatures.join(', ')}`);
}

export function toastAlreadyFound() {
  toast.remove();
  toast('This trio is already found!');
}

export function toastMissionLocked() {
  toast.remove();
  toast('This mission is not yet available');
}
