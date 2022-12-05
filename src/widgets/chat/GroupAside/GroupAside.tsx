import { useGetGroup } from '@/shared/reactQueries';
import { faHourglassStart, faMessage, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from 'antd';

import { InfoItem, UserItem } from '@/components';

import s from './styles.module.scss';

type TGroupAsideProps = {
  selectedGroup: number;
};

export const GroupAside = ({ selectedGroup }: TGroupAsideProps) => {
  const { data } = useGetGroup({ id: selectedGroup });
  const { createdAt, owner, users, avatar, title, messages } = data ?? {};

  return (
    <div>
      <div className={s.asideHeader}>
        <Avatar size={140} src={avatar} />
        <h3>{title}</h3>
      </div>
      <div className={s.block}>
        <InfoItem icon={faHourglassStart} label='CreatedAt:' info={createdAt} />
        <InfoItem icon={faUsers} label='Users:' info={users?.length} />
        <InfoItem icon={faMessage} label='Messages:' info={messages?.length} />
      </div>
      <div className='divider' />
      <div className={s.block}>
        <h4>Owner</h4>
        {!!owner && (
          <UserItem
            description={owner.email}
            title={`${owner.firstName} ${owner.lastName}`}
            avatar={owner.profile?.avatar}
          />
        )}
        <h4>Users</h4>
        {users?.map(({ id, email, firstName, lastName, profile }) => (
          <UserItem key={id} description={email} title={`${firstName} ${lastName}`} avatar={profile?.avatar} />
        ))}
      </div>
    </div>
  );
};
