import { FC } from 'react';
import { AssetProps } from 'types/AssetType';

const CircleCheck: FC<AssetProps> = ({ size = '24', color = '#171719' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="Shape">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.1454 9.62695L10.6761 16.2923L6.85378 12.3542L8.14542 11.1006L10.6761 13.7079L15.8538 8.37329L17.1454 9.62695ZM2.09961 12.0001C2.09961 6.53248 6.53199 2.1001 11.9996 2.1001C17.4672 2.1001 21.8996 6.53248 21.8996 12.0001C21.8996 17.4677 17.4672 21.9001 11.9996 21.9001C6.53199 21.9001 2.09961 17.4677 2.09961 12.0001Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default CircleCheck;
