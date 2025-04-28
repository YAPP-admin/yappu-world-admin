import { toast } from 'react-toastify';

import { commonToastOption } from '@constants/toastOption';

export const showErrorToast = (text: string) => {
  if (!text) return;

  return toast.error(text, commonToastOption);
};
