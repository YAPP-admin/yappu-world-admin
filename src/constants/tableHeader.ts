import { FilterHeader } from 'types/HeaderType';

export const noticeHeader = ['제목', '타입', '이름', '작성일'];

export const linkHeader = ['링크 이름', 'URL', '수정'];

export const generationHeader = ['기수', '활동기간', '상태'];

export const applicationHeader: FilterHeader[] = [
  { title: '이름', isFilter: false },
  { title: '이메일', isFilter: false },
  { title: '상태', isFilter: true },
  { title: '활동기수', isFilter: true },
  { title: '직군', isFilter: true },
  { title: '가입 요청일', isFilter: false },
  { title: '상세보기', isFilter: false },
];

export const memberListHeader: FilterHeader[] = [
  { title: '이름', isFilter: false },
  { title: '최근활동기수', isFilter: true },
  { title: '직군', isFilter: true },
  { title: '권한', isFilter: true },
  { title: '가입일', isFilter: false },
  { title: '탈퇴여부', isFilter: false },
];

export const sessionHeader = ['기수', '타입', '제목', '장소', '날짜', '시간'];

export const CodeHeader = ['코드이름', '코드값', ''];
