import { commonToastOption } from '@constants/toastOption';
import { Bounce, toast } from 'react-toastify';

export const showErrorToast = (text: string) => {
  return toast.error(
    `${text}\n지속적으로 에러 발생 시 개발팀에 문의해주세요.`,
    commonToastOption,
  );
};
