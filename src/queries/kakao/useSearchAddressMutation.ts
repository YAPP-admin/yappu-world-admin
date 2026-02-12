import { useMutation } from '@tanstack/react-query';

import { getKakaoSearchAddress } from 'apis/kakao/KakaoApis';
import { KakaoGeocoderResult } from 'types/kakao';
import { showErrorToast } from 'types/showErrorToast';

export const useSearchAddressMutation = () => {
  return useMutation<KakaoGeocoderResult[], Error, string>({
    mutationFn: (address) => getKakaoSearchAddress(address),
    onError: (error) => {
      console.error('search address error:', error);
      showErrorToast(error.message ?? '주소 검색 중 오류가 발생했습니다.');
    },
  });
};
