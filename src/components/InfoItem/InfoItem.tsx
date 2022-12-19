import { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

type TInfoItemProps = {
  icon: IconProp;
  label: string;
  info?: ReactNode;
};

export const InfoItem = ({ icon, info, label }: TInfoItemProps) => {
  if (!info) return null;

  return (
    <div className={styles.infoItem}>
      <FontAwesomeIcon className={styles.socialIcon} icon={icon} />
      <p className={styles.content}>
        {label} {info}
      </p>
    </div>
  );
};
