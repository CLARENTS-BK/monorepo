import clsx from 'clsx';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from 'react';

import styles from './Button.module.scss';

type VariantProps = 'primary' | 'secondary' | 'text' | 'primaryNegative' | 'secondaryNegative';
type SizeProps = 'XS' | 'S' | 'M' | 'L';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  variant?: VariantProps;
  size?: SizeProps;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, className, startIcon, endIcon, variant = 'primary', size = 'L', ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const renderIcon = size !== 'XS';

    const sizeMap: { [key in SizeProps]: 'XS' | 'S' | 'M' | 'L' } = {
      XS: 'XS',
      S: 'S',
      M: 'S',
      L: 'M',
    };

    const IconSize = sizeMap[size] || 'XS';

    return (
      <button
        data-testid="button"
        className={clsx(styles[variant], styles[`root${size}`], className)}
        ref={ref}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {startIcon && renderIcon && <span className={styles[`icon${IconSize}`]}>{startIcon}</span>}
        {label}
        {endIcon && renderIcon && <span className={styles[`icon${IconSize}`]}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonProps, VariantProps };
export default Button;
