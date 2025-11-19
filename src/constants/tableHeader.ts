import { FilterHeader } from 'types/HeaderType';

export const noticeHeader = ['제목', '타입', '이름', '작성일'];

export const linkHeader = ['링크 이름', 'URL', '수정'];

export const generationHeader = ['기수', '활동기간', '상태'];

export const applicationHeader = [
  '이름',
  '이메일',
  '상태',
  '활동기수',
  '직군',
  '가입 요청일',
  '처리일',
  '상세보기',
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
