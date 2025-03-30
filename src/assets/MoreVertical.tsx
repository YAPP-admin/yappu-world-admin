import { FC } from 'react';

interface Props {
  size?: string;
  color?: string;
}

const MoreVertical: FC<Props> = ({ size = '24', color = '#171719' }) => {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Shape">
        <g id="Vector">
          <path
            d="M13.75 4.75C13.75 5.7165 12.9665 6.5 12 6.5C11.0335 6.5 10.25 5.7165 10.25 4.75C10.25 3.7835 11.0335 3 12 3C12.9665 3 13.75 3.7835 13.75 4.75Z"
            fill={color}
          />
          <path
            d="M13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12Z"
            fill={color}
          />
          <path
            d="M12 21C12.9665 21 13.75 20.2165 13.75 19.25C13.75 18.2835 12.9665 17.5 12 17.5C11.0335 17.5 10.25 18.2835 10.25 19.25C10.25 20.2165 11.0335 21 12 21Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default MoreVertical;
