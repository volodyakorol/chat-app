import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge } from 'antd';
import clsx from 'clsx';

import s from './styles.module.scss';

type TUserItemProps = {
  avatar?: string;
  isActive?: boolean;
  time: string;
  title: string;
  description: string;
};

export const Conversation = ({ avatar, title, time, description, isActive }: TUserItemProps) => {
  return (
    <div className={clsx(s.container, { [s.active]: isActive })}>
      <Badge dot offset={[-10, 10]} size='default'>
        <Avatar src={avatar} size={44} icon={<FontAwesomeIcon icon={faUserAlt} />} />
      </Badge>

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
