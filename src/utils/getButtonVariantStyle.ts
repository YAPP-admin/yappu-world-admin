import { ButtonVariant, ButtonVariantType } from '@compnents/commons/Botton';
import { variantStyles } from '@constants/buttonStyles';

export const getButtonVariantStyle = (
  variant: ButtonVariant,
  variantType: ButtonVariantType,
  disabled?: boolean,
) => {
  const styles = variantStyles[variant][variantType];
  return disabled ? styles.disabled || styles.default : styles.default;
};
