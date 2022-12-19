import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { UserAvatar } from '@/features';
import { TDiv } from '@/shared/types';

import s from './styles.module.scss';

type TUserItemProps = TDiv & {
  avatar?: string;
  isActive?: boolean;
  time: string;
  title: ReactNode;
  description: ReactNode;
};

export const Conversation = ({ avatar, title, time, description, isActive, ...props }: TUserItemProps) => {
  return (
    <div className={clsx(s.container, { [s.active]: isActive })} {...props}>
      <UserAvatar src={avatar} size={44} icon={<FontAwesomeIcon icon={faUserAlt} />} />

      <div className={s.item}>
        <div className={s.itemHeader}>
          <p className={s.name}>{title}</p> <p className={s.time}>{time}</p>
        </div>
        <div className={s.messagePreview}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
