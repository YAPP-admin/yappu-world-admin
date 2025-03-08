export const chipColorStyles: Record<
  ChipColor,
  Record<ChipStyle, ReturnType<typeof css>>
> = {
  primary: {
    weak: css`
      background: #ffefe9;
      color: #fa6027;
    `,
    fill: css`
      background: #fa6027;
      color: #fff;
    `,
  },
  secondary: {
    weak: css`
      background: #fff7ea;
      color: #ffad31;
    `,
    fill: css`
      background: #ffad31;
      color: #fff;
    `,
  },
  neutral: {
    weak: css`
      background: #dcdcdc;
      color: #474747;
    `,
    fill: css`
      background: #474747;
      color: #fff;
    `,
  },
  coolNeutral: {
    weak: css`
      background: rgba(112, 115, 124, 0.05);
      color: #70737c;
    `,
    fill: css`
      background: #70737c;
      color: #fff;
    `,
  },
  lime: {
    weak: css`
      background: #f0fee6;
      color: #58cf04;
    `,
    fill: css`
      background: #58cf04;
      color: #fff;
    `,
  },
  violet: {
    weak: css`
      background: #ece7fd;
      color: #6541f2;
    `,
    fill: css`
      background: #6541f2;
      color: #fff;
    `,
  },
  lightBlue: {
    weak: css`
      background: #e5f7ff;
      color: #00aeff;
    `,
    fill: css`
      background: #00aeff;
      color: #fff;
    `,
  },
  pink: {
    weak: css`
      background: #feecfb;
      color: #f553da;
    `,
    fill: css`
      background: #f553da;
      color: #fff;
    `,
  },
};

import { ChipColor, ChipSize, ChipStyle } from '@compnents/commons/Chip';
import { css } from 'styled-components';

export const chipSizeStyles: Record<ChipSize, ReturnType<typeof css>> = {
  small: css`
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.342px;
  `,
  large: css`
    padding: 3px 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
};
