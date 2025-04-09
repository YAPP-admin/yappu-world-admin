import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@compnents/commons/Layout';
import AdminLayer from '@pages/admin/AdminLayer.tsx';
import MemberApplication from '@pages/admin/members/MemberApplication';
import MemberCode from '@pages/admin/members/MemberCode';
import MemberGeneration from '@pages/admin/members/MemberGeneration';
import MemberList from '@pages/admin/members/MemberList';
import Notice from '@pages/admin/notices/Notice.tsx';
import NoticeList from '@pages/admin/notices/NoticeList';
import NoticeWrite from '@pages/admin/notices/NoticeWrite';
import Session from '@pages/admin/sessions/Session';
import SessionList from '@pages/admin/sessions/SessionList';
import SessionWrite from '@pages/admin/sessions/SessionWrite';
import SettingLink from '@pages/admin/settings/SettingLink';
import SettingUpdate from '@pages/admin/settings/SettingUpdate';
import AuthGuard from '@pages/auth/AuthGuard';
import Login from '@pages/login/Login.tsx';

export const RouteSetup = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Navigate replace to="/admin/members/list" />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminLayer />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate replace to="members/list" />} />

          <Route path="members">
            <Route index element={<Navigate replace to="list" />} />
            <Route element={<MemberList />} path="list" />
            <Route element={<MemberApplication />} path="application" />
            <Route element={<MemberCode />} path="code" />
            <Route element={<MemberGeneration />} path="generation" />
          </Route>

          <Route path="notices">
            <Route index element={<NoticeList />} />
            <Route element={<NoticeWrite />} path="write" />
            <Route element={<Notice />} path="detail/:id" />
          </Route>

          <Route path="sessions">
            <Route index element={<SessionList />} />
            <Route element={<SessionWrite />} path="write" />
            <Route element={<Session />} path="detail/:id" />
          </Route>

          <Route path="settings">
            <Route index element={<Navigate replace to="update" />} />
            <Route element={<SettingUpdate />} path="update" />
            <Route element={<SettingLink />} path="link" />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};
