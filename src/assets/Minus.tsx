import { FC } from 'react';

import { AssetProps } from 'types/AssetType';

const Minus: FC<AssetProps> = (props) => {
  const { size = '24', color = '#171719' } = props;
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M5.09961 12.0001C5.09961 11.503 5.50255 11.1001 5.99961 11.1001H17.9996C18.4967 11.1001 18.8996 11.503 18.8996 12.0001C18.8996 12.4972 18.4967 12.9001 17.9996 12.9001H5.99961C5.50255 12.9001 5.09961 12.4972 5.09961 12.0001Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Minus;
