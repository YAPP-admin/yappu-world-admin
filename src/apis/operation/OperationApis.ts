import axiosInstance from 'apis/common/axiosInstance';
import { OperationListInfo, OperationListRes } from './types';
import { ApiResponse } from 'apis/common/types';

export const getOperationsList = async () => {
  //   return axiosInstance.get<ApiResponse<OperationListRes>>(
  //     '/admin/v1/operations/links',
  //   );
  return list.data;
};

export const putOperationList = async (
  data: OperationListInfo,
): Promise<void> => {
  return axiosInstance.put('/admin/v1/operations/links', data);
};

const list: ApiResponse<OperationListRes> = {
  data: {
    links: [
      {
        id: 'privacyPolicyLink',
        label: '개인정보 처리방침',
        value:
          'https://yapp-workspace.notion.site/fc24f8ba29c34f9eb30eb945c621c1ca?pvs=4',
      },
      {
        id: 'termsOfServiceLink',
        label: '이용약관',
        value:
          'https://yapp-workspace.notion.site/48f4eb2ffdd94740979e8a3b37ca260d?pvs=4',
      },
      {
        id: 'kakaoLink',
        label: '문의 카톡 링크',
        value: 'https://open.kakao.com/asdasdfasdfav/asdfadf',
      },
    ],
  },
  isSuccess: true,
};
