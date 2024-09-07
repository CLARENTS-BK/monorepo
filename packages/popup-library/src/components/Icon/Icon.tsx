import clsx from 'clsx';
import { FC } from 'react';

import styles from './Icon.module.scss';
import indexIcon from '../../assets/icons-sprite/indexIcon';

type SizeProps = 'XS' | 'S' | 'M' | 'L' | 'XL';

type IconProps = {
  className?: string;
  iconId: string;
  size?: SizeProps;
};

const Icon: FC<IconProps> = ({ className, iconId, size = 'M' }) => {
  const icon = indexIcon[iconId];

  return (
    <span
      className={clsx(styles.root, styles[`size${size}`], className)}
      role="img"
      data-testid="test-icon"
      aria-label={iconId}
    >
      {icon}
    </span>
  );
};

export type { IconProps };

export default Icon;
