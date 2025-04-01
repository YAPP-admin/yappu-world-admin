import axiosInstance from 'apis/common/axiosInstance';
import { ApiResponse, PaginatedApiResponse } from 'apis/common/types';

import {
  BaseNoticeReq,
  DeleteNoticeReq,
  EditNoticeReq,
  NoticeDetailRes,
  NoticeRes,
  NoticeType,
} from './types';

// const sampleAllNotice: PaginatedApiResponse<NoticeRes> = {
//   data: {
//     data: [
//       {
//         noticeId: '1',
//         title: '공지 타이틀 1',
//         createdAt: '2025-03-30T13:29:31.217Z',
//         writer: {
//           userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//           name: '홍길동',
//         },
//         noticeType: 'ALL',
//       },
//       {
//         noticeId: '2',
//         title: '공지 타이틀 2',
//         createdAt: '2025-03-30T13:29:31.217Z',
//         writer: {
//           userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//           name: '김현정',
//         },
//         noticeType: 'SESSION',
//       },
//       {
//         noticeId: '3',
//         title: '공지 타이틀 3',
//         createdAt: '2025-03-30T13:29:31.217Z',
//         writer: {
//           userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//           name: '김백설',
//         },
//         noticeType: 'OPERATION',
//       },
//     ],
//     totalCount: 3,
//     totalPage: 0,
//     page: 0,
//     size: 0,
//   },
//   isSuccess: true,
// };

export const getAllNotice = (
  page: number,
  size: number,
  noticeType: NoticeType,
) => {
  return axiosInstance.get<PaginatedApiResponse<NoticeRes>>(
    `/admin/v1/notices?page=${page}&size=${size}&noticeType=${noticeType}`,
  );
};

export const postNewNotice = (data: BaseNoticeReq): Promise<void> => {
  return axiosInstance.post('/admin/v1/notices', data);
};

// const detailData: ApiResponse<NoticeDetailRes> = {
//   data: {
//     noticeId: '3',
//     createdAt: '2025-03-25T10:35',
//     title: '아이템으로 완성하는 데일리 룩',
//     content:
//       '# 📢 신규 기능 안내\n\n안녕하세요,\t고객님!\n\n항상 저희 서비스를 이용해주셔서 감사합니다.  \n이번 업데이트에서는 다음과 같은 기능이 추가되었습니다:\n\n1. **다크 모드 지원**  \n2. **공지사항 알림 기능 개선**  \n3. **버그 수정 및 안정성 향상**\n\n\t👉\t업데이트 내역은 아래를 참고해주세요:\n\n- *버전:* 1.3.5  \n- *업데이트 일자:* 2025-04-01  \n- *배포 대상:* 전체 사용자  \n\n\b\b※ 공지사항을 꼭 확인해주세요.  \n\b\b중요한 변경 사항이 포함되어 있습니다!\n\n감사합니다.  \n고객지원팀 드림',
//     type: 'SESSION',
//     writer: {
//       id: '3',
//       name: '김현정',
//     },
//   },
//   isSuccess: true,
// };

export const getNoticeDetail = (noticeId: number) => {
  return axiosInstance.get<ApiResponse<NoticeDetailRes>>(
    `/admin/v1/notices/${noticeId}`,
  );
};

export const putNotice = (data: EditNoticeReq): Promise<void> => {
  return axiosInstance.put('/admin/v1/notices', data);
};

export const deleteNotice = (data: DeleteNoticeReq): Promise<void> => {
  return axiosInstance.delete('/admin/v1/notices', { data });
};
