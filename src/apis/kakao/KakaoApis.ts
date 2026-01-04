import { KakaoGeocoderResult } from 'types/kakao';

export const getKakaoSearchAddress = async (address: string) => {
  return new Promise<KakaoGeocoderResult[]>((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps) {
      reject(new Error('Kakao Maps Geocoder is not loaded'));
    }

    try {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result);
        } else {
          reject(new Error(`Kakao Maps Geocoder status: ${status}`));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
