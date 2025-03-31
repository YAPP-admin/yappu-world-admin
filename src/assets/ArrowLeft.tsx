import { FC } from 'react';

interface Props {
  size?: string;
  color?: string;
}

const ArrowLeft: FC<Props> = ({ size = '24', color = '#171719' }) => {
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
          d="M2.86321 11.3635C2.51174 11.715 2.51174 12.2848 2.86321 12.6363L9.86321 19.6363C10.2147 19.9878 10.7845 19.9878 11.136 19.6363C11.4875 19.2848 11.4875 18.715 11.136 18.3635L5.6724 12.8999H20.4996C20.9967 12.8999 21.3996 12.497 21.3996 11.9999C21.3996 11.5028 20.9967 11.0999 20.4996 11.0999L5.6724 11.0999L11.136 5.6363C11.4875 5.28483 11.4875 4.71498 11.136 4.36351C10.7845 4.01203 10.2147 4.01203 9.86321 4.36351L2.86321 11.3635Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
export default ArrowLeft;
