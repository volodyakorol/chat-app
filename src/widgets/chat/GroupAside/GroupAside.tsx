import { faHourglassStart, faUsers } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import { InfoItem, UserItem } from '@/components';
import { UserAvatar } from '@/features';
import { useGetGroup } from '@/shared/reactQueries';

import styles from './styles.module.scss';

type TGroupAsideProps = {
  selectedGroup: number;
};

export const GroupAside = ({ selectedGroup }: TGroupAsideProps) => {
  const { data } = useGetGroup({ id: selectedGroup });
  const { createdAt, owner, users, avatar, title } = data ?? {};

  const ownerUser = users?.find(({ id }) => id === owner?.id);
  const members = users?.filter(({ id }) => id !== owner?.id);

  return (
    <div className={styles.groupAside}>
      <div className={styles.asideHeader}>
        <UserAvatar size={140} src={avatar} />
        <h3>{title}</h3>
      </div>
      <div className={styles.block}>
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
      </div>
      <div className='divider' />
      <div className={styles.block}>
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
