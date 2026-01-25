export interface KakaoGeocoderResult {
  x: string;
  y: string;
  address_name: string;
  address_type: string;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        services: {
          Status: {
            OK: 'OK';
            ERROR: 'ERROR';
            ZERO_RESULT: 'ZERO_RESULT';
          };
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: KakaoGeocoderResult[], status: string) => void,
            ) => void;
          };
        };
      };
    };
  }
}

export {};
