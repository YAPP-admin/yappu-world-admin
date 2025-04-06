import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';

export const useLogout = () => {
  const clearUserIdStorage = useAuthStore.persist.clearStorage;
  const resetToken = useAuthStore((state) => state.resetToken);
  const navigate = useNavigate();
  console.log('logout');

  const logout = () => {
    resetToken();
    clearUserIdStorage();
    navigate('/login');
  };

  return logout;
};
