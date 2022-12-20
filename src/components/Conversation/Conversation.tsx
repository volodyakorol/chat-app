import { ReactNode } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { UserAvatar } from '@/features';
import { TDiv } from '@/shared/types';

import styles from './styles.module.scss';

type TUserItemProps = TDiv & {
  avatar?: string;
  isActive?: boolean;
  time: string;
  title: ReactNode;
  description: ReactNode;
};

export const Conversation = ({ avatar, title, time, description, isActive, ...props }: TUserItemProps) => {
  return (
    <div className={clsx(styles.container, { [styles.active]: isActive })} {...props}>
      <UserAvatar src={avatar} size={44} icon={<FontAwesomeIcon icon={faUserAlt} />} />

      <div className={styles.item}>
        <div className={styles.itemHeader}>
          <p className={styles.name}>{title}</p> <p className={styles.time}>{time}</p>
        </div>
        <div className={styles.messagePreview}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
