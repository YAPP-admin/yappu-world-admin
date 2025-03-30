import { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
  active?: boolean;
}

const NormalBlank: FC<Props> = (props) => {
  const { width = '24', height = 24, active = false } = props;
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.34444 3.24961C9.34444 2.75255 9.74738 2.34961 10.2444 2.34961H13.7418C14.2389 2.34961 14.6418 2.75255 14.6418 3.24961C14.6418 3.74667 14.2389 4.14961 13.7418 4.14961H10.2444C9.74738 4.14961 9.34444 3.74667 9.34444 3.24961Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M7.64661 3.2353C7.66167 3.73213 7.27112 4.14709 6.77429 4.16215C5.91748 4.18811 5.56056 4.256 5.30631 4.38676L5.29721 4.39143C4.91134 4.58437 4.59032 4.90642 4.37253 5.32175C4.24261 5.57585 4.17508 5.93323 4.1492 6.78723C4.13415 7.28406 3.71919 7.67461 3.22236 7.65956C2.72553 7.6445 2.33498 7.22954 2.35003 6.73271C2.37588 5.87967 2.43753 5.14851 2.77309 4.49603L2.77583 4.4907C3.15312 3.76893 3.73674 3.1604 4.48774 2.78365C5.13904 2.45018 5.86875 2.38876 6.71977 2.36298C7.21659 2.34792 7.63156 2.73847 7.64661 3.2353Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M16.3397 3.2353C16.3547 2.73847 16.7697 2.34792 17.2665 2.36298C18.1175 2.38876 18.8472 2.45018 19.4985 2.78364C20.2495 3.16039 20.8331 3.76893 21.2104 4.49071L21.2132 4.49602C21.5488 5.1485 21.6104 5.87967 21.6362 6.73271C21.6513 7.22954 21.2608 7.6445 20.7639 7.65956C20.2671 7.67461 19.8521 7.28406 19.8371 6.78723C19.8112 5.93323 19.7437 5.57585 19.6138 5.32176C19.396 4.90642 19.075 4.58432 18.6891 4.39138L18.6799 4.38681C18.4257 4.25605 18.0688 4.18811 17.212 4.16215C16.7152 4.14709 16.3246 3.73213 16.3397 3.2353Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M3.24962 9.34443C3.74667 9.34443 4.14962 9.74737 4.14962 10.2444V13.7418C4.14962 14.2389 3.74667 14.6418 3.24962 14.6418C2.75256 14.6418 2.34962 14.2389 2.34962 13.7418V10.2444C2.34962 9.74737 2.75256 9.34443 3.24962 9.34443Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M20.7367 9.34443C21.2337 9.34443 21.6367 9.74737 21.6367 10.2444V13.7418C21.6367 14.2389 21.2337 14.6418 20.7367 14.6418C20.2396 14.6418 19.8367 14.2389 19.8367 13.7418V10.2444C19.8367 9.74737 20.2396 9.34443 20.7367 9.34443Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M20.7769 16.3397C21.2737 16.3547 21.6643 16.7697 21.6492 17.2665C21.6234 18.1195 21.5617 18.8507 21.2261 19.5032L21.2234 19.5085C20.8461 20.2303 20.2624 20.8389 19.5113 21.2157C18.8601 21.549 18.1304 21.6105 17.2795 21.6362C16.7826 21.6513 16.3677 21.2607 16.3526 20.7639C16.3376 20.2671 16.7281 19.8521 17.2249 19.8371C18.0817 19.8111 18.4387 19.7432 18.6929 19.6125L18.702 19.6078C19.0879 19.4148 19.4089 19.0928 19.6267 18.6775C19.7566 18.4234 19.8242 18.066 19.85 17.212C19.8651 16.7152 20.28 16.3246 20.7769 16.3397Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M3.22236 16.3526C3.71919 16.3376 4.13415 16.7281 4.1492 17.2249C4.17517 18.0817 4.24305 18.4387 4.37381 18.6929L4.37849 18.702C4.57143 19.0879 4.89348 19.4089 5.30881 19.6267C5.56291 19.7566 5.92029 19.8241 6.77429 19.85C7.27112 19.8651 7.66167 20.28 7.64661 20.7769C7.63156 21.2737 7.21659 21.6643 6.71977 21.6492C5.86672 21.6233 5.13556 21.5617 4.48308 21.2261L4.47777 21.2234C3.75599 20.8461 3.14745 20.2625 2.7707 19.5115C2.43724 18.8602 2.37582 18.1305 2.35003 17.2795C2.33498 16.7826 2.72553 16.3677 3.22236 16.3526Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
      <path
        d="M9.34444 20.7367C9.34444 20.2396 9.74738 19.8367 10.2444 19.8367H13.7418C14.2389 19.8367 14.6418 20.2396 14.6418 20.7367C14.6418 21.2337 14.2389 21.6367 13.7418 21.6367H10.2444C9.74738 21.6367 9.34444 21.2337 9.34444 20.7367Z"
        fill={active ? '#fa6027' : 'rgba(55, 56, 60, 0.28)'}
      />
    </svg>
  );
};

export default NormalBlank;
