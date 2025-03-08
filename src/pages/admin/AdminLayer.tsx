import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayer: FC = () => {
  return (
    <div>
      <span>AdminLayer</span>
      <Outlet />
    </div>
  );
};

export default AdminLayer;
