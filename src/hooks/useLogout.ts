import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';

export const useLogout = () => {
  const clearUserIdStorage = useAuthStore.persist.clearStorage;
  const resetUser = useAuthStore((state) => state.resetUser);
  const navigate = useNavigate();

  const logout = () => {
    resetUser();
    clearUserIdStorage();
    navigate('/login');
  };

  return logout;
};
