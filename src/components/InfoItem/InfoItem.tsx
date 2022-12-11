import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import s from './styles.module.scss';

type TInfoItemProps = {
  icon: IconProp;
  label: string;
  info?: ReactNode;
};

export const InfoItem = ({ icon, info, label }: TInfoItemProps) => {
  if (!info) return null;

  return (
    <div className={s.infoItem}>
      <FontAwesomeIcon className={s.socialIcon} icon={icon} />
      <p className={s.content}>
        {label} {info}
      </p>
    </div>
  );
};
