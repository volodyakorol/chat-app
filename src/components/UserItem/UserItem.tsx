import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'antd';

import { UserAvatar } from '@/features';
import { TDiv } from '@/shared/types';

import s from './styles.module.scss';

type TUserItemProps = TDiv & {
  avatar?: string;
  online?: boolean;
  title: string;
  description: string;
};

export const UserItem = ({
  avatar,
  title,
  online,
  description,
  children,
  ...props
}: PropsWithChildren<TUserItemProps>) => {
  const Avatar = <UserAvatar src={avatar} size={38} icon={<FontAwesomeIcon icon={faUserAlt} />} />;

  return (
    <div className={s.container} {...props}>
      {online ? (
        <Badge dot offset={[-5, 5]} size='default'>
          {Avatar}
        </Badge>
      ) : (
        Avatar
      )}

      <div>
        <p className={s.title}>{title}</p>
        <div className={s.messagePreview}>{description}</div>
      </div>
      <div className={s.actions}>{children}</div>
    </div>
  );
};
