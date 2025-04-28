import { Bounce } from 'react-toastify';

export const commonToastOption = {
  position: 'top-center' as const,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'light' as const,
  transition: Bounce,
};
