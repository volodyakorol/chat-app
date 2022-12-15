import { useGetGroup } from '@/shared/reactQueries';
import { faHourglassStart, faMessage, faUsers } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { InfoItem, UserItem } from '@/components';
import { UserAvatar } from '@/features';

import s from './styles.module.scss';

type TGroupAsideProps = {
  selectedGroup: number;
};

export const GroupAside = ({ selectedGroup }: TGroupAsideProps) => {
  const { data } = useGetGroup({ id: selectedGroup });
  const { createdAt, owner, users, avatar, title, messages } = data ?? {};

  const ownerUser = users?.find(({ id }) => id === owner?.id);
  const members = users?.filter(({ id }) => id !== owner?.id);

  return (
    <div className={s.groupAside}>
      <div className={s.asideHeader}>
        <UserAvatar size={140} src={avatar} />
        <h3>{title}</h3>
      </div>
      <div className={s.block}>
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
        <InfoItem icon={faUsers} label='Users:' info={users?.length} />
        <InfoItem icon={faMessage} label='Messages:' info={messages?.length} />
      </div>
      <div className='divider' />
      <div className={s.block}>
        <h4>Owner</h4>
        {!!ownerUser && (
          <UserItem
            description={ownerUser.email}
            title={`${ownerUser.firstName} ${ownerUser.lastName}`}
            avatar={ownerUser.profile?.avatar}
          />
        )}
        <h4>Users</h4>
        {members?.map(({ id, email, firstName, lastName, profile }) => (
          <UserItem key={id} description={email} title={`${firstName} ${lastName}`} avatar={profile?.avatar} />
        ))}
      </div>
    </div>
  );
};
