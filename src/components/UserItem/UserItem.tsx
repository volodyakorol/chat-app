import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge } from 'antd';

import s from './styles.module.scss';

type TUserItemProps = {
  avatar?: string;
  title: string;
  description: string;
};

export const UserItem = ({ avatar, title, description, children }: PropsWithChildren<TUserItemProps>) => {
  return (
    <div className={s.container}>
      <Badge dot offset={[-5, 5]} size='default'>
        <Avatar src={avatar} size={38} icon={<FontAwesomeIcon icon={faUserAlt} />} />
      </Badge>

      <div>
        <p className={s.title}>{title}</p>
        <div className={s.messagePreview}>{description}</div>
      </div>
      <div className={s.actions}>{children}</div>
    </div>
  );
};
