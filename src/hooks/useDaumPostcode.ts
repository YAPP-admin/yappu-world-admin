import { useState } from 'react';

import { useSearchAddressMutation } from '@queries/kakao/useSearchAddressMutation';

export interface AddressData {
  address: string;
  latitude: number;
  longitude: number;
}

interface UseDaumPostcodeProps {
  onComplete: (data: AddressData) => void;
}

export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
}

export const useDaumPostcode = ({ onComplete }: UseDaumPostcodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: searchAddress } = useSearchAddressMutation();

  const openPostcode = () => {
    setIsOpen(true);
  };

  const closePostcode = () => {
    setIsOpen(false);
  };

  const handleComplete = async (data: DaumPostcodeData) => {
    // 도로명 주소 혹은 지번 주소
    const address = data.roadAddress || data.jibunAddress;

    try {
      const result = await searchAddress(address);

      if (result && result.length > 0) {
        const latitude = parseFloat(result[0].y);
        const longitude = parseFloat(result[0].x);
        onComplete({ address, latitude, longitude });
      } else {
        onComplete({ address, latitude: 0, longitude: 0 });
      }
    } catch (error) {
      console.error('주소 좌표 변환 실패:', error);
      onComplete({ address, latitude: 0, longitude: 0 });
    } finally {
      closePostcode();
    }
  };

  return {
    isOpen,
    openPostcode,
    closePostcode,
    handleComplete,
  };
};
