import { NavList } from 'types/NavTypes';

export const sideNavList: NavList[] = [
  {
    title: '회원관리',
    path: '/admin/members',
    childs: [
      {
        title: '전체 회원 리스트',
        path: '/admin/members/list',
      },
      {
        title: '가입신청서 관리',
        path: '/admin/members/application',
      },
      {
        title: '가입코드 관리',
        path: '/admin/members/code',
      },
      {
        title: '기수 관리',
        path: '/admin/members/generation',
      },
    ],
  },
  {
    title: '공지사항 관리',
    path: '/admin/notices',
  },
  {
    title: '세션 관리',
    path: '/admin/sessions',
  },
  {
    title: '출석 관리',
    path: '/admin/attendances',
    childs: [
      {
        title: '출석 리스트',
        path: '/admin/attendances/list',
      },
      {
        title: '출석 코드 관리',
        path: '/admin/attendances/code',
      },
    ],
  },
  {
    title: '설정',
    path: '/admin/settings',
    childs: [
      {
        title: '강제 업데이트',
        path: '/admin/settings/update',
      },
      {
        title: '링크 관리',
        path: '/admin/settings/link',
      },
    ],
  },
];
