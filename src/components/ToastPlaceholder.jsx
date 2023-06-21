import { Toaster } from 'react-hot-toast';

export function ToastPlaceholder() {
  const toastOptions = {
    duration: 2000,
    style: {
      pointerEvents: 'none'
    }
  };

  return (
    <Toaster position="top-center" toastOptions={toastOptions}/>
  );
}
