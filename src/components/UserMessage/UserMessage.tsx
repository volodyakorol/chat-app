import clsx from 'clsx';

import { Files } from '@/components/Files';
import { UserAvatar } from '@/features';
import { SDN_URL } from '@/shared/constant';
import { TMessageAttachment } from '@/shared/types';

import styles from './styles.module.scss';

type TUserMessageProps = {
  avatar?: string;
  isMyMessage?: boolean;
  time: string;
  message: string;
  attachments?: TMessageAttachment[];
};

export const UserMessage = ({ avatar, time, message, isMyMessage, attachments }: TUserMessageProps) => {
  return (
    <div className={clsx(styles.container, { [styles.me]: isMyMessage })}>
      <UserAvatar size={35} src={avatar} />
      <div className={clsx(styles.messageContainer, { [styles.me]: isMyMessage })}>
        <div className={clsx(styles.message, { [styles.me]: isMyMessage })}>
          <p>{message}</p>
          {!!attachments?.length && (
            <div className={styles.attachments}>
              <Files
                files={attachments.map(({ fileType, originalname, key }) => ({
                  filename: originalname,
                  mimetype: fileType,
                  src: SDN_URL + key,
                }))}
              />
            </div>
          )}
        </div>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
};
