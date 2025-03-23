import { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
  color?: string;
}

const Close: FC<Props> = (props) => {
  const { width = '24', height = '24', color = '#171719' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="Shape">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.61321 4.6137C4.96468 4.26223 5.53453 4.26223 5.886 4.6137L11.9996 10.7273L18.1132 4.6137C18.4647 4.26223 19.0345 4.26223 19.386 4.6137C19.7375 4.96517 19.7375 5.53502 19.386 5.88649L13.2724 12.0001L19.386 18.1137C19.7375 18.4652 19.7375 19.035 19.386 19.3865C19.0345 19.738 18.4647 19.738 18.1132 19.3865L11.9996 13.2729L5.886 19.3865C5.53453 19.738 4.96468 19.738 4.61321 19.3865C4.26174 19.035 4.26174 18.4652 4.61321 18.1137L10.7268 12.0001L4.61321 5.88649C4.26174 5.53502 4.26174 4.96517 4.61321 4.6137Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default Close;
