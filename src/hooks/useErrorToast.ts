import { Bounce, toast } from 'react-toastify';

export const useErrorToast = (text: string) => {
  return toast.error(
    `${text}\n지속적으로 에러 발생 시 개발팀에 문의해주세요.`,
    {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    },
  );
};
