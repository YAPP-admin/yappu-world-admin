import { Route, Routes } from 'react-router-dom';

import Detail from '../pages/detail/Detail.tsx';
import Main from '../pages/main/Main.tsx';

export const RouteSetup = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
};
