import { css } from 'styled-components';

import {
  IconButtonSize,
  IconButtonVariant,
} from '@compnents/Button/IconButton';
import {
  ButtonSize,
  ButtonVariant,
  ButtonVariantType,
} from '@compnents/commons/Button';

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

export const sizeStyles = {
  xlarge: css`
    padding: 16px 36px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  large: css`
    padding: 12px 28px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  medium: css`
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.144px;
  `,
  small: css`
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
  xsmall: css`
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
};

export const textButtonSizeStyles = {
  medium: css`
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  small: css`
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.203px;
  `,
};

export const outlinedSizeStyles = {
  xlarge: css`
    padding: 16px 36px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  large: css`
    padding: 12px 28px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.091px;
  `,
  medium: css`
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.144px;
  `,
  small: css`
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
  xsmall: css`
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.252px;
  `,
};

export const assistiveStyleMap: Record<ButtonSize, ReturnType<typeof css>> = {
  xlarge: css``,
  large: css`
    border-radius: 8px;
    font-weight: 500;
    gap: 5px;
  `,
  medium: css`
    border-radius: 8px;
    font-weight: 500;
    gap: 5px;
  `,
  small: css`
    border-radius: 6px;
    font-weight: 500;
    gap: 4px;
  `,
  xsmall: css`
    border-radius: 4px;
    font-weight: 500;
    gap: 4px;
  `,
};

export const defaultGapMap: Record<ButtonSize, string> = {
  xlarge: '6px',
  large: '6px',
  medium: '5px',
  small: '4px',
  xsmall: '4px',
};

export const iconButtonSizeStyles: Record<
  IconButtonSize,
  ReturnType<typeof css>
> = {
  normal: css`
    padding: 10px;
    width: 20px;
    height: 20px;
  `,
  small: css`
    padding: 7px;
    width: 18px;
    height: 18px;
  `,
  custom: css`
    padding: 6px;
    width: 16px;
    height: 16px;
  `,
};

export const iconButtonVariantStyles: Record<
  IconButtonVariant,
  {
    default: (size: IconButtonSize) => ReturnType<typeof css>;
    disabled?: (size: IconButtonSize) => ReturnType<typeof css>;
  }
> = {
  normal: {
    default: () => css`
      background: none;
      width: 24px;
      height: 24px;
      border: none;
      padding: 0;
    `,
    disabled: () => css`
      opacity: 0.43;
      border: none;
      padding: 0;
    `,
  },
  background: {
    default: () => css`
      padding: 20px;
      width: 20px;
      height: 20px;
      background: rgba(112, 115, 124, 0.08); // #70737C14
    `,
    disabled: () => css`
      background: rgba(112, 115, 124, 0.05); // #70737C0D
    `,
  },
  outlined: {
    default: (size) => css`
      background: none;
      border: 1px solid rgba(112, 115, 124, 0.22);
      color: #171717;
      ${iconButtonSizeStyles[size]}
    `,
    disabled: () => css`
      color: rgba(55, 56, 60, 0.16);
    `,
  },
  solid: {
    default: (size) => css`
      background: #fa6027;
      color: #ffffff;
      border: none;
      ${iconButtonSizeStyles[size]}
    `,
    disabled: () => css`
      background: rgba(112, 115, 124, 0.08);
      color: #171717;
    `,
  },
};
