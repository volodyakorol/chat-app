import clsx from 'clsx';

import { UserAvatar } from '@/features';

import s from './styles.module.scss';

type TUserMessageProps = {
  avatar?: string;
  isMyMessage?: boolean;
  time: string;
  message: string;
};

export const UserMessage = ({ avatar, time, message, isMyMessage }: TUserMessageProps) => {
  return (
    <div className={clsx(s.container, { [s.me]: isMyMessage })}>
      <UserAvatar size={35} src={avatar} />
      <div className={clsx(s.message, { [s.me]: isMyMessage })}>
        <p className={clsx(s.text, { [s.me]: isMyMessage })}>{message}</p>
        <p className={s.time}>{time}</p>
      </div>
    </div>
  );
};
