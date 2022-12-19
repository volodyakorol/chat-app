import clsx from 'clsx';

import { Files } from '@/components/Files';
import { UserAvatar } from '@/features';
import { SDN_URL } from '@/shared/constant';
import { MessageAttachment } from '@/shared/types';

import s from './styles.module.scss';

type TUserMessageProps = {
  avatar?: string;
  isMyMessage?: boolean;
  time: string;
  message: string;
  attachments?: MessageAttachment[];
};

export const UserMessage = ({ avatar, time, message, isMyMessage, attachments }: TUserMessageProps) => {
  return (
    <div className={clsx(s.container, { [s.me]: isMyMessage })}>
      <UserAvatar size={35} src={avatar} />
      <div className={clsx(s.messageContainer, { [s.me]: isMyMessage })}>
        <div className={clsx(s.message, { [s.me]: isMyMessage })}>
          <p>{message}</p>
          {attachments && (
            <Files
              files={attachments.map(({ fileType, originalname, key }) => ({
                filename: originalname,
                mimetype: fileType,
                src: SDN_URL + key,
              }))}
            />
          )}
        </div>
        <p className={s.time}>{time}</p>
      </div>
    </div>
  );
};
