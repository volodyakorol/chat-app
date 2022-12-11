import { useGetConversationById } from '@/shared/reactQueries';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHourglassStart, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';
import dayjs from 'dayjs';

import { InfoItem } from '@/components';

import s from './styles.module.scss';

type TUserAsideProps = {
  selectedChat: number;
};

export const UserAside = ({ selectedChat }: TUserAsideProps) => {
  const { data } = useGetConversationById(selectedChat);
  const { createdAt, creator, recipient } = data ?? {};
  const { firstName, lastName, email, profile } = recipient ?? {};

  return (
    <div>
      <div className={s.asideHeader}>
        <Avatar size={140} src={profile?.avatar} />
        <h3>{`${firstName} ${lastName}`}</h3>
      </div>
      <div className={s.userAbout}>
        <p>{profile?.about}</p>
      </div>

      <div className={s.infoBlock}>
        <InfoItem icon={faMailForward} label='Email:' info={email} />
        <InfoItem
          icon={faHourglassStart}
          label='CreatedAt:'
          info={
            <>
              <br />
              {dayjs(createdAt).format('DD MMM YYYY')}
            </>
          }
        />
        <InfoItem icon={faUser} label='Creator:' info={`${creator?.firstName} ${creator?.lastName}`} />
      </div>
      <div className='divider' />
      <div className={s.infoBlock}>банер</div>
    </div>
  );
};
