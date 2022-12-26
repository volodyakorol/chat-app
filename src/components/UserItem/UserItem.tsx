import { PropsWithChildren } from 'react';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserAvatar } from '@/features';
import { TDiv } from '@/shared/types';

import styles from './styles.module.scss';

type TUserItemProps = TDiv & {
  avatar?: string;
  title: string;
  description: string;
};

export const UserItem = ({ avatar, title, description, children, ...props }: PropsWithChildren<TUserItemProps>) => {

  return (
    <div data-testid="user-item" className={styles.container} {...props}>
      <UserAvatar src={avatar} size={38} icon={<FontAwesomeIcon icon={faUserAlt} />} />

      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.messagePreview}>{description}</div>
      </div>
      <div className={styles.actions}>{children}</div>
    </div>
  );
};
