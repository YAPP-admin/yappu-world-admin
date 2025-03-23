import {
  ButtonSize,
  ButtonVariant,
  ButtonVariantType,
} from '@compnents/commons/Button';
import { css } from 'styled-components';

export const variantStyles: Record<
  ButtonVariant,
  Record<
    ButtonVariantType,
    { default: ReturnType<typeof css>; disabled?: ReturnType<typeof css> }
  >
> = {
  contained: {
    primary: {
      default: css`
        background: #fa6027;
        border: none;
        color: #ffffff;
      `,
      disabled: css`
        background: #f4f4f5;
        color: rgba(55, 56, 60, 0.28);
      `,
    },
    secondary: {
      default: css`
        background: #ffefe9;
        color: #fa6027;
        border: none;
      `,
      disabled: css`
        background: #fff8f5;
        color: #fdbba2;
      `,
    },
    assistive: { default: css`` },
  },
  outlined: {
    primary: {
      default: css`
        border: 1px solid #fa6027;
        color: #fa6027;
        background: #ffffff;
      `,
      disabled: css`
        background: #ffffff;
        color: rgba(55, 56, 60, 0.16);
        border: 1px solid rgba(112, 115, 124, 0.22);
      `,
    },
    secondary: {
      default: css`
        border: 1px solid rgba(112, 115, 124, 0.22);
        color: #fa6027;
        background: #ffffff;
      `,
      disabled: css`
        background: #ffffff;
        color: rgba(55, 56, 60, 0.16);
        border: 1px solid rgba(112, 115, 124, 0.22);
      `,
    },
    assistive: {
      default: css`
        border: 1px solid rgba(112, 115, 124, 0.22);
        color: #171719;
        background: #ffffff;
      `,
      disabled: css`
        background: #ffffff;
        color: rgba(55, 56, 60, 0.16);
        border: 1px solid rgba(112, 115, 124, 0.22);
      `,
    },
  },
};

export const buttonSizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  xlarge: css`
    padding: 16px 36px;
    border-radius: 12px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  large: css`
    padding: 12px 28px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  medium: css`
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 0.144px;
  `,
  small: css`
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
  xsmall: css`
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
};
