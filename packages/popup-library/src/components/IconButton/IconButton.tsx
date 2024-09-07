import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import Icon from '../Icon/Icon';
import styles from './IconButton.module.scss';
import indexIcon from '../../assets/icons-sprite/indexIcon';

type SizeProps = 'XS' | 'S' | 'M' | 'L' | 'XL';

type StringKeys<T> = Extract<keyof T, string>;

type IconVariant = StringKeys<typeof indexIcon>;

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  size?: SizeProps;
  iconVariant?: IconVariant;
  disabled?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, size = 'XL', iconVariant = 'default', disabled = false, ...rest }: IconButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <button
      className={clsx(styles.root, styles[`root${size}`], className)}
      ref={ref}
      disabled={disabled}
      type="button"
      {...rest}
    >
      <Icon
        iconId={iconVariant}
        size={size}
      />
    </button>
  )
);

IconButton.displayName = 'IconButton';

export type { IconButtonProps };

export default IconButton;
