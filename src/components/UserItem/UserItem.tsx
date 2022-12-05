import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge } from 'antd';

import s from './styles.module.scss';

type TUserItemProps = {
  avatar?: string;
  online?: boolean;
  title: string;
  description: string;
};

export const UserItem = ({ avatar, title, online, description, children }: PropsWithChildren<TUserItemProps>) => {
  const UserAvatar = <Avatar src={avatar} size={38} icon={<FontAwesomeIcon icon={faUserAlt} />} />;
  return (
    <div className={s.container}>
      {online ? (
        <Badge dot offset={[-5, 5]} size='default'>
          {UserAvatar}
        </Badge>
      ) : (
        UserAvatar
      )}

      <div>
        <p className={s.title}>{title}</p>
        <div className={s.messagePreview}>{description}</div>
      </div>
      <div className={s.actions}>{children}</div>
    </div>
  );
};
