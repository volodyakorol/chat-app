import { List } from 'antd';

import { UserItem } from '@/components/UserItem/UserItem';
import { useGetUserMe } from '@/shared/reactQueries';
import { TUser } from '@/shared/types';

type TUserListProps = {
  isLoading?: boolean;
  users?: TUser[];
  withMe?: boolean;
  onSelectUser?: (user: TUser) => void;
};

export const UserList = ({ isLoading, users, onSelectUser, withMe = false }: TUserListProps) => {
  const { data } = useGetUserMe();

  return (
    <>
      <List
        itemLayout='horizontal'
        loading={isLoading}
        dataSource={users}
        renderItem={(user) => {
          const { firstName, lastName, email, profile, id } = user;

          if (!withMe && data?.id === id) return null;

          return (
            <UserItem
              avatar={profile?.avatar}
              description={email}
              title={`${firstName} ${lastName}`}
              onClick={() => user && onSelectUser && onSelectUser(user)}
            />
          );
        }}
      />
    </>
  );
};
