import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@compnents/commons/Layout';
import AdminLayer from '@pages/admin/AdminLayer.tsx';
import MemberApplication from '@pages/admin/members/MemberApplication';
import MemberCode from '@pages/admin/members/MemberCode';
import MemberGeneration from '@pages/admin/members/MemberGeneration';
import MemberList from '@pages/admin/members/MemberList';
import NoticeList from '@pages/admin/notices/NoticeList';
import NoticeWrite from '@pages/admin/notices/NoticeWrite';
import Session from '@pages/admin/sessions/Session.tsx';
import SettingLink from '@pages/admin/settings/SettingLink';
import SettingUpdate from '@pages/admin/settings/SettingUpdate';
import Login from '@pages/login/Login.tsx';
import Notice from '@pages/admin/notices/Notice';

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

          <Route path="notices">
            <Route index element={<NoticeList />} />
            <Route path="write" element={<NoticeWrite />} />
            <Route path="detail/:id" element={<Notice />} />
          </Route>

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
