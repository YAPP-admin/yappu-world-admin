import { variantStyles } from '@constants/buttonStyles';
import { ButtonVariant, ButtonVariantType } from 'types/buttonTypes';

export const getButtonVariantStyle = (
  variant: ButtonVariant,
  variantType: ButtonVariantType,
  disabled?: boolean,
) => {
  const styles = variantStyles[variant][variantType];
  return disabled ? styles.disabled || styles.default : styles.default;
};
