import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import styles from './TextInput.module.scss';

type SizeProps = 'S' | 'M' | 'L';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  isNegative?: boolean;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: SizeProps;
  label: string;
  icon?: boolean;
  disabled?: boolean;
  isMandatory?: boolean;
};

type ClassInputProps = {
  isNegative: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
};

const getClassInput = ({ isNegative, hasLeftIcon, hasRightIcon }: ClassInputProps) =>
  clsx({
    [styles.isNegative]: isNegative,
    [styles.hasLeftIcon]: hasLeftIcon,
    [styles.hasRightIcon]: hasRightIcon,
  });

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    className,
    rightIcon,
    errorMessage,
    type = 'text',
    leftIcon = false,
    isNegative = false,
    inputSize = 'M',
    label,
    icon = false,
    disabled = false,
    isMandatory = false,
    ...inputProps
  }) => (
    <div className={clsx(className, disabled && styles.disabled)}>
      <div
        className={clsx(styles.root)}
        data-testid="root"
      >
        <input
          disabled={disabled}
          className={clsx(
            styles[`root${inputSize}`],
            getClassInput({ isNegative, hasLeftIcon: !!leftIcon, hasRightIcon: !!rightIcon })
          )}
          type={type}
          data-testid="input"
          {...inputProps}
        />
        {leftIcon && <div className={`${styles[`icon${inputSize}`]} ${styles.leftIcon}`}>{leftIcon}</div>}
        {rightIcon && <div className={`${styles[`icon${inputSize}`]} ${styles.rightIcon}`}>{rightIcon}</div>}
      </div>
      {isNegative && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  )
);

TextInput.displayName = 'TextInput';

export type { TextInputProps };
export default TextInput;
