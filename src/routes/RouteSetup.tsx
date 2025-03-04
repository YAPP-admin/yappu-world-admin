import { Route, Routes } from 'react-router-dom';

import Login from '@pages/login/Login.tsx';
import AdminLayer from '@pages/admin/AdminLayer.tsx';
import Member from '@pages/admin/members/Member.tsx';
import Notice from '@pages/admin/notices/Notice.tsx';
import Session from '@pages/admin/sessions/Session.tsx';
import Setting from '@pages/admin/settings/Setting.tsx';

export const RouteSetup = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayer />}>
        <Route index element={<Member />} /> {/* 기본 페이지 설정 */}
        <Route path="members" element={<Member />} />
        <Route path="notices" element={<Notice />} />
        <Route path="sessions" element={<Session />} />
        <Route path="settings" element={<Setting />} />
      </Route>
    </Routes>
  );
};
