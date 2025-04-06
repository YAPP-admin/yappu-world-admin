import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';

interface Props {
  children: React.ReactNode;
}

const AuthGuard: FC<Props> = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
