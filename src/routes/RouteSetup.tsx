import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/login/Login.tsx';
import AdminLayer from '@pages/admin/AdminLayer.tsx';
import Member from '@pages/admin/members/Member.tsx';
import Notice from '@pages/admin/notices/Notice.tsx';
import Session from '@pages/admin/sessions/Session.tsx';
import Setting from '@pages/admin/settings/Setting.tsx';
import Layout from '@compnents/commons/Layout';
import SettingUpdate from '@pages/admin/settings/SettingUpdate';
import SettingLink from '@pages/admin/settings/SettingLink';
import MemberCode from '@pages/admin/members/MemberCode';
import MemberApplication from '@pages/admin/members/MemberApplication';
import MemberList from '@pages/admin/members/MemberList';
import MemberGeneration from '@pages/admin/members/MemberGeneration';

export const RouteSetup = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayer />}>
          <Route index element={<Navigate to="members/list" replace />} />

          <Route path="members">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<MemberList />} />
            <Route path="application" element={<MemberApplication />} />
            <Route path="code" element={<MemberCode />} />
            <Route path="generation" element={<MemberGeneration />} />
          </Route>

          <Route path="notices" element={<Notice />} />
          <Route path="sessions" element={<Session />} />

          <Route path="settings">
            <Route index element={<Navigate to="update" replace />} />
            <Route path="update" element={<SettingUpdate />} />
            <Route path="link" element={<SettingLink />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};
