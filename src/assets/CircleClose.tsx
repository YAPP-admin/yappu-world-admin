import { FC } from 'react';

import { AssetProps } from 'types/AssetType';

const CircleClose: FC<AssetProps> = ({ size = '24', color = '#171719' }) => {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Shape">
        <path
          clipRule="evenodd"
          d="M2.09961 12.0001C2.09961 6.53248 6.53199 2.1001 11.9996 2.1001C17.4672 2.1001 21.8996 6.53248 21.8996 12.0001C21.8996 17.4677 17.4672 21.9001 11.9996 21.9001C6.53199 21.9001 2.09961 17.4677 2.09961 12.0001ZM8.4996 7.22733L7.22681 8.50012L10.7268 12.0001L7.22681 15.5001L8.4996 16.7729L11.9996 13.2729L15.4996 16.7729L16.7724 15.5001L13.2724 12.0001L16.7724 8.50012L15.4996 7.22733L11.9996 10.7273L8.4996 7.22733Z"
          fill={color}
          fillRule="evenodd"
          id="Vector"
        />
      </g>
    </svg>
  );
};

export default CircleClose;
